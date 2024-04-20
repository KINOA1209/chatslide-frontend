import React, { useState, useRef, useEffect, Fragment, FormEvent } from 'react';



const OutlinePageView = ({
    outlinesPlainText,
    setOutlinesPlainText,
    isGPT35,
    setTextModified,
}: {
    outlinesPlainText: string;
    setOutlinesPlainText: (outlinesPlainText: string) => void;
    isGPT35: boolean;
    setTextModified: (modified: boolean) => void
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOutlinesPlainText(event.target.value);
        setTextModified(true);
    };

    //tab for inserting indent
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = event.currentTarget.selectionStart;
            const end = event.currentTarget.selectionEnd;
            const value = event.currentTarget.value;

            // Create the new value with the tab inserted
            const newValue = value.substring(0, start) + "\t" + value.substring(end);
            setOutlinesPlainText(newValue);
            const textarea = textAreaRef.current;
            if (textarea !== null) {
                // Update the cursor position after the state has been updated
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
            }
        }
    };
    return (
        <textarea
            ref={textAreaRef}
            className='border border-gray-200 border-2 rounded-md h-[70vh] mx-[7rem] py-4 px-4 my-3'
            value={outlinesPlainText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
        >

        </textarea>
    );
};

export default OutlinePageView;
