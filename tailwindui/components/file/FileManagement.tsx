'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FileUploadButton } from '@/components/file/FileUploadButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
// import mixpanel from 'mixpanel-browser'
import { CarbonConnect, IntegrationName } from 'carbon-connect';
import { DeleteIcon, SpinIcon } from '@/app/(feature)/icons';
import { ResourceItem, getFileExtension } from '../ui/ResourceItem';
import Resource from '@/models/Resource';
import ResourceService from '@/services/ResourceService';
import DrlambdaButton, { BigBlueButton } from '../button/DrlambdaButton';
import { FaCheckCircle } from 'react-icons/fa';
import { useUser } from '@/hooks/use-user';
import { Blank, Loading } from '../ui/Loading';
import { getBrand, getLogoUrl } from '@/utils/getHost';
import MyResourcePageHeader from '@/app/(feature)/uploads/MyResourcePageHeader';

interface UserFileList {
	selectable: boolean;
	userfiles: Array<Resource>;
	deleteCallback: Function;
	clickCallback: Function;
	selectedResources: Array<Resource>;
}

// Define a new component for the table header
const FileTableHeader = () => (
	// <div className='grid bg-[#ECF1FE] border border-gray-200 grid-cols-2 md:grid-cols-3'>
	// 	{/* <div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold uppercase leading-normal tracking-wide'>
	//       Type
	//     </div> */}
	// 	<div className='col-span-2 flex w-full ml-4 text-indigo-300 text-[13px] font-bold uppercase leading-normal tracking-wide'>
	// 		Title
	// 	</div>
	// 	<div className='hidden md:flex w-full ml-4 text-indigo-300 text-[13px] font-bold uppercase leading-normal tracking-wide'>
	// 		Date
	// 	</div>
	// </div>
	<div
		className={`grid grid-cols-3 md:grid-cols-4`}
		style={{
			borderTop: '1px solid #EAECF0',
			borderLeft: '1px solid #EAECF0',
			borderRight: '1px solid #EAECF0',
			background: 'var(--Colors-Background-bg-secondary, #F9FAFB)',
			borderRadius: 'var(--radius-md) var(--radius-md) 0px 0px',
		}}
	>
		{/* <div className='hidden lg:flex col-span-1 w-full ml-4 text-indigo-300 text-[13px] font-bold uppercase leading-normal tracking-wide'> */}
		<div
			className='flex col-span-3 w-full capitalize '
			style={{
				padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
				whiteSpace: 'nowrap',
				color: 'var(--colors-text-text-tertiary-600, #475467)',
				fontFamily: 'Inter Regular',
				fontSize: '12px',
				fontStyle: 'normal',
				lineHeight: '18px',
				fontWeight: 500,
			}}
		>
			<span>File name</span>
		</div>
		<div
			className='hidden md:flex col-span-1 w-full capitalize '
			style={{
				padding: `var(--spacing-xl, 8px) var(--spacing-3xl, 8px)`,
				whiteSpace: 'nowrap',
				color: 'var(--colors-text-text-tertiary-600, #475467)',
				fontFamily: 'Inter Regular',
				fontSize: '12px',
				fontStyle: 'normal',
				lineHeight: '18px',
				fontWeight: 500,
			}}
		>
			<span>Date uploaded</span>
		</div>
	</div>
);

