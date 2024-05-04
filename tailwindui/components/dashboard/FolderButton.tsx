
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { CiFolderOn } from "react-icons/ci";
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdOutlineDelete } from "react-icons/md";
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import Folder from "@/models/Folder";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { GoHome } from 'react-icons/go';

const FolderButton: React.FC<{
    folder: Folder;
    handleDeleteFolder: (folder_name: string) => void;
    handleRenameFolder: (folder_name: string) => void;
}> = ({
    folder,
    handleDeleteFolder,
    handleRenameFolder,
}) => {
        const [isDropdownVisible, setIsDropdownVisible] = useState(false);
        const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
            event.currentTarget.style.background =
                'var(--Colors-Background-bg-tertiary, #F2F4F7)';
        };

        const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
            event.currentTarget.style.background = 'transparent';
        };

        const toggleDropdown = () => {
            setIsDropdownVisible((prev) => !prev);
        };

        return (
					<>
						<div className='flex flex-row gap-3 items-center justify-between px-3 text-[#344054]'>
							<div className='flex flex-row gap-3 items-center overflow-hidden'>
								<div className='w-[21px]'>
									{folder.folderName === 'drlambda-default' ? (
										<GoHome style={{ width: '18px', height: '18px' }} />
									) : (
										<CiFolderOn size={21} color='#344054' strokeWidth={1} />
									)}
								</div>
								<span className='overflow-hidden truncate'>
									{folder.folderName === 'drlambda-default'
										? 'My Projects'
										: folder.folderName}
								</span>
							</div>
							<div className='h-full flex items-center gap-4 relative font-normal'>
								<div
									style={{
										display: 'flex',
										cursor: 'pointer',
										padding: '5px',
										borderRadius: 'var(--radius-sm, 6px)',
										transition: 'background-color 0.3s',
									}}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									onClick={() => {
										toggleDropdown();
									}}
								>
									<HiOutlineDotsVertical
										style={{ color: '#667085', width: '1rem', height: '1rem' }}
									></HiOutlineDotsVertical>
								</div>
								{isDropdownVisible && (
									<div
										className='absolute top-full right-0 bg-white shadow-md rounded-md border border-2 border-gray-200 mt-1 lg:w-[180px]'
										style={{
											zIndex: 999,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<button
											className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
											onClick={() => {
												setIsDropdownVisible(false);
												handleRenameFolder(folder.folderName);
											}}
											style={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'flex-start',
												gap: 'var(--spacing-lg, 12px)',
												borderBottom:
													'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
											}}
										>
											<MdDriveFileRenameOutline
												style={{ width: '16px', height: '16px' }}
											/>
											Rename
										</button>
										<button
											className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md hover:bg-zinc-100 w-full text-left'
											onClick={() => {
												setIsDropdownVisible(false);
												handleDeleteFolder(folder.folderName);
											}}
											style={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'flex-start',
												gap: 'var(--spacing-lg, 12px)',
												color:
													'var(--colors-text-text-error-primary-600, #D92D20)',
											}}
										>
											<ButtonWithExplanation
												button={
													<button
														onClick={() =>
															handleDeleteFolder(folder.folderName)
														}
													>
														<MdOutlineDelete
															style={{
																// strokeWidth: '2',
																// flex: '1',
																width: '16px',
																height: '16px',
																// fontWeight: 'bold',
																color:
																	'var(--colors-text-text-error-primary-600, #D92D20)',
															}}
														/>
													</button>
												}
												explanation={'Delete'}
											/>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
					</>
				);
    }

export default FolderButton