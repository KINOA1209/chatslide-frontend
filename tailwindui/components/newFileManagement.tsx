'use client'

import React, { useState, useEffect, useRef } from 'react'
import AuthService from '@/components/utils/AuthService'
import UserService from '@/components/utils/UserService'
import { FileUploadButton } from '@/components/fileUpload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
// import mixpanel from 'mixpanel-browser'
import { DeleteResourceIcon } from '@/app/(feature)/my-resources/icons'
import { CarbonConnect, IntegrationName } from 'carbon-connect'

interface UserFile {
  id: string
  uid: string
  filename: string
  thumbnail_name: string
  timestamp: string
}

interface UserFileList {
  selectable: boolean
  userfiles: Array<UserFile>
  deleteCallback: Function
  clickCallback: Function
  selectedResources: Array<string>
}

// Define a new component for the table header
const FileTableHeader = () => (
  <div
    className='grid grid-cols-3 bg-[#ECF1FE] border border-gray-200'
    style={{ gridTemplateColumns: '2fr 1fr' }}
  >
    <div className='px-[2.5rem] py-[1rem] text-start w-[37px] text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
      File
    </div>
    <div className='px-[2.5rem] py-[1rem] text-start w-[37px] text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide hidden sm:block'>
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
          toast.success('File deleted successfully', {
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

  const getThumbnail = (thumbnailUrl: string) => {
    console.log(thumbnailUrl)
    return (
      <img
        src={thumbnailUrl}
        alt='Thumbnail'
        className='w-full h-full object-cover'
      />
    )
  }

  const entry = (
    id: string,
    uid: string,
    filename: string,
    timestamp: string,
    thumbnail: string,
    icon = 'pdf'
  ) => {
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
        key={id}
        className='grid grid-cols-3 border border-gray-300 bg-white'
        style={{ gridTemplateColumns: '2fr 1fr' }}
        onClick={(e) => {
          if (selectable) {
            clickCallback(id)
          } else {
            handleOnClick(e)
          }
        }}
      >
        {/* thumbnail, filename */}
        <div className='h-full flex items-center w-full py-4 px-2'>
          {/* thumbnail */}
          <div className='w-8 flex'>
            {thumbnail ? getThumbnail(thumbnail) : getIcon(filename)}
          </div>
          {/* filename */}
          <div className='grow text-ellipsis mx-4 overflow-hidden text-gray-600 text-[17px] italic font-creato-medium leading-normal tracking-wide'>
            {filename}
          </div>
        </div>
        {/* timestamp and delete icon */}
        <div className='h-full flex justify-between items-center w-full py-4 px-2 text-gray-600 text-[13px] font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
          {' '}
          {timestamp && (
            <div className='hidden md:block'>
              {moment(timestamp).format('L')}
            </div>
          )}
          {!selectable ? (
            <div className='w-8 flex flex-row-reverse cursor-pointer'>
              <div onClick={(e) => handleDeleteFile(e, id)}>
                <DeleteResourceIcon></DeleteResourceIcon>
              </div>
            </div>
          ) : (
            <></>
          )}
          {selectable ? (
            <div className='w-6 flex flex-row-reverse shrink-0'>
              {selectedResources.includes(id) ? (
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
      {userfiles.map((file, index) => {
        return entry(
          file.id,
          file.uid,
          file.filename,
          file.timestamp,
          file.thumbnail_name
        )
      })}
    </div>
  )
}

interface filesInterface {
  selectable: boolean
  callback?: Function
}

const MyFiles: React.FC<filesInterface> = ({
  selectable = false,
  callback,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [resources, setResources] = useState<UserFile[]>([])
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState<boolean>(false)
  const [selectedResources, setSelectedResources] = useState<Array<string>>([])
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
    ;(async () => {
      const paid = await UserService.isPaidUser()
      setIsPaid(paid)
    })()
  }, [])

  useEffect(() => {
    if (!selectable) {
      return
    }
    const resourcesFromStorage = sessionStorage.getItem('resources')
    const selected: Array<string> =
      resourcesFromStorage !== null ? JSON.parse(resourcesFromStorage) : []
    setSelectedResources(selected)
  }, [])

  useEffect(() => {
    if (rendered && resources.length === 0 && promptRef.current) {
      promptRef.current.innerHTML = 'You have no uploaded file'
    }
  }, [resources, rendered])

  useEffect(() => {
    if (callback !== undefined) {
      callback(selectedResources)
    }
  }, [selectedResources])
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

    fetch('/api/upload_user_file', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: body,
    })
      .then((response) => {
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
          return response.json()
        } else {
          throw Error(`${response.text}`)
        }
      })
      .then((parsedResponse) => {
        const file_id = parsedResponse.data.file_id
        fetchFiles(idToken)
        handleClick(file_id)
      })
      .catch((error) => {
        console.error(error)
        toast.error(`File upload failed ${error.message}`, {
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
    const ind = selectedResources.indexOf(id)
    let resources: Array<string> = []
    if (isPaid) {
      resources = [...selectedResources]
      if (ind !== -1) {
        resources.splice(ind, 1)
      } else {
        resources.push(id)
      }
    } else {
      if (ind !== -1) {
        resources = []
      } else {
        resources = [id]
      }
      if (resources.length > 0 && selectedResources.length > 0) {
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
    setSelectedResources(resources)
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
    <section className='bg-gradient-to-b from-gray-100 to-white grow flex flex-col h-full'>
      <ToastContainer enableMultiContainer containerId={'fileManagement'} />
      <div
        className={`max-w-7xl w-full mx-auto px-4
          flex flex-wrap justify-around`}
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
        {/* <div className='max-w-sm w-fit text-center pt-4 mx-4'>
          <div className='w-full mx-auto'>
            <FileUploadButton onFileSelected={onFileSelected} />
          </div>
        </div> */}

        {/* carbon connect cloud storage */}
        {/* <div className='max-w-sm w-fit text-center pt-4 mx-4'>
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
              <div className='max-w-sm flex flex-col items-center z-50'>
                <button
                  className='w-full btn text-white font-bold bg-black from-blue-600  to-teal-500'
                  type='button'
                >
                  Connect to Cloud Storage
                </button>
              </div>
            </CarbonConnect>
          </div>
        </div> */}
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
            selectedResources={selectedResources}
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

const getIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()

  const pdfIcon = (
    <svg
      className='w-8'
      version='1.1'
      id='_x32_'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <g>
        <path
          d='M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
		c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
		 M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
		c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z'
        />
        <path
          d='M171.947,252.785h-28.529c-5.432,0-8.686,3.533-8.686,8.825v73.754c0,6.388,4.204,10.599,10.041,10.599
		c5.711,0,9.914-4.21,9.914-10.599v-22.406c0-0.545,0.279-0.817,0.824-0.817h16.436c20.095,0,32.188-12.226,32.188-29.612
		C204.136,264.871,192.182,252.785,171.947,252.785z M170.719,294.888h-15.208c-0.545,0-0.824-0.272-0.824-0.81v-23.23
		c0-0.545,0.279-0.816,0.824-0.816h15.208c8.42,0,13.447,5.027,13.447,12.498C184.167,290,179.139,294.888,170.719,294.888z'
        />
        <path
          d='M250.191,252.785h-21.868c-5.432,0-8.686,3.533-8.686,8.825v74.843c0,5.3,3.253,8.693,8.686,8.693h21.868
		c19.69,0,31.923-6.249,36.81-21.324c1.76-5.3,2.723-11.681,2.723-24.857c0-13.175-0.964-19.557-2.723-24.856
		C282.113,259.034,269.881,252.785,250.191,252.785z M267.856,316.896c-2.318,7.331-8.965,10.459-18.21,10.459h-9.23
		c-0.545,0-0.824-0.272-0.824-0.816v-55.146c0-0.545,0.279-0.817,0.824-0.817h9.23c9.245,0,15.892,3.128,18.21,10.46
		c0.95,3.128,1.62,8.56,1.62,17.93C269.476,308.336,268.805,313.768,267.856,316.896z'
        />
        <path
          d='M361.167,252.785h-44.812c-5.432,0-8.7,3.533-8.7,8.825v73.754c0,6.388,4.218,10.599,10.055,10.599
		c5.697,0,9.914-4.21,9.914-10.599v-26.351c0-0.538,0.265-0.81,0.81-0.81h26.086c5.837,0,9.23-3.532,9.23-8.56
		c0-5.028-3.393-8.553-9.23-8.553h-26.086c-0.545,0-0.81-0.272-0.81-0.817v-19.425c0-0.545,0.265-0.816,0.81-0.816h32.733
		c5.572,0,9.245-3.666,9.245-8.553C370.411,256.45,366.738,252.785,361.167,252.785z'
        />
      </g>
    </svg>
  )

  const videoIcon = (
    <svg
      className='w-8'
      version='1.1'
      id='_x32_'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <g>
        <path
          d='M378.409,0H208.294h-13.176l-9.314,9.314L57.017,138.102l-9.315,9.314v13.176v265.513
		c0,47.361,38.528,85.896,85.896,85.896h244.811c47.361,0,85.888-38.535,85.888-85.896V85.895C464.298,38.528,425.77,0,378.409,0z
		 M432.494,426.104c0,29.877-24.214,54.092-54.084,54.092H133.598c-29.877,0-54.091-24.215-54.091-54.092V160.591h83.717
		c24.884,0,45.07-20.179,45.07-45.07V31.804h170.115c29.87,0,54.084,24.214,54.084,54.091V426.104z'
        />
        <path
          d='M228.222,229.171c-0.705-0.406-1.557-0.426-2.262-0.035c-0.712,0.391-1.117,1.131-1.117,1.948v56.73v56.752
		c0,0.817,0.405,1.544,1.117,1.928c0.705,0.412,1.557,0.391,2.262,0l95.042-56.766c0.677-0.405,1.082-1.131,1.082-1.914
		c0-0.775-0.404-1.522-1.082-1.906L228.222,229.171z'
        />
      </g>
    </svg>
  )

  const docxIcon = (
    <svg
      className='w-8'
      version='1.1'
      id='_x32_'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 560'
    >
      <g>
        <path
          d='M486.201,196.121h-13.166v-63.525c0-0.399-0.062-0.795-0.115-1.2c-0.021-2.522-0.825-5-2.552-6.96L364.657,3.675
		c-0.033-0.031-0.064-0.042-0.085-0.073c-0.63-0.704-1.364-1.292-2.143-1.796c-0.229-0.157-0.461-0.286-0.702-0.419
		c-0.672-0.365-1.387-0.672-2.121-0.893c-0.2-0.052-0.379-0.134-0.577-0.188C358.23,0.118,357.401,0,356.562,0H96.757
		C84.894,0,75.256,9.649,75.256,21.502v174.613H62.092c-16.971,0-30.732,13.756-30.732,30.73v159.81
		c0,16.966,13.761,30.736,30.732,30.736h13.164V526.79c0,11.854,9.638,21.501,21.501,21.501h354.776
		c11.853,0,21.501-9.647,21.501-21.501V417.392h13.166c16.966,0,30.729-13.764,30.729-30.731v-159.81
		C516.93,209.877,503.167,196.121,486.201,196.121z M96.757,21.507h249.054v110.006c0,5.94,4.817,10.751,10.751,10.751h94.972
		v53.861H96.757V21.507z M367.547,335.847c7.843,0,16.547-1.701,21.666-3.759l3.916,20.301c-4.768,2.376-15.509,4.949-29.493,4.949
		c-39.748,0-60.204-24.73-60.204-57.472c0-39.226,27.969-61.055,62.762-61.055c13.465,0,23.705,2.737,28.31,5.119l-5.285,20.64
		c-5.287-2.226-12.615-4.263-21.832-4.263c-20.641,0-36.663,12.444-36.663,38.027C330.718,321.337,344.362,335.847,367.547,335.847z
		 M291.647,296.97c0,37.685-22.854,60.537-56.444,60.537c-34.113,0-54.066-25.759-54.066-58.495
		c0-34.447,21.995-60.206,55.94-60.206C272.39,238.806,291.647,265.248,291.647,296.97z M67.72,355.124V242.221
		c9.552-1.532,21.999-2.375,35.13-2.375c21.83,0,35.981,3.916,47.055,12.276c11.945,8.863,19.455,23.021,19.455,43.311
		c0,21.994-8.017,37.181-19.105,46.556c-12.111,10.058-30.528,14.841-53.045,14.841C83.749,356.825,74.198,355.968,67.72,355.124z
		 M451.534,520.968H96.757V417.392h354.776V520.968z M471.245,355.627l-10.409-20.804c-4.263-8.012-6.992-13.99-10.231-20.636
		h-0.342c-2.388,6.656-5.28,12.624-8.861,20.636l-9.552,20.804h-29.675l33.254-58.158l-32.054-56.786h29.849l10.058,20.984
		c3.413,6.979,5.963,12.614,8.694,19.092h0.335c2.729-7.332,4.955-12.446,7.843-19.092l9.721-20.984h29.683l-32.406,56.103
		l34.105,58.841H471.245z'
        />
        <path
          d='M141.729,296.277c0.165-23.869-13.814-36.494-36.15-36.494c-5.807,0-9.552,0.514-11.772,1.027v75.2
		c2.226,0.509,5.806,0.509,9.047,0.509C126.388,336.698,141.729,323.743,141.729,296.277z'
        />
        <path
          d='M208.604,298.493c0,22.515,10.575,38.372,27.969,38.372c17.567,0,27.617-16.703,27.617-39.045
		c0-20.641-9.885-38.377-27.801-38.377C218.827,259.448,208.604,276.162,208.604,298.493z'
        />
      </g>
    </svg>
  )

  const imageIcon = (
    <svg
      className='w-8'
      version='1.1'
      id='_x32_'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <g>
        <path
          d='M99.281,399.469h320.094c6.172,0,11.844-3.422,14.719-8.875c2.844-5.469,2.438-12.078-1.063-17.141
		l-69.156-100.094c-6.313-9.125-16.781-14.516-27.906-14.297s-21.406,5.969-27.375,15.359l-19.719,30.984l-54.828-79.359
		c-6.313-9.172-16.797-14.531-27.922-14.328s-21.406,5.969-27.375,15.359L85.281,373.984c-3.25,5.109-3.469,11.578-0.531,16.875
		C87.656,396.172,93.219,399.469,99.281,399.469z'
        />
        <path
          d='M322.672,223.906c23.688,0,42.922-19.219,42.922-42.922c0-23.688-19.234-42.906-42.922-42.906
		c-23.703,0-42.922,19.219-42.922,42.906C279.75,204.688,298.969,223.906,322.672,223.906z'
        />
        <path d='M0,19.703v472.594h512v-25.313V19.703H0z M461.375,441.672H50.625V70.328h410.75V441.672z' />
      </g>
    </svg>
  )

  const fileIcon = (
    <svg
      className='w-8'
      version='1.1'
      id='_x32_'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <g>
        <path
          d='M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
            c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
            M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
            c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z'
        />
      </g>
    </svg>
  )

  const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/
  const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/
  const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/

  if (regex1.test(filename) || regex2.test(filename) || regex3.test(filename)) {
    return videoIcon
  }
  if (ext === 'docx') {
    return docxIcon
  }
  if (ext === 'pdf') {
    return pdfIcon
  }
  if (ext && ['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
    return imageIcon
  }
  return fileIcon
}
