'use client';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import React, { useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import UploadOptionsDropdownMenu from '@/components/ui/UploadOptionsDropdownMenu';
import Resource from '@/models/Resource';
// import FileUploadDropdownButton from '@/components/file/FileUploadDropdownButton';
import dynamic from 'next/dynamic';
const FileUploadDropdownButton: any = dynamic(
	() => import('@/components/file/FileUploadDropdownButton'),
	{
		ssr: false,
	},
);
interface MyResourcePageHeaderProps {
	showUploadOptionsMenu: boolean;
	setShowUploadOptionsMenu: (value: boolean) => void;
	selectedResources: Resource[];
	setSelectedResources: React.Dispatch<React.SetStateAction<Resource[]>>;
	onFileSelected: (file: File | null) => Promise<void>;
	isSubmitting: boolean;
	pageInvoked: string;
	// for cloud connect
	isPaidUser: boolean;
	getBrand: () => string;
	getLogoUrl: () => string;
	carbonTokenFetcher: () => Promise<any>;
	handleSuccess: (data: any) => Promise<void>; // Adjust the type according to the actual data type
	isUploadDropdownItem: boolean;
}

const MyResourcePageHeader: React.FC<MyResourcePageHeaderProps> = ({
	showUploadOptionsMenu,
	setShowUploadOptionsMenu,
	selectedResources,
	setSelectedResources,
	onFileSelected,
	isSubmitting = false,
	pageInvoked = 'resources',
	isPaidUser,
	getBrand,
	getLogoUrl,
	carbonTokenFetcher,
	handleSuccess,
	isUploadDropdownItem,
}) => {
	const uploadSectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Function to handle clicks outside of the upload section
		const handleClickOutside = (event: MouseEvent) => {
			if (
				uploadSectionRef.current &&
				!uploadSectionRef.current.contains(event.target as Node)
			) {
				setShowUploadOptionsMenu(false);
			}
		};

		// Add event listener when the component mounts
		document.addEventListener('mousedown', handleClickOutside);

		// Remove event listener when the component unmounts
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
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
					<span>Uploads</span>
				</div>

				<FileUploadDropdownButton
					uploadSectionRef={uploadSectionRef}
					setShowUploadOptionsMenu={setShowUploadOptionsMenu}
					showUploadOptionsMenu={showUploadOptionsMenu}
					isSubmitting={isSubmitting}
					setSelectedResources={setSelectedResources}
					selectedResources={selectedResources}
					onFileSelected={onFileSelected}
					pageInvoked={pageInvoked}
					isPaidUser={isPaidUser}
					getBrand={getBrand}
					getLogoUrl={getLogoUrl}
					carbonTokenFetcher={carbonTokenFetcher}
					handleSuccess={handleSuccess}
					isUploadDropdownItem={isUploadDropdownItem}
					showAddLinkSection={true}
				></FileUploadDropdownButton>
			</div>
		</div>
	);
};

export default MyResourcePageHeader;
