// import React, { useState } from 'react';

// interface IFrameEmbedProps {}

// const IFrameEmbed: React.FC<IFrameEmbedProps> = () => {
// 	const [embedCode, setEmbedCode] = useState('');

// 	const handleEmbedCodeChange = (
// 		event: React.ChangeEvent<HTMLTextAreaElement>,
// 	) => {
// 		setEmbedCode(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<textarea
// 				rows={10}
// 				cols={50}
// 				value={embedCode}
// 				onChange={handleEmbedCodeChange}
// 				placeholder='Paste embed code here'
// 			></textarea>
// 			{embedCode && (
// 				<div>
// 					<h2>Preview:</h2>
// 					<div dangerouslySetInnerHTML={{ __html: embedCode }} />
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default IFrameEmbed;

// import React, { useState, useEffect } from 'react';

// interface IFrameEmbedProps {}

// const IFrameEmbed: React.FC<IFrameEmbedProps> = () => {
// 	const [embedCode, setEmbedCode] = useState('');

// 	const handleEmbedCodeChange = (
// 		event: React.ChangeEvent<HTMLTextAreaElement>,
// 	) => {
// 		setEmbedCode(event.target.value);
// 	};

// 	useEffect(() => {
// 		// Function to parse and execute script tags in the embed code
// 		const parseAndExecuteScripts = () => {
// 			// Find all script tags in the embed code
// 			const scriptTags = document.querySelectorAll('script');
// 			scriptTags.forEach((scriptTag) => {
// 				// Create a new script element
// 				const newScript = document.createElement('script');
// 				// Copy attributes from the original script tag
// 				Array.from(scriptTag.attributes).forEach((attr) => {
// 					newScript.setAttribute(attr.name, attr.value);
// 				});
// 				// Copy content from the original script tag
// 				newScript.innerHTML = scriptTag.innerHTML;
// 				// Replace the original script tag with the new one
// 				scriptTag.parentNode?.replaceChild(newScript, scriptTag);
// 			});
// 		};

// 		// Execute script tags in the embed code when the component mounts
// 		parseAndExecuteScripts();

// 		// Clean up: parse and execute script tags again if the embed code changes
// 		return () => parseAndExecuteScripts();
// 	}, [embedCode]);

// 	return (
// 		<div>
// 			<textarea
// 				rows={10}
// 				cols={50}
// 				value={embedCode}
// 				onChange={handleEmbedCodeChange}
// 				placeholder='Paste embed code here'
// 			></textarea>
// 			{embedCode && (
// 				<div>
// 					<h2>Preview:</h2>
// 					<div dangerouslySetInnerHTML={{ __html: embedCode }} />
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default IFrameEmbed;

import React, { useState, useEffect } from 'react';
import InnerHTML from 'dangerously-set-html-content';
import useJSScript from '@/hooks/use-JSScript';
import { ToastContainer, toast } from 'react-toastify';

interface IFrameEmbedProps {}

const IFrameEmbed: React.FC<IFrameEmbedProps> = () => {
	const [embedCode, setEmbedCode] = useState('');
	const [inputValue, setInputValue] = useState('');
	// const [errorMessage, setErrorMessage] = useState('');

	useJSScript(embedCode);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newInputValue = event.target.value;
		setInputValue(newInputValue);
		// setErrorMessage('');
	};

	const handleConfirmClick = () => {
		if (
			inputValue.startsWith('<iframe') ||
			inputValue.startsWith('<blockquote')
		) {
			setEmbedCode(inputValue);
		} else {
			// setErrorMessage(
			// 	'Please paste embed code that starts with <iframe> or <blockquote>.',
			// );
			toast.error(
				'Please paste embed code that starts with <iframe> or <blockquote>.',
				{
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				},
			);
		}
	};

	const isConfirmDisabled = inputValue.trim() === '';

	useEffect(() => {
		console.log('embedCode:', embedCode);
	}, [embedCode]);

	return (
		<div>
			<ToastContainer />
			<textarea
				rows={10}
				cols={50}
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Paste embed code here'
				style={{ marginBottom: '10px' }}
			></textarea>
			<button
				onClick={handleConfirmClick}
				disabled={isConfirmDisabled}
				style={{ cursor: isConfirmDisabled ? 'not-allowed' : 'pointer' }}
			>
				Confirm
			</button>
			{/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
			{embedCode && (
				<div>
					<h2>Preview:</h2>
					<div dangerouslySetInnerHTML={{ __html: embedCode }} />
				</div>
			)}
		</div>
	);
};

export default IFrameEmbed;
