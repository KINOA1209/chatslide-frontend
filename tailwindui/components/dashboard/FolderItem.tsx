import Folder from '@/models/Folder';
import FolderButton from './FolderButton';
import { useState } from 'react';

export const FolderItem: React.FC<{
	folder: Folder;
	handleFolderDoubleClick: (folder_name: string) => void;
	handleDeleteFolder: (folder_name: string) => void;
	handleRenameFolder: (folder_name: string) => void;
	moveProjectToFolder: (folder: Folder) => void;
	index: number;
}> = ({
	folder,
	handleFolderDoubleClick,
	handleDeleteFolder,
	handleRenameFolder,
	moveProjectToFolder,
	index,
}) => {
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	return (
		<div
			key={'folderButton' + index}
			className={
				'cursor-pointer hover:bg-gray-200 p-2 rounded-md border border-solid border-gray-200' +
				(isDraggingOver ? ' bg-gray-200' : ' bg-white')
			}
			onDoubleClick={() => handleFolderDoubleClick(folder.folderName)}
			onDragOver={(e) => {
				e.preventDefault();
				// console.log('Dragging over folder:', folder.folderName);
				setIsDraggingOver(true);
			}}
      onDragLeave={(e) => {
        e.preventDefault();
        // console.log('Dragging left folder:', folder.folderName);
        setIsDraggingOver(false);
      }}

			onDrop={(e) => {
				e.preventDefault();
				// console.log('Dropped on folder:', folder.folderName);
				// Move the project to the folder
				moveProjectToFolder(folder);
			}}
		>
			<FolderButton
				folder={folder}
				handleDeleteFolder={handleDeleteFolder}
				handleRenameFolder={handleRenameFolder}
			/>
		</div>
	);
};
