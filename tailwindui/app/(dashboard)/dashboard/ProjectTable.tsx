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
  FaFileImage,
} from 'react-icons/fa'
import { DeleteIcon } from '@/app/(feature)/icons';

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

export const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
  fileType = fileType.toLowerCase()
  switch (fileType) {
    case 'doc':
      return <FaFilePdf size='32px'/>
    case 'url':
      return <FaYoutube size='32px'/>
    case 'youtube':
      return <FaYoutube size='32px'/>
    case 'pdf':
      return <FaFilePdf size='32px'/>
    case 'docx':
      return <FaFileWord size='32px'/>
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage size='32px'/>
    default:
      return null
  }
}

const ProjectTable: React.FC<Props> = ({
  currentProjects,
  onProjectClick,
  onDelete,
}) => {

  return (
    <div className="w-full md:w-2/3 mx-auto">
      <div
        className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-3 md:grid-cols-5'
      >
        {/* <div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Type
        </div> */}
        <div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Topic
        </div>
        <div className='hidden md:flex col-span-2 w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Resources
        </div>
        <div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold font-creato-medium uppercase leading-normal tracking-wide'>
          Created Date
        </div>
      </div>
      <div
        className='grid border bg-[white] border-gray-200 grid-cols-3 md:grid-cols-5'
      >
        {' '}
        {currentProjects.map((project, index) => (
          <React.Fragment key={project.id}>

            {/* type */}
            {/* <div className='p-[2rem] hidden md:flex items-center border-b-2 justify-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
              <TaskIcon task={project.task} />
              <span className='ml-1'>{project.task}</span>
            </div> */}

            {/* topic */}
            <div
              className='col-span-2 p-2 flex cursor-pointer items-center text-start border-b-2 text-ellipsis overflow-hidden text-[17px] font-creato-medium leading-normal tracking-wide'
              onClick={() => onProjectClick(project.id)}
            >
              {project.name}
            </div>

            {/* resources */}
            <div className='col-span-2 p-[2rem] border-b-2 hidden md:flex items-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
              <div className='flex flex-col items-start'>
                {/* <FileIcon fileType='pdf' /> */}
                {project.resources && project.resources.map((resource, resourceIndex) => (
                  <div
                    key={resourceIndex}
                    className='flex items-center justify-center gap-[0.5rem] bg-gray-100 p-1 m-1 rounded'
                  >
                    <div className='max-w-[32px] min-w-[32px]'>
                      <FileIcon fileType={resource.type} />
                    </div>
                    {resource.name}
                  </div>
                ))}
              </div>
            </div>

            {/* create date */}
            <div className='p-2 border-b-2 flex items-center justify-center'>
              <div className='flex justify-center items-center text-gray-600 text-[13px] gap-2 font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
                <span className='hidden md:flex'>{moment(project.created_datetime).format('L')}</span>
                <div
                  className='cursor-pointer'
                  onClick={(e) => onDelete(e, project.id)}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ProjectTable