const FileManagement: React.FC<UserFileList> = ({
	selectable = false,
	userfiles, // contains all resources
	deleteCallback,
	clickCallback,
	selectedResources,
}) => {
	const [deletingIds, setDeletingIds] = useState<Array<string>>([]);
	const { token } = useUser();

	const handleDeleteFile = async (
		e: React.MouseEvent<HTMLDivElement>,
		id: string,
	) => {
		setDeletingIds([...deletingIds, id]);
		console.log('deletingIds', deletingIds);
		e.stopPropagation();
		try {
			const deleted = await ResourceService.deleteResource(id, token);
			if (deleted) {
				deleteCallback(id);
			} else {
				throw new Error('Failed to delete file');
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				containerId: 'fileManagement',
			});
		}
		setDeletingIds(deletingIds.filter((i) => i !== id));
	};

	const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Default behavior in file management page
		// Open thumbnail / Open Youtube link etc.
	};

	const entry = (resource: Resource) => {
		return (
			<div
				key={resource.id}
				className='grid grid-cols-4 '
				// style={{ gridTemplateColumns: '2fr 1fr' }}
				style={{
					alignItems: 'center',
					border: '1px solid #EAECF0',
					borderRadius: ' 0px 0px var(--radius-md) var(--radius-md)',
					// gridTemplateColumns: '2fr 1fr',
				}}
				onClick={(e) => {
					if (selectable) {
						clickCallback(resource.id);
					} else {
						handleOnClick(e);
					}
				}}
			>
				{/* the resource title and thumbnail */}
				<div className={`col-span-3 w-full`}>
					<ResourceItem {...resource} />
				</div>

				{/* timestamp*/}
				<div className='col-span-1 h-full flex justify-end items-center w-full py-4 px-2 text-gray-600 text-[13px] font-normal leading-normal tracking-[0.12rem]'>
					{' '}
					{resource.timestamp && (
						<div className='hidden md:block'>
							{/* {moment(resource.timestamp).format('L')} */}
							<span
								style={{
									whiteSpace: 'nowrap',
									color: 'var(--colors-text-text-quaternary-500, #667085)',
									fontFamily: 'Creato Display Medium',
									fontSize: '14px',
									fontStyle: 'normal',
									fontWeight: 400,
									lineHeight: '20px',
								}}
							>
								{moment(resource.timestamp).format('MMM D, YYYY')}
							</span>
							{/* {resource.timestamp} */}
						</div>
					)}
					{/* delete icon */}
					{!selectable && (
						<div className='w-full flex flex-row-reverse cursor-pointer'>
							<div onClick={(e) => handleDeleteFile(e, resource.id)}>
								{deletingIds.includes(resource.id) ? (
									<SpinIcon />
								) : (
									<DeleteIcon />
								)}
							</div>
						</div>
					)}
					{/* selected mark */}
					<div className='flex flex-row-reverse shrink-0'>
						{selectable &&
							selectedResources.find((r) => r.id === resource.id) && (
								<FaCheckCircle className='text-green-500' />
							)}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='w-full h-fit'>
			{/* <div className='w-full px-4'>
        <div className='w-full border-b border-gray-300'></div>
      </div> */}
			<FileTableHeader /> {/* Render the table header */}
			{userfiles.map((resource) => {
				return entry(resource);
			})}
		</div>
	);
};

interface filesInterface {
	selectable: boolean;
	selectedResources?: Array<Resource>;
	setSelectedResources?: Function;
	pageInvoked?: string;
	fileType?: string;
}

