import React, { useState, useEffect, Fragment, useRef } from 'react';
import { CiFolderOn } from 'react-icons/ci';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdOutlineDelete } from 'react-icons/md';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import Folder from '@/models/Folder';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { Menu } from '../button/Menu';

const FolderButton: React.FC<{
	folder: Folder;
	handleDeleteFolder: (folder_name: string) => void;
	handleRenameFolder: (folder_name: string) => void;
}> = ({ folder, handleDeleteFolder, handleRenameFolder }) => {
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

				<Menu>
					<button
						className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
						onClick={() => {
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
							handleDeleteFolder(folder.folderName);
						}}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 'var(--spacing-lg, 12px)',
							color: 'var(--colors-text-text-error-primary-600, #D92D20)',
						}}
					>
						<ButtonWithExplanation
							button={
								<button onClick={() => handleDeleteFolder(folder.folderName)}>
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
				</Menu>
			</div>
		</>
	);
};

export default FolderButton;
