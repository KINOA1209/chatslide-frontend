import React, { useState } from 'react';
import moment from 'moment';
import {
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaFilm,
  FaFileAlt,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaYoutube,
} from 'react-icons/fa'

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

interface Props {
  currentProjects: Project[]
  onProjectClick: (projectId: string) => void
  onDelete: (e: React.MouseEvent<HTMLDivElement>, projectId: string) => void
}

const TaskIcon: React.FC<{ task: 'video' | 'scripts' | 'slides' | 'presentation' | 'social post' }> = ({
  task,
}) => {
  switch (task) {
    case 'video':
      return <FaFilm />
    case 'scripts':
      return <FaFileWord />
    case 'slides':
      return <FaFilePowerpoint />
    case 'social post':
      return <FaFileAlt />
    case 'presentation':
      return <FaFilePowerpoint />
    default:
      return null
  }
}

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
  switch (fileType) {
    case 'doc':
      return <FaFilePdf />
    case 'url':
      return <FaYoutube />
    default:
      return null
  }
}

const ProjectTable: React.FC<Props> = ({
  currentProjects,
  onProjectClick,
  onDelete,
}) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null)
    } else {
      setExpandedProject(index)
    }
  }

  return (
    <>
      {' '}
      <div
        className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-2 md:grid-cols-4'
      >
        <div className='hidden md:flex items-center justify-center w-full text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Task
        </div>
        <div className='flex items-center justify-center w-full text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Project
        </div>
        <div className='hidden md:flex items-center justify-center w-full text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Resources
        </div>
        <div className='hidden md:flex items-center justify-center w-full text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Date
        </div>
      </div>
      <div
        className='grid border bg-[white] border-gray-200 grid-cols-2 md:grid-cols-4'
      >
        {' '}
        {currentProjects.map((project, index) => (
          <React.Fragment key={project.id}>
            <div className='p-[2rem] hidden md:flex items-center border-b-2 justify-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
              <TaskIcon task={project.task} />
              <span className='ml-1'>{project.task}</span>
            </div>
            <div
              className='p-2 flex cursor-pointer items-center text-start md:justify-center border-b-2 text-ellipsis overflow-hidden text-gray-600 text-[17px] italic font-creato-medium leading-normal tracking-wide'
              onClick={() => onProjectClick(project.id)}
            >
              {project.name}
            </div>
            <div className='p-[2rem] border-b-2 hidden md:flex items-center justify-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
              <div className='flex items-center justify-center'>
                <FileIcon fileType='pdf' />
                <span className='ml-1'>
                  {project.resources.length} Resources
                </span>
                <button
                  onClick={() => toggleExpand(index)}
                  className='ml-2 p-1 border rounded cursor-pointer'
                >
                  {expandedProject === index ? <FaArrowDown /> : <FaArrowUp />}
                </button>
              </div>
            </div>
            <div className='p-2 border-b-2 flex items-center justify-center'>
              <div className='flex justify-center items-center text-gray-600 text-[13px] gap-2 font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
                <span className='hidden md:flex'>{moment(project.created_datetime).format('L')}</span>
                <div
                  className='cursor-pointer'
                  onClick={(e) => onDelete(e, project.id)}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
            {expandedProject === index && (
              <div className='mt-2 flex flex-wrap col-start-2 col-span-3 border-b-2 items-center text-gray-600 text-[13px] font-normal font-creato-medium leading-normal tracking-wide'>
                {project.resources.map((resource, resourceIndex) => (
                  <div
                    key={resourceIndex}
                    className='flex items-center justify-center gap-[0.5rem] bg-gray-100 p-1 m-1 rounded'
                  >
                    <FileIcon fileType={resource.type} />
                    {resource.name}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default ProjectTable
