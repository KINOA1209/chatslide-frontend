'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Theme, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import '@/components/slides/slidesHTML.css';
import LayoutChanger from '@/components/socialPost/socialPostLayoutChanger';
import ThemeChanger from '@/components/socialPost/socialPostThemeChanger';
import {
	PresentButton,
	SlideLeftNavigator,
	SlideRightNavigator,
	SlidePagesIndicator,
	AddSlideButton,
	DeleteSlideButton,
} from '@/components/socialPost/socialPostButtons';

import SocialPostContainer from '@/components/socialPost/socialPostContainer';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { templateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { templateDispatch as templateDispatch2 } from '@/components/socialPost//socialPostTemplate2Dispatch';
import { templateDispatch as templateDispatch3 } from '@/components/socialPost/socialPostTemplate3Dispatch';
import templates, {
	templateSamples,
} from '@/components/socialPost/socialPostTemplates';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import { useProject } from '@/hooks/use-project';

export interface SlideElement {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'br' | 'div';
	className:
		| 'topic'
		| 'subtopic'
		| 'keywords'
		| 'content'
		| 'template'
		| 'images'
		| 'section_title'
		| 'brief'
		| 'original_title'
		| 'English_title'
		| 'title'
		| 'illustration'
		| 'quote'
		| 'source'
		| 'theme';
	content: string | string[];
}

export type SlideKeys =
	| 'topic'
	| 'subtopic'
	| 'keywords'
	| 'content'
	| 'template'
	| 'images'
	| 'section_title'
	| 'brief'
	| 'original_title'
	| 'English_title'
	| 'title'
	| 'illustration'
	| 'quote'
	| 'source'
	| 'theme';

export class SocialPostSlide {
	topic: string;
	subtopic: string;
	keywords: string;
	content: string[];
	template: string;
	images: string[];
	section_title: string;
	brief: string;
	original_title: string;
	English_title: string;
	title: string;
	illustration: string[];
	quote: string;
	source: string;
	theme: ThemeObject;

	constructor() {
		this.topic = 'Your topic';
		this.subtopic = 'Your subtopic';
		this.keywords = 'Your keywords';
		this.content = ['Your content'];
		this.template = 'Col_1_img_0';
		this.images = [''];
		this.section_title = 'Your section title';
		this.brief = 'Your brief';
		this.original_title = 'Your Topic';
		this.English_title = '';
		this.title = '';
		this.illustration = [
			'https://stories.freepiklabs.com/storage/61572/life-in-a-city-cuate-9773.png',
		];
		this.quote = 'Your quote';
		this.source = 'Your source';
		this.theme = {
			border_start: '',
			border_end: '',
			cover_start: '',
			cover_end: '',
		};
	}
}

type SlidesHTMLProps = {
	socialPostSlides: SocialPostSlide[];
	setSocialPostSlides: Function;
	isViewing?: boolean; // viewing another's shared project
	finalSlideIndex?: number;
	setFinalSlideIndex?: Function;
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};

const SocialPostHTML: React.FC<SlidesHTMLProps> = ({
	socialPostSlides,
	setSocialPostSlides,
	isViewing = false,
	finalSlideIndex,
	setFinalSlideIndex,
	borderColorOptions,
	res_scenario,
}) => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
	const { project } = useProject();
	const foldername =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('foldername')
			: '';

	const project_id = project?.id || '';

	const res_slide =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('socialPost')
			: '';

	const cover_title =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic')
			: '';

	// const res_scenario =
	// 	typeof sessionStorage !== 'undefined'
	// 		? sessionStorage.getItem('scenarioType')
	// 		: '';

	const [showLayout, setShowLayout] = useState(false);
	const [present, setPresent] = useState(false);
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
	const presentScale = Math.min(
		dimensions.width / 450,
		dimensions.height / 600,
	);
	const nonPresentScale = Math.min(1, presentScale * 0.6);
	const [showTheme, setShowTheme] = useState(false);

	useEffect(() => {
		if (unsavedChanges) {
			setSaveStatus('Unsaved changes');
		}
	});

	// Watch for changes in finalSlides
	useEffect(() => {
		// if (isFirstRender.current) {
		//     isFirstRender.current = false;
		//     console.log('First render, skip saving')
		//     return;
		// }

		console.log('finalSlides changed');
		setUnsavedChanges(true);
		saveSlides();
	}, [socialPostSlides]);

	useEffect(() => {
		if (res_slide) {
			const parse_slide = JSON.parse(res_slide);
			const slidesArray: SocialPostSlide[] = Object.keys(parse_slide).map(
				(key, index) => {
					const slideData = parse_slide[key];
					const slide = new SocialPostSlide();
					if (index === 0) {
						if (res_scenario === 'casual_topic') {
							slide.template = slideData.template || 'First_page_img_1';
						} else if (res_scenario === 'serious_subject') {
							slide.English_title = slideData.English_title;
							slide.template =
								slideData.template || 'First_page_img_1_template2';
						} else if (res_scenario === 'reading_notes') {
							slide.template =
								slideData.template || 'First_page_img_1_template3';
						}
					} else {
						if (res_scenario === 'casual_topic') {
							slide.template = slideData.template || 'Col_1_img_0';
						} else if (res_scenario === 'serious_subject') {
							slide.template = slideData.template || 'img_0_template2';
						} else if (res_scenario === 'reading_notes') {
							slide.template = slideData.template || 'img_1_template3';
						}
					}
					slide.keywords = slideData.keywords || '';
					slide.topic = slideData.topic || 'Your topic here';
					slide.subtopic = slideData.subtopic;
					slide.images = slideData.images;
					slide.theme = slideData.theme;
					slide.content = slideData.content || ['Your content here'];
					slide.section_title = slideData.section_title || [
						'Your section title here',
					];
					slide.brief = slideData.brief || ['Your brief here'];
					slide.original_title = slideData.original_title || cover_title;
					slide.title = slideData.title || '';
					slide.illustration =
						slideData.illustration !== null
							? slideData.illustration
							: [
									'https://stories.freepiklabs.com/storage/61572/life-in-a-city-cuate-9773.png',
								];
					slide.quote = slideData.quote || 'Your quote here';
					slide.source = slideData.source || '';

					return slide;
				},
			);
			setSocialPostSlides(slidesArray);
		}
	}, []);
	// Function to send a request to auto-save finalSlides
	const saveSlides = async () => {
		if (isViewing) {
			console.log("Viewing another's shared project, skip saving");
			return;
		}

		if (socialPostSlides.length === 0) {
			console.log('Final slides not yet loaded, skip saving');
			return;
		}

		if (!foldername) {
			console.log('Foldername not found, skip saving');
			return;
		}
		setSaveStatus('Saving...');
		//console.log(finalSlides)
		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();

		const formData = {
			foldername: foldername,
			final_posts: socialPostSlides,
			project_id: project_id,
		};
		// Send a POST request to the backend to save finalSlides
		fetch('/api/save_social_posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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

	const openTheme = () => {
		setShowTheme(true);
	};

	const closeTheme = () => {
		setShowTheme(false);
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

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Specify the type as HTMLDivElement

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = -20; // Set the scroll position to the left
		}
	}, []);

	function handleKeyDown(event: KeyboardEvent) {
		if (!isEditMode) {
			if (
				event.key === 'ArrowRight' &&
				currentSlideIndex < socialPostSlides.length - 1
			) {
				goToSlide(currentSlideIndex + 1);
			} else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
				goToSlide(currentSlideIndex - 1);
			}
		}
	}

	function handleSlideEdit(
		content: string | string[] | ThemeObject,
		slideIndex: number,
		tag: SlideKeys | null,
		contentIndex?: number,
	) {
		setIsEditMode(false);
		const newSlides = [...socialPostSlides];

		const currentSlide = newSlides[slideIndex];
		const className = tag;

		if (className === 'subtopic') {
			currentSlide.subtopic = content as string;
		} else if (className === 'keywords') {
			currentSlide.keywords = content as string;
		} else if (className === 'topic') {
			currentSlide.topic = content as string;
		} else if (className === 'content') {
			if (typeof contentIndex === 'number' && contentIndex >= 0) {
				currentSlide.content[contentIndex] = content as string;
			} else {
				console.error(`Invalid contentIndex: ${contentIndex}`);
			}
		} else if (className === 'template') {
			currentSlide.template = content as string;
		} else if (className === 'images') {
			currentSlide.images = content as string[];
		} else if (className == 'section_title') {
			currentSlide.section_title = content as string;
		} else if (className == 'brief') {
			currentSlide.brief = content as string;
		} else if (className == 'original_title') {
			currentSlide.original_title = content as string;
		} else if (className == 'English_title') {
			currentSlide.English_title = content as string;
		} else if (className == 'title') {
			currentSlide.title = content as string;
		} else if (className == 'illustration') {
			currentSlide.illustration = content as string[];
		} else if (className == 'quote') {
			currentSlide.quote = content as string;
		} else if (className == 'source') {
			currentSlide.source = content as string;
		} else if (className === 'theme') {
			// Update theme for all slides
			newSlides.forEach((slide) => {
				slide.theme = content as ThemeObject;
			});
		} else {
			console.error(`Unknown tag: ${tag}`);
		}
		sessionStorage.setItem('socialPost', JSON.stringify(newSlides));
		setSocialPostSlides(newSlides);
	}

	function goToSlide(index: number) {
		console.log('Goinng to slide', index);
		isFirstRender.current = true;
		setCurrentSlideIndex(index);
		setFinalSlideIndex?.(index);
	}

	function toggleEditMode() {
		setIsEditMode(!isEditMode);
	}

	function handleAddPage() {
		const newSlides = [...socialPostSlides];
		const newSlide = new SocialPostSlide();
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 0, newSlide);
		}
		if (res_scenario === 'serious_subject') {
			newSlide.template = 'img_0_template2';
		} else if (res_scenario === 'reading_notes') {
			newSlide.template = 'img_1_template3';
		}
		setSocialPostSlides(newSlides);
	}

	function handleDeletePage() {
		const newSlides = [...socialPostSlides];
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 1);

			if (currentSlideIndex >= newSlides.length) {
				setCurrentSlideIndex(newSlides.length - 1);
				setFinalSlideIndex?.(newSlides.length - 1);
			}
		}
		setSocialPostSlides(newSlides);
	}

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (urls: string[]) => {
			handleSlideEdit(urls, slideIndex, 'images');
		};
		return updateImgUrl;
	};

	const updateIllustrationUrlArray = (slideIndex: number) => {
		const updateIllustrationUrl = (urls: string[]) => {
			handleSlideEdit(urls, slideIndex, 'illustration');
		};
		return updateIllustrationUrl;
	};
	const editableTemplateDispatch = (
		slide: SocialPostSlide,
		index: number,
		canEdit: boolean,
	) => {
		if (res_scenario === 'serious_subject') {
			return templateDispatch2(
				slide,
				index,
				canEdit,
				false,
				isEditMode,
				saveSlides,
				setIsEditMode,
				handleSlideEdit,
				updateImgUrlArray,
				updateIllustrationUrlArray,
				toggleEditMode,
			);
		} else if (res_scenario === 'reading_notes') {
			return templateDispatch3(
				slide,
				index,
				canEdit,
				false,
				isEditMode,
				saveSlides,
				setIsEditMode,
				handleSlideEdit,
				updateImgUrlArray,
				updateIllustrationUrlArray,
				toggleEditMode,
			);
		} else {
			return templateDispatch(
				slide,
				index,
				canEdit,
				false,
				isEditMode,
				saveSlides,
				setIsEditMode,
				handleSlideEdit,
				updateImgUrlArray,
				updateIllustrationUrlArray,
				toggleEditMode,
			);
		}
	};
	//console.log(socialPostSlides)
	return (
		<div>
			<div className='flex flex-col items-center justify-center gap-4'>
				{/* buttons and contents */}
				<div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
					<ToastContainer />

					<SlideLeftNavigator
						currentSlideIndex={currentSlideIndex}
						slides={socialPostSlides}
						goToSlide={goToSlide}
					/>

					<SocialPostContainer
						isPresenting={present}
						slides={socialPostSlides}
						currentSlideIndex={currentSlideIndex}
						isViewing={isViewing}
						scale={present ? presentScale : nonPresentScale}
						templateDispatch={editableTemplateDispatch}
						slideRef={slideRef}
						containerRef={containerRef}
					/>

					<SlideRightNavigator
						currentSlideIndex={currentSlideIndex}
						slides={socialPostSlides}
						goToSlide={goToSlide}
					/>

					{/* 4 buttons for change layout, present, add and add / delete slide */}
					<div className='absolute -right-[10rem] top-[7rem] flex flex-col justify-between items-center mb-6 gap-[1.25rem] ml-[6rem]'>
						<ButtonWithExplanation
							button={<PresentButton openPresent={openPresent} />}
							explanation='Present'
						/>

						{res_scenario !== 'serious_subject' && !isViewing && (
							<ButtonWithExplanation
								button={
									<ThemeChanger
										openTheme={openTheme}
										showTheme={showTheme}
										closeTheme={closeTheme}
										currentSlideIndex={currentSlideIndex}
										borderColorOptions={borderColorOptions}
										handleSlideEdit={handleSlideEdit}
									/>
								}
								explanation='Change Theme'
							/>
						)}

						{res_scenario === 'casual_topic' &&
							!isViewing &&
							currentSlideIndex != 0 && (
								<ButtonWithExplanation
									button={
										<LayoutChanger
											openModal={openModal}
											showLayout={showLayout}
											closeModal={closeModal}
											currentSlideIndex={currentSlideIndex}
											templateSamples={templateSamples}
											slides={socialPostSlides}
											handleSlideEdit={handleSlideEdit}
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
				<SlidePagesIndicator
					currentSlideIndex={currentSlideIndex}
					slides={socialPostSlides}
					goToSlide={goToSlide}
				/>

				{/* preview little image */}

				<div className='max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
					<div className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
						{Array(socialPostSlides.length)
							.fill(0)
							.map((_, index) => (
								<div
									key={`previewContainer` + index.toString()}
									className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
									onClick={() => {
										setCurrentSlideIndex(index); // Added onClick handler
										setFinalSlideIndex?.(index);
									}}
								>
									{/* {index + 1} */}
									<SocialPostContainer
										slides={socialPostSlides}
										currentSlideIndex={index}
										scale={0.1}
										isViewing={true}
										templateDispatch={editableTemplateDispatch}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default SocialPostHTML;
