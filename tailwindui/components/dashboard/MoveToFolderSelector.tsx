'use client'

import React, { useState, useEffect } from 'react';
import Folder from '@/models/Folder';
import { FaRegFolder } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

export const MoveToFolderSelector: React.FC<{
    folders: Folder[];
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    selectedFolder: string;
    setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;

}> = ({
    folders,
    setFolders,
    selectedFolder,
    setSelectedFolder,
}) => {
        const [searchText, setSearchText] = useState('');

        useEffect(() => {
            if (folders.length && !selectedFolder) {
                setSelectedFolder(folders[0].folderName);
            }
        }, [folders]);

        const filteredFolders = folders.filter(folder =>
            folder.folderName.toLowerCase().includes(searchText.toLowerCase())
        );

        const displayFolderName = (folderName: string) => {
            return folderName === 'drlambda-default' ? 'My Projects' : folderName;
        };
        return (
            <>
                {/* <input
                    type="text"
                    placeholder="Search folders"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-2 border rounded"
                /> */}
                <div className="relative w-full">
                    <CiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" size={24} />
                    <input
                        type="text"
                        placeholder="Search folders"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-10 p-2 border rounded" // Adjust padding-left to make space for the icon
                        style={{ paddingLeft: '2.5rem' }} // Optionally adjust padding-left here if more space is needed
                    />
                </div>
                <ul>
                    <li key={'myProjectDefaultFolder'}
                        className={`flex flex-row items-center p-2 rounded cursor-pointer gap-3 hover:bg-gray-200
                        ${selectedFolder === 'drlambda-default' ? 'bg-blue-500 text-white' : 'bg-white'}
                    `}
                        onClick={() => setSelectedFolder('drlambda-default')}>
                        <GoHome style={{ width: '18px', height: '18px', }} />
                        <span>My Projects</span>
                    </li>
                    {filteredFolders
                        .filter(folder => folder.folderName !== 'drlambda-default')
                        .map(folder => (
                            <li key={folder.folderName}
                                className={`flex flex-row items-center p-2 rounded cursor-pointer  gap-3 pl-5 hover:bg-gray-200
                                    ${selectedFolder === folder.folderName ? 'bg-blue-500 text-white' : 'bg-white'}
                                `}
                                onClick={() => setSelectedFolder(folder.folderName)}>
                                <FaRegFolder />
                                <span>{folder.folderName}</span>
                            </li>
                        ))
                    }
                </ul>
            </>
        );
    };