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

// const fakeProjects: Project[] = [
//   {
//     id: '63fa4d24-04de-43c5-8bc6-bc00175e10ca',
//     task: 'video',
//     projectName: 'Exploration of Creative Arts in Modern Society',
//     resources: [
//       'introduction_to_creative_arts.pdf',
//       'creative_arts_script_v1.docx',
//       'creative_arts_video_part1.mp4',
//     ],
//     creationDate: '10-03-2023',
//   },
//   {
//     id: '1b9566e1-5b9f-4d3f-9e6b-3a70e1240b68',
//     task: 'scripts',
//     projectName: 'A Comprehensive Study of Musical Evolution Across Centuries',
//     resources: [
//       'musical_evolution_lyrics.pdf',
//       'musical_evolution_composition_notes.docx',
//     ],
//     creationDate: '05-15-2023',
//   },
//   {
//     id: '9be376e7-9c47-42c3-8745-6e8f5985bfc7',
//     task: 'slides',
//     projectName:
//       'Art Gallery Showcase and Historical Significance Presentation',
//     resources: ['gallery_showcase_and_historical_presentation.pptx'],
//     creationDate: '12-30-2023',
//   },
//   {
//     id: '64aa30bb-f6eb-44f5-9e68-ef7eeef4d2f4',
//     task: 'video',
//     projectName:
//       'Sustainable and Eco-Friendly Living Practices in the Modern World',
//     resources: [
//       'sustainability_research.pdf',
//       'eco_friendly_living_guide.docx',
//       'eco_friendly_living_video_part1.mp4',
//       'eco_friendly_living_video_part2.mp4',
//       'sustainability_research2.pdf',
//       'sustainability_research3.pdf',
//     ],
//     creationDate: '08-21-2023',
//   },
//   {
//     id: 'd2a7e0d1-31de-4fb3-9b75-8a33b65f4c81',
//     task: 'slides',
//     projectName: 'Insights into Historical Events and Their Impact on Society',
//     resources: [
//       'historical_events_presentation.pptx',
//       'historical_events_research_notes.docx',
//     ],
//     creationDate: '04-07-2023',
//   },
//   {
//     id: 'e4f3c6ab-60a1-45bd-87de-20ab54fe5929',
//     task: 'video',
//     projectName: 'Project ABC - Video Editing',
//     resources: ['video1.mp4', 'video2.mp4', 'video3.mp4'],
//     creationDate: '10-18-2023',
//   },
//   {
//     id: 'db159980-7e52-4287-8a52-3f46d42266aa',
//     task: 'slides',
//     projectName: 'Project XYZ - Presentation Slides',
//     resources: ['slides1.pdf', 'slides2.pdf'],
//     creationDate: '11-04-2023',
//   },
//   {
//     id: 'df2a7e3c-96f9-4926-a21f-64a2a2d8f03a',
//     task: 'scripts',
//     projectName: 'Project DEF - Scriptwriting',
//     resources: ['script1.docx', 'script2.docx', 'script3.docx'],
//     creationDate: '09-29-2023',
//   },
//   {
//     id: 'c43b265c-3da7-46b7-98f7-0d433243e92d',
//     task: 'video',
//     projectName: 'Project GHI - Video Production',
//     resources: ['video1.mp4', 'video2.mp4'],
//     creationDate: '12-15-2023',
//   },
//   {
//     id: '8e9c5b26-10d1-47cc-bb9f-1df63e4b67c8',
//     task: 'slides',
//     projectName: 'Project JKL - Conference Presentation',
//     resources: ['slides1.pdf', 'slides2.pdf', 'slides3.pdf'],
//     creationDate: '08-21-2023',
//   },
// ]

// console.log(fakeProjects)

// console.log(fakeProjects);

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
        {/* table header */}
        {/* <div className='w-full h-8 bg-indigo-50 rounded-tl-md rounded-tr-md border border-gray-200'></div> */}
        {/* {currentProjects.length > 0 && (
          <div className='flex flex-col w-full grow'>
            <div className='w-full h-fit grow'>
              <div className='w-full px-4'>
                <div className='w-full border-b border-gray-300'></div>
              </div>
              {currentProjects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className='w-full h-16 px-4 rounded-2xl md:hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className='h-full flex items-center w-full py-4 px-2'>
                      <div className='font-bold grow text-ellipsis mx-4 overflow-hidden whitespace-nowrap'>
                        {project.name}
                      </div>
                      <div
                        className='text-lg opacity-25 hover:opacity-100'
                        onClick={(e) => handleDelete(e, project.id)}
                      >
                        <svg
                          className='w-12'
                          data-name='Capa 1'
                          id='Capa_1'
                          viewBox='0 0 20 19.84'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z' />
                        </svg>
                      </div>
                    </div>
                    <div className='w-full border-b border-gray-300'></div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {currentProjects.length === 0 && (
          <div className='w-full grow flex items-center justify-center'>
            <div className='text-gray-400' ref={promptRef}>
              Loading...
            </div>
          </div>
        )} */}
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
