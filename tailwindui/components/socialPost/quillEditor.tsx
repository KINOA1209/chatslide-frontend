import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';

type QuillEditableProps = {
    content: string;
    handleBlur: (newContent: string) => void;
    style?: React.CSSProperties;
};

const QuillEditable: React.FC<QuillEditableProps> = ({ 
    content, 
    handleBlur,
    style
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstanceRef = useRef<Quill | null>(null);

    const generateFontSizes = (): string[] => {
        const sizes = [];
        for (let i = 8; i <= 80; i+=1) {
            sizes.push(`${i}pt`);
        }
        return sizes;
    };

    useEffect(() => {
        if (editorRef.current && !quillInstanceRef.current) {
            const fontSizes = generateFontSizes();
            let Size = Quill.import('attributors/style/size');
            Size.whitelist = fontSizes;
            Quill.register(Size, true);

            const toolbarOptions = [
                [{ 'size':  fontSizes}, { 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],   
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean']
              ];
        
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
