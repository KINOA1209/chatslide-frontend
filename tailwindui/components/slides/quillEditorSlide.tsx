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

//use attributors instead of formats to avoid requirement of hyphens
const Font = Quill.import('attributors/style/font') as any;
Font.whitelist = [
	'Arimo',
	'Arial',
	'Assistant Medium',
	'Assistant Regular',
	'Big Shoulders Text',
	'Brygada 1918 SemiBold',
	'Caveat',
	'Caveat Medium',
	'Caveat Regular',
	'Creato Display Medium',
	'Creato Display Regular',
	'Creato Display Thin',
	'Georgia',
	'Helvetica Neue',
	'Lemonada',
	'Libre Baskerville Regular',
	'Libre Baskerville Bold',
	'Nimbus Sans Regular',
	'Playfair Display Bold',
	'Playfair Display Medium',
	'Rubik',
	'Sansita Swashed Regular',
	'Sansita Swashed Medium',
	'Yrsa Medium',
];
Quill.register(Font, true);

let Size = Quill.import('attributors/style/size') as any;
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
	'64pt',
];
Quill.register(Size, true);

const toolbarOptions = [
	[{ size: Size.whitelist }, { font: Font.whitelist }, 'bold', 'italic'],
	['underline', 'strike', 'code-block'],
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
	['link', 'clean'],
];

