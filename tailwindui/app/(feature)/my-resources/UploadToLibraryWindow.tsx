'use client'
import React, { useState, useEffect,  useRef } from 'react';
import { FromCloudIcon, FromComputerIcon } from '@/app/(feature)/my-resources/icons';
import { NewFileUploadButton } from '@/components/fileUpload';
import { toast } from 'react-toastify';
import AuthService from '@/components/utils/AuthService';
import UserService from '@/components/utils/UserService';
import { CarbonConnect, IntegrationName } from 'carbon-connect';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/(feature)/my-resources/UploadToLibraryWindow.css';


interface UploadToLibraryWindowProps {
  showModal: boolean
  closeModal: () => void
  selectable: boolean
}

interface UserFile {
  id: string
  uid: string
  filename: string
  thumbnail_name: string
  timestamp: string
}

const UploadToLibraryWindow: React.FC<UploadToLibraryWindowProps> = ({
  showModal,
  closeModal,
  selectable = false,
}) => {
  if (!showModal) {
    return null // Don't render the modal if showModal is false
  }

  //new part
  const [activeTab, setActiveTab] = useState('computer')
  const [resources, setResources] = useState<UserFile[]>([])
  const [rendered, setRendered] = useState<boolean>(false)
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [uploadedResources, setUploadedResources] = useState<Array<File>>([])
  const [selectedUploadedResources, setSelectedUploadedResources] = useState<Array<File | null>>([])
  const [uploadedResourcesClicked, setUploadedResourcesClicked] = useState(new Array(uploadedResources.length).fill(false))

  // function to keep tracking of current tab
  const handleTabClick = (tab:string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = contentRef.current.offsetHeight + 'px'
    }
    // Create a scoped async function within the hook.
    const fetchUserFiles = async () => {
      try {
        const { userId, idToken: token } =
          await AuthService.getCurrentUserTokenAndId()
        fetchFiles(token)
      } catch (error: any) {
        console.error(error)
      }
    }
    // Execute the created function directly
    fetchUserFiles()
  }, [])


  useEffect(() => {
    if (rendered && resources.length === 0 && promptRef.current) {
      promptRef.current.innerHTML = 'You have no uploaded file'
    }
  }, [resources, rendered])

  // Function to send data to the endpoint api/sync_carbon_file
  const sendUpdateToEndpoint = async (data: any, token: string) => {
    try {
      const headers = new Headers()
      if (token) {
        headers.append('Authorization', `Bearer ${token}`)
      }
      headers.append('Content-Type', 'application/json')

      // Replace the following line with your actual endpoint and request logic
      const response = await fetch('api/sync_carbon_file', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ data }),
      })

      if (!response.ok) {
        const errorResponse = await response.json() // Assuming the error is returned as JSON
        console.log('Error response from sync_carbon_file: ', errorResponse)
        throw new Error(`${errorResponse.error}`)
      }

      const responseData = await response.json()

      console.log('Response from sync_carbon_file: ', responseData)

      return responseData
    } catch (error) {
      // Rethrow the error for the calling function to catch
      throw error
    }
  }

  const tokenFetcher = async () => {
    try {
      // Assuming AuthService.getCurrentUserTokenAndId() returns an object with userId and idToken properties
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()

      const headers = new Headers()
      if (token) {
        headers.append('Authorization', `Bearer ${token}`)
      }
      headers.append('Content-Type', 'application/json')

      const response = await fetch('/api/fetchCarbonTokens', {
        method: 'GET', // The endpoint is using the GET method
        headers: headers,
      })

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        // Handle the case when the response is not OK (status code is not 200)
        console.error(
          'Failed to fetch access token:',
          response.status,
          response.statusText
        )
        throw new Error('Failed to fetch access token')
      }
    } catch (error) {
      // Handle any other errors that might occur during the process
      console.error('Error fetching access token:', error)
      throw error
    }
  }

  const fetchFiles = async (token: string) => {
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    headers.append('Content-Type', 'application/json')

    const resource_type = selectable
      ? {
          resource_type: ['doc', 'url'],
        }
      : {}

    try {
      const response = await fetch('/api/resource_info', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(resource_type),
      })

      if (response.ok) {
        const data = await response.json()
        const files = data.data.resources
        const resourceTemps = files.map((resource: any) => {
          return {
            id: resource.id,
            uid: resource.uid,
            filename: resource.resource_name,
            thumbnail_name: resource.thumbnail_url,
            timestamp: resource.timestamp,
          }
        })
        setResources(resourceTemps)
        sessionStorage.setItem(
          'history_resource',
          JSON.stringify(resourceTemps)
        )
        setRendered(true)
      } else {
        // Handle error cases
        console.error('Failed to fetch projects:', response.status)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }


  const handleSuccess = async (data: any) => {
    console.log('Data on Success: ', data)

    // Check if the action is "update"
    if (data && data.action === 'UPDATE') {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      // Assuming you have a function to send data to the endpoint
      try {
        const response = await sendUpdateToEndpoint(data, token)
        await fetchFiles(token)

        // Check if there are failed files in the response
        if (response && response.failed_files) {
          const failedFiles = response.failed_files.join(', ') // Assuming it's an array of file names
          toast.error(`Some files failed to be synced: ${failedFiles}`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            containerId: 'fileManagement',
          })
        } else {
          toast.success('All files synced successfully', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            containerId: 'fileManagement',
          })
        }
      } catch (error: any) {
        console.error('Error sending data to sync_carbon_file: ', error)
        // Handle the error as needed
        toast.error(`${error.message}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          containerId: 'fileManagement',
        })
      }
    }
  }

  // function to update the uploadedResources when the user uploads the file locally
  // uploadedResources: <Array<File>>([]) ex: [File, File, File]
  const localFileUpload = async (file: File | null) => {
    if (file == null){
      return
    }
    //check for duplicate file
    else {
      if (uploadedResources.some((uploadedFile) => uploadedFile.name === file.name)) {
        alert('Duplicate file! Please choose a different file.')
      }
      else {
        setUploadedResources([...uploadedResources, file])
      }
    }
  }

  // change the onFileSelected function compared to that in fileManagement
  // now the function parameter would be an File array that might contain null value
  // ex. [File, File, null, File]
  const onFileSelected = async (files: Array<File | null> | null) => {
    console.log('will upload file', files)
    if (files == null) {
      // alert("Please select non-null file");
      return
    }
    const validFiles = files.filter(file => file !== null) as File[]
    if (validFiles.length === 0){
      return
    }
    const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
    const uploadPromises = validFiles.map(file => {
      const body = new FormData()
      body.append('file', file)
      return fetch('/api/upload_user_file', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: body,
      })
      .then((response) => {
        if (response.ok){
          return response.json()
        }
        else {
          throw Error(`${response.text}`)
        }
      })
      .then(parsedResponse => {
        const file_id = parsedResponse.data.file_id
        fetchFiles(idToken);
      })
    })

    Promise.all(uploadPromises)
      .then(() => {
        toast.success('File uploaded successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          containerId: 'fileManagement',
        })
        //fetchFiles(idToken);
      })
      .catch(error => {
        console.error(error);
        toast.error(`Some file uploads failed ${error.message}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          containerId: 'fileManagement',
        })
      })
  }

  //function to handle the toggle in upload local file section
  const handleUploadResourcesClick = (idx:number) => {
    //update boolean array to keep tracking the selected/unselected state of upload file
    const newClickedState = [...uploadedResourcesClicked];
    newClickedState[idx] = !newClickedState[idx];
    setUploadedResourcesClicked(newClickedState);
    //update file array to upload the selected file to db
    const newSelectedFileArray = [...selectedUploadedResources];
    if (newClickedState[idx] === true){
      newSelectedFileArray[idx] = uploadedResources[idx]
    }
    else {
      newSelectedFileArray[idx] = null
    }
    setSelectedUploadedResources(newSelectedFileArray)
  }

  return (
    <section>
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-10'>
        <div
          className='fixed top-0 left-0 w-full h-full bg-black opacity-70'
          onClick={closeModal}
        ></div>
        {/* pop up modal box container */}
        <div id='main_container' className='w-full md:w-[34rem] h-[35rem] relative rounded-lg flex flex-col items-center'>
          {/* Upload to my library text */}
          <div className='pt-[1.25rem] w-[444px] text-center text-gray-700 text-lg font-bold font-creato-medium leading-normal tracking-wide'>
            Upload to My Library
          </div>
          {/* flex row container for two tabs */}
          <div className='flex flex-row w-full px-5'>
            {/* From computer tab */}
            <div className={`flex-1 h-10 px-3 py-1 ${activeTab === 'computer' ? 'border-b-2' : 'border-b-0 opacity-50'} bg-neutral-800 bg-opacity-0 justify-center items-center gap-2.5 inline-flex border-black cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              handleTabClick('computer');
            }}
            >
              <div className='w-[17px] h-[18px] relative'>
                <div className='w-[15.79px] h-3.5 left-[0.61px] absolute'>
                  <FromComputerIcon />
                </div>
              </div>
              <div className={`text-center text-neutral-900 text-sm font-medium font-creato-medium leading-normal tracking-wide`}>
                From Computer
              </div>
            </div>
            {/* from cloud tab */}
            <div className={`flex-1 h-10 px-3 py-1 ${activeTab === 'cloud' ? 'border-b-2' : 'border-b-0 opacity-50'} bg-neutral-800 bg-opacity-0 justify-center items-center gap-2.5 inline-flex border-black cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              handleTabClick('cloud');
            }}
            >
              <div className='w-[17px] h-[17px] relative'>
                <div className='w-[15.79px] h-[15.79px] left-[0.61px] top-[0.60px] absolute'>
                  <FromCloudIcon></FromCloudIcon>
                </div>
              </div>
              <div className={`text-center text-neutral-900 text-sm font-medium font-creato-medium leading-normal tracking-wide`}>
                From Cloud
              </div>
            </div>
          </div>
          {/* File upload area */}
          { activeTab === 'computer' && (
            <div className='h-[400px] my-[20px] px-2 md:px-5 w-full flex-1 flex flex-col'>
              <div className='flex-1 overflow-auto max-h-[280px] z-50'>
                {uploadedResources.map((uploadedFile, index) => (
                    <li className='list-none flex' key={index}>
                        <div id='uploadfile_each' className='flex w-full justify-between items-center gap-2 rounded h-[45px] pl-[1rem] mt-[10px]'>
                            <div className='flex items-center gap-2'>
                              <img src="/icons/selectedFiles_icon.png"/>
                              <span>{uploadedFile.name}</span>
                            </div>
                            <button
                              className={`uploadButton ${uploadedResourcesClicked[index] ? 'clicked' : ''} flex-end w-[17px] h-[17px] mr-[20px] rounded-full hover:bg-gray-400 transition duration-300`}
                              onClick={() => handleUploadResourcesClick(index)}
                            >
                            </button>
                        </div>
                    </li>
                ))}
              </div>
              <div id='instruction_container' className={`w-full min-h-[100px] border-0 border-dotted border-gray-400'} bg-gray-200 rounded-lg flex flex-col items-center justify-center`}>
                {' '}
                {/* select local file button */}
                <NewFileUploadButton onFileSelected={localFileUpload} />
                {/* <div className='w-[334.50px] h-[29.16px] text-center text-blue-700 text-[15px] font-medium font-creato-medium leading-tight tracking-tight'>
                  or drop here
                </div> */}
                {/* Select Local file explanation text */}
                <div className='w-full h-7 text-center'>
                  <span className='text-slate-500 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
                    PDF, TXT, DOCX, PNG, JPG, JPEG{' '}
                  </span>
                  <span className='text-neutral-300 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
                    I
                  </span>
                  <span className='text-slate-500 text-sm font-normal font-creato-medium leading-normal tracking-tight'>
                    {' '}
                    16MB Maximum
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* From cloud area */}
          { activeTab === 'cloud' && (
            <CarbonConnect
              orgName='DrLambda'
              brandIcon='https://drlambda.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_no_text.0a4e5a6b.png&w=1920&q=75'
              tokenFetcher={tokenFetcher}
              tags={{
                tag1: 'tag1_value',
                tag2: 'tag2_value',
                tag3: 'tag3_value',
              }}
              maxFileSize={10000000}
              enabledIntegrations={[
                // {
                //     id: IntegrationName.GOOGLE_DRIVE,
                //     chunkSize: 1500,
                //     overlapSize: 20,
                //     skipEmbeddingGeneration: true,
                // },
                {
                  id: IntegrationName.ONEDRIVE,
                  chunkSize: 1500,
                  overlapSize: 20,
                  // skipEmbeddingGeneration: true,
                },
                {
                  id: IntegrationName.DROPBOX,
                  chunkSize: 1500,
                  overlapSize: 20,
                  // skipEmbeddingGeneration: true,
                },
                {
                  id: IntegrationName.NOTION,
                  chunkSize: 1500,
                  overlapSize: 20,
                  // skipEmbeddingGeneration: true,
                },
              ]}
              onSuccess={(data) => handleSuccess(data)}
              onError={(error) => console.log('Data on Error: ', error)}
              primaryBackgroundColor='#F2F2F2'
              primaryTextColor='#555555'
              secondaryBackgroundColor='#f2f2f2'
              secondaryTextColor='#000000'
              allowMultipleFiles={true}
              open={false}
              chunkSize={1500}
              overlapSize={20}
              // entryPoint="LOCAL_FILES"
            >
              <div className='h-[385px] my-[20px] flex items-center justify-center'>
                <button
                  className='w-full btn text-white font-bold bg-black from-blue-600  to-teal-500'
                  type='button'
                >
                  Connect to Cloud Storage
                </button>
              </div>
            </CarbonConnect>
          )}
          {/* container of last row */}
          <div className='flex flex-row w-full items-center h-[50px] justify-between px-5'>
              {/* cancel button */}
              <div className='w-[68.48px] h-7 rounded-[4.94px] border-2 border-zinc-800 justify-center items-center inline-flex'>
                <div
                  className='text-center text-zinc-800 text-sm font-medium font-creato-medium leading-[14.81px] tracking-wide cursor-pointer'
                  onClick={closeModal}
                >
                  Cancel
                </div>
              </div>
 
              {/* continue button */}
              <div className='w-[80.81px] h-7 bg-zinc-600 rounded-[4.94px] justify-center items-center inline-flex'>
                <div className='text-center text-zinc-100 text-sm font-medium font-creato-medium leading-[14.81px] tracking-wide cursor-pointer'
                 onClick={() => {
                  onFileSelected(selectedUploadedResources);
                  closeModal();
                }}
                >
                  Continue
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadToLibraryWindow
