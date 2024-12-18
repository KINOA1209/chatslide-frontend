import React, { ChangeEvent, FC, useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrlambdaButton, { BigBlueButton } from '../button/DrlambdaButton';

export const MEDIA_EXTENSIONS = [
	'png',
	'jpg',
	'jpeg',
	'svg',
	'webp',
	'gif',
	'avif',
];
export const DOCUMENT_EXTENSIONS = [
	'pdf',
	'txt',
	'docx',
	'doc',
	'pages',
	'pptx',
	'ppt',
	'key',
	'mp3',
	'wav',
	'm4a',
	'png',
	'jpg',
  'jpeg'
];
export const PPTX_EXTENSIONS = ['pptx', 'ppt', 'pdf'];
export const THEMEPAGE_EXTENSIONs = [...MEDIA_EXTENSIONS, ...PPTX_EXTENSIONS];
export const ALL_EXTENSIONS = [...MEDIA_EXTENSIONS, ...DOCUMENT_EXTENSIONS];

const determineSupportedFormats = (
	pageInvoked: 'summary' | 'theme' | 'ppt2video' | 'resources',
	fileNameExtension?: string,
	uploadSection?: 'Template Extraction' | '',
) => {
	if (pageInvoked === 'theme') {
		if (uploadSection === 'Template Extraction') {
			return PPTX_EXTENSIONS;
		} else {
			return THEMEPAGE_EXTENSIONs;
		}
	} else if (pageInvoked === 'summary') {
		return DOCUMENT_EXTENSIONS;
	} else if (pageInvoked === 'ppt2video') {
    return PPTX_EXTENSIONS;
  }
	// resources
	return ALL_EXTENSIONS;
};

export const sizeLimit = 10 * 1024 * 1024; // 10mb

interface FileUploadButtonProps {
	onFileSelected: (file: File | null) => void;
	//formats?: string[];
	//extensions?: string[];
	isSubmitting?: boolean;
	pageInvoked?: 'resources' | 'theme' | 'ppt2video' | 'summary';
	fileNameExtension?: string;
	uploadSection?: 'Template Extraction' | ''; // templateExtraction
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
	onFileSelected,
	//formats = supportedFormats,
	//extensions = supportedExtensions,
	isSubmitting = false,
	pageInvoked = 'resources',
	fileNameExtension = '',
	uploadSection = '',
}) => {
	const [fileName, setFileName] = useState<string | null>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log('isSubmitting', isSubmitting);
	}, [isSubmitting]);

	// const formats = determineSupportedFormats(pageInvoked);
	const extensions = determineSupportedFormats(
		pageInvoked,
		fileNameExtension,
		uploadSection,
	);
	const formattedExtensions = extensions.join(', ').toUpperCase();

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
			toast.error(
				ext.toUpperCase() +
					' file is not supported! Supported file types: ' +
					formattedExtensions,
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
					containerId: 'upload',
				},
			);
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
		<div className='max-w-sm flex flex-col items-center'>
			<ToastContainer containerId={'upload'} />
			<input
				type='file'
				id='file-upload'
				ref={inputFileRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			<BigBlueButton
				onClick={handleClick}
				isSubmitting={isSubmitting}
				showArrow={false}
			>
				{!isSubmitting ? 'Upload from Local 💻' : 'Uploading File...'}
			</BigBlueButton>
			{/* <div className='text-sm text-gray-400'>
				Supported file formats:{' '}
				{formats.map((f, index) => {
					if (index !== formats.length - 1) {
						return f + ', ';
					} else {
						return f;
					}
				})}
			</div> */}
			<div className='text-sm text-gray-400'>Max file size: 10 MB</div>
			{/* <div className='text-sm text-gray-400'>
        Subscribed users can select multiple files
      </div> */}
		</div>
	);
};

export { determineSupportedFormats };