export const isHTML = (input: string): boolean => {
	const doc: Document = new DOMParser().parseFromString(input, 'text/html');
	return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

function wrapListItem(item: string, level: number): string {
	// Determine the type of list (ul or ol) based on the presence of ql-indent class
	const listType = item.includes('ql-indent-') ? 'ul' : 'ol';

	// Construct the opening and closing tags for the list
	const listOpeningTag = `<${listType}>`;
	const listClosingTag = `</${listType}>`;
	let wrappedItem = listOpeningTag + item;

	// Calculate the number of closing tags needed to match the indentation level
	const closingTagsCount = level > 0 ? level : 0;

	// Add closing tags to match the indentation level
	for (let i = 0; i < closingTagsCount; i++) {
		wrappedItem += listClosingTag;
	}

	return wrappedItem;
}

// const BubbleTheme = Quill.import('themes/bubble');

// class ExtendBubbleTheme extends BubbleTheme {
// 	constructor(quill: Quill, options: any) {
// 		super(quill, options);

// 		quill.on('selection-change', (range) => {
// 			if (range) {
// 				const bounds = quill.getBounds(range.index);
// 				const quillAny = quill as any;
// 				quillAny.theme.tooltip.show();
// 				quillAny.theme.tooltip.position(bounds);
// 			}
// 		});
// 	}
// }

// Quill.register('themes/bubble', ExtendBubbleTheme);

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
				placeholder: 'add some text here...',
				//bounds: editorRef.current,
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

			const toolbar = quillInstanceRef.current.getModule('toolbar') as any;

			// clean logic redesign
			// remove all the formatting except bullet point related style first
			// then apply the corresponding default css style to it.
			toolbar.addHandler('clean', function () {
				const quill = quillInstanceRef.current;
				if (quill) {
					const range = quill.getSelection();
					if (range && range.length > 0) {
						const defaultFormats = {
							size: style?.fontSize || '12pt',
							font: style?.fontFamily || 'Arimo',
							bold: style?.fontWeight !== 'normal',
							italic: style?.fontStyle === 'italic',
							color: style?.color,
						};
						const formats = quill.getFormat(range.index, range.length);
						const originalListFormat = formats['list'];

						Object.keys(formats).forEach((format: string) => {
							quill.format(format, false, Quill.sources.USER);
						});
						if (originalListFormat) {
							quill.format('list', originalListFormat, Quill.sources.USER);
						}
						(
							Object.keys(defaultFormats) as Array<keyof typeof defaultFormats>
						).forEach((formatKey) => {
							const formatValue = defaultFormats[formatKey];
							if (formatValue !== undefined) {
								quill.formatText(
									range.index,
									range.length,
									formatKey,
									formatValue,
									Quill.sources.USER,
								);
							}
						});
					}
				}
			});

			// insert link button
			toolbar.addHandler('link', () => {
				const quill = quillInstanceRef.current;
				if (quill) {
					const range = quill.getSelection();
					if (range && range.length > 0) {
						const formats = quill.getFormat(range);
						// Check if the selected text is already a link
						if (formats.link) {
							// If it is a link, remove the link format
							quill.format('link', false);
						} else {
							// If it is not a link, add the link format
							const text = quill.getText(range.index, range.length).trim();
							const urlRegex = /(?:https?:\/\/|www\.)[^\s]+/;
							if (urlRegex.test(text)) {
								quill.format('link', text);
							} else {
								const url = prompt('Enter a valid URL:', 'http://');
								if (url && urlRegex.test(url)) {
									quill.format('link', url);
								} else {
									alert('Please provide a valid URL.');
								}
							}
						}
					}
				}
			});

			editorRef.current.addEventListener('click', (event) => {
				const target = event.target as HTMLElement;
				// Check if the target is not null and is an anchor tag
				if (target && target.tagName === 'A') {
					const editorParent = target.closest('.ql-editor');
					if (editorParent) {
						event.preventDefault();
						let url = target.getAttribute('href');
						if (url) {
							if (url.startsWith('www.')) {
								url = 'https://' + url;
							}
							const newWindow = window.open(url, '_blank');
							if (newWindow) {
								newWindow.focus();
							} else {
								console.log('Popup blocked or failed to open');
							}
						}
					}
				}
			});

			const QuillDelta = Quill.import('delta');
			let combinedDelta = new QuillDelta();
		
			const insertContent = (item: string) => {
				if (isHTML(item)) {
					// Convert HTML string to Delta format
					const convertedDelta = quillInstanceRef.current?.clipboard.convert({ html: item });
					//console.log("Converted Delta:", convertedDelta);
			
					// Check if the converted Delta is empty or not properly formatted
					if (!convertedDelta || convertedDelta.ops.length === 0 ||
						(convertedDelta.ops.length === 1 && typeof convertedDelta.ops[0].insert === 'string' && !convertedDelta.ops[0].insert.trim())) {
						// Ensure a new line is inserted correctly if the converted content is empty
						return new QuillDelta().insert('\n');
					} else {
						// Return the converted Delta as is, assuming it has the necessary content and formatting
						return new QuillDelta(convertedDelta);
					}
				} else if (item.trim() === '') {
					// Handle case where item is meant to represent an empty line (like pressing Enter)
					return new QuillDelta().insert('\n');
				} else {
					// For plain text, insert it with the defined formatting options
					return new QuillDelta().insert(`${item}\n`, quillFormats);
				}
			};
		
			if (Array.isArray(content)) {
				content.forEach(item => {
					const itemDelta = insertContent(item);
					combinedDelta = combinedDelta.concat(itemDelta);
				});
			} else {
				combinedDelta = insertContent(content);
			}
			console.log(combinedDelta)
			quillInstanceRef.current.setContents(combinedDelta);
			

			// const Delta = Quill.import('delta');
			// let initialDelta = new Delta();

			// const insertContent = (item: string) => {
			// 	if (isHTML(item)) {
			// 		console.log(isHTML(item),item)
			// 		const convertedDelta = quillInstanceRef?.current?.clipboard.convert({'html': item});
			// 		console.log(convertedDelta)
			// 		if (convertedDelta && convertedDelta?.ops?.length === 0 || 
			// 		   (convertedDelta?.ops?.length === 1 && typeof convertedDelta.ops[0].insert === 'string' && !convertedDelta.ops[0].insert.trim())) {
			// 			// If it's empty, we might want to ensure a new line is inserted correctly
			// 			initialDelta.insert('\n');
			// 		} 
			// 		else {
			// 			initialDelta = initialDelta.concat(convertedDelta as any);
			// 			if (item.includes('<p>')) {
			// 				initialDelta.insert('\n');
			// 			} 
			// 			else{
			// 				initialDelta.insert(item)
			// 			}
			// 		}
			// 	} 
			// 	else if (item.trim() === '') {
			// 		// For items meant to represent an empty line (like pressing Enter), insert a paragraph break
			// 		initialDelta.insert('\n');
			// 	} 
			// 	else {
			// 		initialDelta.insert(`${item}\n`, quillFormats);
			// 	}
			// };

			//iterate throught the content array, if it's <li> tag, wrap into <ul> tag
			//let combinedDelta = new Quill.import('delta')();
			// if (Array.isArray(content)) {
			// 	content.forEach((item) => {
			// 		// if (isHTML(item)) {
			// 		// 	if (item.trim().startsWith('<li') && item.includes('ql-indent-')) {
			// 		// 		// Find the level of indentation from the class
			// 		// 		const indentLevel = item.match(/ql-indent-(\d+)/);
			// 		// 		const level = indentLevel ? parseInt(indentLevel[1], 10) : 0;
			// 		// 		item = wrapListItem(item, level);
			// 		// 	} 
			// 		// 	else if (item.trim().startsWith('<li') && item.trim().endsWith('</li>')) {
			// 		// 		item = `<ul>${item}</ul>`;
			// 		// 	}
			// 		// 	insertContent(item);
			// 		// } else {
			// 		// 	insertContent(item);
			// 		// }
			// 		insertContent(item);
			// 	});
			// } else {
			// 	insertContent(content);
			// }
			//quillInstanceRef.current.setContents(initialDelta);

			quillInstanceRef.current.on('text-change', () => {
				isTextChangeRef.current = true;
			});

			quillInstanceRef.current.on('selection-change', () => {
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
