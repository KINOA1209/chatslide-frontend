import React, { useEffect, useRef, useState, useMemo } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';

type QuillEditableProps = {
	content: string | string[];
	handleBlur: (newContent: string | string[]) => void;
	isVerticalContent: boolean;
	style?: React.CSSProperties;
};

const generateFontSizes = (): string[] => {
	const sizes = [];
	for (let i = 8; i <= 80; i += 1) {
		sizes.push(`${i}pt`);
	}
	return sizes;
};

const fontSizes = generateFontSizes();

const toolbarOptions = [
	[{ size: fontSizes }, { font: [] }],
	['bold', 'italic', 'underline', 'strike', 'code-block'],
	[{ header: 1 }, { header: 2 }],
	[{ list: 'bullet' }],
	[{ script: 'sub' }, { script: 'super' }],
	[
		{
			color: [
				'#000000',
				'#e60000',
				'#ff9900',
				'#ffff00',
				'#008a00',
				'#0066cc',
				'#9933ff',
				'#ffffff',
				'#facccc',
				'#ffebcc',
				'#ffffcc',
				'#cce8cc',
				'#cce0f5',
				'#ebd6ff',
				'#bbbbbb',
				'#f06666',
				'#ffc266',
				'#ffff66',
				'#66b966',
				'#66a3e0',
				'#c285ff',
				'#888888',
				'#a10000',
				'#b26b00',
				'#b2b200',
				'#006100',
				'#0047b2',
				'#6b24b2',
				'#444444',
				'#5c0000',
				'#663d00',
				'#666600',
				'#003700',
				'#002966',
				'#3d1466',
				'color-picker',
			],
		},
		{ background: [] },
	],
	[{ align: [] }],
	['clean'],
];

let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizes;
Quill.register(Size, true);

const isHTML = (input: string): boolean => {
	const doc: Document = new DOMParser().parseFromString(input, 'text/html');
	return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const QuillEditable: React.FC<QuillEditableProps> = ({
	content,
	handleBlur,
	style,
	isVerticalContent,
}) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillInstanceRef = useRef<Quill | null>(null);

	// const showColorPicker = (value: string) => {
	//     if (value === 'color-picker') {
	//         const picker = document.createElement('input');
	//         picker.type = 'color';
	//         picker.style.display = 'none';
	//         picker.addEventListener('change', () => {
	//             const quill = quillInstanceRef.current;
	//             if (quill) {
	//                 quill.format('color', picker.value);
	//             }
	//         }, false);
	//         document.body.appendChild(picker);
	//         picker.click();
	//     } else {
	//         const quill = quillInstanceRef.current;
	//         if (quill) {
	//             quill.format('color', value);
	//         }
	//     }
	// };

	useEffect(() => {
		if (editorRef.current && !quillInstanceRef.current) {
			quillInstanceRef.current = new Quill(editorRef.current, {
				modules: { toolbar: toolbarOptions },
				theme: 'bubble',
			});

			// const toolbar = quillInstanceRef.current.getModule('toolbar');
			// toolbar.addHandler('color', showColorPicker);

			const quillFormats = {
				size: style?.fontSize,
				bold: style?.fontWeight !== 'normal',
				italic: style?.fontStyle === 'italic',
				color: style?.color,
				list: style?.display === 'list-item' ? 'bullet' : undefined,
			};
			const Delta = Quill.import('delta');
			let initialDelta = new Delta();

			const insertContent = (item: string) => {
				if (isHTML(item)) {
					const convertedDelta = quillInstanceRef?.current?.clipboard.convert(
						item as any,
					);
					initialDelta = initialDelta.concat(convertedDelta);
				} else {
					initialDelta.insert(`${item}\n`, quillFormats);
				}
			};

			if (Array.isArray(content)) {
				content.forEach((item) => {
					if (
						isHTML(item) &&
						item.trim().startsWith('<li>') &&
						item.trim().endsWith('</li>')
					) {
						const listHTML = `<ul>${item}</ul>`;
						insertContent(listHTML);
					} else {
						insertContent(item);
					}
				});
			} else {
				insertContent(content);
			}

			quillInstanceRef.current.setContents(initialDelta);
			quillInstanceRef.current.on('selection-change', () => {
				const currentContent = quillInstanceRef.current?.root.innerHTML;
				if (currentContent !== undefined) {
					if (isVerticalContent) {
						const doc = new DOMParser().parseFromString(
							currentContent,
							'text/html',
						);
						let extractedContent: string[] = [];

						const bodyChildren = Array.from(doc.body.children);
						bodyChildren.forEach((el) => {
							// Check if the element is a <li> tag elements and process each list item
							if (
								el.tagName.toLowerCase() === 'ul' ||
								el.tagName.toLowerCase() === 'ol'
							) {
								const listItems = Array.from(el.querySelectorAll('li')).map(
									(li) => li.outerHTML || '',
								);
								extractedContent.push(...listItems);
							} else {
								// For non-list elements like <p> tag, push their outerHTML or text content
								extractedContent.push(
									el.outerHTML || el.textContent?.trim() || '',
								);
							}
						});
						handleBlur(extractedContent);
					} else {
						handleBlur(currentContent);
					}
				}
			});

			editorRef.current.addEventListener('focusin', () => {
				const toolbar = editorRef.current?.querySelector('.ql-tooltip');
				if (toolbar && toolbar instanceof HTMLElement) {
					toolbar.style.display = 'block';
				}
			});

			editorRef.current.addEventListener('focusout', (event) => {
				const toolbar = editorRef.current?.querySelector('.ql-tooltip');
				const relatedTarget = event.relatedTarget as Node;

				if (
					toolbar &&
					toolbar instanceof HTMLElement &&
					!toolbar.contains(relatedTarget)
				) {
					toolbar.style.display = 'none';
				}
			});
		}
	}, [handleBlur, content, style]);

	useEffect(() => {
		if (quillInstanceRef.current && style) {
			const excludeProperties = [
				'fontSize',
				'fontWeight',
				'fontStyle',
				'display',
			];
			const applyStyle: React.CSSProperties = {};

			for (const key in style) {
				if (style.hasOwnProperty(key)) {
					if (!excludeProperties.includes(key as keyof React.CSSProperties)) {
						(applyStyle as any)[key] = style[key as keyof React.CSSProperties];
					}
				}
			}

			Object.assign(quillInstanceRef.current.root.style, applyStyle);
		}
	}, [style]);

	return <div ref={editorRef}></div>;
};

export default React.memo(QuillEditable);
