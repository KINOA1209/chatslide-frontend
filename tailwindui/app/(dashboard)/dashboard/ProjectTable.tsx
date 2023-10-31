import React, { useState } from 'react'
import {
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaFilm,
  FaFileAlt,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
} from 'react-icons/fa'

interface Project {
  id: string
  task: 'video' | 'scripts' | 'slides'
  projectName: string
  resources: string[]
  creationDate: string
}

interface Props {
  currentProjects: Project[]
  onProjectClick: (projectId: string) => void
  onDelete: (e: React.MouseEvent<HTMLDivElement>, projectId: string) => void
}

const TaskIcon: React.FC<{ task: 'video' | 'scripts' | 'slides' }> = ({
  task,
}) => {
  switch (task) {
    case 'video':
      return <FaFilm />
    case 'scripts':
      return <FaFileAlt />
    case 'slides':
      return <FaFilePowerpoint />
    default:
      return null
  }
}

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
  switch (fileType) {
    case 'pdf':
      return <FaFilePdf />
    case 'docx':
      return <FaFileWord />
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
    <div
      className='grid grid-cols-4 border border-gray-300 mb-[3rem]'
      style={{
        gridTemplateColumns: '1fr 2fr 1fr 1fr',
        overflowY: 'auto',
      }}
    >
      <div className='p-2 bg-gray-300 text-center'>Task</div>
      <div className='p-2 bg-gray-300 text-center'>Project</div>
      <div className='p-2 bg-gray-300 text-center'>Resources</div>
      <div className='p-2 bg-gray-300 text-center'>Date</div>
      {currentProjects.map((project, index) => (
        <React.Fragment key={project.id}>
          <div className='p-2 flex items-center justify-center'>
            <TaskIcon task={project.task} />
            <span className='ml-1'>{project.task}</span>
          </div>
          <div
            className='p-2 cursor-pointer'
            onClick={() => onProjectClick(project.id)}
          >
            {project.projectName}
          </div>
          <div className='p-2'>
            <div className='flex items-center justify-center'>
              <FileIcon fileType='pdf' />
              <span className='ml-1'>{project.resources.length} Resources</span>
              <button
                onClick={() => toggleExpand(index)}
                className='ml-2 p-1 border rounded cursor-pointer'
              >
                {expandedProject === index ? <FaArrowDown /> : <FaArrowUp />}
              </button>
            </div>
          </div>
          <div className='p-2'>
            <div className='flex justify-center items-center gap-[3.75rem]'>
              <span>{project.creationDate}</span>
              <div
                className='p-1 cursor-pointer'
                onClick={(e) => onDelete(e, project.id)}
              >
                <FaTrash />
              </div>
            </div>
          </div>
          {expandedProject === index && (
            <div className='mt-2 flex flex-wrap col-start-2 col-span-3'>
              {project.resources.map((resource, resourceIndex) => (
                <div
                  key={resourceIndex}
                  className='flex items-center bg-gray-100 p-1 m-1 rounded border-b-2'
                >
                  <FileIcon fileType={resource.split('.').pop() || ''} />
                  {resource}
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ProjectTable
