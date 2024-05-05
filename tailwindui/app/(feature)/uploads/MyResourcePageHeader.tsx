'use client';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import UploadOptionsDropdownMenu from '@/components/ui/UploadOptionsDropdownMenu';

interface MyResourcePageHeaderProps {
	showUploadOptionsMenu: boolean;
	setShowUploadOptionsMenu: (value: boolean) => void;
}

const MyResourcePageHeader: React.FC<MyResourcePageHeaderProps> = ({
	showUploadOptionsMenu,
	setShowUploadOptionsMenu,
}) => {
	return (
		// <section>
		// 	{/* top background container of my projects title text and  */}
		// 	<div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-2 px-[5rem]'>
		// 		{/* flex container controlling max width */}
		// 		<div className='w-full max-w-7xl flex flex-wrap justify-center items-end'>
		// 			{/* my project title text */}
		// 			<div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2 text-white text-base font-bold leading-10 tracking-wide border-white border-b-2'>
		// 				My Resources
		// 			</div>
		// 		</div>
		// 	</div>
		// </section>
		<div className='flex flex-row items-end w-full z-10 pt-[2rem] px-[1rem]'>
			{/* flex container controlling max width */}
			<div className='w-full flex flex-wrap items-center justify-between'>
				{/* my project title text */}
				{/* <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-black text-base font-bold leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div> */}
				<div
					className='text-[24px] font-bold leading-[32px] tracking-wide'
					style={{
						color: 'var(--colors-text-text-secondary-700, #344054)',
					}}
				>
					<span>Resources</span>
				</div>

				{/*upload section*/}
				<div
					className='upload_section'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '1px',
						position: 'relative',
					}}
					onClick={() => setShowUploadOptionsMenu(!showUploadOptionsMenu)}
				>
					<DesignSystemButton
						isPaidFeature={false}
						size='md'
						hierarchy='primary'
						buttonStatus='enabled'
						iconLeft={<FiUpload />}
						customButtonStyles={{
							borderRadius:
								'var(--radius-md, 8px) var(--radius-xxs, 2px) var(--radius-xxs, 2px) var(--radius-md, 8px)',
						}}
						// text='Create New'
						// onClick={handleStartNewProject}
					>
						<span>Upload</span>
					</DesignSystemButton>
					<DesignSystemButton
						isPaidFeature={false}
						size='md'
						hierarchy='primary'
						buttonStatus='enabled'
						iconLeft={
							showUploadOptionsMenu ? (
								<FaChevronUp></FaChevronUp>
							) : (
								<FaChevronDown></FaChevronDown>
							)
						}
						customButtonStyles={{
							borderRadius:
								'var(--radius-xxs, 2px) var(--radius-md, 8px) var(--radius-md, 8px) var(--radius-xxs, 2px)',
						}}
						// text='Create New'
						// onClick={handleStartNewProject}
					></DesignSystemButton>
					{showUploadOptionsMenu && (
						<UploadOptionsDropdownMenu
							setIsDropdownVisible={setShowUploadOptionsMenu}
						></UploadOptionsDropdownMenu>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyResourcePageHeader;
