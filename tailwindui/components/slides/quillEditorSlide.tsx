import React, { useEffect, useRef, useState, useMemo, use } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import themeColorConfigData from './templates_customizable_elements/theme_color_options';
import '@/app/css/style.css';
import { stopArrowKeyPropagation } from '@/utils/editing';
import '@/components/socialPost/socialPostCustomFonts.css';

type QuillEditableProps = {
	content: string | string[];
	handleBlur: (newContent: string | string[]) => void;
	isVerticalContent: boolean;
	templateKey?: string;
	style?: React.CSSProperties;
	need_placeholder?:boolean
};

// const generateFontSizes = (): string[] => {
// 	const sizes = [];
// 	for (let i = 8; i <= 80; i += 1) {
// 		sizes.push(`${i}pt`);
// 	}
// 	return sizes;
// };

// const fontSizes = generateFontSizes();

//use attributors instead of formats to avoid requirement of hyphens
export const fontWhiteList = [
	'Arimo',
	'Arial',
	'Assistant Medium',
	'Assistant Regular',
	'Big Shoulders Text',
	'Brygada 1918 SemiBold',
	'Caveat',
	'Caveat Medium',
	'Caveat Regular',
	'Cormorant',
	'Creato Display Medium',
	'Creato Display Regular',
	'Creato Display Thin',
	'DM Sans Regular',
	'DM Sans Medium',
	'DM Sans Bold',
	'Georgia',
	'Helvetica Neue',
	'Lemonada',
	'Libre Baskerville Regular',
	'Libre Baskerville Bold',
	'Nimbus Sans Regular',
	'Nunito',
	'Open Sans Regular',
	'Open Sans Medium',
	'Playfair Display Bold',
	'Playfair Display Medium',
	'Rubik',
	'Sansita Swashed Regular',
	'Sansita Swashed Medium',
	'Yrsa Medium',
];

function isKeyOfThemeColorConfig(
	key: string | null | undefined,
): key is keyof typeof themeColorConfigData {
	if (key == null) {
		return false;
	}
	return key in themeColorConfigData;
}

//use attributors instead of formats to avoid requirement of hyphens
const Font = Quill.import('attributors/style/font') as any;
Font.whitelist = fontWhiteList;
Quill.register(Font, true);

let Size = Quill.import('attributors/style/size') as any;
Size.whitelist = [
	'8pt',
	'9pt',
	'10pt',
	'12pt',
	'13pt',
	'14pt',
	'16pt',
	'18pt',
	'20pt',
	'22pt',
	'24pt',
	'26pt',
	'28pt',
	'30pt',
	'32pt',
	'40pt',
	'44pt',
	'45pt',
	'48pt',
	'64pt',
];
Quill.register(Size, true);

