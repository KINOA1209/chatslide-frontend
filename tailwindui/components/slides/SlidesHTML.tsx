import React, { use, useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '../paywallModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExportToPdfButton from './ExportButton';
import { ShareButton } from '@/components/slides/SlideButtons';
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
import Chart from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';
import { Panel } from '../layout/Panel';
import { useProject } from '@/hooks/use-project';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import ScriptWindow from './script/ScriptWindow';
import ReactDOM from 'react-dom';
import { ScrollBar } from '../ui/ScrollBar';

type SlidesHTMLProps = {
	isViewing?: boolean; // viewing another's shared project
	exportSlidesRef?: React.RefObject<HTMLDivElement>;
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

export const uneditableTemplateDispatch = (
	slide: Slide,
	index: number,
	exportToPdfMode: boolean = false,
) =>
	templateDispatch(
		slide,
		index,
		false, // canEdit
		exportToPdfMode, //exportToPdfMode
		false, //editMathMode
		() => { }, //setIsEditMode
		() => { }, // handleSlideEdit
		() => () => { }, // updateImgUrlArray,
		() => { }, // toggleEditMode,
		index === 0, // isCoverPage
		slide.layout, // layoutOptionNonCover
		slide.layout, // layoutOptionCover
		false, // isCurrentSlide
	);

const SlidesHTML: React.FC<SlidesHTMLProps> = ({
	isViewing = false,
	exportSlidesRef = useRef<HTMLDivElement>(null),
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
		toggleIsShowingLogo,
	} = useSlides();

	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const { isPresenting, setIsPresenting } = useSlides();
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
		Math.min(
			1,
			Math.min(dimensions.width / 960, (dimensions.height - 100) / 540) * 0.8,
		),
	);

	const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

	const canUndo = slidesHistoryIndex > 0;
	const canRedo = slidesHistoryIndex < slidesHistory.length - 1;

	const horizontalCurrentSlideRef = useRef<HTMLDivElement>(null);
	const verticalCurrentSlideRef = useRef<HTMLDivElement>(null);
	const { isShared, updateIsShared, project } = useProject();

	const [host, setHost] = useState('https://drlambda.ai');

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

	const toggleChatWindow = () => {
		setIsChatWindowOpen(!isChatWindowOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			const scale = Math.min(window.innerWidth / 960, window.innerHeight / 540);
			setPresentScale(scale);
			setNonPresentScale(
				Math.min(
					1,
					Math.min(window.innerWidth / 960, (window.innerHeight - 100) / 540) *
						0.8,
				),
			);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Function to change the template of slides starting from the second one
	const selectTemplate = (newTemplate: string) => {
		console.log('Changing template to:', newTemplate);
		changeTemplate(newTemplate as TemplateKeys);
	};

	const openPresent = () => {
		toast.success(
			'Use ESC to exit presentation mode, use arrow keys to navigate slides.',
		);
		setIsPresenting(true);
		if (showScript) openScriptPage();
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (isViewing || isPresenting) {
			console.log('key pressed', event.key);
			// todo: update iseditmode
			if (event.key === 'ArrowRight' && slideIndex < slides.length - 1) {
				gotoPage(slideIndex + 1);
			} else if (event.key === 'ArrowLeft' && slideIndex > 0) {
				gotoPage(slideIndex - 1);
			} else if (event.key === 'Escape') {
				setIsPresenting(false); // Exit presentation mode
			}
		}
	}

	function handleSlideEdit(
		content:
			| string
			| string[]
			| Array<string | string[] | Chart[] | boolean[] | ImagesPosition[]>,
		slideIndex: number,
		tag: SlideKeys | SlideKeys[],
		contentIndex?: number,
	) {
		console.log('handleSlideEdit', content, slideIndex, tag, contentIndex);
		setIsEditMode(false);

		const currentSlide = { ...slides[slideIndex] };
		const className = tag;
		if (
			(className as string) === 'images_position' ||
			className[0] === 'images_position'
		) {
			console.log('skip saving images_position');
			return;
		}

		const applyUpdate = (
			content: string | string[] | Chart[] | boolean[] | ImagesPosition[],
			className: string,
		) => {
			if (className === 'images_position') return; // dont samve images position

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
			} else if (className === 'images_position') {
				currentSlide.images_position = content as ImagesPosition[];
			} else {
				console.error(`Unknown tag: ${tag}`);
			}
		};
		if (Array.isArray(className)) {
			className.forEach((current_tag: SlideKeys, idx: number) => {
				let updateContent:
					| string
					| string[]
					| Chart[]
					| boolean[]
					| ImagesPosition[];
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

	let scriptWindow: Window | null = null;

	const openScriptPage = () => {
		scriptWindow = window.open('', 'scriptPage', 'width=600,height=400');
		if (!scriptWindow) return;

		// Create a new document body
		scriptWindow.document.body.innerHTML = `<div id="root"></div>`;

		// Render your React component into the new window
		ReactDOM.render(
			<ScriptWindow />,
			scriptWindow.document.getElementById('root'),
		);
	};

	// close the scripts window, not working
	// useEffect(() => {
	// 	console.log('closing script window');
	// 	console.log('isPresenting', isPresenting);
	// 	if(!isPresenting) {
	// 		console.log('really closing script window');
	// 		scriptWindow?.close();
	// 		scriptWindow = null;
	// 	}
	// }, [isPresenting]);

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (urls: string[], ischart: boolean[]) => {
			// change all null to ''
			urls = urls.map((url) => (url === null ? '' : url));

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

	if (toPdf)
		// a simple page for backend to capture the slides
		return (
			<SlideContainer
				slide={slides[slideIndex]}
				index={slideIndex}
				isPresenting={isPresenting}
				isViewing={isViewing}
				scale={presentScale}
				templateDispatch={editableTemplateDispatch}
				slideRef={slideRef}
				containerRef={containerRef}
				length={slides.length}
				key={version}
			/>
		);

	if (!slides || slides.length === 0) {
		return <></>;
	}

	return (
		<div className='w-full h-full flex flex-col items-start justify-between py-4 gap-4 relative'>
			<div className='w-full flex flex-row items-center justify-center'>
				<ActionsToolBar
					undo={undoChange}
					redo={redoChange}
					canRedo={canRedo}
					canUndo={canUndo}
					startTour={startTour}
					onlyShowTutorial={false}
					isViewing={isViewing}
				>
					{!isViewing && (
						<>
							<AddSlideButton
								addPage={handleAddPage}
								currentSlideIndex={slideIndex}
							/>
							<DeleteSlideButton
								deletePage={handleDeletePage}
								currentSlideIndex={slideIndex}
							/>

							<div className='h-8 w-0.5 bg-gray-200'></div>

							<ChangeTemplateOptions
								currentTemplate={slides[slideIndex].template}
								templateOptions={Object.keys(availableTemplates)}
								onChangeTemplate={selectTemplate}
							/>
							<LayoutChanger
								currentSlideIndex={slideIndex}
								// templateSamples={templateSamples}
								slides={slides}
								handleSlideEdit={handleSlideEdit}
								availableLayouts={availableLayouts}
							/>
							{isPaidUser && (
								<ButtonWithExplanation
									button={
										<button onClick={() => toggleIsShowingLogo()}>
											{isShowingLogo ? (
												<GoEyeClosed
													style={{
														strokeWidth: '0.8',
														flex: '1',
														width: '1.5rem',
														height: '1.5rem',
														fontWeight: 'bold',
														color: '#2943E9',
													}}
												/>
											) : (
												<GoEye
													style={{
														strokeWidth: '0.8',
														flex: '1',
														width: '1.5rem',
														height: '1.5rem',
														fontWeight: 'bold',
														color: '#2943E9',
													}}
												/>
											)}
										</button>
									}
									explanation={isShowingLogo ? 'Remove Logo' : 'Show Logo'}
								></ButtonWithExplanation>
							)}

							<div className='h-8 w-0.5 bg-gray-200'></div>
						</>
					)}

					<ButtonWithExplanation
						button={<PresentButton openPresent={openPresent} />}
						explanation='Present'
					/>

					{!isViewing && (
						<ExportToPdfButton
							exportSlidesRef={exportSlidesRef}
							hasScript={showScript}
						/>
					)}

					{project && (
						<ShareButton
							setShare={isViewing ? null : updateIsShared}
							share={isShared}
							project={project}
							host={host}
						/>
					)}
				</ActionsToolBar>
			</div>

			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='Upgrade for more ⭐️credits.'
				showReferralLink={true}
			/>

			<div className='w-full flex flex-row grow items-start justify-center xl:justify-between gap-4 overflow-auto'>
				{/* vertical bar */}

				<Panel>
					<div className='h-full hidden xl:flex w-[150px]'>
						<ScrollBar
							currentElementRef={verticalCurrentSlideRef}
							index={slideIndex}
							axial='y'
						>
							{slides.map((slide, index) => (
								<div
									key={
										`previewContainer` +
										index.toString() +
										slides.length.toString()
									} // force update when slide length changes
									className={`w-[8rem] h-[6rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
									onClick={() => gotoPage(index)}
									ref={index === slideIndex ? verticalCurrentSlideRef : null}
								>
									{/* {index + 1} */}
									<SlideContainer
										slide={slide}
										index={index}
										scale={0.12}
										isViewing={true}
										templateDispatch={uneditableTemplateDispatch}
										highlightBorder={slideIndex === index}
										pageNumber={index + 1}
									/>
								</div>
							))}
						</ScrollBar>
					</div>
				</Panel>

				<Panel>
					<div className='flex flex-row items-center justify-center'>
						<div className='hidden lg:block'>
							<SlideLeftNavigator
								currentSlideIndex={slideIndex}
								slides={slides}
								goToSlide={gotoPage}
							/>
						</div>

						<div className='flex flex-col items-end SlidesStep-3 SlidesStep-4 gap-2'>
							{/* main container for viewing and editing */}
							<SlideContainer
								slide={slides[slideIndex]}
								index={slideIndex}
								isPresenting={isPresenting}
								isViewing={isViewing}
								scale={isPresenting ? presentScale : nonPresentScale}
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

						{/* White modal for presentation mode */}
						{isPresenting && (
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

					{/* transcripotList */}
					{showScript && (
						<ScriptEditor
							slides={slides}
							updateSlidePage={updateSlidePage}
							currentSlideIndex={slideIndex}
						/>
					)}

					{/* Slide pages indicator */}
					<div className='pt-2 flex flex-row items-center'>
						<div className='block lg:hidden'>
							<SlideLeftNavigator
								currentSlideIndex={slideIndex}
								slides={slides}
								goToSlide={gotoPage}
							/>
						</div>
						<SlidePagesIndicator
							currentSlideIndex={slideIndex}
							slides={slides}
						/>
						<div className='block lg:hidden'>
							<SlideRightNavigator
								currentSlideIndex={slideIndex}
								slides={slides}
								goToSlide={gotoPage}
							/>
						</div>
					</div>

					{/* horizontal  */}
					<div className='block xl:hidden max-w-xl sm:max-w-4xl mx-auto py-4 justify-center items-center'>
						<ScrollBar
							currentElementRef={horizontalCurrentSlideRef}
							index={slideIndex}
						>
							{slides.map((slide, index) => (
								<div
									key={
										`previewContainer` +
										index.toString() +
										slides.length.toString()
									} // force update when slide length changes
									className={`w-[8rem] h-[6rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
									onClick={() => gotoPage(index)}
									ref={index === slideIndex ? horizontalCurrentSlideRef : null}
								>
									{/* {index + 1} */}
									<SlideContainer
										slide={slide}
										index={index}
										scale={0.12}
										isViewing={true}
										templateDispatch={uneditableTemplateDispatch}
										highlightBorder={slideIndex === index}
										pageNumber={index + 1}
									/>
								</div>
							))}
						</ScrollBar>
					</div>
				</Panel>

				{!isViewing && isChatWindowOpen ? (
					<Panel>
						<AIAssistantChatWindow
							onToggle={toggleChatWindow}
							slides={slides}
							currentSlideIndex={slideIndex}
							updateSlidePage={updateSlidePage}
						/>
					</Panel>
				) : (
					<>
						{!isViewing && !isPresenting && (
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
						<Panel>
							{/* balance pos of slide */}
							<div className='hidden xl:flex w-[9rem]'></div>
						</Panel>
					</>
				)}
			</div>
		</div>
	);
};
export default SlidesHTML;
