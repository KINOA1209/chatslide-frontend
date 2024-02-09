import React, { useEffect, useRef, useState, useMemo } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import themeColorConfigData from './templates_customizable_elements/theme_color_options';
import '@/app/css/style.css';

type QuillEditableProps = {
	content: string | string[];
	handleBlur: (newContent: string | string[]) => void;
	isVerticalContent: boolean;
	templateKey: string;
	style?: React.CSSProperties;
};

// const generateFontSizes = (): string[] => {
// 	const sizes = [];
// 	for (let i = 8; i <= 80; i += 1) {
// 		sizes.push(`${i}pt`);
// 	}
// 	return sizes;
// };

// const fontSizes = generateFontSizes();

function isKeyOfThemeColorConfig(
	key: string,
): key is keyof typeof themeColorConfigData {
	return key in themeColorConfigData;
}

const Font = Quill.import('attributors/style/font');
Font.whitelist = [
	'Arimo',
	'Arial',
	'Georgia',
	'Big Shoulders Text',
	'Caveat',
	'Caveat Medium',
	'Caveat Regular',
	'Creato Display Medium',
	'Creato Display Regular',
	'Creato Display Thin',
	'Helvetica Neue',
	'Nimbus Sans Regular',
	'Rubik',
];
Quill.register(Font, true);

let Size = Quill.import('attributors/style/size');
Size.whitelist = [
  '12pt',
  '13pt',
  '14pt',
  '16pt',
  '18pt',
  '20pt',
  '24pt',
  '26pt',
  '28pt',
  '30pt',
  '32pt',
  '40pt',
  '48pt',
  '64pt'
];
Quill.register(Size, true);

const toolbarOptions = [
	[{ size: Size.whitelist }, { font: Font.whitelist }],
	['bold', 'italic', 'underline', 'strike', 'code-block'],
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
				//'color-picker',
			],
		},
		{ background: [] },
	],
	[{ align: [] }],
	['clean'],
];

export const isHTML = (input: string): boolean => {
	const doc: Document = new DOMParser().parseFromString(input, 'text/html');
	return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const BubbleTheme = Quill.import('themes/bubble');

class ExtendBubbleTheme extends BubbleTheme {
	constructor(quill: Quill, options: any) {
		super(quill, options);

		quill.on('selection-change', (range) => {
			if (range) {
				const bounds = quill.getBounds(range.index);
				const quillAny = quill as any;
				quillAny.theme.tooltip.show();
				quillAny.theme.tooltip.position(bounds);
			}
		});
	}
}

Quill.register('themes/bubble', ExtendBubbleTheme);

const QuillEditable: React.FC<QuillEditableProps> = ({
	content,
	handleBlur,
	style,
	isVerticalContent,
	templateKey,
}) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillInstanceRef = useRef<Quill | null>(null);
	const isTextChangeRef = useRef(false);

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
			//create deep copy of toolbaroptions
			let customizedToolbarOptions = JSON.parse(JSON.stringify(toolbarOptions));

			if (isKeyOfThemeColorConfig(templateKey)) {
				const themeColors = themeColorConfigData[templateKey].color;
				//console.log(customizedToolbarOptions)
				customizedToolbarOptions.forEach((option: any) => {
					if (Array.isArray(option)) {
						// Ensuring the option is an array of toolbar items
						option.forEach((item) => {
							if (item.color) {
								// Check if item has a color property
								// Extend the default color options with the theme-specific colors
								item.color = [...item.color, ...themeColors];
							}
						});
					}
				});
			}

			quillInstanceRef.current = new Quill(editorRef.current, {
				modules: { toolbar: customizedToolbarOptions },
				theme: 'bubble',
				bounds: editorRef.current,
			});

			// const toolbar = quillInstanceRef.current.getModule('toolbar');
			// toolbar.addHandler('color', showColorPicker);

			const quillFormats = {
				size: style?.fontSize,
				bold: style?.fontWeight !== 'normal',
				italic: style?.fontStyle === 'italic',
				color: style?.color,
				list: isVerticalContent ? 'bullet' : undefined,
				font: style?.fontFamily,
			};
			// console.log(quillFormats);
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

			//iterate throught the content array, if it's <li> tag, wrap into <ul> tag
			if (Array.isArray(content)) {
				content.forEach((item, index) => {
					if (
						isHTML(item) &&
						item.trim().startsWith('<li>') &&
						item.trim().endsWith('</li>')
					) {
						const listHTML = `<ul>${item}</ul>`;
						insertContent(listHTML);
					} else {
						insertContent(item);
						if (!item.endsWith('\n') || !item.includes('<br>')) {
							initialDelta.insert('\n');
						}
					}
				});
			} else {
				insertContent(content);
			}

			quillInstanceRef.current.setContents(initialDelta);
			quillInstanceRef.current.on('text-change', () => {
				//console.log('triggered')
				isTextChangeRef.current = true;
			});
			quillInstanceRef.current.on('selection-change', () => {
				//console.log(isTextChangeRef.current)
				// if textchangeref is false, it will not trigger autosave
				if (!isTextChangeRef.current) return;
				const currentContent = quillInstanceRef.current?.root.innerHTML;
				if (currentContent !== undefined) {
					isTextChangeRef.current = false;
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

			// const editor = editorRef.current;
			// const updateTooltipPosition = () => {
			// 	const toolbar = editor?.querySelector('.ql-tooltip');
			// 	const arrow = editor?.querySelector('.ql-tooltip-arrow');
			// 	const qlEditor = editor?.querySelector('.ql-editor');
			// 	if (toolbar instanceof HTMLElement && arrow instanceof HTMLElement && qlEditor) {
			// 		const topPosition = editor.offsetHeight + qlEditor.scrollTop;
			// 		toolbar.style.position = 'absolute';
			// 		toolbar.style.top = `${topPosition}px`;
			// 		toolbar.style.display = 'block';
			// 		arrow.style.position = 'absolute';
			// 	}
			// };

			// quillInstanceRef.current.on('text-change', () => updateTooltipPosition());

			// const qlEditor = editor.querySelector('.ql-editor');
			// if (qlEditor) {
			// 	qlEditor.addEventListener('scroll', () => updateTooltipPosition());
			// }

			// editorRef.current.addEventListener('focusin', () => {
			// 	if (!isToolbarInteraction) {
			// 		updateTooltipPosition()
			// 	}});

			// editorRef.current.addEventListener('focusout', (event) => {
			// 	const toolbar = editorRef.current?.querySelector('.ql-tooltip');
			// 	const relatedTarget = event.relatedTarget as Node;

			// 	if (toolbar && toolbar instanceof HTMLElement && !toolbar.contains(relatedTarget)) {
			// 		toolbar.style.display = 'none';
			// 	}
			// });
		}
	}, [handleBlur, content, style]);

	useEffect(() => {
		if (quillInstanceRef.current && style) {
			const excludeProperties = [
				'fontSize',
				'fontWeight',
				'fontStyle',
				'display',
				'fontFamily',
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
