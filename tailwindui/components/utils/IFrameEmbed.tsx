import React, { useState, useEffect } from 'react';

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
}) => {

	React.useEffect(() => {
		executeScripts(currentStoredEmbedCode);
	}, [currentStoredEmbedCode]);

	return (
		<div>
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
