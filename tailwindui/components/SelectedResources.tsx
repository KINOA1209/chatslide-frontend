import React from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Adjust the import according to where FaFilePdf is defined
import { DeleteIcon } from '@/app/(feature)/icons'

type Resource = {
  thumbnail_url?: string;
  name: string;
  // Add other properties of resource if there are any
};

type SelectedResourcesListProps = {
  selectedResources: Resource[];
  removeResourceAtIndex: (index: number) => void;
};

const SelectedResourcesList: React.FC<SelectedResourcesListProps> = ({ selectedResources, removeResourceAtIndex }) => {
  return (
    <ul className='flex flex-col gap-4' style={{ overflowY: 'auto' }}>
      {selectedResources.map((resource, index) => (
        <li key={index}>
          <div id='selectedfile_each' className='flex items-center bg-white rounded min-h-[50px] px-[1rem] justify-between'>
            <div className='flex items-center gap-2'>
              {resource.thumbnail_url ?
                <img src={resource.thumbnail_url} alt={resource.name} className='w-[40px]' /> :
                <FaFilePdf className='w-[40px]' />
              }
              <div className='flex-wrap'>{resource.name}</div>
            </div>
            <button onClick={() => removeResourceAtIndex(index)}>
              <DeleteIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectedResourcesList;
