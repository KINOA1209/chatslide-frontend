'use client';
import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import UploadOptionsDropdownMenu from '@/components/ui/UploadOptionsDropdownMenu';
import Resource from '@/models/Resource';

type FileUploadDropdownButtonProps = {
	uploadSectionRef: React.RefObject<HTMLDivElement>;
	setShowUploadOptionsMenu: (value: boolean) => void;
	showUploadOptionsMenu: boolean;
	isSubmitting: boolean;
	selectedResources: Resource[];
	setSelectedResources: React.Dispatch<React.SetStateAction<Resource[]>>;
	onFileSelected: (file: File | null) => Promise<void>;
	pageInvoked: string;
	isPaidUser: boolean;
	getBrand: () => string;
	getLogoUrl: () => string;
	carbonTokenFetcher: () => Promise<any>;
	handleSuccess: (data: any) => Promise<void>;
	isUploadDropdownItem: boolean;
	showAddLinkSection?: boolean;
};

const FileUploadDropdownButton: React.FC<FileUploadDropdownButtonProps> = ({
	uploadSectionRef,
	setShowUploadOptionsMenu,
	showUploadOptionsMenu,
	isSubmitting,
	setSelectedResources,
	selectedResources,
	onFileSelected,
	pageInvoked,
	isPaidUser,
	getBrand,
	getLogoUrl,
	carbonTokenFetcher,
	handleSuccess,
	isUploadDropdownItem,
	showAddLinkSection = true,
}) => {
	return (
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
			ref={uploadSectionRef}
			onClick={() => setShowUploadOptionsMenu(!showUploadOptionsMenu)}
		>
			<DesignSystemButton
				isPaidFeature={false}
				size='lg'
				hierarchy='primary'
				buttonStatus='enabled'
				iconLeft={<FiUpload />}
				customButtonStyles={{
					borderRadius:
						'var(--radius-md, 8px) var(--radius-xxs, 2px) var(--radius-xxs, 2px) var(--radius-md, 8px)',
				}}
				isSubmitting={isSubmitting}
			>
				<span>{!isSubmitting ? 'Upload' : 'Uploading...'}</span>
			</DesignSystemButton>
			<DesignSystemButton
				isPaidFeature={false}
				size='lg'
				hierarchy='primary'
				buttonStatus='enabled'
				iconLeft={showUploadOptionsMenu ? <FaChevronUp /> : <FaChevronDown />}
				customButtonStyles={{
					borderRadius:
						'var(--radius-xxs, 2px) var(--radius-md, 8px) var(--radius-md, 8px) var(--radius-xxs, 2px)',
				}}
			></DesignSystemButton>
			{showUploadOptionsMenu && (
				<UploadOptionsDropdownMenu
					setIsDropdownVisible={setShowUploadOptionsMenu}
					setSelectedResources={setSelectedResources}
					selectedResources={selectedResources}
					onFileSelected={onFileSelected}
					isSubmitting={isSubmitting}
					pageInvoked={pageInvoked}
					isPaidUser={isPaidUser}
					getBrand={getBrand}
					getLogoUrl={getLogoUrl}
					carbonTokenFetcher={carbonTokenFetcher}
					handleSuccess={handleSuccess}
					isUploadDropdownItem={isUploadDropdownItem}
					showAddLinkSection={showAddLinkSection}
				/>
			)}
		</div>
	);
};

export default FileUploadDropdownButton;
