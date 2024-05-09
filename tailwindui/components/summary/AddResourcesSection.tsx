'use client';

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import 'react-toastify/dist/ReactToastify.css';
import { QuestionExplainIcon } from '@/app/(feature)/icons';
import SelectedResourcesList from '@/components/file/SelectedResources';
import { FiFilePlus, FiGlobe, FiYoutube } from 'react-icons/fi';
import ResourceService from '@/services/ResourceService';
import { toast, ToastContainer } from 'react-toastify';
import AuthService from '@/services/AuthService';
import Resource from '@/models/Resource';
import LinkInput from '../ui/LinkInput';
import { useUser } from '@/hooks/use-user';
import RadioButton, { RadioButtonOption } from '../ui/RadioButton';
import { FaInternetExplorer, FaNewspaper, FaWikipediaW } from 'react-icons/fa';
import { IoIosRemoveCircle, IoIosRemoveCircleOutline } from 'react-icons/io';
import { Instruction, Explanation, BigTitle, WarningMessage } from '../ui/Text';
import Card from '../ui/Card';
import { determineSupportedFormats } from '../file/FileUploadButton';
import GenModeToggle from './GenModeToggle';
import { WrappableRow } from '../layout/WrappableRow';
import { select } from 'd3';

interface AddResourcesProps {
	searchOnlineScope?: string;
	setSearchOnlineScope?: React.Dispatch<React.SetStateAction<string>>;
	setShowFileModal: (show: boolean) => void;
	selectedResources: any[];
	setSelectedResources: React.Dispatch<React.SetStateAction<any[]>>;
	removeResourceAtIndex: (index: number) => void;
	isRequired?: boolean;
	generationMode?: 'from_topic' | 'from_files';
	setGenerationMode?: (mode: 'from_topic' | 'from_files') => void;
}

const AddResourcesSection: React.FC<AddResourcesProps> = ({
	searchOnlineScope = '',
	setSearchOnlineScope,
	setShowFileModal,
	selectedResources,
	setSelectedResources,
	removeResourceAtIndex,
	isRequired = false,
	generationMode,
	setGenerationMode,
}) => {
	const [resources, setResources] = useState<Resource[]>([]);
	const { token } = useUser();
	const [isUploading, setIsUploading] = useState(false);
	const selectedResourcesRef = useRef<HTMLDivElement>(null);

	const searchOnlineOptions: RadioButtonOption[] = [
		{ value: '', text: 'None', icon: <IoIosRemoveCircleOutline /> },
		{ value: 'bing', text: 'Internet', icon: <FiGlobe /> },
		{ value: 'wikipedia', text: 'Wikipedia', icon: <FaWikipediaW /> },
		{ value: 'news', text: 'News', icon: <FaNewspaper /> },
		// { value: 'reddit', text: 'Reddit' },
	];

	const onFileSelected = async (file: File | null) => {
		if (file == null) return;
		try {
			const newResource = await ResourceService.uploadResource(
				file,
				token,
				'summary',
			);
			setResources([newResource, ...resources]);
			if (setSelectedResources && selectedResources) {
				setSelectedResources([newResource, ...selectedResources]);
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
	};

	const [isDragging, setIsDragging] = useState(false);

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!isDragging) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const extensions = determineSupportedFormats('summary');

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
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
					containerId: 'fileManagement',
				});
				return;
			}

      // if the file is larger than 10mb, error
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File is too large! Please upload a file smaller than 10MB.', {
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
        return;
      }

			setIsUploading(true);
			await onFileSelected(file);
			e.dataTransfer.clearData();
			setIsUploading(false);
		}
	};

	const scrollToSelectedResources = () => {
		if (selectedResourcesRef.current) {
			selectedResourcesRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		scrollToSelectedResources();
	}, [selectedResources]);

	return (
		<Card id='SummaryStep-3'>
			<div>
				{isRequired ? (
					<WrappableRow type='flex' justify='between'>
						<BigTitle>📚 Import Sources</BigTitle>
						{generationMode && setGenerationMode && (
							<GenModeToggle
								generationMode={generationMode}
								setGenerationMode={setGenerationMode}
							/>
						)}
					</WrappableRow>
				) : (
					<BigTitle>📚 Supporting Sources</BigTitle>
				)}
				<Explanation>
					{isRequired
						? 'Add any sources that would support your topic. This could be online sources, files, or links.'
						: 'To get started, use any sources that would support your topic. This could be online sources, files, or links.'}
				</Explanation>
			</div>

			{/* search online */}
			{setSearchOnlineScope && (
				<div>
					<Instruction>
						Which online sources do you want to include?
					</Instruction>
					<Explanation>
						This may also add content less relevant to your topic.
					</Explanation>
					<RadioButton
						name='search_online'
						options={searchOnlineOptions}
						selectedValue={searchOnlineScope}
						setSelectedValue={setSearchOnlineScope}
						cols={4}
					/>
				</div>
			)}

			{/* files */}
			<div>
				<Instruction>What additional files do you want to include?</Instruction>
				<div
					className={`w-full h-[150px] flex flex-col items-center justify-center border rounded-md border-2 border-gray-200 cursor-pointer 
						${isDragging ? 'bg-blue-100 border-blue-500' : ''}
						${isUploading ? 'bg-gray-500 animate-pulse cursor-progress' : ''}`}
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={(e) => {
						e.preventDefault();
						setShowFileModal(true);
					}}
				>
					<div className='flex flex-rol items-center gap-2'>
						<FiFilePlus size={40} color='gray' />
						<div className='flex flex-col items-center'>
							<Instruction>
								Drag files here or{' '}
								<span className='text-blue-600'>Browse File</span>
							</Instruction>
							<Explanation>
								<div className='text-center'>
									Supports PDF, TXT, DOC, DOCX, PPT, PPTX, KEY
								</div>
							</Explanation>
						</div>
					</div>
				</div>
			</div>

			{/* links */}
			<div>
				<Instruction>
					What additional online links do you want to include?
				</Instruction>
				<LinkInput
					selectedResources={selectedResources}
					setSelectedResources={setSelectedResources}
				/>
			</div>

			{selectedResources.length > 0 && (
				<div ref={selectedResourcesRef}>
					<Instruction>Your selected sources:</Instruction>
					{selectedResources.length > 4 && (
						<WarningMessage>
							The performance and accuracy may degrade with more than 4 sources.
						</WarningMessage>
					)}
					<SelectedResourcesList
						selectedResources={selectedResources}
						removeResourceAtIndex={removeResourceAtIndex}
					/>
				</div>
			)}
		</Card>
	);
};

export default AddResourcesSection;
