import React, { useState, useEffect } from 'react';
import InnerHTML from 'dangerously-set-html-content';
import useJSScript from '@/hooks/use-JSScript';
import { ToastContainer, toast } from 'react-toastify';
import { BigBlueButton } from '../button/DrlambdaButton';

interface IFrameEmbedProps {
	currentStoredEmbedCode: string; // Embed code from parent
	// inputValue: string; //
	// setInputValue: (value: string) => void;
	// setCurrentStoredEmbedCode: (embedCode: string) => void; // Callback function to update currentStoredEmbedCode in parent
	// handleConfirmClick: (inputValue: string) => void;
}

export const executeScripts = (html: string) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const scriptTags = doc.querySelectorAll('script');

	scriptTags.forEach((scriptTag) => {
		const src = scriptTag.getAttribute('src');
		if (src) {
			// If script has a src attribute, create and append it
			const script = document.createElement('script');
			script.src = src;
			script.async = true;
			document.body.appendChild(script);
		} else {
			// If script doesn't have a src attribute, execute its content
			try {
				eval(scriptTag.innerHTML); // Execute script content
			} catch (error) {
				console.error('Error executing script:', error);
			}
		}
	});
};

const IFrameEmbed: React.FC<IFrameEmbedProps> = ({
	currentStoredEmbedCode,
	// inputValue,
	// setInputValue,
	// setCurrentStoredEmbedCode,
	// handleConfirmClick,
}) => {
	// const [embedCode, setEmbedCode] = useState('');
	// const [inputValue, setInputValue] = useState('');
	// const [errorMessage, setErrorMessage] = useState('');

	// useJSScript(currentStoredEmbedCode);

	// const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
	// 	const newInputValue = event.target.value;
	// 	setInputValue(newInputValue);
	// 	// setErrorMessage('');
	// };

	// const handleConfirmClick = () => {
	// 	if (
	// 		inputValue.startsWith('<iframe') ||
	// 		inputValue.startsWith('<blockquote')
	// 	) {
	// 		// setEmbedCode(inputValue);
	// 		setCurrentStoredEmbedCode(inputValue); // Update currentStoredEmbedCode in parent
	// 	} else {
	// 		// setErrorMessage(
	// 		// 	'Please paste embed code that starts with <iframe> or <blockquote>.',
	// 		// );
	// 		toast.error(
	// 			'Please paste embed code that starts with <iframe> or <blockquote>.',
	// 			{
	// 				position: 'top-center',
	// 				autoClose: 2000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				theme: 'light',
	// 			},
	// 		);
	// 	}
	// };

	// const isConfirmDisabled = inputValue.trim() === '';

	// useEffect(() => {
	// 	console.log('embedCode:', currentStoredEmbedCode);
	// }, [currentStoredEmbedCode]);

	React.useEffect(() => {
		executeScripts(currentStoredEmbedCode);
	}, [currentStoredEmbedCode]);

	return (
		<div>
			{/* <ToastContainer /> */}
			{/* <textarea
				rows={5}
				// cols={50}
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Paste embed code here'
				style={{ marginBottom: '10px', width: '100%', maxWidth: '100%' }}
			></textarea> */}
			{/* <button
				onClick={handleConfirmClick}
				disabled={isConfirmDisabled}
				style={{ cursor: isConfirmDisabled ? 'not-allowed' : 'pointer' }}
			>
				Confirm
			</button> */}
			{/* <div className='w-full mx-auto flex justify-center items-center'>
				<BigBlueButton
					// isSubmitting={uploading || searching}
					onClick={handleConfirmClick}
					disabled={isConfirmDisabled}
					customizeStyle={{
						cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
					}}
				>
					Confirm pasting
				</BigBlueButton>
			</div> */}

			{/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
			{currentStoredEmbedCode && (
				<div>
					{/* <h1>Preview</h1> */}
					<div dangerouslySetInnerHTML={{ __html: currentStoredEmbedCode }} />
				</div>
			)}
		</div>
	);
};

export default IFrameEmbed;
