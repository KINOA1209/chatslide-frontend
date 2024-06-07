import React, {
	useEffect,
	useRef,
	useState,
	useMemo,
	useCallback,
} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import themeColorConfigData from './templates_customizable_elements/theme_color_options';
import '@/app/css/style.css';
import { stopArrowKeyPropagation } from '@/utils/editing';
import '@/components/socialPost/socialPostCustomFonts.css';
import { SlRefresh } from 'react-icons/sl';
import ReactDOMServer from 'react-dom/server';
import { useChatHistory } from '@/hooks/use-chat-history';
import { Delta } from 'quill/core';
import List, { ListContainer } from 'quill/formats/list';
import { useProject } from '@/hooks/use-project';

type QuillEditableProps = {
	content: string | string[];
	handleBlur: (newContent: string | string[]) => void;
	isVerticalContent: boolean;
	templateKey?: string;
	style?: React.CSSProperties;
	need_placeholder?: boolean;
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
	'Big Shoulders Display Bold',
	'Big Shoulders Display SemiBold',
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
	'Inter Regular',
	'Lemonada',
	'Libre Baskerville Regular',
	'Libre Baskerville Bold',
	'Nimbus Sans Regular',
	'Nunito',
	'Open Sans Regular',
	'Open Sans Medium',
	'Playfair Display Bold',
	'Playfair Display Medium',
	'Poppins Regular',
	'Poppins Medium',
	'Poppins SemiBold',
	'Poppins Bold',
	'Roboto Condensed Regular',
	'Roboto Condensed Medium',
	'Roboto Condensed Bold',
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

// file in quill/formats/list.js
class UListContainer extends ListContainer {}
UListContainer.blotName = 'list-container';
UListContainer.tagName = 'UL';

Quill.register(
	{
		'formats/list-container': UListContainer,
	},
	true,
);

const toolbarOptions = [
	['regenerate'],
	[
		{ size: Size.whitelist },
		{ font: Font.whitelist },
		'bold',
		'italic',
		'underline',
	],
	[
		'strike',
		'code-block',
		{ list: 'bullet' },
		{ script: 'sub' },
		{ script: 'super' },
	],
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
	[{ align: '' }, { align: 'center' }, { align: 'right' }, 'link', 'clean'],
	[{ direction: 'rtl' }],
];

const regenerateIconSVG = `
	<svg fill="#ACA1F6" stroke-width="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	<path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>
	</svg>`;

const icons = Quill.import('ui/icons') as any;
icons['regenerate'] = regenerateIconSVG;

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
	const { project } = useProject();
	const language = project?.language || 'English'
	const [hoveredSentence, setHoveredSentence] = useState({
		text: '',
		start: 0,
		end: 0,
		hasLeadingSpace: false,
		hasTrailingSpace: false,
	});
	const regenerateTextRef = useRef('');
	const {
		chatHistory,
		addChatHistory,
		isChatWindowOpen,
		setIsChatWindowOpen,
		regenerateText,
		setRegenerateText,
		isRegenerateSelected,
		setIsRegenerateSelected,
	} = useChatHistory();

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
			quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
				return delta.compose(
					new Delta().retain(delta.length(), {
						color: false,
						background: false,
						bold: false,
						strike: false,
						underline: false,
					}),
				);
			});
		}
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				editorRef.current &&
				!editorRef.current.contains(event.target as Node)
			) {
				if (isTextChangeRef.current) {
					const currentContent = quillInstanceRef.current?.root.innerHTML;
					if (currentContent !== undefined) {
						isTextChangeRef.current = false;
						processAndSaveContent(currentContent);
					}
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isVerticalContent]);

	const processAndSaveContent = (currentContent: string) => {
		if (isVerticalContent) {
			const doc = new DOMParser().parseFromString(currentContent, 'text/html');
			let extractedContent: string[] = [];

			const bodyChildren = Array.from(doc.body.children);
			bodyChildren.forEach((el) => {
				if (
					el.tagName.toLowerCase() === 'ul' ||
					el.tagName.toLowerCase() === 'ol'
				) {
					const listItems = Array.from(el.querySelectorAll('li')).map(
						(li) => li.outerHTML || '',
					);
					extractedContent.push(...listItems);
				} else {
					extractedContent.push(el.outerHTML || el.textContent?.trim() || '');
				}
			});
			handleBlur(extractedContent);
		} else {
			handleBlur(currentContent);
		}
	};

	useEffect(() => {
		if (editorRef.current && !quillInstanceRef.current) {
			const BlockPrototype: any = Quill.import('blots/block');

			class DefaultSytleBlock extends BlockPrototype {
				constructor(domNode: HTMLElement, value: string) {
					super(domNode, value);
					this.format('size', (style?.fontSize as string) || '16pt');
					this.format('font', style?.fontFamily || 'Arimo');
					this.format('bold', style?.fontWeight === 'bold' ? 'bold' : 'normal');
					this.format(
						'italic',
						style?.fontStyle === 'italic' ? 'italic' : 'normal',
					);
					this.format('align', style?.textAlign || 'left');
					this.format('direction', language === 'Arabic' || language === 'Hebrew' ? 'rtl' : 'ltr',)
				}

				static tagName = 'P';

				format(name: string, value: string) {
					switch (name) {
						case 'size':
							this.domNode.style.fontSize = value;
							break;
						case 'font':
							this.domNode.style.fontFamily = value;
							break;
						case 'bold':
							this.domNode.style.fontWeight = value;
							break;
						case 'italic':
							this.domNode.style.fontStyle = value;
							break;
						case 'align':
							this.domNode.style.textAlign = value;
							break;
						case 'direction':
							this.domNode.style.direction = value;
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
				Array.from(customizedToolbarOptions).forEach((option: any) => {
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
			const quillOptions: any = {
				modules: {
					toolbar: {
						container: toolbarOptions,
						handlers: {
							regenerate: () => {
								setRegenerateText(regenerateTextRef.current);
								setIsChatWindowOpen(true);
								addChatHistory({
									role: 'assistant',
									content:
										'To proceed with regenerating your selected sentence, please select the desired tone:',
									choices: [
										'Detailed',
										'Simple',
										'Engaging',
										'Informative',
										'Persuasive',
										'Professional',
										'Entertaining',
										'Dramatic',
									],
								});
							},
						},
					},
				},
				theme: 'bubble',
			};

			if (need_placeholder) {
				quillOptions.placeholder = '';
			}

			const quill = new Quill(editorRef.current, quillOptions);
			quillInstanceRef.current = quill;
			//setupCustomButton(quill)
			//console.log(style?.textAlign)
			// const toolbar = quillInstanceRef.current.getModule('toolbar');
			// toolbar.addHandler('color', showColorPicker);
			const quillFormats = {
				size: style?.fontSize,
				bold: style?.fontWeight !== 'normal',
				italic: style?.fontStyle === 'italic',
				color: style?.color,
				list:
					isVerticalContent || style?.display === 'list-item'
						? 'bullet'
						: undefined,
				font: style?.fontFamily,
				align: style?.textAlign || 'left',
				direction: language === 'Arabic' || language === 'Hebrew' ? 'rtl' : 'ltr'
			};

			if (language === 'Arabic' || language === 'Hebrew') {
				quillFormats.align = 'right'
			}
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
							align: style?.textAlign || 'left',
						};
						const formats = quill.getFormat(range.index, range.length);
						const originalListFormat = formats['list'];

						Array.from(Object.keys(formats)).forEach((format: string) => {
							quill.format(format, false, Quill.sources.USER);
						});
						if (originalListFormat) {
							quill.format('list', originalListFormat, Quill.sources.USER);
						}
						Array.from(
							Object.keys(defaultFormats) as Array<keyof typeof defaultFormats>,
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
				} else if (item && item.trim() === '') {
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
					processAndSaveContent(currentContent);
				}
			});
		}
	}, [handleBlur, content, style]);

	useEffect(() => {
		const quill = quillInstanceRef.current;
		if (quill) {
			const handleSelectionChange = (range: any) => {
				if (range && range.index !== null && range.length !== 0) {
					//const sentence = getSentenceAtPosition(range.index, range.index + range.length);
					const actualText = quill.getText(range.index, range.length);
					const trimmedText = quill.getText(range.index, range.length).trim();

					// Determine if there are leading and trailing spaces
					const hasLeadingSpace = actualText.startsWith(' ');
					const hasTrailingSpace = actualText.endsWith(' ');
					setHoveredSentence({
						text: actualText,
						start: range.index,
						end: range.index + range.length,
						hasLeadingSpace: hasLeadingSpace,
						hasTrailingSpace: hasTrailingSpace,
					});
					regenerateTextRef.current = trimmedText;
					//setRegenerateText(sentence.text)
				}
			};

			quill.on('selection-change', handleSelectionChange);

			return () => {
				quill.off('selection-change', handleSelectionChange);
			};
		}
	}, []);

	useEffect(() => {
		const quill = quillInstanceRef.current;
		const defaultFormats = {
			size: style?.fontSize || '12pt',
			font: style?.fontFamily || 'Arimo',
			bold: style?.fontWeight !== 'normal',
			italic: style?.fontStyle === 'italic',
			color: style?.color,
			align: style?.textAlign || 'left',
		};
		if (quill && isRegenerateSelected && hoveredSentence.text) {
			if (regenerateText && hoveredSentence.text !== regenerateText) {
				// Delete the old text and insert the new one
				const textToInsert =
					(hoveredSentence.hasLeadingSpace ? ' ' : '') +
					regenerateText +
					(hoveredSentence.hasTrailingSpace ? ' ' : '');
				quill.deleteText(
					hoveredSentence.start,
					hoveredSentence.end - hoveredSentence.start,
				);
				quill.insertText(
					hoveredSentence.start,
					textToInsert,
					defaultFormats,
					'user',
				);
				//const newEndIndex = hoveredSentence.start + regenerateText.length;
				setHoveredSentence({
					text: '',
					start: 0,
					end: 0,
					hasLeadingSpace: false,
					hasTrailingSpace: false,
				});
				// Update the selection to cover the new text
				quill.setSelection(hoveredSentence.start, textToInsert.length);
				setIsRegenerateSelected(false);
			}
		}
	}, [isRegenerateSelected, hoveredSentence, regenerateText, quillInstanceRef]);

	useEffect(() => {
		if (quillInstanceRef.current && style) {
			const excludeProperties = [
				'fontSize',
				'fontWeight',
				'fontStyle',
				'display',
				'fontFamily',
				'textAlign',
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
	//console.log(hoveredSentence)

	return (
		<div>
			<div ref={editorRef}></div>
		</div>
	);
};

export default React.memo(QuillEditable);
