import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sanitizeHtml from 'sanitize-html';
import './slidesHTML.css';
import {
	availableTemplates,
} from '@/components/slides/slideTemplates';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import LayoutChanger from './LayoutChanger';
import {
	PresentButton,
	SlideLeftNavigator,
	SlideRightNavigator,
	SlidePagesIndicator,
	AddSlideButton,
	DeleteSlideButton,
	ChangeTemplateOptions,
} from './SlideButtons';

import SlideContainer from './SlideContainer';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { templateDispatch } from './templateDispatch';
import { availableLayouts } from './slideLayout';
import TestSlidesData from './TestSlidesData.json';
import AuthService from '@/services/AuthService';
import customizable_elements from './templates_customizable_elements/customizable_elements';
import ScriptEditor from './ScriptEditor';
import Slide, { SlideKeys } from '@/models/Slide';

type SlidesHTMLProps = {
	slides: Slide[];
	setSlides: Function;
	isViewing?: boolean; // viewing another's shared project
	transcriptList?: string[];
	setTranscriptList?: (transcriptList: string[]) => void;
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
  isPresenting?: boolean;
  initSlideIndex?: number;
};

// Load customizable elements from session storage or use default values
export const loadCustomizableElements = (templateName: string) => {
	const customizableElements = JSON.parse(
		sessionStorage.getItem('customizableElements') || '{}',
	);
	return customizableElements[templateName] || {};
};

