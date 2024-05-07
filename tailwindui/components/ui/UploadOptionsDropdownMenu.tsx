import React, { ChangeEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { MdOutlineOpenInNew, MdOutlineDelete } from 'react-icons/md';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { MdOutlineLaptopMac } from 'react-icons/md';
import { FiHelpCircle } from 'react-icons/fi';
import { MdOutlineAddLink } from 'react-icons/md';
import LinkInput from './LinkInput';
import Resource from '@/models/Resource';
import {
	ALL_EXTENSIONS,
	DOCUMENT_EXTENSIONS,
	MEDIA_EXTENSIONS,
	sizeLimit,
} from '../file/FileUploadButton';
import { toast } from 'react-toastify';
import { CarbonConnect } from 'carbon-connect';
interface UploadOptionsDropdownMenuProps {
	setIsDropdownVisible: (value: boolean) => void;
	selectedResources: Resource[];
	setSelectedResources: React.Dispatch<React.SetStateAction<Resource[]>>;
	onFileSelected: (file: File | null) => void;
	isSubmitting: boolean;
	pageInvoked: string;
}

const UploadOptionsDropdownMenu: React.FC<UploadOptionsDropdownMenuProps> = ({
	setIsDropdownVisible,
	selectedResources,
	setSelectedResources,
	onFileSelected,
	isSubmitting,
	pageInvoked,
}) => {
	const [showFileSupportExplain, setShowFileSupportExplain] = useState(false);
	const [showAddLinkInput, setShowAddLinkInput] = useState(false);

	const [fileName, setFileName] = useState<string | null>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	console.log('isSubmitting', isSubmitting);
	// }, [isSubmitting]);
	const determineSupportedFormats = (pageInvoked: string) => {
		if (pageInvoked === 'theme') {
			return MEDIA_EXTENSIONS;
		} else if (pageInvoked === 'summary') {
			return DOCUMENT_EXTENSIONS;
		}
		// resources
		return ALL_EXTENSIONS;
	};
	const extensions = determineSupportedFormats(pageInvoked);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		console.log(file?.size);
		if (file?.size && file?.size > sizeLimit) {
			toast.error('The maximum file size supported is 10 MB.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				containerId: 'upload',
			});
			return;
		}

		const ext = file?.name.split('.').pop()?.toLowerCase();
		if (ext && !extensions.includes(ext)) {
			toast.error(ext.toUpperCase() + ' file is not supported!', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				containerId: 'upload',
			});
			return;
		}

		if (file) {
			setFileName(file.name);
		}

		onFileSelected(file);
	};

	const handleClick = () => {
		if (inputFileRef.current) {
			inputFileRef.current.click();
		}
	};
	return (
		<div className='flex flex-col gap-4'>
			{
				<div
					className='absolute top-full right-0 bg-white shadow-md rounded-md border border-2 border-gray-200 mt-1 w-full'
					style={{
						zIndex: 999,
						display: 'flex',
						flexDirection: 'column',
					}}
					onClick={(e) => e.stopPropagation()} // Stop event propagation}
				>
					{/* From local */}
					{
						<>
							<input
								type='file'
								id='file-upload'
								ref={inputFileRef}
								onChange={handleFileChange}
								style={{ display: 'none' }}
							/>
							<button
								className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
								onClick={handleClick}
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
								<MdOutlineLaptopMac></MdOutlineLaptopMac>
								<span>From Local</span>
								<button
									onMouseEnter={() => setShowFileSupportExplain(true)}
									onMouseLeave={() => setShowFileSupportExplain(false)}
								>
									<FiHelpCircle></FiHelpCircle>
								</button>
								{showFileSupportExplain && (
									<div
										style={{
											position: 'absolute',
											width: '100%',
											top: '100%',
											right: 0,
											display: 'inline-flex',
											padding: '4px 8px',
											justifyContent: 'center',
											alignItems: 'center',
											gap: '6px',
											borderRadius: '8px',
											background: 'var(--Grey-800, #1D222A)',
										}}
									>
										<span
											style={{
												color: '#CAD0D3',
												fontFamily: 'Creato Display Medium',
												fontSize: '12px',
												fontStyle: 'normal',
												fontWeight: ' 400',
												lineHeight: '20px',
											}}
										>
											Supported file formats: PDF, TXT, DOCX, PPTX, PNG, JPEG,
											MP4 (max file size: 10MB)
										</span>
									</div>
								)}
							</button>
						</>
					}

					{/* From cloud */}
					{
						<>
							{/* carbon connect cloud storage */}
							{/* {pageInvoked !== 'theme' && (
								<div className='max-w-sm w-fit text-center pt-4 mx-4'>
									<div className='w-full mx-auto'>
										{isPaidUser ? (
											<CarbonConnect
												orgName={getBrand()}
												brandIcon={getLogoUrl()}
												tokenFetcher={carbonTokenFetcher}
												tags={{
													tag1: 'tag1_value',
													tag2: 'tag2_value',
													tag3: 'tag3_value',
												}}
												maxFileSize={10000000}
												enabledIntegrations={[
													// {
													//     id: IntegrationName.GOOGLE_DRIVE,
													//     chunkSize: 1500,
													//     overlapSize: 20,
													//     skipEmbeddingGeneration: true,
													// },
													{
														id: IntegrationName.ONEDRIVE,
														chunkSize: 1500,
														overlapSize: 20,
														skipEmbeddingGeneration: true,
													},
													{
														id: IntegrationName.DROPBOX,
														chunkSize: 1500,
														overlapSize: 20,
														skipEmbeddingGeneration: true,
													},
													// {
													// 	id: IntegrationName.NOTION,
													// 	chunkSize: 1500,
													// 	overlapSize: 20,
													// 	skipEmbeddingGeneration: true,
													// },
													{
														id: IntegrationName.GOOGLE_DRIVE,
														chunkSize: 1500,
														overlapSize: 20,
														skipEmbeddingGeneration: true,
													},
												]}
												onSuccess={(data) => handleSuccess(data)}
												onError={(error) =>
													console.log('Data on Error: ', error)
												}
												primaryBackgroundColor='#5168f6'
												primaryTextColor='#fafafa'
												secondaryBackgroundColor='#f2f2f2'
												secondaryTextColor='#000000'
												allowMultipleFiles={true}
												open={false}
												chunkSize={1500}
												overlapSize={20}
												// entryPoint="LOCAL_FILES"
											>
												<BigBlueButton
													onClick={() => {}}
													isSubmitting={false}
													showArrow={false}
												>
													Upload from Cloud ☁️
												</BigBlueButton>
											</CarbonConnect>
										) : (
											<BigBlueButton
												onClick={() => {}}
												isSubmitting={false}
												showArrow={false}
												isPaidFeature={true}
												isPaidUser={isPaidUser}
											>
												Upload from Cloud ☁️
											</BigBlueButton>
										)}
									</div>
								</div>
							)} */}
							{pageInvoked !== 'theme' && (
								<button
									className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
									onClick={() => {
										setIsDropdownVisible(false);
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
									<MdOutlineCloudUpload></MdOutlineCloudUpload>
									<span>From Cloud</span>
								</button>
							)}
						</>
					}
					{/* add link */}
					<button
						className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
						onClick={() => {
							setShowAddLinkInput((prev) => !prev);
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
						<MdOutlineAddLink></MdOutlineAddLink>
						<span>Links</span>
					</button>
				</div>
			}
			{/* link adding input */}
			{showAddLinkInput && (
				<div
					className='absolute top-[200px] right-0 sm:top-[-10px] sm:right-[110%] sm:w-[200px] lg:w-[400px] xl:w-[600px]'
					onClick={(e) => e.stopPropagation()}
				>
					{/* <span>Add Links</span> */}
					<LinkInput
						selectedResources={selectedResources}
						setSelectedResources={setSelectedResources}
					/>
				</div>
			)}
		</div>
	);
};

export default UploadOptionsDropdownMenu;
