'use client'

import Link from 'next/link'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '@/services/AuthService'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import ProjectTable from './ProjectTable'
import DrlambdaButton from '@/components/button/DrlambdaButton'
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
  task: 'video' | 'scripts' | 'slides' | 'presentation' | 'social post'
  name: string
  resources: Resource[]
  created_datetime: string
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState<Project[]>([])
  const [deleteInd, setDeleteInd] = useState('')
  const router = useRouter()
  const promptRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  const currentProjects = projects

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

  // get projects from backend
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

        if (data.projects.length === 0) {
          router.push('/workflow-type-choice')
        }

        data.projects.forEach((item: Project) => {
          if (item.task === null) {
            item.task = 'presentation';
          }
        })
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
    setIsDeleting(true)
    if (deleteInd === '') {
      throw 'Error'
    }
    const projectDeleteData = {
      project_id: deleteInd,
    }
    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
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
    setIsDeleting(false)
    setIsOpen(false)
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
    router.push('/workflow-type-choice')
    //route to type choosing page (new workflow)
    // router.push('/workflow-type-choice')
  }

  const deleteModal = (
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

      {/* delete project pop up */}
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
                Are you sure you want to delete this project?
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Deleted Project cannot be restored.
                </p>
              </div>

              <div className='flex'>
                <div className='flex justify-center mt-4'>
                  <button
                    className='bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-4 rounded mr-2 btn-size'
                    onClick={confirmDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Confirm" } 
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
  )

  return (
    <section className='grow flex flex-col'>
      <ToastContainer />
      {/* top background container of my projects title text and button */}
      <div className='mt-[3rem] flex items-end w-full z-10 pt-[4rem] border-b-2 px-[5rem]'>
        {/* flex container controlling max width */}
        <div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
          {/* my project title text */}
          <div className='absolute left-10 md:left-[50%] text-neutral-900 text-base font-bold font-creato-medium leading-10 tracking-wide border-black border-b-2'>
            My Projects
          </div>

          {/* create new project button */}
          <div className="absolute right-10 pb-[1rem] ">
            <DrlambdaButton
              isPaidFeature={false}
              onClick={handleStartNewProject}
            >
              Start
            </DrlambdaButton>
          </div>
        </div>
      </div>

      {/* projects details area */}
      <div
        className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'
        ref={contentRef}
      >
        {projects && projects.length > 0 ? (<ProjectTable
          currentProjects={currentProjects}
          onProjectClick={handleProjectClick}
          onDelete={handleDelete}
        />) :
          (
            <div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>You haven't created any project yet.</div>
          )}
      </div>

      {/* Delete modal */}
      <Transition appear show={isOpen} as={Fragment}>
        {deleteModal}
      </Transition>
    </section>
  )
}