// it will render the slides fetched from `foldername` in sessionStorage
const SlidesHTML: React.FC<SlidesHTMLProps> = ({
	slides,
	setSlides,
	isViewing = false,
	transcriptList = [],
	setTranscriptList = () => {},
	exportSlidesRef = useRef<HTMLDivElement>(null),
  isPresenting = false,
  initSlideIndex = 0,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(initSlideIndex);
	const foldername =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('foldername')
			: '';
	const project_id =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('project_id')
			: '';
	// default to use test data for slides
	const res_slide =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('presentation_slides') ||
				JSON.stringify(TestSlidesData)
			: '';

	const [chosenLayout, setChosenLayout] = useState<LayoutKeys>('');

	const [showLayout, setShowLayout] = useState(false);
  const [present, setPresent] = useState(isPresenting);
	const slideRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [saveStatus, setSaveStatus] = useState('Up to date');
	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 960,
		height: typeof window !== 'undefined' ? window.innerHeight : 540,
	});
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const isFirstRender = useRef(true);
	const [isEditMode, setIsEditMode] = useState(false);

	const [presentScale, setPresentScale] = useState(
		Math.min(dimensions.width / 960, dimensions.height / 540),
	);
	const [nonPresentScale, setNonPresentScale] = useState(
		Math.min(1, presentScale * 0.9),
	);

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			//console.log('window.innerWidth', window.innerWidth);
			setNonPresentScale(Math.min(1, (window.innerWidth / 960) * 0.9));
			//console.log('nonPresentScale', nonPresentScale);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (unsavedChanges) {
			setSaveStatus('Unsaved changes');
		}
	});

	// set customizableElements for templates
	useEffect(() => {
		sessionStorage.setItem(
			'customizableElements',
			JSON.stringify(customizable_elements),
		);
	}, []);

	useEffect(() => {
		console.log('layout Changed to: ', chosenLayout);
		setUnsavedChanges(true);
		saveSlides();
	}, [chosenLayout]);

	// Function to change the template of slides starting from the second one
	const changeTemplate = (newTemplate: string) => {
		console.log('Changing template to:', newTemplate);
		const newSlides = slides.map((slide, index) => {
			// Keep the template of the first slide unchanged
			//   if (index === 0) {
			//     return slide
			//   }
			// Update the template for slides starting from the second one
			return { ...slide, template: newTemplate };
		});
		// console.log('Slides after changing template:', newSlides)
		sessionStorage.setItem('schoolTemplate', newTemplate);
		setSlides(newSlides);

		console.log('Slides after changing template:', newSlides);

		setUnsavedChanges(true);
		saveSlides();
	};

	// Function to send a request to auto-save slides
	const saveSlides = async () => {
		if (isViewing) {
			console.log("Viewing another's shared project, skip saving");
			return;
		}

		if (slides.length === 0) {
			console.log('slides not yet loaded, skip saving');
			return;
		}

		if (!foldername) {
			console.log('Foldername not found, skip saving');
			return;
		}

		setSaveStatus('Saving...');

		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();
		const formData = {
			foldername: foldername,
			final_slides: slides,
			project_id: project_id,
		};
		// Send a POST request to the backend to save finalSlides
		fetch('/api/save_slides', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (response.ok) {
					setUnsavedChanges(false);
					console.log('Auto-save successful.');
					setSaveStatus('Up to date');
				} else {
					// Handle save error
					console.error('Auto-save failed.');
				}
			})
			.catch((error) => {
				// Handle network error
				console.error('Auto-save failed:', error);
			});
	};

	const openModal = () => {
		setShowLayout(true);
	};

	const closeModal = () => {
		setShowLayout(false);
	};

	const openPresent = () => {
		toast.success(
			'Use ESC to exit presentation mode, use arrow keys to navigate slides.',
		);
		setPresent(true);
	};

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === 'Escape') {
				setPresent(false); // Exit presentation mode
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		// Cleanup: remove the event listener when the component is unmounted
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []); // Empty dependency array to ensure this effect runs only once (similar to componentDidMount)

	// fetch slides data
	useEffect(() => {
    if (res_slide) {
			//console.log('typeof res_slide:', typeof res_slide);
			// const slides_response_JSON = JSON.stringify(TestSlidesData)
			const parsed_slides = JSON.parse(res_slide);
			// console.log('parseSlides:', parsed_slides)
			// log the type of parsed_slides
			//console.log('typeof parsed_slides:', typeof parsed_slides);

			// mapping data to slides
			const slidesArray: Slide[] = Object.keys(parsed_slides).map(
				(key, index) => {
					const slideData = parsed_slides[key];
					//console.log('slideData:', slideData);
					const slide = new Slide();
					slide.head = slideData.head || 'New Slide';
					slide.title = slideData.title || 'New Slide';
					slide.subtopic = slideData.subtopic || 'New Slide';
					slide.userName = slideData.userName || '';
					slide.template =
						slideData.template ||
						sessionStorage.getItem('schoolTemplate') ||
						('Default' as TemplateKeys);
					slide.content = slideData.content || [
						'Some content here',
						'Some more content here',
						'Even more content here',
					];
					slide.images = slideData.images || [];
					// console.log(
					//     'slideData.content.length',
					//     slideData.content.length
					// );
					slide.logo = slideData.logo || 'Default';
					if (index === 0) {
						slide.layout =
							slideData.layout || ('Cover_img_1_layout' as LayoutKeys);
					} else {
						// choose default layout based on number of bullet points
						if (slideData.content.length === 1) {
							slide.layout =
								slideData.layout || ('Col_2_img_1_layout' as LayoutKeys);
						} else if (slideData.content.length === 2) {
							slide.layout =
								slideData.layout || ('Col_2_img_2_layout' as LayoutKeys);
						} else if (slideData.content.length === 3) {
							// Generate a random number between 0 and 1
							const randomNumber = Math.random();
							// Choose layout based on probability distribution
							if (randomNumber < 0.7) {
								slide.layout =
									slideData.layout || ('Col_3_img_0_layout' as LayoutKeys);
							} else {
								slide.layout =
									slideData.layout || ('Col_3_img_3_layout' as LayoutKeys);
							}
						}
					}

					// Return the modified slide object
					return slide;
				},
			);
			//console.log('the parsed slides array:', slidesArray);
			setSlides(slidesArray);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			console.log('First render, skip saving');
		} else {
			console.log('slides changed');
			setUnsavedChanges(true);
			saveSlides();
		}
	}, [slides]);

	const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Specify the type as HTMLDivElement

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = -20; // Set the scroll position to the left
		}
	}, []);

	function loadHtmlFile(foldername: string, filename: string) {
		console.log('start reloading html file');
		fetch(`/api/html?foldername=${foldername}&filename=${filename}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();
			})
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				console.log('doc info:', doc);
				displaySlides(doc);
				console.log('loaded slides information', doc);
				sessionStorage.setItem('html', 'html_init.html');
			})
			.catch((error) => {
				console.error('Failed to load HTML file:', error);
			});
	}

	function displaySlides(doc: Document) {
		const slideElements = Array.from(doc.getElementsByClassName('slide'));
		console.log('display slides information', slideElements);
		const newSlides: Slide[] = slideElements.map((slide, index) => {
			const elements = new Slide();
			const slideChildren = Array.from(slide.children);
			for (const child of slideChildren) {
				// need backend to return the layout class
				let className = child.className;
				// console.log('className:', className)
				// console.log('child inner html:', child.innerHTML.trim())
				if (className === 'head' && child.innerHTML.trim() !== '') {
					elements.head = sanitizeHtml(child.innerHTML);
				} else if (className === 'title' && child.innerHTML.trim() !== '') {
					elements.title = sanitizeHtml(child.innerHTML);
				} else if (className === 'userName' && child.innerHTML.trim() !== '') {
					elements.userName = sanitizeHtml(child.innerHTML);
				} else if (className === 'subtopic' && child.innerHTML.trim() !== '') {
					// console.log('child inner html:', child.innerHTML.trim())
					elements.subtopic = sanitizeHtml(child.innerHTML);
				} else if (
					className === 'template' &&
					child.textContent?.trim() !== ''
				) {
					// console.log('template child:', child.textContent?.trim())
					// Use child.textContent for simple string content
					elements.template = sanitizeHtml(
						child.textContent ?? '',
					) as TemplateKeys; // Use nullish coalescing
				} else if (className === 'layout' && child.textContent?.trim() !== '') {
					// Use child.textContent for simple string content
					elements.layout = sanitizeHtml(child.textContent ?? '') as LayoutKeys; // Use nullish coalescing
					console.log('layout: ', elements.layout);
				} else if (className === 'content' && child.innerHTML.trim() !== '') {
					const listItems = Array.from(child.getElementsByTagName('li'));
					elements.content = listItems.map((li) => sanitizeHtml(li.innerHTML));
				} else if (child.className === 'images') {
					const listItems = Array.from(child.getElementsByTagName('img'));
					console.log('listItems of imgs:', listItems);
					let urls = listItems.map((img) => {
						const src = img.getAttribute('src');
						if (src) {
							return src;
						} else {
							return '';
						}
					});
					elements.images = urls;
				}
			}

			// default template
			if (elements.template === ('' as TemplateKeys)) {
				// if (index === 0) {
				//   elements.template = 'First_page_img_1'
				// } else {
				//   elements.template = 'Col_1_img_0'
				// }
				elements.template = 'Default';
			}

			// default layout setting

			if (index === 0) {
				elements.layout = 'Cover_img_1_layout' as LayoutKeys;
				setChosenLayout(elements.layout);
				// console.log('current page is cover page: ', elements.layout)
			} else if (index !== 0 && index % 2 === 0) {
				elements.layout = 'Col_2_img_1_layout' as LayoutKeys;
				setChosenLayout(elements.layout);
				// console.log('current page is non cover page: ', elements.layout)
			} else if (index !== 0 && index % 2 !== 0) {
				elements.layout = 'Col_1_img_0_layout' as LayoutKeys;
				setChosenLayout(elements.layout);
				// console.log('current page is non cover page: ', elements.layout)
			}
			return elements;
		});

		console.log('new slides: ', newSlides);
		setSlides(newSlides);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!isEditMode) {
			if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
				goToSlide(currentSlideIndex + 1);
			} else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
				goToSlide(currentSlideIndex - 1);
			}
		}
	}

	// function handleSlideEdit(
	// 	content: string | string[],
	// 	slideIndex: number,
	// 	tag: SlideKeys,
	// ) {
	// 	setIsEditMode(false);
	// 	const newSlides = [...slides];

	// 	const currentSlide = newSlides[slideIndex];
	// 	const className = tag;

	// 	if (className === 'head') {
	// 		currentSlide.head = content as string;
	// 	} else if (className === 'title') {
	// 		currentSlide.title = content as string;
	// 	} else if (className === 'subtopic') {
	// 		currentSlide.subtopic = content as string;
	// 	} else if (className === 'userName') {
	// 		currentSlide.userName = content as string;
	// 	} else if (className === 'template') {
	// 		currentSlide.template = content as string;
	// 	} else if (className === 'layout') {
	// 		currentSlide.layout = content as LayoutKeys;
	// 	} else if (className === 'images') {
	// 		currentSlide.images = content as string[];
	// 	} else if (className === 'content') {
	// 		let newContent: string[] = [];
	// 		content = content as string[];
	// 		content.forEach((str) => {
	// 			newContent.push(...str.split('\n'));
	// 		});
	// 		newContent = newContent.filter((item) => item !== '');

	// 		if (newContent.length === 0) {
	// 			// leave one empty line for editing
	// 			newContent.push('');
	// 		}

	// 		currentSlide.content = newContent;
	// 	} else {
	// 		console.error(`Unknown tag: ${tag}`);
	// 	}
	// 	sessionStorage.setItem('presentation_slides', JSON.stringify(newSlides));
	// 	setSlides(newSlides);
	// }
	function handleSlideEdit(
		content: string | string[],
		slideIndex: number,
		tag: SlideKeys,
		contentIndex?: number,
	) {
		setIsEditMode(false);
		const newSlides = [...slides];
		// const newFinalSlides = [...finalSlides];

		const currentSlide = newSlides[slideIndex];
		const className = tag;

		if (className === 'head') {
			currentSlide.head = content as string;
		} else if (className === 'title') {
			currentSlide.title = content as string;
		} else if (className === 'subtopic') {
			currentSlide.subtopic = content as string;
		} else if (className === 'userName') {
			currentSlide.userName = content as string;
		} else if (className === 'template') {
			currentSlide.template = content as TemplateKeys;
		} else if (className === 'layout') {
			currentSlide.layout = content as LayoutKeys;
		} else if (className === 'logo') {
			currentSlide.logo = content as string;
		} else if (className === 'images') {
			currentSlide.images = content as string[];
		} else if (className === 'content') {
			if (Array.isArray(content)) {
				currentSlide.content = content as string[];
			} else {
				if (typeof contentIndex === 'number' && contentIndex >= 0) {
					currentSlide.content[contentIndex] = content as string;
				} else {
					console.error(`Invalid contentIndex: ${contentIndex}`);
				}
			}
		} else {
			console.error(`Unknown tag: ${tag}`);
		}
		sessionStorage.setItem('presentation_slides', JSON.stringify(newSlides));
		setSlides(newSlides);
		//console.log(newSlides)
	}

	function goToSlide(index: number) {
		console.log('Goinng to slide', index);
		isFirstRender.current = true;
		setCurrentSlideIndex(index);
	}

	function handleAddPage() {
		const newSlides = [...slides];
		const newSlide = new Slide();
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 0, newSlide);
		}
		setSlides(newSlides);
	}

	function handleDeletePage() {
		const newSlides = [...slides];
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 1);

			if (transcriptList.length > 0) {
				const newTranscriptList = [...transcriptList];
				newTranscriptList.splice(currentSlideIndex, 1);
				setTranscriptList(newTranscriptList);
			}

			if (currentSlideIndex >= newSlides.length) {
				setCurrentSlideIndex(newSlides.length - 1);
			}
		}
		setSlides(newSlides);
	}

	function toggleEditMode() {
		setIsEditMode(!isEditMode);
	}

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (urls: string[]) => {
			handleSlideEdit(urls, slideIndex, 'images');
		};
		return updateImgUrl;
	};

	function wrapWithLiTags(content: string): string {
		if (!content.includes('<li>') || !content.includes('</li>')) {
			return `<li style="font-size: 18pt;">${content}</li>`;
		}
		return content;
	}

	const editableTemplateDispatch = (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			canEdit,
			exportToPdfMode,
			isEditMode,
			saveSlides,
			setIsEditMode,
			handleSlideEdit,
			updateImgUrlArray,
			toggleEditMode,
			index === 0,
			slide.layout,
			slide.layout,
			index === currentSlideIndex,
			slide.logo,
		);

	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			{/* hidden div for export to pdf */}
			<div className='absolute left-[-9999px] top-[-9999px] -z-1'>
				<div ref={exportSlidesRef}>
					{/* Render all of your slides here. This can be a map of your slides array */}
					{slides.map((slide, index) => (
						<div
							key={`exportToPdfContainer` + index.toString()}
							style={{ pageBreakAfter: 'always' }}
						>
							<SlideContainer
								slides={slides}
								currentSlideIndex={index}
								templateDispatch={editableTemplateDispatch}
								exportToPdfMode={true}
							/>
						</div>
					))}
				</div>
			</div>

			{!isViewing && (
				<div className='py-2 hidden sm:block'>
					<ChangeTemplateOptions
						templateOptions={Object.keys(availableTemplates)}
						onChangeTemplate={changeTemplate}
					/>
				</div>
			)}

			{/* 4 buttons on smaller screen */}
			<div className='flex xl:hidden flex-row justify-between items-center gap-[1.25rem]'>
				<ButtonWithExplanation
					button={<PresentButton openPresent={openPresent} />}
					explanation='Present'
				/>

				{!isViewing && (
					<ButtonWithExplanation
						button={
							<LayoutChanger
								openModal={openModal}
								showLayout={showLayout}
								closeModal={closeModal}
								currentSlideIndex={currentSlideIndex}
								// templateSamples={templateSamples}
								slides={slides}
								handleSlideEdit={handleSlideEdit}
								availableLayouts={availableLayouts}
							/>
						}
						explanation='Change Layout'
					/>
				)}

				{!isViewing && currentSlideIndex != 0 && (
					<ButtonWithExplanation
						button={
							<AddSlideButton
								addPage={handleAddPage}
								currentSlideIndex={currentSlideIndex}
							/>
						}
						explanation='Add Page'
					/>
				)}

				{!isViewing && currentSlideIndex != 0 && (
					<ButtonWithExplanation
						button={
							<DeleteSlideButton
								deletePage={handleDeletePage}
								currentSlideIndex={currentSlideIndex}
							/>
						}
						explanation='Delete Page'
					/>
				)}
			</div>

			{/* buttons and contents */}
			<div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
				<ToastContainer />

				{/* vertical bar */}
				<div className='h-[540px] w-[144px] hidden xl:block mx-auto justify-center items-center'>
					<div className='h-full flex flex-col flex-nowrap py-2 overflow-y-auto  overflow-y-scroll overflow-x-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
						{Array(slides.length)
							.fill(0)
							.map((_, index) => (
								<div
									key={`previewContainer` + index.toString()}
									className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
									onClick={() => setCurrentSlideIndex(index)} // Added onClick handler
								>
									{/* {index + 1} */}
									<SlideContainer
										slides={slides}
										currentSlideIndex={index}
										scale={0.12}
										isViewing={true}
										templateDispatch={editableTemplateDispatch}
										slideRef={slideRef}
										containerRef={containerRef}
										highlightBorder={currentSlideIndex === index}
									/>
								</div>
							))}
					</div>
				</div>

				<div className='hidden lg:block'>
					<SlideLeftNavigator
						currentSlideIndex={currentSlideIndex}
						slides={slides}
						goToSlide={goToSlide}
					/>
				</div>

				<SlideContainer
					isPresenting={present}
					slides={slides}
					currentSlideIndex={currentSlideIndex}
					isViewing={isViewing}
					scale={present ? presentScale : nonPresentScale}
					templateDispatch={editableTemplateDispatch}
					slideRef={slideRef}
					containerRef={containerRef}
				/>

				<div className='hidden lg:block'>
					<SlideRightNavigator
						currentSlideIndex={currentSlideIndex}
						slides={slides}
						goToSlide={goToSlide}
					/>
				</div>

				{/* 4 buttons for change layout, present, add and add / delete slide */}
				<div className='hidden min-w-[128px] xl:flex flex-col justify-between items-start gap-[1.25rem]'>
					<ButtonWithExplanation
						button={<PresentButton openPresent={openPresent} />}
						explanation='Present'
					/>

					{!isViewing && (
						<ButtonWithExplanation
							button={
								<LayoutChanger
									openModal={openModal}
									showLayout={showLayout}
									closeModal={closeModal}
									currentSlideIndex={currentSlideIndex}
									// templateSamples={templateSamples}
									slides={slides}
									handleSlideEdit={handleSlideEdit}
									availableLayouts={availableLayouts}
								/>
							}
							explanation='Change Layout'
						/>
					)}

					{!isViewing && currentSlideIndex != 0 && (
						<ButtonWithExplanation
							button={
								<AddSlideButton
									addPage={handleAddPage}
									currentSlideIndex={currentSlideIndex}
								/>
							}
							explanation='Add Page'
						/>
					)}

					{!isViewing && currentSlideIndex != 0 && (
						<ButtonWithExplanation
							button={
								<DeleteSlideButton
									deletePage={handleDeletePage}
									currentSlideIndex={currentSlideIndex}
								/>
							}
							explanation='Delete Page'
						/>
					)}
				</div>

				{/* White modal for presentation mode */}
				{present && (
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: 'white',
							zIndex: 40,
						}}
					></div>
				)}
			</div>

			<div className='py-[1rem] flex flex-row items-center'>
				<div className='block lg:hidden'>
					<SlideLeftNavigator
						currentSlideIndex={currentSlideIndex}
						slides={slides}
						goToSlide={goToSlide}
					/>
				</div>
				<SlidePagesIndicator
					currentSlideIndex={currentSlideIndex}
					slides={slides}
					goToSlide={goToSlide}
				/>
				<div className='block lg:hidden'>
					<SlideRightNavigator
						currentSlideIndex={currentSlideIndex}
						slides={slides}
						goToSlide={goToSlide}
					/>
				</div>
			</div>

			{/* transcripotList */}
			{transcriptList.length > 0 && (
				<ScriptEditor
					transcriptList={transcriptList}
					setTranscriptList={setTranscriptList}
					currentSlideIndex={currentSlideIndex}
				/>
			)}

			{/* horizontal  */}
			<div className='block xl:hidden max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
				<div className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
					{Array(slides.length)
						.fill(0)
						.map((_, index) => (
							<div
								key={`previewContainer` + index.toString()}
								className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
								onClick={() => setCurrentSlideIndex(index)} // Added onClick handler
							>
								{/* {index + 1} */}
								<SlideContainer
									slides={slides}
									currentSlideIndex={index}
									scale={0.12}
									isViewing={true}
									templateDispatch={editableTemplateDispatch}
									highlightBorder={currentSlideIndex === index}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
export default SlidesHTML;
