import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.css'

type QuillEditableProps = {
    content: string;
    handleBlur: (newContent: string) => void;
    style?: React.CSSProperties;
};

type QuillRange = {
    index: number;
    length: number;
} | null;


var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const QuillEditable: React.FC<QuillEditableProps> = ({ 
    content, 
    handleBlur,
    style
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstanceRef = useRef<Quill | null>(null);

    // Initialize Quill instance
    useEffect(() => {
        if (editorRef.current && !quillInstanceRef.current) {
            quillInstanceRef.current = new Quill(editorRef.current, {
                modules: { toolbar: toolbarOptions },
                theme: 'bubble',
            });

            quillInstanceRef.current.clipboard.dangerouslyPasteHTML(content);

            quillInstanceRef.current.on('selection-change', () => {
                const currentContent = quillInstanceRef.current?.root.innerHTML;
                if (currentContent !== undefined) {
                    handleBlur(currentContent);
                }
            });
        }
    }, [handleBlur, content]);

    useEffect(() => {
        if (quillInstanceRef.current && style) {
            Object.assign(quillInstanceRef.current.root.style, style);
        }
    }, [style]);

    return <div ref={editorRef}></div>;
};

export default QuillEditable;
