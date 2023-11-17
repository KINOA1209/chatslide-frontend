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
import { DeleteIcon } from '@/app/(feature)/icons'
import { FileIcon } from '@/app/(dashboard)/dashboard/ProjectTable'

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
        className='object-contain'
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
        <div className='h-full flex items-center justify-left w-full py-4 px-2'>
          {/* thumbnail */}
          <div className='min-w-[32px] max-w-[32px]'>
            {thumbnail ? getThumbnail(thumbnail) : getIcon(filename)}
          </div>
          {/* filename */}
          <div className='text-ellipsis mx-4 overflow-hidden text-[17px] font-creato-medium leading-normal tracking-wide'>
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
                <DeleteIcon />
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
  selectable: boolean;
  callback?: Function;
  filesUpdated: boolean;
  setFilesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const MyFiles: React.FC<filesInterface> = ({
  selectable = false,
  callback,
  filesUpdated,
  setFilesUpdated,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [resources, setResources] = useState<UserFile[]>([])
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState<boolean>(false)
  const [selectedResources, setSelectedResources] = useState<Array<string>>([])
  const [isPaid, setIsPaid] = useState<boolean>(false)

  useEffect(() =>{
    if(filesUpdated){
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
      fetchUserFiles();
      setFilesUpdated(false);
    }
  }, [filesUpdated, setFilesUpdated])
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

  return (
    <section className='bg-gradient-to-b from-gray-100 to-white grow flex flex-col h-full'>
      <ToastContainer enableMultiContainer containerId={'fileManagement'} />
      <div
        className={`max-w-7xl w-full mx-auto px-4
          flex flex-wrap justify-around`}
      >
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
  let ext = filename.split('.').pop()?.toLowerCase()
  if (ext === undefined){
    ext = 'doc'
  }

  return FileIcon({ fileType: ext })
}
