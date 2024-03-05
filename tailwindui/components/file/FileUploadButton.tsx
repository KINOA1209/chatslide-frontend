import React, { ChangeEvent, FC, useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrlambdaButton, {
	BigBlueButton,
} from '../button/DrlambdaButton';

const determineSupportedFormats = (pageInvoked: string) => {
	if (pageInvoked === 'theme') {
		return ['png', 'jpg', 'jpeg'];
	} else if (pageInvoked === 'summary') {
		return ['pdf', 'txt', 'doc', 'docx', 'ppt', 'pptx'];
	}
	return ['pdf', 'txt', 'docx', 'png', 'jpg', 'jpeg', 'pptx'];
};

const sizeLimit = 10 * 1024 * 1024; // 10mb

interface FileUploadButtonProps {
	onFileSelected: (file: File | null) => void;
	//formats?: string[];
	//extensions?: string[];
	isSubmitting?: boolean;
	pageInvoked?: string;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
	onFileSelected,
	//formats = supportedFormats,
	//extensions = supportedExtensions,
	isSubmitting = false,
	pageInvoked = 'summary',
}) => {
	const [fileName, setFileName] = useState<string | null>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log('isSubmitting', isSubmitting);
	}, [isSubmitting]);

	const formats = determineSupportedFormats(pageInvoked);
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
		<div className='max-w-sm flex flex-col items-center'>
			<ToastContainer enableMultiContainer containerId={'upload'} />
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
			<div className='text-sm text-gray-400'>
				Supported file formats:{' '}
				{formats.map((f, index) => {
					if (index !== formats.length - 1) {
						return f + ', ';
					} else {
						return f;
					}
				})}
			</div>
			<div className='text-sm text-gray-400'>Max file size: 10 MB</div>
			{/* <div className='text-sm text-gray-400'>
        Subscribed users can select multiple files
      </div> */}
		</div>
	);
};

export { determineSupportedFormats };
