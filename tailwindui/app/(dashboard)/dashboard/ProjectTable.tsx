import React, { useState } from 'react';
import moment from 'moment';
import { DeleteIcon, SpinIcon } from '@/app/(feature)/icons';
import { ResourceItem } from '@/components/ui/ResourceItem'
import Project from '@/models/Project';
import { FaAd, FaMedium, FaPhone, FaPhotoVideo, FaSlideshare } from 'react-icons/fa';
import { RiSlideshowLine } from "react-icons/ri";

interface Props {
  currentProjects: Project[]
  onProjectClick: (projectId: string) => void
  onDelete: (e: React.MouseEvent<HTMLDivElement>, projectId: string) => void
}

const ProjectTable: React.FC<Props> = ({
  currentProjects,
  onProjectClick,
  onDelete,
}) => {

  return (
    <div className="w-full lg:w-2/3 mx-auto">
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
          Date
        </div>
      </div>
      <div
        className='grid border bg-[white] border-gray-200 grid-cols-3 md:grid-cols-5'
      >
        {' '}
        {currentProjects.map((project, index) => (
          <React.Fragment key={project.id}>

            {/* topic */}
            <div
              className='col-span-2 p-2 flex cursor-pointer items-center text-start border-b-2 text-ellipsis overflow-hidden text-[17px] font-creato-medium leading-normal tracking-wide gap-x-2'
              onClick={() => onProjectClick(project.id)}
            >
              {project.task === 'presentation' ? <RiSlideshowLine className='text-gray-600' /> : <FaPhotoVideo className='text-gray-600' />}
              {project.name}
            </div>

            {/* resources */}
            <div className='col-span-2 p-[2rem] border-b-2 hidden md:flex items-center text-gray-600 text-[17px] font-normal font-creato-medium leading-normal tracking-wide'>
              <div className='flex flex-col items-start'>
                {/* <FileIcon fileType='pdf' /> */}
                {project.resources && project.resources.map((resource, resourceIndex) => (
                  <ResourceItem key={resourceIndex} {...resource}/>
                ))}
              </div>
            </div>

            {/* create date */}
            <div className='p-2 border-b-2 flex'>
              <div className='h-full flex justify-between items-center w-full py-4 px-2 text-gray-600 text-[13px] font-normal font-creato-medium leading-normal tracking-[0.12rem]'>
                <span className='hidden md:flex'>{moment(project.created_datetime).format('L')}</span>
                <div
                  className='cursor-pointer'
                  onClick={(e) => onDelete(e, project.id)}
                >
                  <DeleteIcon/>
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
