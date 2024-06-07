'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Theme, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/components/slides/slidesHTML.css';
import Select from 'react-select';
import ThemeChanger from '@/components/socialPost/socialPostThemeChanger';
import {
	PresentButton,
	AddSlideButton,
	DeleteSlideButton,
	ChangeTemplateOptions,
	DuplicateSlidePageButton,
	ChangeSlideTemplateButton,
	SlidesBrandingButton,
} from '@/components/slides/SlideButtons';
import { MdOutlineClose } from 'react-icons/md';
import {
	SlideRightNavigator,
	SlideLeftNavigator,
	SlidePagesIndicator,
} from '@/components/slides/SlidePageIndicator';

import SocialPostContainer from '@/components/socialPost/socialPostContainer';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { templateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { socialPostAvailableLayouts } from '@/components/socialPost/socialPostTemplates';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import { SocialPostSlide, SlideKeys } from '@/models/SocialPost';
import { useSocialPosts } from '@/hooks/use-socialpost';
import ImagePosition from '@/models/ImagePosition';
import Chart from '@/models/Chart';
import { ToolBar } from '../ui/ToolBar';
import ShareButton from '@/components/button/ShareButton';
import ExportToPngButton from '@/components/socialPost/socialPostPngButton';
import { getBrand, getOrigin } from '@/utils/getHost';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { calculateNonPresentScale } from '../slides/SlidesHTML';
import {
	SocialPostLayoutKeys,
	SocialPostTemplateKeys,
	socialPostTemplateOptions,
} from './socialPostLayouts';
import { LuPalette } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import PaywallModal from '../paywallModal';
import { Instruction } from '../ui/Text';
import Resource from '@/models/Resource';
import { PlusLabel } from '../ui/GrayLabel';
import RadioButton from '../ui/RadioButton';
import ImageSelector from '@/app/(feature)/design/ImageSelector';

type SlidesHTMLProps = {
	isViewing?: boolean; // viewing another's shared project
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};

interface TemplateSelectionBoxProps {
	defaultSelection: SocialPostTemplateKeys;
	selectionOptions: SocialPostTemplateKeys[];
	handleSelectionChange: (selectedOption: SocialPostTemplateKeys) => void;
}
const TemplateSelectionBox: React.FC<TemplateSelectionBoxProps> = ({
	defaultSelection,
	selectionOptions,
	handleSelectionChange,
}) => {
	return (
		<Select
			isSearchable={false}
			options={selectionOptions.map((option) => ({
				value: option,
				label: option,
			}))}
			onChange={(selectedOption) => {
				if (selectedOption) {
					handleSelectionChange(selectedOption.value as SocialPostTemplateKeys);
				}
			}}
			value={{
				value: defaultSelection,
				label: defaultSelection,
			}}
			styles={{
				control: (provided) => ({
					...provided,
					width: '15rem',
					height: '36px',
					borderRadius: '8px',
					borderColor: '#e5e7eb',
					borderWidth: '2px',
					fontSize: '14px',
				}),

				indicatorSeparator: () => ({ display: 'none' }),
				menu: (provided) => ({ ...provided, zIndex: 999 }),
				option: (provided, state) => ({
					...provided,
					backgroundColor: state.isSelected ? '#d1d5db' : '#ffffff',
					color: state.isSelected ? '#4b5563' : '#000000',
					':hover': {
						backgroundColor: '#d1d5db',
					},
				}),
				input: (provided) => ({
					...provided,
					blurInputOnSelect: true,
					border: 'none',
					outline: 'none',
					height: '100%',
					padding: '0',
				}),
			}}
		></Select>
	);
};

const SocialPostHTML: React.FC<SlidesHTMLProps> = ({
	isViewing = false,
	borderColorOptions,
	res_scenario,
}) => {
	// const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		if (window.innerWidth < 640) {
	// 			setIsSidebarOpen(false);
	// 		} else {
	// 			setIsSidebarOpen(true);
	// 		}
	// 	};

	// 	// Set initial state based on current window width
	// 	handleResize();

	// 	// Add event listener for window resize
	// 	window.addEventListener('resize', handleResize);

	// 	// Cleanup event listener on component unmount
	// 	return () => window.removeEventListener('resize', handleResize);
	// }, []);

	const { token } = useUser();
	const [showShareModal, setShowShareModal] = useState(false);
	const { project, updateProject } = useProject();
	const [host, setHost] = useState(getOrigin());
	const { isShared, updateIsShared } = useProject();
	const [showLayout, setShowLayout] = useState(false);
	const [present, setPresent] = useState(false);
	const slideRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 450,
		height: typeof window !== 'undefined' ? window.innerHeight : 600,
	});
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const isFirstRender = useRef(true);
	const [isEditMode, setIsEditMode] = useState(false);
	const [presentScale, setPresentScale] = useState(
		Math.min(dimensions.width / 450, dimensions.height / 600),
	);

	//const nonPresentScale = Math.min(1, presentScale * 0.6);
	const [nonPresentScale, setNonPresentScale] = useState(
		calculateNonPresentScale(
			dimensions.width,
			dimensions.height,
			undefined,
			undefined,
			'socialPosts',
		),
	);
	const [showTheme, setShowTheme] = useState(false);

	const {
		socialPosts,
		setSocialPosts,
		addEmptyPage,
		duplicatePage,
		deleteSlidePage,
		updateSocialPostsPage,
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
		undoChange,
		redoChange,
		socialPostsHistory,
		socialPostsHistoryIndex,
		updateSocialPostTemplateTheme,
		socialPostLogoMode,
		setSocialPostLogoMode,
		socialPostCustomLogoResource,
		setSocialPostCustomLogoResource,
	} = useSocialPosts();
	const availableSectionNames = ['theme', 'branding', ''];
	const [openSection, setOpenSection] = useState('');
	const toggleSection = (section: string) => {
		if (availableSectionNames.includes(section)) {
			setOpenSection((prevSection) => (prevSection === section ? '' : section));
		}
	};

	useEffect(() => {
		console.log('open section is:', openSection);
	}, [openSection, setOpenSection]);

	const brandingOptions = [
		{
			value: 'default',
			text: getBrand(),
		},
		{
			value: 'no',
			text: 'None',
		},
		{
			value: 'custom',
			text: 'Customize',
		},
	];
	// const [showLogo, setShowLogo] = useState<boolean>(true);
	// const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
	// 	socialPostCustomLogoResource || [],
	// );
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);
	// const [logoMode, setLogoMode] = useState<'no' | 'default' | 'custom'>(
	// 	socialPostLogoMode || 'default',
	// );

	useEffect(() => {
		// console.log('logoMode', logoMode);
		// console.log('selectedLogo', selectedLogo);
		if (socialPostLogoMode === 'no') {
			// setSelectedLogo([]);
			setSocialPostCustomLogoResource([]);
			// setShowLogo(false);
		} else if (socialPostLogoMode === 'custom') {
			// setShowLogo(true);
		} else if (socialPostLogoMode === 'default') {
			// setSelectedLogo([]);
			setSocialPostCustomLogoResource([]);
			// setShowLogo(true);
		}
	}, [socialPostLogoMode]);

	const canUndo = socialPostsHistoryIndex > 0;
	const canRedo = socialPostsHistoryIndex < socialPostsHistory.length - 1;
	// const [isThemeCustomizationSectionOpen, setIsThemeCustomizationSectionOpen] =
	// 	useState(false);
	// const [
	// 	isBrandingCustomizationSectionOpen,
	// 	setIsBrandingCustomizationSectionOpen,
	// ] = useState(false);
	const [currentSelectedTemplate, setCurrentSelectedTemplate] =
		useState<SocialPostTemplateKeys>(
			socialPosts[socialPostsIndex]?.template_theme || 'classic',
		);
	useEffect(() => {
		document.addEventListener('add_page', handleAddPage);
		document.addEventListener('duplicate_page', handleDuplicatePage);
		document.addEventListener('delete_page', handleDeletePage);
		document.addEventListener('undo_change', undoChange);
		document.addEventListener('redo_change', redoChange);

		return () => {
			document.removeEventListener('add_page', handleAddPage);
			document.removeEventListener('duplicate_page', handleDuplicatePage);
			document.removeEventListener('delete_page', handleDeletePage);
			document.removeEventListener('undo_change', undoChange);
			document.removeEventListener('redo_change', redoChange);
		};
	}, [socialPostsIndex, socialPostsHistoryIndex]);

	useEffect(() => {
		const handleResize = () => {
			const scale = Math.min(window.innerWidth / 450, window.innerHeight / 600);
			setPresentScale(scale);
			setNonPresentScale(
				calculateNonPresentScale(
					window.innerWidth,
					window.innerHeight,
					undefined,
					undefined,
					'socialPosts',
				),
			);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

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
				socialPostsIndex < socialPosts.length - 1
			) {
				gotoPage(socialPostsIndex + 1);
			} else if (event.key === 'ArrowLeft' && socialPostsIndex > 0) {
				gotoPage(socialPostsIndex - 1);
			}
		}
	}

	function handleSlideEdit(
		content:
			| string
			| string[]
			| ThemeObject
			| Array<string | string[] | Chart[] | boolean[] | ImagePosition[]>
			| ThemeObject
			| SocialPostTemplateKeys
			| SocialPostLayoutKeys,
		slideIndex: number,
		tag: SlideKeys | SlideKeys[],
		contentIndex?: number,
		rerender: boolean = true,
	) {
		console.log('handleSlideEdit', content, slideIndex, tag, contentIndex);
		setIsEditMode(false);

		//https://stackoverflow.com/questions/27519836/uncaught-typeerror-cannot-assign-to-read-only-property
		const currentSlide = { ...socialPosts[slideIndex] };
		const currentSocialPosts = [...socialPosts];
		const className = tag;

		const applyUpdate = (
			content:
				| string
				| string[]
				| Chart[]
				| boolean[]
				| ImagePosition[]
				| ThemeObject
				| SocialPostTemplateKeys
				| SocialPostLayoutKeys,

			className: SlideKeys | SlideKeys[],
		) => {
			if (className === 'subtopic') {
				currentSlide.subtopic = content as string;
			} else if (className === 'keywords') {
				currentSlide.keywords = content as string;
			} else if (className === 'topic') {
				currentSlide.topic = content as string;
			} else if (className === 'content') {
				if (typeof contentIndex === 'number' && contentIndex >= 0) {
					let newContent = [...currentSlide.content];
					newContent[contentIndex] = content as string;
					currentSlide.content = newContent;
				} else {
					console.error(`Invalid contentIndex: ${contentIndex}`);
				}
			} else if (className === 'template') {
				currentSlide.template = content as string;
			} else if (className === 'user_name') {
				currentSlide.user_name = content as string;
			} else if (className === 'images') {
				currentSlide.images = content as string[];
				currentSlide.illustration = content as string[];
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
				// currentSocialPosts.forEach((slide) => {
				// 	let newContent = {...slide.theme}
				// 	newContent = content as ThemeObject
				// 	slide.theme = newContent
				// 	//slide.theme = content as ThemeObject;
				// });

				const newSocialPosts = currentSocialPosts.map((slide) => {
					return {
						...slide,
						theme: { ...slide.theme, ...(content as ThemeObject) },
					};
				});
				setSocialPosts(newSocialPosts);
			} else if (className === 'chart') {
				currentSlide.chart = content as Chart[];
			} else if (className === 'is_chart') {
				currentSlide.is_chart = content as boolean[];
			} else if (className === 'image_positions') {
				currentSlide.image_positions = content as ImagePosition[];
			} else if (className === 'template_theme') {
				currentSlide.template_theme = content as SocialPostTemplateKeys;
			} else if (className === 'layout') {
				currentSlide.layout = content as SocialPostLayoutKeys;
			} else if (className === 'last_page_content') {
				if (typeof contentIndex === 'number' && contentIndex >= 0) {
					let newContent = [...currentSlide.last_page_content];
					newContent[contentIndex] = content as string;
					currentSlide.last_page_content = newContent;
				} else {
					console.error(`Invalid contentIndex: ${contentIndex}`);
				}
			} else if (className === 'last_page_title') {
				currentSlide.last_page_title = content as string;
			} else {
				console.error(`Unknown tag: ${tag}`);
			}
		};
		if (Array.isArray(className)) {
			Array.from(className).forEach((current_tag: SlideKeys, idx: number) => {
				let updateContent:
					| string
					| string[]
					| Chart[]
					| boolean[]
					| ImagePosition[]
					| ThemeObject;
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
				content as string | string[] | Chart[] | boolean[] | ImagePosition[],
				className,
			);
		}
		console.log('updating social post page', slideIndex);
		console.log(currentSlide);
		if (tag !== 'theme') {
			updateSocialPostsPage(slideIndex, currentSlide, rerender);
		} else {
			//setSocialPosts(currentSocialPosts)
		}
	}

	function toggleEditMode() {
		setIsEditMode(!isEditMode);
	}

	function handleAddPage() {
		addEmptyPage(socialPostsIndex);
	}

	function handleDuplicatePage() {
		duplicatePage(socialPostsIndex);
	}

	function handleDeletePage() {
		deleteSlidePage(socialPostsIndex);
	}

	const updateImgUrlArray = (slideIndex: number) => {
		const updateImgUrl = (
			urls: string[],
			ischart: boolean[],
			image_positions: ImagePosition[],
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
			handleSlideEdit([urls, ischart, image_positions], slideIndex, [
				'images',
				'is_chart',
				'image_positions',
			]);
		};
		return updateImgUrl;
	};

	const updateIllustrationUrlArray = (slideIndex: number) => {
		const updateIllustrationUrl = (
			urls: string[],
			ischart: boolean[],
			image_positions: ImagePosition[],
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
			handleSlideEdit([urls, ischart, image_positions], slideIndex, [
				'illustration',
				'is_chart',
				'image_positions',
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
			socialPosts.length - 1 === index,
			// logoMode,
			socialPostLogoMode,
			// selectedLogo[0]?.thumbnail_url,
			socialPostCustomLogoResource[0]?.thumbnail_url,
		);
	};

	const handleSocialPostTemplateSelectionChange = (
		selectedOption: SocialPostTemplateKeys,
	) => {
		setCurrentSelectedTemplate(selectedOption);
	};

	useEffect(() => {
		updateSocialPostTemplateTheme(currentSelectedTemplate);
	}, [currentSelectedTemplate]);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
			}}
		>
			<div className='SocialPostMainContainerDisplay flex flex-col items-center justify-center gap-4'>
				<ToolBar>
					{!isViewing && (
						<>
							<ButtonWithExplanation
								button={
									<button
										onClick={undoChange}
										style={{
											color: canUndo ? '#344054' : '#C6C6C6',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										disabled={!canUndo}
									>
										<RiArrowGoBackFill
											style={{
												strokeWidth: '1',
												flex: '1',
												width: '1.5rem',
												height: '1.5rem',
												fontWeight: 'bold',
											}}
										/>
									</button>
								}
								explanation={'Undo'}
							/>

							<ButtonWithExplanation
								button={
									<button
										onClick={redoChange}
										style={{
											color: canRedo ? '#344054' : '#C6C6C6',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										disabled={!canRedo}
									>
										<RiArrowGoForwardFill
											style={{
												strokeWidth: '1',
												flex: '1',
												width: '1.5rem',
												height: '1.5rem',
												fontWeight: 'bold',
											}}
										/>
									</button>
								}
								explanation={'Redo'}
							/>
							<div className='h-8 w-0.5 bg-gray-200'></div>
						</>
					)}
					{!isViewing && (
						<>
							<AddSlideButton
								addPage={handleAddPage}
								currentSlideIndex={socialPostsIndex}
							/>
							<DuplicateSlidePageButton
								duplicatePage={handleDuplicatePage}
								currentSlideIndex={socialPostsIndex}
							/>
							{socialPostsIndex != 0 && (
								<DeleteSlideButton
									deletePage={handleDeletePage}
									currentSlideIndex={socialPostsIndex}
								/>
							)}

							<button
							// onClick={() => {
							// 	setIsThemeCustomizationSectionOpen(
							// 		!isThemeCustomizationSectionOpen,
							// 	);
							// }}
							>
								<ChangeSlideTemplateButton
									slides={socialPosts}
									// onChangeTemplate={() => {
									// 	setIsThemeCustomizationSectionOpen((prev) => !prev);
									// }}
									onToggleChangeTemplateButton={() => toggleSection('theme')}
									currentSlideIndex={socialPostsIndex}
								/>
							</button>

							<SlidesBrandingButton
								slides={socialPosts}
								currentSlideIndex={socialPostsIndex}
								onToggleBrandingButton={() => toggleSection('branding')}
							></SlidesBrandingButton>

							<div className='h-8 w-0.5 bg-gray-200'></div>
						</>
					)}

					{/* {res_scenario !== 'serious_subject' && !isViewing && (
						<ThemeChanger
							openTheme={openTheme}
							showTheme={showTheme}
							closeTheme={closeTheme}
							currentSlideIndex={socialPostsIndex}
							borderColorOptions={borderColorOptions}
							handleSlideEdit={handleSlideEdit}
						/>
					)} */}

					{/* {res_scenario === 'casual_topic' && !isViewing && socialPostsIndex != 0 && (
						<LayoutChanger
							openModal={openModal}
							showLayout={showLayout}
							closeModal={closeModal}
							currentSlideIndex={socialPostsIndex}
							templateSamples={templateSamples}
							slides={socialPosts}
							handleSlideEdit={handleSlideEdit}
						/>
					)} */}

					{/* {res_scenario !== 'casual_topic' && !isViewing && (
						<div className='h-8 w-0.5 bg-gray-200'></div>
					)} */}

					<ButtonWithExplanation
						button={<PresentButton openPresent={openPresent} />}
						explanation='Present'
					/>
					<div className='h-8 w-0.5 bg-gray-200'></div>
					<ExportToPngButton
						socialPostSlide={socialPosts}
						currentSlideIndex={socialPostsIndex}
					/>
					{project && (
						<ShareButton
							setShare={updateIsShared}
							share={isShared}
							project={project}
							host={host}
							shareEntry={'socialPosts'}
							showShareModal={showShareModal}
							setShowShareModal={setShowShareModal}
						/>
					)}
				</ToolBar>
				{/* buttons and contents */}
				<div className='max-w-4xl relative flex flex-row items-center justify-center gap-4'>
					<ToastContainer />

					<SlideLeftNavigator
						currentSlideIndex={socialPostsIndex}
						slides={socialPosts}
						goToSlide={gotoPage}
					/>

					<SocialPostContainer
						isPresenting={present}
						slide={socialPosts[socialPostsIndex]}
						currentSlideIndex={socialPostsIndex}
						isViewing={isViewing}
						scale={present ? presentScale : nonPresentScale}
						templateDispatch={editableTemplateDispatch}
						slideRef={slideRef}
						containerRef={containerRef}
						length={socialPosts.length}
						key={socialPostVersion}
					/>

					<SlideRightNavigator
						currentSlideIndex={socialPostsIndex}
						slides={socialPosts}
						goToSlide={gotoPage}
					/>

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
					currentSlideIndex={socialPostsIndex}
					slides={socialPosts}
				/>

				{/* preview little image */}

				<div className='max-w-xs sm:max-w-4xl mx-auto py-6 justify-center items-center'>
					<div className='w-full py-6 flex flex-nowrap overflow-x-auto overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thin scrollbar-thumb-gray-500'>
						{socialPosts.map((socialPost, index) => (
							<div
								key={
									`previewContainer` +
									index.toString() +
									socialPosts.length.toString()
								}
								className={`w-[8rem] h-[5rem] rounded-md flex-shrink-0 cursor-pointer px-2`}
								onClick={() => {
									gotoPage(index); // Added onClick handler
								}}
							>
								{/* {index + 1} */}
								<SocialPostContainer
									slide={socialPost}
									currentSlideIndex={index}
									scale={0.1 * nonPresentScale}
									isViewing={true}
									templateDispatch={editableTemplateDispatch}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{
				// the section that can customize the social post theme
				<div
					className={`ThemeCustomizationSection ${openSection === 'theme' ? 'flex ' : 'hidden'} flex-col w-auto h-auto bg-[#FFFFFF] xl:static fixed bottom-[50%] left-1/2 transform -translate-x-1/2 xl:transform-none cursor-pointer`}
					style={{
						borderRadius: 'var(--radius-md, 8px)',
						border: '1px solid var(--Colors-Border-border-secondary, #EAECF0)',
						boxShadow:
							'0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
						padding: '16px',
						gap: '16px',
					}}
				>
					<div className='ThemeSectionTitleAndExitButton flex flex-row justify-between items-center'>
						<span
							style={{
								color: '#242731',
								fontFamily: 'Creato Display Bold',
								fontSize: '1.5rem',
								fontStyle: 'normal',
								fontWeight: 'bold',
								lineHeight: '2rem',
							}}
						>
							Theme
						</span>
						<div onClick={() => toggleSection('')}>
							<MdOutlineClose style={{ color: '#98A2B3' }}></MdOutlineClose>
						</div>
					</div>
					<hr
						style={{
							borderTop: '1px solid #E7E9EB',
							// margin: '0.75rem 0.5rem 0.75rem 0.5rem',
						}}
					/>
					<div className='ThemeTemplateSelectionBox flex flex-col gap-[16px]'>
						<div className={`titleAndSelectionBox flex flex-col gap-[4px]`}>
							<span
								style={{
									color: 'var(--colors-text-text-secondary-700, #344054)',
									// fontFamily: 'Creato Display Medium',
									fontSize: '14px',
									fontStyle: 'normal',
									fontWeight: 'bold',
									lineHeight: '20px',
								}}
							>
								Theme Template
							</span>
							{/* selection box */}
							<TemplateSelectionBox
								defaultSelection={currentSelectedTemplate}
								selectionOptions={socialPostTemplateOptions}
								handleSelectionChange={handleSocialPostTemplateSelectionChange}
							></TemplateSelectionBox>
						</div>
					</div>
				</div>
			}

			{
				// the section that can customize the social post branding (logo)
				<div
					className={`LogoBrandingCustomizationSection ${openSection === 'branding' ? 'flex' : 'hidden'} flex-col w-auto min-w-[15rem] h-auto bg-[#FFFFFF] xl:static fixed bottom-[50%] left-1/2 transform -translate-x-1/2 xl:transform-none cursor-pointer`}
					style={{
						borderRadius: 'var(--radius-md, 8px)',
						border: '1px solid var(--Colors-Border-border-secondary, #EAECF0)',
						boxShadow:
							'0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
						padding: '16px',
						gap: '16px',
					}}
				>
					<div className='BrandingSectionTitleAndExitButton flex flex-row justify-between items-center'>
						<span
							style={{
								color: '#242731',
								fontFamily: 'Creato Display Bold',
								fontSize: '1.5rem',
								fontStyle: 'normal',
								fontWeight: 'bold',
								lineHeight: '2rem',
							}}
						>
							Branding
						</span>
						<div onClick={() => toggleSection('')}>
							<MdOutlineClose style={{ color: '#98A2B3' }}></MdOutlineClose>
						</div>
					</div>
					<hr
						style={{
							borderTop: '1px solid #E7E9EB',
							// margin: '0.75rem 0.5rem 0.75rem 0.5rem',
						}}
					/>
					<div className='BrandingLogoRadioButtons flex flex-col gap-[16px] text-sm'>
						<PaywallModal
							showModal={showPaywall}
							setShowModal={setShowPaywall}
							message='Unlock this feature to customize logo on your slides.'
						/>
						<div className={`titleAndRadioButtons flex flex-col gap-[4px]`}>
							<span
								style={{
									color: 'var(--colors-text-text-secondary-700, #344054)',
									// fontFamily: 'Creato Display Medium',
									fontSize: '14px',
									fontStyle: 'normal',
									fontWeight: 'bold',
									lineHeight: '20px',
								}}
							>
								Logo type
							</span>
							<span>{!isPaidUser && <PlusLabel />}</span>

							<RadioButton
								options={brandingOptions}
								cols={1}
								selectedValue={socialPostLogoMode}
								setSelectedValue={(mode) => {
									if (mode !== 'default' && !isPaidUser) {
										setShowPaywall(true);
										return;
									}
									// setLogoMode(mode as 'no' | 'default' | 'custom');
									setSocialPostLogoMode(mode as 'no' | 'default' | 'custom');
								}}
								name='branding'
							/>
							{/* customized logo */}
							{socialPostLogoMode == 'custom' && (
								<ImageSelector
									type='logo'
									// selectedImage={selectedLogo}
									selectedImage={socialPostCustomLogoResource}
									// setSelectedImage={setSelectedLogo}
									setSelectedImage={setSocialPostCustomLogoResource}
									showQuestion={false}
								/>
							)}
						</div>
						{/* <div>
							<Instruction>
								What logo do you want to put on your slides?{' '}
							</Instruction>
							
						</div> */}
					</div>
				</div>
			}
		</div>
	);
};

export default SocialPostHTML;
