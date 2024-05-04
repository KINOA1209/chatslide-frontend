'use client';

import React, { useState, useEffect } from 'react';
import Folder from '@/models/Folder';
import { FaRegFolder } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { NewInputBox } from '../ui/InputBox';

export const MoveToFolderSelector: React.FC<{
	folders: Folder[];
	setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
	selectedFolder: string;
	setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
}> = ({ folders, setFolders, selectedFolder, setSelectedFolder }) => {
	const [searchText, setSearchText] = useState('');

	const filteredFolders = folders.filter((folder) =>
		folder.folderName.toLowerCase().includes(searchText.toLowerCase()),
	);

	return (
		<>
			<div className='relative w-full'>

        <NewInputBox
          icon={<CiSearch style={{ width: '18px', height: '18px' }} />}
          value={searchText}
          onChange={setSearchText}
          autoSelect={false}
          maxLength={100}
          placeholder='Search folders'
        />
			</div>
			<ul>
				<li
					key={'myProjectDefaultFolder'}
					className={`flex flex-row items-center p-2 rounded cursor-pointer gap-3 
                        ${selectedFolder === 'drlambda-default' ? ' bg-[#444CE7] text-white hover:bg-[#3538CD]' : ' bg-white hover:bg-gray-200'}
                    `}
					onClick={() => setSelectedFolder('drlambda-default')}
				>
					<GoHome style={{ width: '18px', height: '18px' }} />
					<span>My Projects</span>
				</li>
				{filteredFolders
					.filter((folder) => folder.folderName !== 'drlambda-default')
					.map((folder) => (
						<li
							key={folder.folderName}
							className={`flex flex-row items-center p-2 rounded cursor-pointer  gap-3 pl-5 hover:bg-gray-200
                                    ${selectedFolder === folder.folderName ? ' bg-[#444CE7] text-white hover:bg-[#3538CD]' : ' bg-white hover:bg-gray-200'}
                                `}
							onClick={() => setSelectedFolder(folder.folderName)}
						>
							<FaRegFolder />
							<span>{folder.folderName}</span>
						</li>
					))}
			</ul>
		</>
	);
};
