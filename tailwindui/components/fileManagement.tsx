'use client'

import React, { useState, useEffect, useRef } from 'react'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import { FileUploadButton } from '@/components/fileUpload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
// import mixpanel from 'mixpanel-browser'
import { DeleteResourceIcon } from '@/app/(feature)/my-resources/icons'
import { CarbonConnect, IntegrationName } from 'carbon-connect'
import { DeleteIcon } from '@/app/(feature)/icons'
import { ResourceItem } from './ui/ResourceItem'
import Resource from '@/models/Resource'
import ResourceService from '@/services/ResourceService'


interface UserFileList {
  selectable: boolean
  userfiles: Array<Resource>
  deleteCallback: Function
  clickCallback: Function
  selectedResources: Array<string>
}

// Define a new component for the table header
const FileTableHeader = () => (
  <div
    className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-2 md:grid-cols-3'
  >
    {/* <div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Type
        </div> */}
    <div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
      Title
    </div>
    <div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
      Date
    </div>
  </div>
)

const FileManagement: React.FC<UserFileList> = ({
  selectable = false,
  userfiles,
  deleteCallback,
  clickCallback,
  selectedResources,
}) => {
  const handleDeleteFile = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation()
    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      const fileDeleteData = {
        resource_id: id,
      }
      // mixpanel.track('File Deleted', {
      //   'File ID': id,
      // })
      const response = await fetch('/api/delete_user_resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fileDeleteData),
      })
      if (response.ok) {
        const fileDeleteFeedback = await response.json()
        if (response.status === 200) {
          deleteCallback(id)
        } else {
          // error handling does not work
          toast.error(fileDeleteFeedback.message, {
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
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Default behavior in file management page
    // Open thumbnail / Open Youtube link etc.
  }

  const entry = ( resource: Resource ) => {
    console.log(resource)

    return (
      // <div
      //   key={id}
      //   className='w-full h-16 px-4 rounded-2xl md:hover:bg-gray-200'
      //   onClick={(e) => {
      //     if (selectable) {
      //       clickCallback(id)
      //     } else {
      //       handleOnClick(e)
      //     }
      //   }}
      // >
      <div
        key={resource.id}
        className='grid grid-cols-3 border border-gray-300 bg-white'
        style={{ gridTemplateColumns: '2fr 1fr' }}
        onClick={(e) => {
          if (selectable) {
            clickCallback(resource.id)
          } else {
            handleOnClick(e)
          }
        }}
      >
        
        <ResourceItem {...resource}/>

        {/* timestamp and delete icon */}
        <div className='h-full flex justify-between items-center w-full py-4 px-2 text-gray-600 text-[13px] font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
          {' '}
          {resource.timestamp && (
            <div className='hidden md:block'>
              {moment(resource.timestamp).format('L')}
            </div>
          )}
          {!selectable ? (
            <div className='w-8 flex flex-row-reverse cursor-pointer'>
              <div onClick={(e) => handleDeleteFile(e, resource.id)}>
                <DeleteIcon />
              </div>
            </div>
          ) : (
            <></>
          )}
          {selectable ? (
            <div className='w-6 flex flex-row-reverse shrink-0'>
              {selectedResources.includes(resource.id) ? (
                <svg
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z'
                    fill='#0070f4'
                  />
                </svg>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-fit'>
      {/* <div className='w-full px-4'>
        <div className='w-full border-b border-gray-300'></div>
      </div> */}
      <FileTableHeader /> {/* Render the table header */}
      {userfiles.map((resource) => {
        return entry(resource)
      })}
    </div>
  )
}
interface filesInterface {
  selectable: boolean
  selectedResourceId?: Array<string>
  setSelectedResourceId?: Function
  selectedResources?: Array<Resource>
  setSelectedResources?: Function
}

const MyFiles: React.FC<filesInterface> = ({
  selectable = false,
  selectedResourceId,
  setSelectedResourceId,
  selectedResources,
  setSelectedResources,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [resources, setResources] = useState<Resource[]>([])
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState<boolean>(false)
  const [isPaid, setIsPaid] = useState<boolean>(false)

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
    ; (async () => {
      const paid = await UserService.isPaidUser()
      setIsPaid(paid)
    })()
  }, [])

  useEffect(() => {
    if (!selectable) {
      return
    }
  }, [])

  useEffect(() => {
    if (rendered && resources.length === 0 && promptRef.current) {
      promptRef.current.innerHTML = 'You have no uploaded file'
    }
  }, [resources, rendered])

  const fetchFiles = async (token: string) => {
    const resource_type = selectable ? ['doc', 'url'] : []

    ResourceService.fetchResources(resource_type, token).then((resources) => {
      if (setSelectedResources) {
        setSelectedResources(resources.filter((resource: Resource) => selectedResourceId?.includes(resource.id)));
      }
      setResources(resources)
      setRendered(true)
    })
  }

  const onFileSelected = async (file: File | null) => {
    console.log('will upload file', file)
    if (file == null) {
      // alert("Please select non-null file");
      return
    }
    console.log('file name: ', file.name) //.split('.', 1)
    console.log('file name split: ', file.name.split('.', 1))
    const { userId, idToken } = await AuthService.getCurrentUserTokenAndId()
    const body = new FormData()
    body.append('file', file)

    // mixpanel.track('File Uploaded', {
    //   'File Name': file.name,
    //   'File Type': file.type,
    // })
    try {
      const response = await fetch('/api/upload_user_file', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: body,
      });

      if (response.ok) {
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
        const data = await response.json();
        await fetchFiles(idToken)
        handleClick(data.data.file_id)
      }
      else {
        response.json().then((data) => {
          toast.error(data.message, {
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
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(`File upload failed.`, {
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

  const handleFileDeleted = (id: string) => {
    let ind = -1
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].id === id) {
        ind = i
        break
      }
    }
    if (ind !== -1) {
      const newFiles = [...resources]
      newFiles.splice(ind, 1)
      setResources(newFiles)
    }
  }

  const handleClick = (id: string) => {
    if (!selectedResourceId || !setSelectedResourceId) {
      console.log('selectedResources or setSelectedResources is null')
      return
    }
    console.log('handleClick', id)
    const ind = selectedResourceId.indexOf(id)
    let newSelectedResourceId: Array<string> = []
    if (isPaid) {
      newSelectedResourceId = [...selectedResourceId]
      if (ind !== -1) {
        newSelectedResourceId.splice(ind, 1)
      } else {
        newSelectedResourceId.push(id)
      }
    } else {
      if (ind !== -1) {
        newSelectedResourceId = []
      } else {
        newSelectedResourceId = [id]
      }
      if (newSelectedResourceId.length > 0 && selectedResourceId.length > 0) {
        toast.info('Only subscribed user can select multiple files!', {
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
    setSelectedResourceId(newSelectedResourceId)
    if (setSelectedResources) {
      setSelectedResources(resources.filter((resource) => newSelectedResourceId.includes(resource.id)));
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

  return (
    <section className='bg-white grow flex flex-col h-full'>
      <ToastContainer enableMultiContainer containerId={'fileManagement'} />
      <div
        className={`max-w-7xl w-full mx-auto px-4 flex flex-wrap justify-around`}
      >
        {/* {!selectable ? (
          <div className='pt-4 grow pr-4'>
            <h1 className='h2' style={{ color: '#180d09' }}>
              My Resources
            </h1>
          </div>
        ) : (
          <></>
        )} */}

        {/* upload local file button */}
        <div className='max-w-sm w-fit text-center pt-4 mx-4'>
          <div className='w-full mx-auto'>
            <FileUploadButton onFileSelected={onFileSelected} />
          </div>
        </div>

        {/* carbon connect cloud storage */}
        <div className='max-w-sm w-fit text-center pt-4 mx-4'>
          <div className='w-full mx-auto'>
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
                  skipEmbeddingGeneration: true,
                },
                {
                  id: IntegrationName.DROPBOX,
                  chunkSize: 1500,
                  overlapSize: 20,
                  skipEmbeddingGeneration: true,
                },
                {
                  id: IntegrationName.NOTION,
                  chunkSize: 1500,
                  overlapSize: 20,
                  skipEmbeddingGeneration: true,
                },
              ]}
              onSuccess={(data) => handleSuccess(data)}
              onError={(error) => console.log('Data on Error: ', error)}
              primaryBackgroundColor='#2943E9'
              primaryTextColor='#fafafa'
              secondaryBackgroundColor='#f2f2f2'
              secondaryTextColor='#000000'
              allowMultipleFiles={true}
              open={false}
              chunkSize={1500}
              overlapSize={20}
            // entryPoint="LOCAL_FILES"
            >
              <div className='max-w-sm flex flex-col items-center z-[50]'>
                <button
                  className='w-full btn text-white font-bold bg-black from-blue-600  to-teal-500'
                  type='button'
                >
                  Connect to Cloud Storage
                </button>
              </div>
            </CarbonConnect>
          </div>
        </div>
      </div>
      <div
        className='max-w-6xl w-full mx-auto mt-4 px-4 pt-4 flex grow overflow-y-auto'
        ref={contentRef}
      >
        {resources.length > 0 && (
          <FileManagement
            selectable={selectable}
            userfiles={resources}
            deleteCallback={handleFileDeleted}
            clickCallback={handleClick}
            selectedResources={selectedResourceId || []}
          />
        )}
        {resources.length === 0 && (
          <div className='w-full grow flex items-center justify-center'>
            <div className='text-gray-400' ref={promptRef}>
              Loading...
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MyFiles