const toolbarOptions = [
	[{ size: Size.whitelist }, { font: Font.whitelist }, 'bold', 'italic', 'underline'],
	['strike', 'code-block', { list: 'bullet' }, { script: 'sub' }, { script: 'super' }],
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
	[{ align: '' }, { align: 'center' }, { align: 'right' },'link', 'clean'],
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

const QuillEditable: React.FC<QuillEditableProps> = ({
	content,
	handleBlur,
	style,
	isVerticalContent,
	templateKey,
	need_placeholder = true,
}) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillInstanceRef = useRef<Quill | null>(null);
	const isTextChangeRef = useRef(false);

	useEffect(() => {
		// stop arrow key and esc key propagation
		const editor = editorRef.current;
		if (editor) {
			editor.addEventListener('keydown', stopArrowKeyPropagation);
		}

		return () => {
			if (editor) {
				editor.removeEventListener('keydown', stopArrowKeyPropagation);
			}
		};
	}, []);

	useEffect(() => {
		const quill = quillInstanceRef.current;
		if (quill) {
			quill.root.style.minWidth = '100%';
		}
	}, []);

	useEffect(() => {
		if (editorRef.current && !quillInstanceRef.current) {
			const BlockPrototype: any = Quill.import('blots/block');

			class DefaultSytleBlock extends BlockPrototype {
				constructor(domNode: HTMLElement, value: string) {
					super(domNode, value);
					this.format("size", style?.fontSize as string || "16pt");
					this.format("font", style?.fontFamily || 'Arimo')
					this.format("bold", style?.fontWeight === 'bold' ? 'bold' : 'normal');
					this.format("italic", style?.fontStyle === 'italic' ? 'italic' : 'normal');
					this.format("align", style?.textAlign || 'left');
				}

				static tagName = 'P';

				format(name: string, value: string) {
					switch (name) {
						case "size":
							this.domNode.style.fontSize = value;
							break;
						case "font":
							this.domNode.style.fontFamily = value;
							break;
						case "bold":
							this.domNode.style.fontWeight = value;
							break;
						case "italic":
							this.domNode.style.fontStyle = value;
							break;
						case "align":
							this.domNode.style.textAlign = value;
							break;
						default:
							super.format(name, value);
					}
				}
			}
			Quill.register(DefaultSytleBlock, true);

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
			const quillOptions:any = {
				modules: { toolbar: customizedToolbarOptions },
				theme: 'bubble',
			}

			if (need_placeholder){
				quillOptions.placeholder = 'Text here...'
			}

			quillInstanceRef.current = new Quill(editorRef.current, quillOptions);
			//console.log(style?.textAlign)
			// const toolbar = quillInstanceRef.current.getModule('toolbar');
			// toolbar.addHandler('color', showColorPicker);
			const quillFormats = {
				size: style?.fontSize,
				bold: style?.fontWeight !== 'normal',
				italic: style?.fontStyle === 'italic',
				color: style?.color,
				list: (isVerticalContent || style?.display === 'list-item') ? 'bullet' : undefined,
				font: style?.fontFamily,
				align: style?.textAlign || 'left'
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
							align: style?.textAlign || 'left'
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
								const url = prompt('Enter a valid URL:', '');
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
				let itemDelta = new QuillDelta();
				if (isHTML(item)) {
					// Convert HTML string to Delta format
					const convertedDelta = quillInstanceRef.current?.clipboard.convert({
						html: item,
					});
					//console.log("Converted Delta:", convertedDelta);

					// Check if the converted Delta is empty or not properly formatted
					if (
						!convertedDelta ||
						convertedDelta.ops.length === 0 ||
						(convertedDelta.ops.length === 1 &&
							typeof convertedDelta.ops[0].insert === 'string' &&
							!convertedDelta.ops[0].insert.trim())
					) {
						// Ensure a new line is inserted correctly if the converted content is empty
						itemDelta.insert('\n');
					} else {
						// Return the converted Delta as is, assuming it has the necessary content and formatting
						// make sure <p> has new line between, while list dont require it.
						// this is for the case like two or more consecutive <p> element will merge into one delta if we dont set \n
						itemDelta = itemDelta.concat(convertedDelta);
						if (item.includes('<p>')) {
							convertedDelta.insert('\n');
						}
					}
				} else if (item && typeof item === 'string' && item.trim() === '') {
					// Handle case where item is meant to represent an empty line (like pressing Enter)
					itemDelta.insert('\n');
				} else {
					// For plain text, insert it with the defined formatting options
					itemDelta.insert(`${item}\n`, quillFormats);
				}
				return itemDelta;
			};

			if (Array.isArray(content)) {
				content.forEach((item) => {
					const itemDelta = insertContent(item);
					combinedDelta = combinedDelta.concat(itemDelta);
				});
			} else {
				combinedDelta = insertContent(content);
			}
			quillInstanceRef.current.setContents(combinedDelta);

			quillInstanceRef.current.on('text-change', (delta, oldDelta, source) => {
				if (source === 'user') {
					const quill = quillInstanceRef.current;
					if (quill) {
						const regex = /(?:https?:\/\/|www\.)\S+\b/g;
						const text = quill.getText();
						let match;
						// index wrong when link feature is triggered
						let lastMatchEndIndex = 0;

						while ((match = regex.exec(text)) !== null) {
							const url = match[0];
							const startIndex = match.index;
							const urlLength = url.length;

							const formats = quill.getFormat(startIndex, urlLength);
							if (!formats.link) {
								quill.formatText(
									{ index: startIndex, length: urlLength },
									'link',
									url,
								);
								lastMatchEndIndex = startIndex + urlLength;
							}
						}

						// Set cursor position to the end of the last formatted link if a link was formatted
						if (lastMatchEndIndex > 0) {
							quill.setSelection(lastMatchEndIndex, 0, Quill.sources.SILENT);
						}

						// Mark content changed for auto-saving
						isTextChangeRef.current = true;
					}
				}
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
				'textAlign'
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