// Define file extensions for different types
export const fileExtensions = {
	documents: [
		'pdf',
		'doc',
		'docx',
		'pptx',
		'ppt',
		'xls',
		'xlsx',
		'csv',
		'rtf',
		'txt',
	],
	images: ['background', 'logo', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'],
	links: ['webpage', 'html', 'htm'],
	videos: [
		'youtube',
		'mp4',
		'avi',
		'mkv',
		'mov',
		'webm',
		'flv',
		'wmv',
		'3gp',
		'mpeg',
	],
};

const MyFiles: React.FC<filesInterface> = ({
	selectable = false,
	selectedResources,
	setSelectedResources,
	pageInvoked,
	fileType = 'logo',
}) => {
	const [resources, setResources] = useState<Resource[]>([]);
	const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
	const [currentResourceType, setCurrentResourceType] = useState<string>('all');

	const promptRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [rendered, setRendered] = useState<boolean>(false);
	const { isPaidUser, token } = useUser();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState(false);
	const [showUploadOptionsMenu, setShowUploadOptionsMenu] = useState(false);
	// const [forceUpdate, setForceUpdate] = useState(false);

	useEffect(() => {
		// This effect will trigger a re-render whenever selectedResources changes
		// setForceUpdate((prev) => !prev);
		console.log('resources updated, force update', resources);
		filterResources(currentResourceType);
	}, [resources, setResources]);

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.style.height = contentRef.current.offsetHeight + 'px';
		}
		// Create a scoped async function within the hook.
		const fetchUserFiles = async () => {
			try {
				fetchFiles(token);
			} catch (error: any) {
				console.error(error);
			}
		};
		// Execute the created function directly
		fetchUserFiles();
	}, []);

	useEffect(() => {
		if (!selectable) {
			return;
		}
	}, []);

	// useEffect(() => {
	// 	console.log('stored resources:', resources);
	// }, [resources]);

	useEffect(() => {
		if (rendered && resources.length === 0 && promptRef.current) {
			promptRef.current.innerHTML = 'You have no uploaded file';
		}
	}, [resources, rendered]);

	const filterResources = (type: string) => {
		setCurrentResourceType(type);

		let filtered: Resource[] = [];
		if (type === 'all') {
			filtered = resources;
		} else if (type === 'files') {
			filtered = resources.filter((resource) =>
				fileExtensions.documents.includes(
					getFileExtension(resource.name) || resource.type,
				),
			);
		} else if (type === 'images') {
			filtered = resources.filter((resource) =>
				fileExtensions.images.includes(
					getFileExtension(resource.name) || resource.type,
				),
			);
		} else if (type === 'links') {
			filtered = resources.filter((resource) =>
				fileExtensions.links.includes(
					getFileExtension(resource.name) || resource.type,
				),
			);
		} else if (type === 'videos') {
			filtered = resources.filter((resource) =>
				fileExtensions.videos.includes(
					getFileExtension(resource.name) || resource.type,
				),
			);
		}
		setFilteredResources(filtered);
	};

	const fetchFiles = async (token: string) => {
		console.log('pageInvoked', pageInvoked);

		//const resource_type = selectable ? ['doc', 'url'] : [];
		const resource_type =
			pageInvoked === 'summary'
				? ['doc', 'url', 'webpage', 'youtube']
				: pageInvoked === 'theme'
					? [fileType]
					: [];

		ResourceService.fetchResources(resource_type, token).then((resources) => {
			setResources(resources);
			setFilteredResources(resources);
			setRendered(true);
		});
	};

	const onFileSelected = async (file: File | null) => {
		setIsSubmitting(true);
		console.log('will upload file', file);
		if (file == null) {
			setIsSubmitting(false);
			return;
		}

		try {
			const newResource = await ResourceService.uploadResource(
				file,
				token,
				pageInvoked,
				fileType,
			);
			setResources([newResource, ...resources]);
			if (setSelectedResources && selectedResources) {
				if ([newResource, ...selectedResources].length > 1 && !isPaidUser) {
					toast.info('You will need to upgrade to select multiple files!', {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'fileManagement',
					});
					setSelectedResources([newResource]);
				} else {
					setSelectedResources([newResource, ...selectedResources]);
				}
				setIsSubmitting(false);
				return;
			}
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(`File upload failed.`, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
					containerId: 'fileManagement',
				});
			}
		}
		setIsSubmitting(false);
	};

	const handleFileDeleted = (id: string) => {
		setResources((prevResources) =>
			prevResources.filter((resource) => resource.id !== id),
		); // prevents race condition
		setFilteredResources((prevResources) =>
			prevResources.filter((resource) => resource.id !== id),
		);
	};

	const handleClick = (id: string) => {
		console.log('handleClick', id);
		let selectedResourceId =
			selectedResources?.map((resource) => resource.id) || [];
		const ind = selectedResourceId.indexOf(id);
		let newSelectedResourceId: Array<string> = [];
		if (isPaidUser && pageInvoked !== 'theme') {
			newSelectedResourceId = [...selectedResourceId];
			if (ind !== -1) {
				newSelectedResourceId.splice(ind, 1);
			} else {
				newSelectedResourceId.push(id);
			}
		} else {
			if (ind !== -1) {
				newSelectedResourceId = [];
			} else {
				newSelectedResourceId = [id];
			}
			if (newSelectedResourceId.length > 0 && selectedResourceId.length > 0) {
				if (pageInvoked !== 'theme') {
					toast.info('You will need to upgrade to select multiple files!', {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'fileManagement',
					});
				} else {
					toast.info('Each project can only select one.', {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'fileManagement',
					});
				}
			}
		}
		console.log('newSelectedResourceId', newSelectedResourceId);
		console.log('selectedResourceId', selectedResourceId);
		if (setSelectedResources) {
			console.log(resources);
			setSelectedResources(
				resources.filter((resource) =>
					newSelectedResourceId.includes(resource.id),
				),
			);
		}
	};

	const carbonTokenFetcher = async () => {
		try {
			const headers = new Headers();
			if (token) {
				headers.append('Authorization', `Bearer ${token}`);
			}
			headers.append('Content-Type', 'application/json');

			const response = await fetch('/api/fetchCarbonTokens', {
				method: 'GET', // The endpoint is using the GET method
				headers: headers,
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				// Handle the case when the response is not OK (status code is not 200)
				console.error(
					'Failed to fetch access token:',
					response.status,
					response.statusText,
				);
				throw new Error('Failed to fetch access token');
			}
		} catch (error) {
			// Handle any other errors that might occur during the process
			console.error('Error fetching access token:', error);
			throw error;
		}
	};

	const handleSuccess = async (data: any) => {
		console.log('Data on Success: ', data);

		// Check if the action is "update"
		if (data && data.action === 'UPDATE') {
			// Assuming you have a function to send data to the endpoint
			try {
				const response = await sendUpdateToEndpoint(data, token);
				await fetchFiles(token);

				// Check if there are failed files in the response
				if (response && response.failed_files) {
					const failedFiles = response.failed_files.join(', '); // Assuming it's an array of file names
					toast.error(`Some files failed to be synced: ${failedFiles}`, {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'fileManagement',
					});
				} else {
					toast.success('All files synced successfully', {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'fileManagement',
					});
				}
			} catch (error: any) {
				console.error('Error sending data to sync_carbon_file: ', error);
				// Handle the error as needed
				toast.error(`${error.message}`, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
					containerId: 'fileManagement',
				});
			}
		}
	};

	// Function to send data to the endpoint api/sync_carbon_file
	const sendUpdateToEndpoint = async (data: any, token: string) => {
		try {
			const headers = new Headers();
			if (token) {
				headers.append('Authorization', `Bearer ${token}`);
			}
			headers.append('Content-Type', 'application/json');

			// Replace the following line with your actual endpoint and request logic
			const response = await fetch('api/sync_carbon_file', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ data }),
			});

			if (!response.ok) {
				const errorResponse = await response.json(); // Assuming the error is returned as JSON
				console.log('Error response from sync_carbon_file: ', errorResponse);
				throw new Error(`${errorResponse.error}`);
			}

			const responseData = await response.json();

			console.log('Response from sync_carbon_file: ', responseData);

			return responseData;
		} catch (error) {
			// Rethrow the error for the calling function to catch
			throw error;
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!isDragging) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
		e.dataTransfer.clearData();
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			await onFileSelected(e.dataTransfer.files[0]);
		}
	};

	return (
		<section className='bg-white grow flex flex-col h-full w-full'>
			<ToastContainer enableMultiContainer containerId={'fileManagement'} />
			{pageInvoked === 'resources' ? (
				<MyResourcePageHeader
					showUploadOptionsMenu={showUploadOptionsMenu}
					setShowUploadOptionsMenu={setShowUploadOptionsMenu}
					setSelectedResources={setResources}
					selectedResources={resources}
					onFileSelected={onFileSelected}
					isSubmitting={isSubmitting}
					pageInvoked={pageInvoked}

					// localFileUploadButton={}
					// uploadFromCloudButton={}
				/>
			) : (
				<></>
			)}

			{/* the two blue button for upload */}
			{pageInvoked === 'resources' ? (
				<></>
			) : (
				<div
					className={`max-w-7xl w-full mx-auto px-4 flex flex-wrap justify-around`}
				>
					{/* upload local file button */}
					<div className='max-w-sm w-fit text-center pt-4 mx-4'>
						<div className='w-full mx-auto'>
							<FileUploadButton
								onFileSelected={onFileSelected}
								isSubmitting={isSubmitting}
								pageInvoked={pageInvoked}
							/>
						</div>
					</div>

					{/* carbon connect cloud storage */}
					{pageInvoked !== 'theme' && (
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
										onError={(error) => console.log('Data on Error: ', error)}
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
					)}
				</div>
			)}

			{/* Filter buttons */}
			<div className='flex flex-row gap-4'>
				<div className='all' onClick={() => filterResources('all')}>
					<span>All</span>
				</div>
				<div className='files' onClick={() => filterResources('files')}>
					<span>Files</span>
				</div>
				<div className='images' onClick={() => filterResources('images')}>
					<span>Images</span>
				</div>
				<div className='links' onClick={() => filterResources('links')}>
					<span>Links</span>
				</div>
				<div className='videos' onClick={() => filterResources('videos')}>
					<span>Videos</span>
				</div>
			</div>

			{/* rendered resources items area */}
			{rendered ? (
				filteredResources.length === 0 ? (
					<Blank text='You have no uploaded file' />
				) : (
					<div
						className={`w-full mx-auto mt-4 px-4 pt-4 flex grow overflow-y-auto  ${
							isDragging ? 'bg-blue-100 border-blue-500' : ''
						}`}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						ref={contentRef}
					>
						<FileManagement
							selectable={selectable}
							userfiles={filteredResources}
							deleteCallback={handleFileDeleted}
							clickCallback={handleClick}
							selectedResources={selectedResources || []}
						/>
					</div>
				)
			) : (
				<Loading />
			)}
		</section>
	);
};

export default MyFiles;
