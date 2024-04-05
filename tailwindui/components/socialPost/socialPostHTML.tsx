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
import templates, {
	templateSamples,
} from '@/components/socialPost/socialPostTemplates';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import SocialPostSlide, { SlideKeys } from '@/models/SocialPost';
import { useSocialPosts } from '@/hooks/use-socialpost';
import ImagesPosition from '@/models/ImagesPosition';
import Chart from '@/models/Chart';
import { ToolBar } from '../ui/ToolBar';
import ShareButton from '@/components/button/ShareButton';
import ExportToPngButton from '@/components/socialPost/socialPostPngButton';

type SlidesHTMLProps = {
	isViewing?: boolean; // viewing another's shared project
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};

const SocialPostHTML: React.FC<SlidesHTMLProps> = ({
	isViewing = false,
	borderColorOptions,
	res_scenario,
}) => {
	const { token } = useUser();
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
	const { project, updateProject } = useProject();
	const [host, setHost] = useState('https://drlambda.ai');
	const { isShared, updateIsShared } = useProject();
	const foldername = project?.foldername || '';
	const project_id = project?.id || '';
	const res_slide = project?.social_posts;
	const cover_title = project?.topic || 'Your topic here';

	const [showLayout, setShowLayout] = useState(false);
	const [present, setPresent] = useState(false);
	const slideRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
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
	const {
		socialPosts,
		setSocialPosts,
		addEmptyPage,
		duplicatePage,
		deleteSlidePage,
		updateSlidePage,
		initSocialPosts,
		socialPostsIndex,
		setSocialPostsIndex,
		gotoPage,
		socialPostsStatus,
		socialPostVersion,
		updateVersion,
		saveStatus,
		SaveStatus,
		syncSocialPosts,
	} = useSocialPosts();

	useEffect(() => {
		if (
			window.location.hostname !== 'localhost' &&
			window.location.hostname !== '127.0.0.1'
		) {
			setHost('https://' + window.location.hostname);
		} else {
			setHost(window.location.hostname);
		}
	}, []);

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
				currentSlideIndex < socialPosts.length - 1
			) {
				goToSlide(currentSlideIndex + 1);
			} else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
				goToSlide(currentSlideIndex - 1);
			}
		}
	}

	function handleSlideEdit(
		content:
			| string
			| string[]
			| ThemeObject
			| Array<string | string[] | Chart[] | boolean[] | ImagesPosition[]> | ThemeObject,
		slideIndex: number,
		tag: SlideKeys | SlideKeys[],
		contentIndex?: number,
		rerender: boolean = true,
	) {
		setIsEditMode(false);
		const newSlides = [...socialPosts];

		const currentSlide = newSlides[slideIndex];
		const className = tag;

		const applyUpdate = (
			content: string | string[] | Chart[] | boolean[] | ImagesPosition[] | ThemeObject,
			className: string,
		) => {
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
			} else if (className === 'chart') {
				currentSlide.chart = content as Chart[];
			} else if (className === 'is_chart') {
				currentSlide.is_chart = content as boolean[];
			} else if (className === 'images_position') {
				currentSlide.images_position = content as ImagesPosition[];
			} else {
				console.error(`Unknown tag: ${tag}`);
			}
		}
		if (Array.isArray(className)) {
			className.forEach((current_tag: SlideKeys, idx: number) => {
				let updateContent:
					| string
					| string[]
					| Chart[]
					| boolean[]
					| ImagesPosition[]
					| ThemeObject
				if (Array.isArray(content)) {
					if (idx < content.length) {
						updateContent = content[idx];
					} else {
						console.error(
							`Content index ${idx} out of range for content array`,
						);
						return;
					}
				} else {
					console.error(`Expected content to be an array when tag is an array`);
					return;
				}
				applyUpdate(updateContent, current_tag);
			});
		} else {
			applyUpdate(
				content as string | string[] | Chart[] | boolean[] | ImagesPosition[],
				className,
			);
		}
		console.log('updating slide page', slideIndex);
		console.log(currentSlide);
		updateSlidePage(slideIndex, currentSlide, rerender);
	}

	function goToSlide(index: number) {
		console.log('Goinng to slide', index);
		isFirstRender.current = true;
		setCurrentSlideIndex(index);
	}

	function toggleEditMode() {
		setIsEditMode(!isEditMode);
	}

	function handleAddPage() {
		const newSlides = [...socialPosts];
		const newSlide = new SocialPostSlide();
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 0, newSlide);
		}
		if (res_scenario === 'serious_subject') {
			newSlide.template = 'img_0_template2';
		} else if (res_scenario === 'reading_notes') {
			newSlide.template = 'img_1_template3';
		}
		setSocialPosts(newSlides);
	}

	function handleDeletePage() {
		const newSlides = [...socialPosts];
		if (currentSlideIndex != 0) {
			newSlides.splice(currentSlideIndex, 1);

			if (currentSlideIndex >= newSlides.length) {
				setCurrentSlideIndex(newSlides.length - 1);
				//setFinalSlideIndex?.(newSlides.length - 1);
			}
		}
		setSocialPosts(newSlides);
	}

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (
			urls: string[],
			ischart: boolean[],
			images_position: ImagesPosition[],
		) => {
			urls = urls.map((url) => (url === null ? '' : url));
			const shuffleIndex = urls.indexOf('shuffle');
			if (shuffleIndex !== -1) {
				const additional_images = project?.additional_images || [];
				if (additional_images.length === 0) {
					return;
				}
				console.log('random url', additional_images);
				const randomIndex = Math.floor(
					Math.random() * additional_images.length,
				);
				urls[shuffleIndex] = additional_images[randomIndex];
			}

			const prevUrls = socialPosts[slideIndex].images;
			if (JSON.stringify(prevUrls) === JSON.stringify(urls)) {
				return;
			}
			console.log('updateImgUrlArray called');
			console.log('urls', urls);
			console.log('prevUrls', prevUrls);
			handleSlideEdit([urls, ischart, images_position], slideIndex, [
				'images',
				'is_chart',
				'images_position',
			]);
		};
		return updateImgUrl;
	};

	const updateIllustrationUrlArray = (slideIndex: number) => {
		const updateIllustrationUrl = (
			urls: string[],
			ischart: boolean[],
			images_position: ImagesPosition[],
		) => {
			urls = urls.map((url) => (url === null ? '' : url));
			const shuffleIndex = urls.indexOf('shuffle');
			if (shuffleIndex !== -1) {
				const additional_images = project?.additional_images || [];
				if (additional_images.length === 0) {
					return;
				}
				console.log('random url', additional_images);
				const randomIndex = Math.floor(
					Math.random() * additional_images.length,
				);
				urls[shuffleIndex] = additional_images[randomIndex];
			}

			const prevUrls = socialPosts[slideIndex].images;
			if (JSON.stringify(prevUrls) === JSON.stringify(urls)) {
				return;
			}
			console.log('updateIllustrationUrlArray called');
			console.log('urls', urls);
			console.log('prevUrls', prevUrls);
			handleSlideEdit([urls, ischart, images_position], slideIndex, [
				'illustration',
				'is_chart',
				'images_position',
			]);
		};
		return updateIllustrationUrl;
	};

	const editableTemplateDispatch = (
		slide: SocialPostSlide,
		index: number,
		canEdit: boolean,
	) => {
		return templateDispatch(
			slide,
			index,
			canEdit,
			false,
			isEditMode,
			setIsEditMode,
			handleSlideEdit,
			updateImgUrlArray,
			updateIllustrationUrlArray,
			toggleEditMode,
		);
	};
	return (
		<div>
			<div className='flex flex-col items-center justify-center gap-4'>
				<ToolBar >
					{/* slides contents */}
					<ExportToPngButton
						socialPostSlide={socialPosts}
						currentSlideIndex={socialPostsIndex}
					/>
					{project &&
						<ShareButton
							setShare={updateIsShared}
							share={isShared}
							project={project}
							host={host}
							isSocialPost={true}
						/>}
				</ToolBar>
				{/* buttons and contents */}
				<div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
					<ToastContainer />

					<SlideLeftNavigator
						currentSlideIndex={currentSlideIndex}
						slides={socialPosts}
						goToSlide={goToSlide}
					/>

					<SocialPostContainer
						isPresenting={present}
						slides={socialPosts}
						currentSlideIndex={currentSlideIndex}
						isViewing={isViewing}
						scale={present ? presentScale : nonPresentScale}
						templateDispatch={editableTemplateDispatch}
						slideRef={slideRef}
						containerRef={containerRef}
					/>

					<SlideRightNavigator
						currentSlideIndex={currentSlideIndex}
						slides={socialPosts}
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
										currentSlideIndex={socialPostsIndex}
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
											slides={socialPosts}
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
					slides={socialPosts}
					goToSlide={goToSlide}
				/>

				{/* preview little image */}

				<div className='max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
					<div className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
						{Array(socialPosts.length)
							.fill(0)
							.map((_, index) => (
								<div
									key={`previewContainer` + index.toString()}
									className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
									onClick={() => {
										setCurrentSlideIndex(index); // Added onClick handler
										//setFinalSlideIndex?.(index);
									}}
								>
									{/* {index + 1} */}
									<SocialPostContainer
										slides={socialPosts}
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
