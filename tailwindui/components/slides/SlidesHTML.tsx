import React, { use, useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '../forms/paywallModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sanitizeHtml from 'sanitize-html';
import './slidesHTML.css';
import { availableTemplates } from '@/components/slides/slideTemplates';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import LayoutChanger from './LayoutChanger';
import { Default_TemplateThemeConfig } from './templates_customizable_elements/templatesThemeConfigDetails/Default_TemplateThemeConfigDetails';
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
import themeConfigData, {
	ThemeConfig,
} from './templates_customizable_elements/theme_elements';
import layoutConfigData, {
	TemplateLayoutsConfig,
} from './templates_customizable_elements/layout_elements';
import ScriptEditor from './script/ScriptEditor';
import Slide, { SlideKeys } from '@/models/Slide';
import {
	DrLambdaAIAssistantIcon,
	AIAssistantChatWindow,
} from '../ui/AIAssistant';
import ActionsToolBar from '../ui/ActionsToolBar';
import { SlidesStatus, useSlides } from '@/hooks/use-slides';
import useTourStore from '@/components/user_onboarding/TourStore';
import { current } from 'immer';
import Chart from '@/models/Chart';
import { BigGrayButton } from '../button/DrlambdaButton';

type SlidesHTMLProps = {
	isViewing?: boolean; // viewing another's shared project
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
	isPresenting?: boolean;
	initSlideIndex?: number;
	toPdf?: boolean; // toPdf mode for backend
	showScript?: boolean;
};

export const loadCustomizableElements = (templateName: string) => {
	return (
		themeConfigData[templateName as keyof ThemeConfig] ||
		Default_TemplateThemeConfig
	);
};

export const loadLayoutConfigElements = (
	templateName: string,
	layoutOption: string,
) => {
	const templateElements =
		layoutConfigData[templateName as keyof TemplateLayoutsConfig] || {};
	const selectedLayoutOptionElements =
		templateElements[layoutOption as LayoutKeys] || {};
	return selectedLayoutOptionElements;
};

const SlidesHTML: React.FC<SlidesHTMLProps> = ({
	isViewing = false,
	exportSlidesRef = useRef<HTMLDivElement>(null),
	isPresenting = false,
	initSlideIndex = 0,
	toPdf = false,
	showScript = false,
}) => {
	const { isTourActive, startTour, setIsTourActive } = useTourStore();
	const {
		slides,
		slideIndex,
		slidesHistory,
		addEmptyPage,
		deleteSlidePage,
		changeTemplate,
		undoChange,
		redoChange,
		slidesHistoryIndex,
		slidesStatus,
		initSlides,
		updateSlidePage,
		gotoPage,
		version,
		saveStatus,
		isShowingLogo,
		setIsShowingLogo,
	} = useSlides();

	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const [showLayout, setShowLayout] = useState(false);
	const [present, setPresent] = useState(isPresenting);
	const slideRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 960,
		height: typeof window !== 'undefined' ? window.innerHeight : 540,
	});
	const [isEditMode, setIsEditMode] = useState(false);

	const [presentScale, setPresentScale] = useState(
		Math.min(dimensions.width / 960, dimensions.height / 540),
	);
	const [nonPresentScale, setNonPresentScale] = useState(
		Math.min(1, presentScale * 0.9),
	);

	const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

	const canUndo = slidesHistoryIndex > 0;
	const canRedo = slidesHistoryIndex < slidesHistory.length - 1;

	const currentSlideRef = useRef<HTMLDivElement>(null);
	const thumbnailRef = useRef<HTMLDivElement>(null);

	const toggleChatWindow = () => {
		setIsChatWindowOpen(!isChatWindowOpen);
	};

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

	// Function to change the template of slides starting from the second one
	const selectTemplate = (newTemplate: string) => {
		console.log('Changing template to:', newTemplate);
		changeTemplate(newTemplate as TemplateKeys);
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

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

  function handleKeyDown(event: KeyboardEvent) {
    if (isViewing) {  // todo: update iseditmode 
      if (event.key === 'ArrowRight' && slideIndex < slides.length - 1) {
        gotoPage(slideIndex + 1);
      } else if (event.key === 'ArrowLeft' && slideIndex > 0) {
        gotoPage(slideIndex - 1);
      }
    }
  }

	// auto scroll thumbnail to current slide
	useEffect(() => {
		if (thumbnailRef.current && currentSlideRef.current) {
			console.log('scrolling to current slide');

			const container = thumbnailRef.current;
			const currentSlide = currentSlideRef.current;

			const containerRect = container.getBoundingClientRect();
			const currentSlideRect = currentSlide.getBoundingClientRect();

			// scroll to horizontal center
			const scrollAmount =
				currentSlideRect.left +
				currentSlideRect.width / 2 -
				(containerRect.left + containerRect.width / 2);
			console.log('scrollAmount', scrollAmount);

			container.scrollTo({
				left: container.scrollLeft + scrollAmount,
				behavior: 'smooth',
			});
		}
	}, [slideIndex]);

	function handleSlideEdit(
		content: string | string[] | Array<string | string[] | Chart[] | boolean[]>,
		slideIndex: number,
		tag: SlideKeys | SlideKeys[],
		contentIndex?: number,
	) {
		setIsEditMode(false);

		const currentSlide = { ...slides[slideIndex] };
		const className = tag;
		const applyUpdate = (
			content: string | string[] | Chart[] | boolean[],
			className: string,
		) => {
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
				currentSlide.images = [...(content as string[])]; // deep copy
			} else if (className === 'content') {
				if (Array.isArray(content)) {
					currentSlide.content = content as string[];
				} else {
					if (typeof contentIndex === 'number' && contentIndex >= 0) {
						let newContent = [...currentSlide.content];
						newContent[contentIndex] = content as string;
						currentSlide.content = newContent;
					} else {
						console.error(`Invalid contentIndex: ${contentIndex}`);
					}
				}
			} else if (className === 'chart') {
				currentSlide.chart = content as Chart[];
			} else if (className === 'is_chart') {
				currentSlide.is_chart = content as boolean[];
			} else {
				console.error(`Unknown tag: ${tag}`);
			}
		};
		if (Array.isArray(className)) {
			className.forEach((current_tag: SlideKeys, idx: number) => {
				let updateContent: string | string[] | Chart[] | boolean[];
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
				content as string | string[] | Chart[] | boolean[],
				className,
			);
		}
		console.log('updating slide page', slideIndex);
		console.log(currentSlide);
		updateSlidePage(slideIndex, currentSlide);
	}

	function handleAddPage() {
		addEmptyPage(slideIndex);
	}

	function handleDeletePage() {
		deleteSlidePage(slideIndex);
	}

	function toggleEditMode() {
		setIsEditMode(!isEditMode);
	}

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (urls: string[], ischart: boolean[]) => {
			if (urls.length === 1 && urls[0] === '') {
				return;
			}

			const prevUrls = slides[slideIndex].images;
			if (JSON.stringify(prevUrls) === JSON.stringify(urls)) {
				return;
			}
			console.log('updateImgUrlArray called');
			console.log('urls', urls);
			console.log('prevUrls', prevUrls);
			handleSlideEdit([urls, ischart], slideIndex, ['images', 'is_chart']);
		};
		return updateImgUrl;
	};

	//console.log(slides)
	const editableTemplateDispatch = (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			canEdit, // canEdit
			exportToPdfMode, //exportToPdfMode
			isEditMode, //editMathMode
			setIsEditMode, //setIsEditMode
			handleSlideEdit, // handleSlideEdit
			updateImgUrlArray,
			toggleEditMode,
			index === 0, // isCoverPage
			slide.layout, // layoutOptionNonCover
			slide.layout, // layoutOptionCover
			index === slideIndex, // isCurrentSlide
			isShowingLogo, // isShowingLogo
		);

	const uneditableTemplateDispatch = (
		slide: Slide,
		index: number,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			false, // canEdit
			exportToPdfMode, //exportToPdfMode
			isEditMode, //editMathMode
			setIsEditMode, //setIsEditMode
			() => {}, // handleSlideEdit
			updateImgUrlArray,
			toggleEditMode,
			index === 0, // isCoverPage
			slide.layout, // layoutOptionNonCover
			slide.layout, // layoutOptionCover
			index === slideIndex, // isCurrentSlide
			isShowingLogo, // isShowingLogo
		);

	if (toPdf)
		// a simple page for backend to capture the slides
		return (
			<SlideContainer
				slide={slides[slideIndex]}
				index={slideIndex}
				isPresenting={present}
				isViewing={isViewing}
				scale={present ? presentScale : nonPresentScale}
				templateDispatch={editableTemplateDispatch}
				slideRef={slideRef}
				containerRef={containerRef}
				length={slides.length}
				key={version}
			/>
		);
	const handleTogglingLogo = () => {
		if (!isPaidUser) {
			setShowPaymentModal(true);
			return;
		} else {
			setIsShowingLogo(!isShowingLogo);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center gap-4 relative'>
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
								slide={slide}
								index={index}
								templateDispatch={uneditableTemplateDispatch}
								exportToPdfMode={true}
							/>
						</div>
					))}
				</div>
			</div>

			{/* absolute positionde ai assistant icon */}
			{!isChatWindowOpen && !isViewing && (
				<div className='hidden sm:block fixed bottom-10 right-10 cursor-pointer z-50'>
					<ButtonWithExplanation
						button={
							<DrLambdaAIAssistantIcon
								onClick={toggleChatWindow}
							></DrLambdaAIAssistantIcon>
						}
						explanation='AI Assistant'
					/>
				</div>
			)}

			{!isViewing && (
				<div className='flex flex-row justify-end items-end gap-1 sm:gap-4'>
					<div className='hidden sm:block'>
						<ChangeTemplateOptions
							currentTemplate={slides[slideIndex].template}
							templateOptions={Object.keys(availableTemplates)}
							onChangeTemplate={selectTemplate}
						/>
					</div>
				</div>
			)}

			<BigGrayButton
				// onClick={() => setIsShowingLogo(!isShowingLogo)}
				onClick={() => handleTogglingLogo()}
				isPaidUser={isPaidUser}
				bgColor='bg-Gray'
			>
				<span>
					{isShowingLogo ? 'Remove Logo' : 'Show Logo'}
					{!isPaidUser && '🔒'}
				</span>
			</BigGrayButton>
			{showPaymentModal && (
				<PaywallModal
					setShowModal={setShowPaymentModal}
					message='Upgrade for more ⭐️credits.'
					showReferralLink={true}
				/>
			)}

			{/* buttons and contents */}
			<div className='max-w-4xl relative flex flex-row items-center justify-center'>
				<ToastContainer />

				{/* vertical bar */}
				<div className='h-[540px] w-[144px] hidden xl:block mx-auto justify-center items-center'>
					<div className='h-full flex flex-col flex-nowrap py-2 overflow-y-auto  overflow-y-scroll overflow-x-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
						{slides.map((slide, index) => (
							<div
								key={
									`previewContainer` +
									index.toString() +
									slides.length.toString()
								} // force update when slide length changes
								className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
								onClick={() => gotoPage(index)} // Added onClick handler
							>
								{/* {index + 1} */}
								<SlideContainer
									slide={slide}
									index={index}
									scale={0.12}
									isViewing={true}
									templateDispatch={uneditableTemplateDispatch}
									slideRef={slideRef}
									containerRef={containerRef}
									highlightBorder={slideIndex === index}
								/>
							</div>
						))}
					</div>
				</div>

				<div className='hidden lg:block'>
					<SlideLeftNavigator
						currentSlideIndex={slideIndex}
						slides={slides}
						goToSlide={gotoPage}
					/>
				</div>

				<div className='flex flex-col items-end SlidesStep-3 SlidesStep-4 gap-2'>
					<div className='flex flex-row items-center justify-center gap-4'>
						{/* 4 buttons on smaller screen */}
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
										currentSlideIndex={slideIndex}
										// templateSamples={templateSamples}
										slides={slides}
										handleSlideEdit={handleSlideEdit}
										availableLayouts={availableLayouts}
									/>
								}
								explanation='Change Layout'
							/>
						)}

						{!isViewing && slideIndex != 0 && (
							<ButtonWithExplanation
								button={
									<AddSlideButton
										addPage={handleAddPage}
										currentSlideIndex={slideIndex}
									/>
								}
								explanation='Add Page'
							/>
						)}

						{!isViewing && slideIndex != 0 && (
							<ButtonWithExplanation
								button={
									<DeleteSlideButton
										deletePage={handleDeletePage}
										currentSlideIndex={slideIndex}
									/>
								}
								explanation='Delete Page'
							/>
						)}
						{!isViewing && (
							<ActionsToolBar
								undo={undoChange}
								redo={redoChange}
								canRedo={canRedo}
								canUndo={canUndo}
								startTour={startTour}
							/>
						)}
					</div>

					{/* main container for viewing and editing */}
					<SlideContainer
						slide={slides[slideIndex]}
						index={slideIndex}
						isPresenting={present}
						isViewing={isViewing}
						scale={present ? presentScale : nonPresentScale}
						templateDispatch={editableTemplateDispatch}
						slideRef={slideRef}
						containerRef={containerRef}
						length={slides.length}
						key={version}
					/>
				</div>

				<div className='hidden lg:block'>
					<SlideRightNavigator
						currentSlideIndex={slideIndex}
						slides={slides}
						goToSlide={gotoPage}
					/>
				</div>

				{/* filler for alignment, leave space for ai agent */}
				<div className='h-[540px] w-[144px] min-h-[540px] min-w-[144px] hidden xl:block mx-auto justify-center items-center'></div>

				{isChatWindowOpen && (
					<AIAssistantChatWindow
						onToggle={toggleChatWindow}
						slides={slides}
						currentSlideIndex={slideIndex}
						updateSlidePage={updateSlidePage}
					/>
				)}

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
						currentSlideIndex={slideIndex}
						slides={slides}
						goToSlide={gotoPage}
					/>
				</div>
				<SlidePagesIndicator currentSlideIndex={slideIndex} slides={slides} />
				<div className='block lg:hidden'>
					<SlideRightNavigator
						currentSlideIndex={slideIndex}
						slides={slides}
						goToSlide={gotoPage}
					/>
				</div>
			</div>

			{/* transcripotList */}
			{showScript && (
				<ScriptEditor
					slides={slides}
					updateSlidePage={updateSlidePage}
					currentSlideIndex={slideIndex}
				/>
			)}

			{/* horizontal  */}
			<div className='block xl:hidden max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
				<div
					className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'
					ref={thumbnailRef}
				>
					{slides.map((slide, index) => (
						<div
							key={
								`previewContainer` + index.toString() + slides.length.toString()
							} // force update when slide length changes
							className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
							onClick={() => gotoPage(index)}
							ref={index === slideIndex ? currentSlideRef : null}
						>
							{/* {index + 1} */}
							<SlideContainer
								slide={slide}
								index={index}
								scale={0.12}
								isViewing={true}
								templateDispatch={uneditableTemplateDispatch}
								highlightBorder={slideIndex === index}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default SlidesHTML;
