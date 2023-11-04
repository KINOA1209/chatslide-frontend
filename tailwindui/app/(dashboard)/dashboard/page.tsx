'use client'

import Link from 'next/link'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '@/components/utils/AuthService'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import mixpanel from 'mixpanel-browser'
import ProjectTable from './ProjectTable'
// interface Project {
//   id: number
//   name: string
//   description: string
// }
interface Resource {
  id: string
  name: string
  type: string
}
interface Project {
  id: string
  //   task: 'video' | 'scripts' | 'slides'
  task: 'presentation' | 'social post'
  name: string
  resources: Resource[]
  created_datetime: string
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState<Project[]>([])
  // const [deleteInd, setDeleteInd] = useState(-1)
  const [deleteInd, setDeleteInd] = useState('')
  const router = useRouter()
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // const projectsPerPage = 10;
  // const totalPages = Math.ceil(projects.length / projectsPerPage);
  // const indexOfLastProject = currentPage * projectsPerPage;
  // const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  // const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const currentProjects = projects

  // place holder data
  // const currentProjects = fakeProjects

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = contentRef.current.offsetHeight + 'px'
    }
    // Create a scoped async function within the hook.
    const fetchUserAndProject = async () => {
      try {
        const { userId, idToken: token } =
          await AuthService.getCurrentUserTokenAndId()
        handleRequest(token)
      } catch (error: any) {
        console.error(error)
      }
    }
    // Execute the created function directly
    fetchUserAndProject()
  }, [])

  const handleRequest = async (token: string) => {
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    headers.append('Content-Type', 'application/json')

    try {
      const response = await fetch('/api/get_projects', {
        method: 'POST',
        headers: headers,
      })

      if (response.ok) {
        const data = await response.json()
        console.log('project data: ', data.projects)
        setProjects(data.projects)
        setRendered(true)
      } else {
        // Handle error cases
        console.error('Failed to fetch projects:', response.status)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleProjectClick = (projectId: string) => {
    // Open the project detail page in a new tab
    window.open(`/project/${projectId}`, '_blank')
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    projectId: string
  ) => {
    e.stopPropagation()
    // Modal for warning
    setDeleteInd(projectId)
    setIsOpen(true)
  }

  const confirmDelete = async () => {
    setIsOpen(false)
    if (deleteInd === '') {
      throw 'Error'
    }
    const projectDeleteData = {
      project_id: deleteInd,
    }
    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      mixpanel.track('Project Deleted', {
        'Project ID': deleteInd,
      })
      const response = await fetch('/api/delete_project', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectDeleteData),
      })
      if (response.ok) {
        const projectDeleteFeedback = await response.json()
        if (response.status === 200) {
          setProjects(projects.filter((proj) => proj.id !== deleteInd))
          toast.success('Project deleted successfully', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else {
          // error handling does not work
          toast.error(projectDeleteFeedback.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
    setDeleteInd('')
  }

  useEffect(() => {
    if (rendered && projects.length === 0 && promptRef.current) {
      promptRef.current.innerHTML = 'You have no project created.'
    }
  }, [projects, rendered])

  // function to handle click start new project, clear sessionstorage
  const handleStartNewProject = () => {
    sessionStorage.clear()
    //route to workflow-generate-outlines
    router.push('/workflow-generate-outlines')
    //route to type choosing page (new workflow)
    // router.push('/workflow-type-choice')
  }

  return (
    <section className=' grow flex flex-col h-full'>
      <ToastContainer />
      {/* top background container of my projects title text and  */}
      <div className='bg-gray-200 pt-16 md:pt-32 flex justify-center '>
        {/* flex container controlling max width */}
        <div className='w-full h-[6.25rem] max-w-7xl flex flex-wrap items-end justify-between '>
          {/* my project title text */}
          <div className='w-40 rounded-md justify-center items-center inline-flex '>
            <div className='text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black border-b-2'>
              My Projects
            </div>
          </div>
          {/* create new project button */}
          <div className='h-9 px-5 py-2 bg-[#2943E9] rounded-3xl justify-center items-center inline-flex self-start whitespace-no-wrap'>
            <div
              className='text-center text-zinc-100 text-sm font-medium font-creato-medium leading-none tracking-tight cursor-pointer'
              onClick={handleStartNewProject}
            >
              Create New Project (20 ⭐️)
            </div>
          </div>
        </div>
      </div>

      {/* projects details area */}
      <div
        className='max-w-7xl mx-auto mt-4 px-4 pt-4 flex flex-col grow overflow-y-auto'
        ref={contentRef}
      >
        <ProjectTable
          currentProjects={currentProjects}
          onProjectClick={handleProjectClick}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Delete Project?
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Deleted Project cannot be restored.
                    </p>
                  </div>

                  <div className='flex'>
                    <div className='flex justify-center mt-4'>
                      <button
                        className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mr-2 btn-size'
                        onClick={confirmDelete}
                      >
                        Yes
                      </button>
                    </div>
                    <div className='flex justify-center mt-4'>
                      <button
                        className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 btn-size'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}
