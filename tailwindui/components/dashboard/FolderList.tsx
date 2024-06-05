import React from 'react';
import { Title } from '@/components/ui/Text';
import { FolderItem } from '@/components/dashboard/FolderItem';
import Folder from '@/models/Folder';

interface FolderListProps {
  folders: Folder[];
  activeFolder: string;
  handleFolderDoubleClick: (folderName: string) => void;
  handleDeleteFolder: (folder_id: string) => void;
  handleRenameFolder: (folder_id: string) => void;
  moveProjectToFolder: (folder: Folder) => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  activeFolder,
  handleFolderDoubleClick,
  handleDeleteFolder,
  handleRenameFolder,
  moveProjectToFolder,
}) => {
  const nonDefaultFolders = folders.filter(folder => folder.folderName !== 'drlambda-default');

  return (
    <>
      {nonDefaultFolders.length > 0 && (
        <div className='w-full px-8 pt-8 flex flex-col mb-5'>
          <Title center={false}>📂 Folders</Title>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {activeFolder !== 'drlambda-default' ? (
              <FolderItem
                folder={{ folderId: 'default-id', folderName: 'drlambda-default', projects: [] }}
                handleFolderDoubleClick={handleFolderDoubleClick}
                handleDeleteFolder={handleDeleteFolder}
                handleRenameFolder={handleRenameFolder}
                moveProjectToFolder={moveProjectToFolder}
                index={0}
              />
            ) : (
              nonDefaultFolders.map((folder, index) => (
                <FolderItem
                  key={folder.folderId}
                  folder={folder}
                  handleFolderDoubleClick={handleFolderDoubleClick}
                  handleDeleteFolder={handleDeleteFolder}
                  handleRenameFolder={handleRenameFolder}
                  moveProjectToFolder={moveProjectToFolder}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FolderList;
