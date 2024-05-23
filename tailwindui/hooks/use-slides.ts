import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Slide, { LogoPosition } from '@/models/Slide';
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import { useUser } from './use-user';
import { useChatHistory } from './use-chat-history';
import { useProject } from './use-project';
import Project from '@/models/Project';
import debounce from 'lodash.debounce';
import SlidesService from '@/services/SlidesService';
import dynamic from 'next/dynamic';
// import { colorPreviews } from '@/app/(feature)/design/TemplateSelector';
// Dynamically import the component with SSR disabled
const colorPreviews: any = dynamic(
	() => import('@/app/(feature)/design/TemplateSelector'),
	{
		ssr: false,
	},
);

const useSlidesBear = createBearStore<Slide[]>()('slides', [], true);
const useSlideIndex = createBearStore<number>()('slideIndex', 0, true);
const useSlidesHistoryBear = createBearStore<Slide[][]>()(
	'slidesHistory',
	[],
	true,
);
const useSlidesHistoryIndex = createBearStore<number>()(
	'slidesHistoryIndex',
	0,
	true,
);
const useVersion = createBearStore<number>()('version', 0, true);
const usePresenting = createBearStore<boolean>()('isPresenting', false, false);
const useIsShowingLogo = createBearStore<boolean>()(
	'isShowingLogo',
	true,
	false,
);
// const useIsTemplateLogoLeftSide = createBearStore<boolean>()(
// 	'isTemplateLogoLeftSide',
// 	true,
// 	true,
// );

const useInitialLoadedTemplateBgColor = createBearStore<string | undefined>()(
	'initialLoadedTemplateBgColor',
	'#FFFFFF',
	true,
);
const useCustomTemplateBgColor = createBearStore<string | undefined>()(
	'customTemplateBgColor',
	'',
	true,
);

const useHasSelectedCustomTemplateBgColor = createBearStore<boolean>()(
	'hasSelectedCustomTemplateBgColor',
	false,
	true,
);

// font color customizations

const useInitialLoadedSubtitleFontColor = createBearStore<string | undefined>()(
	'initialLoadedSubtitleFontColor',
	'#000000',
	true,
);
const useCustomizedTemplateSubtitleFontColor = createBearStore<
	string | undefined
>()('customizedTemplateSubtitleFontColor', '', true);

const useHasSelectedCustomizedTemplateSubtitleFontColor =
	createBearStore<boolean>()(
		'hasSelectedCustomizedTemplateSubtitleFontColor',
		false,
		true,
	);

const useInitialLoadedTitleFontColor = createBearStore<string | undefined>()(
	'initialLoadedTitleFontColor',
	'#000000',
	true,
);
const useCustomizedTemplateTitleFontColor = createBearStore<
	string | undefined
>()('customizedTemplateTitleFontColor', '', true);
const useHasSelectedCustomizedTemplateTitleFontColor =
	createBearStore<boolean>()(
		'hasSelectedCustomizedTemplateTitleFontColor',
		false,
		true,
	);

const useInitialLoadedContentFontColor = createBearStore<string | undefined>()(
	'initialLoadedContentFontColor',
	'#000000',
	true,
);
const useCustomizedTemplateContentFontColor = createBearStore<
	string | undefined
>()('customizedTemplateContentFontColor', '', true);
const useHasSelectedCustomizedTemplateContentFontColor =
	createBearStore<boolean>()(
		'hasSelectedCustomizedTemplateContentFontColor',
		false,
		true,
	);

// font family customizations
const useInitialLoadedSubtitleFontFamily = createBearStore<
	string | undefined
>()('initialLoadedSubtitleFontFamily', 'Arial', true);
const useCustomizedTemplateSubtitleFontFamily = createBearStore<
	string | undefined
>()('customizedTemplateSubtitleFontFamily', '', true);
const useHasSelectedCustomizedTemplateSubtitleFontFamily =
	createBearStore<boolean>()(
		'HasSelectedCustomizedTemplateSubtitleFontFamily',
		false,
		true,
	);

const useInitialLoadedContentFontFamily = createBearStore<string | undefined>()(
	'initialLoadedContentFontFamily',
	'Arial',
	true,
);
const useCustomizedTemplateContentFontFamily = createBearStore<
	string | undefined
>()('customizedTemplateContentFontFamily', '', true);
const useHasSelectedCustomizedTemplateContentFontFamily =
	createBearStore<boolean>()(
		'HasSelectedCustomizedTemplateContentFontFamily',
		false,
		true,
	);

const useInitialLoadedTitleFontFamily = createBearStore<string | undefined>()(
	'initialLoadedTitleFontFamily',
	'Arial',
	true,
);
const useCustomizedTemplateTitleFontFamily = createBearStore<
	string | undefined
>()('customizedTemplateTitleFontFamily', '', true);
const useHasSelectedCustomizedTemplateTitleFontFamily =
	createBearStore<boolean>()(
		'HasSelectedCustomizedTemplateTitleFontFamily',
		false,
		true,
	);

export enum SaveStatus {
	UpToDate,
	Saving,
}

const useSaveStatus = createBearStore<SaveStatus>()(
	'saveStatus',
	SaveStatus.UpToDate,
	false,
);

export enum SlidesStatus {
	NotInited,
	Initing,
	Inited,
}

let slidesStatus: SlidesStatus = SlidesStatus.NotInited;

export const removeTags = (text: string | string[]) => {
	if (Array.isArray(text)) {
		return text.map((t) =>
			typeof t === 'string' ? t.replace(/<[^>]*>?/gm, '') : '',
		);
	} else if (typeof text === 'string') {
		return text.replace(/<[^>]*>?/gm, '');
	} else {
		// Handle the case when text is neither a string nor an array
		return text;
	}
};

export const useSlides = () => {
	const { slides, setSlides } = useSlidesBear();
	const { slideIndex, setSlideIndex } = useSlideIndex();
	const { slidesHistory, setSlidesHistory } = useSlidesHistoryBear();
	const { slidesHistoryIndex, setSlidesHistoryIndex } = useSlidesHistoryIndex();
	const { version, setVersion } = useVersion();
	const { token } = useUser();
	const { project } = useProject();
	const { isPresenting, setIsPresenting } = usePresenting();
	const { isShowingLogo, setIsShowingLogo } = useIsShowingLogo();
	// const { isTemplateLogoLeftSide, setIsTemplateLogoLeftSide } =
	// 	useIsTemplateLogoLeftSide();
	const { updateProject, bulkUpdateProject } = useProject();
	const { saveStatus, setSaveStatus } = useSaveStatus();
	const { clearChatHistory } = useChatHistory();
	const { customTemplateBgColor, setCustomTemplateBgColor } =
		useCustomTemplateBgColor();
	const {
		hasSelectedCustomTemplateBgColor,
		setHasSelectedCustomTemplateBgColor,
	} = useHasSelectedCustomTemplateBgColor();
	const { initialLoadedTemplateBgColor, setInitialLoadedTemplateBgColor } =
		useInitialLoadedTemplateBgColor();
	// for customized font color
	const { initialLoadedContentFontColor, setInitialLoadedContentFontColor } =
		useInitialLoadedContentFontColor();
	const { initialLoadedSubtitleFontColor, setInitialLoadedSubtitleFontColor } =
		useInitialLoadedSubtitleFontColor();
	const { initialLoadedTitleFontColor, setInitialLoadedTitleFontColor } =
		useInitialLoadedTitleFontColor();
	const {
		hasSelectedCustomizedTemplateContentFontColor,
		setHasSelectedCustomizedTemplateContentFontColor,
	} = useHasSelectedCustomizedTemplateContentFontColor();
	const {
		hasSelectedCustomizedTemplateSubtitleFontColor,
		setHasSelectedCustomizedTemplateSubtitleFontColor,
	} = useHasSelectedCustomizedTemplateSubtitleFontColor();
	const {
		hasSelectedCustomizedTemplateTitleFontColor,
		setHasSelectedCustomizedTemplateTitleFontColor,
	} = useHasSelectedCustomizedTemplateTitleFontColor();
	const {
		customizedTemplateTitleFontColor,
		setCustomizedTemplateTitleFontColor,
	} = useCustomizedTemplateTitleFontColor();
	const {
		customizedTemplateSubtitleFontColor,
		setCustomizedTemplateSubtitleFontColor,
	} = useCustomizedTemplateSubtitleFontColor();
	const {
		customizedTemplateContentFontColor,
		setCustomizedTemplateContentFontColor,
	} = useCustomizedTemplateContentFontColor();
	// for customized font family
	// title font
	const { initialLoadedTitleFontFamily, setInitialLoadedTitleFontFamily } =
		useInitialLoadedTitleFontFamily();
	const {
		customizedTemplateTitleFontFamily,
		setCustomizedTemplateTitleFontFamily,
	} = useCustomizedTemplateTitleFontFamily();
	const {
		HasSelectedCustomizedTemplateTitleFontFamily,
		setHasSelectedCustomizedTemplateTitleFontFamily,
	} = useHasSelectedCustomizedTemplateTitleFontFamily();

	// subtitle font
	const {
		initialLoadedSubtitleFontFamily,
		setInitialLoadedSubtitleFontFamily,
	} = useInitialLoadedSubtitleFontFamily();
	const {
		customizedTemplateSubtitleFontFamily,
		setCustomizedTemplateSubtitleFontFamily,
	} = useCustomizedTemplateSubtitleFontFamily();
	const {
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		setHasSelectedCustomizedTemplateSubtitleFontFamily,
	} = useHasSelectedCustomizedTemplateSubtitleFontFamily();
	// content font
	const { initialLoadedContentFontFamily, setInitialLoadedContentFontFamily } =
		useInitialLoadedContentFontFamily();
	const {
		customizedTemplateContentFontFamily,
		setCustomizedTemplateContentFontFamily,
	} = useCustomizedTemplateContentFontFamily();
	const {
		HasSelectedCustomizedTemplateContentFontFamily,
		setHasSelectedCustomizedTemplateContentFontFamily,
	} = useHasSelectedCustomizedTemplateContentFontFamily();
	const updateCustomBgColorForTemplate = (color: string) => {
		setCustomTemplateBgColor(color);

		// update slide.background_color for all pages

		const newSlides = slides.map((slide, index) => {
			return { ...slide, background_color: color };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
		// setHasSelectedCustomTemplateBgColor(true);
	};

	const toggleHasSelectedCustomTemplateBgColor = (selectedState: boolean) => {
		setHasSelectedCustomTemplateBgColor(selectedState);
	};

	const updateCustomizedTitleFontFamilyForTemplate = (
		selectedFontFamily: string,
	) => {
		setCustomizedTemplateTitleFontFamily(selectedFontFamily);

		// update slide.background_color for all pages

		const newSlides = slides.map((slide, index) => {
			return { ...slide, titleFontFamily: selectedFontFamily };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
		// setHasSelectedCustomTemplateBgColor(true);
	};

	const updateCustomizedSubtitleFontFamilyForTemplate = (
		selectedFontFamily: string,
	) => {
		setCustomizedTemplateSubtitleFontFamily(selectedFontFamily);

		// update slide.background_color for all pages

		const newSlides = slides.map((slide, index) => {
			return { ...slide, subtitleFontFamily: selectedFontFamily };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
		// setHasSelectedCustomTemplateBgColor(true);
	};

	const updateCustomizedContentFontFamilyForTemplate = (
		selectedFontFamily: string,
	) => {
		setCustomizedTemplateContentFontFamily(selectedFontFamily);

		// update slide.background_color for all pages

		const newSlides = slides.map((slide, index) => {
			return { ...slide, contentFontFamily: selectedFontFamily };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
		// setHasSelectedCustomTemplateBgColor(true);
	};

	// to control show or not show logo

	const init = async () => {
		if (slidesStatus !== SlidesStatus.NotInited) return;
		slidesStatus = SlidesStatus.Initing;

		// setSlideIndex(0);
		setVersion(0);
		setSlidesHistory([slides]);
		setSlidesHistoryIndex(0);
		console.log('-- init slides: ', { slidesStatus, slides });

		slidesStatus = SlidesStatus.Inited;
	};

	// const changeIsShowingLogo = (newIsShowingLogo: boolean) => {
	// 	setIsShowingLogo(newIsShowingLogo);
	// 	const newSlides = slides.map((slide, index) => {
	// 		return { ...slide, show_logo: !isShowingLogo };
	// 	});
	// 	setSlides(newSlides);
	// 	updateSlideHistory(newSlides);
	// 	syncSlides(newSlides, true);
	// };

	const showLogo = () => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: '', logo: 'Default' };
		});
		setIsShowingLogo(true);
		updateProject('logo', 'Default');
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const removeUserName = () => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, userName: '' };
		});
		setSlides(newSlides);
		updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const updateLogoUrl = (logo_url: string) => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: logo_url };
		});
		setIsShowingLogo(true);
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const hideLogo = () => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: '', logo: '' };
		});
		setIsShowingLogo(false);
		updateProject('logo', '');
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const updateTemplateLogoPosition = (position: LogoPosition) => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_position: position };
		});
		// setIsTemplateLogoLeftSide(isLeft);
		// updateProject('is_logo_left', isLeft);
		updateProject('logo_position', position);
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const updateBackgroundUrl = (background_url: string) => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, background_url: background_url };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	useEffect(() => {
		void init();
	}, []);

	const addEmptyPage = (index: number) => {
		console.log('-- add empty page: ', { index });
		let newSlide = new Slide();
		newSlide.template = slides[index].template;
		newSlide.palette = slides[index].palette;
		newSlide.logo = slides[index].logo;
		newSlide.logo_url = slides[index].logo_url;
		newSlide.background_url = slides[index].background_url;
		newSlide.image_positions = slides[index].image_positions;
		const newSlides = [...slides];
		newSlides.splice(index + 1, 0, newSlide);
		setSlides(newSlides);
		setSlideIndex(index + 1);

		updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, false, newSlides.length);
	};

	const duplicatePage = (index: number) => {
		console.log('-- duplicate page: ', { index });
		const oldSlide = slides[index];
		const newSlide = { ...oldSlide };
		const newSlides = [...slides];
		newSlides.splice(index + 1, 0, newSlide);
		setSlides(newSlides);
		setSlideIndex(index + 1);

		updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, false, newSlides.length);
	};

	const deleteSlidePage = (index: number) => {
		console.log('-- delete slide page: ', { index });
		const newSlides = [...slides];
		newSlides.splice(index, 1);
		setSlides(newSlides);

		if (slideIndex >= newSlides.length) {
			setSlideIndex(newSlides.length - 1);
		}

		updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, false, newSlides.length);
	};

	const updateSlidePage = (
		index: number,
		slide: Slide,
		rerender: boolean = true,
		updateThumbnail: boolean = true,
	) => {
		console.log('-- update slide page: ', { index, slide });
		const newSlides = [...slides];
		console.log('new slides deck: ', newSlides);
		newSlides[index] = slide;
		setSlides(newSlides);

		if (rerender) updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, index === 0 && updateThumbnail);
	};

	const gotoPage = (index: number) => {
		console.log('-- goto page: ', { index });
		if (index < 0 || index >= slides.length) return;
		setSlideIndex(index);
	};

	const updateSlideHistory = (slides: Slide[]) => {
		console.log('-- slides changed, adding to history: ', { slides });

		setSlidesHistory((prevHistory) => {
			// Truncate history up to the current index, then append the new slides
			const updatedHistory = [
				...prevHistory.slice(0, slidesHistoryIndex + 1),
				slides,
			];

			// Check if the updated history exceeds 10 entries
			if (updatedHistory.length > 10) {
				// Calculate how many entries to remove from the start to keep the length at 10
				const entriesToRemove = updatedHistory.length - 10;
				return updatedHistory.slice(entriesToRemove);
			}

			return updatedHistory;
		});

		setSlidesHistoryIndex((prevIndex) => {
			// Calculate the new index based on the updated history. It should be the position of the newly added slides.
			// This assumes the new slides always become the last entry in the history.
			const updatedIndex = Math.min(prevIndex + 1, 9);
			return updatedIndex;
		});
	};

	const undoChange = () => {
		if (slidesHistoryIndex <= 0) return;

		if (slidesHistory[slidesHistoryIndex - 1].length === 0) {
			return;
		}
		setSlides(slidesHistory[slidesHistoryIndex - 1]);
		const maxSlideIndex = slidesHistory[slidesHistoryIndex - 1].length - 1;
		if (slideIndex > maxSlideIndex) {
			setSlideIndex(maxSlideIndex);
		}
		setSlidesHistoryIndex(slidesHistoryIndex - 1);
		updateVersion();
		console.log('Performing undo...');
		// document.execCommand('undo', false, undefined); // Change null to undefined

		// TODO: check if the cover page is changed
		debouncedSyncSlides(
			slidesHistory[slidesHistoryIndex - 1],
			false,
			slidesHistory[slidesHistoryIndex - 1].length,
		);
	};

	const redoChange = () => {
		if (slidesHistoryIndex >= slidesHistory.length - 1) return;
		setSlides(slidesHistory[slidesHistoryIndex + 1]);
		setSlidesHistoryIndex(slidesHistoryIndex + 1);
		updateVersion();
		// Add your redo logic here
		console.log('Performing redo...');
		// document.execCommand('redo', false, undefined); // Change null to undefined

		// TODO: check if the cover page is changed
		debouncedSyncSlides(
			slidesHistory[slidesHistoryIndex + 1],
			false,
			slidesHistory[slidesHistoryIndex + 1].length,
		);
	};

	const changePalette = (newPalette: PaletteKeys) => {
		console.log('Changing color theme to:', newPalette);
		let newSlides = slides.map((slide, index) => {
			return {
				...slide,
				palette: newPalette,
				// image_positions: ['contain', 'contain', 'contain'],
			};
		});
		newSlides = newSlides.map((slide, index) => {
			return {
				...slide,
				content: removeTags(slide.content) as string[],
				head: removeTags(slide.head) as string,
				title: removeTags(slide.title) as string,
				subtopic: removeTags(slide.subtopic) as string,
			};
		});
		//set into session storage to update
		updateProject('palette', newPalette);
		setSlides(newSlides);

		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const changeTemplate = (newTemplate: TemplateKeys) => {
		console.log('Changing template to:', newTemplate);
		let newSlides = slides.map((slide, index) => {
			return {
				...slide,
				template: newTemplate,
				// image_positions: ['contain', 'contain', 'contain'],
			};
		});
		newSlides = newSlides.map((slide, index) => {
			return {
				...slide,
				content: removeTags(slide.content) as string[],
				head: removeTags(slide.head) as string,
				title: removeTags(slide.title) as string,
				subtopic: removeTags(slide.subtopic) as string,
			};
		});
		//set into session storage to update
		updateProject('template', newTemplate);
		setSlides(newSlides);

		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const changeTemplateAndPaletteAndBgColorAndFontFamilyAndColor = (
		newTemplate: TemplateKeys,
		newPalette: PaletteKeys,
		newBgColor: string,
		newTitleFontFamily: string,
		newSubtitleFontFamily: string,
		newContentFontFamily: string,
		newTitleFontColor: string,
		newSubtitleFontColor: string,
		newContentFontCOlor: string,
	) => {
		console.log(
			'-- changeTemplateAndPaletteAndBgColorAndFont:',
			newTemplate,
			newPalette,
			newBgColor,
			newTitleFontFamily,
			newSubtitleFontFamily,
			newContentFontFamily,
			newTitleFontColor,
			newSubtitleFontColor,
			newContentFontCOlor,
		);

		let newSlides = slides.map((slide, index) => {
			return {
				...slide,
				template: newTemplate,
				palette: newPalette,
				background_color: hasSelectedCustomTemplateBgColor
					? customTemplateBgColor
					: colorPreviews[newPalette as PaletteKeys],
				// background_color: customTemplateBgColor,

				titleFontFamily: HasSelectedCustomizedTemplateTitleFontFamily
					? customizedTemplateTitleFontFamily
					: initialLoadedTitleFontFamily,
				subtitleFontFamily: HasSelectedCustomizedTemplateSubtitleFontFamily
					? customizedTemplateSubtitleFontFamily
					: initialLoadedSubtitleFontFamily,
				contentFontFamily: HasSelectedCustomizedTemplateContentFontFamily
					? customizedTemplateContentFontFamily
					: initialLoadedContentFontFamily,
				titleFontColor: hasSelectedCustomizedTemplateTitleFontColor
					? customizedTemplateTitleFontColor
					: initialLoadedTitleFontColor,
				subtitleFontColor: hasSelectedCustomizedTemplateSubtitleFontColor
					? customizedTemplateSubtitleFontColor
					: initialLoadedSubtitleFontColor,
				contentFontColor: hasSelectedCustomizedTemplateContentFontColor
					? customizedTemplateContentFontColor
					: initialLoadedContentFontColor,

				// image_positions: [{}, {}, {}],// comment this line because it cause the image position to be wrong after changing template and palette
			};
		});
		newSlides = newSlides.map((slide, index) => {
			return {
				...slide,
				content: removeTags(slide.content) as string[],
				head: removeTags(slide.head) as string,
				title: removeTags(slide.title) as string,
				subtopic: removeTags(slide.subtopic) as string,
			};
		});
		//set into session storage to update
		bulkUpdateProject({
			template: newTemplate,
			palette: newPalette,
		} as Project);
		setSlides(newSlides);

		// setHasSelectedCustomTemplateBgColor; // if select a theme then erase custom color

		updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, true);
	};

	const initSlides = (slides: Slide[]) => {
		console.log('-- init slides: ', { slides });
		if (slides.length === 0) {
			return;
		}

		setSlides(slides);
		setIsShowingLogo(slides?.some((slide) => slide.logo || slide.logo_url));
		// setIsTemplateLogoLeftSide(slides[0].is_logo_left);
		setSlideIndex(0);
		setSlidesHistory([slides]);
		setSlidesHistoryIndex(0);
		clearChatHistory();
		setIsPresenting(false);

		setCustomizedTemplateContentFontFamily(slides[0].contentFontFamily);
		setCustomizedTemplateSubtitleFontFamily(slides[0].subtitleFontFamily);
		setCustomizedTemplateTitleFontFamily(slides[0].titleFontFamily);
		setCustomizedTemplateTitleFontColor(slides[0].titleFontColor);
		setCustomizedTemplateSubtitleFontColor(slides[0].subtitleFontColor);
		setCustomizedTemplateContentFontColor(slides[0].contentFontColor);

		setHasSelectedCustomizedTemplateContentFontFamily(
			!!slides[0].contentFontFamily,
		);
		setHasSelectedCustomizedTemplateSubtitleFontFamily(
			!!slides[0].subtitleFontFamily,
		);
		setHasSelectedCustomizedTemplateTitleFontFamily(
			!!slides[0].titleFontFamily,
		);
		setHasSelectedCustomizedTemplateTitleFontColor(!!slides[0].titleFontColor);
		setHasSelectedCustomizedTemplateSubtitleFontColor(
			!!slides[0].subtitleFontColor,
		);
		setHasSelectedCustomizedTemplateContentFontColor(
			!!slides[0].contentFontColor,
		);

		setCustomTemplateBgColor(slides[0].background_color);

		slidesStatus = SlidesStatus.Inited;
	};

	const updateVersion = () => {
		// helps force update slide container
		setVersion((prevVersion) => prevVersion + 1);
	};

	const setTranscripts = (transcripts: string[]) => {
		console.log('-- set transcripts: ', { transcripts });
		const newSlides = [...slides];
		for (let i = 0; i < transcripts.length; i++) {
			if (i < slides.length)
				newSlides[i] = { ...slides[i], transcript: transcripts[i] };
		}
		setSlides(newSlides);
		debouncedSyncSlides(newSlides);
		updateProject('has_scripts', true);
	};

	const syncSlides = async (
		slides: Slide[],
		is_cover_page: boolean = false,
		new_page_count: number = 0,
	) => {
		setSaveStatus(SaveStatus.Saving);

		const foldername = project?.foldername;
		const project_id = project?.id;

		if (!foldername || !project_id || !token) {
			console.error(
				'No foldername, project_id or token found. Cannot save slides.',
			);
			return;
		}

		const formData = {
			foldername: foldername,
			final_slides: slides,
			project_id: project_id,
			is_cover_page: is_cover_page,
			new_page_count: new_page_count,
		};

		console.log('Saving slides:', formData);

		// Send a POST request to the backend to save finalSlides
		try {
			const ok = await SlidesService.saveSlides(formData, token);
			if (ok) {
				setSaveStatus(SaveStatus.UpToDate);
				console.log('Auto-save successful.');

				if (is_cover_page) {
					// Update the thumbnail
					SlidesService.updateThumbnail(project_id, token);
				}
			} else {
				// Handle save error
				console.error('Auto-save failed.');
			}
		} catch (error) {
			console.error('Auto-save failed:', error);
		}
	};

	const debouncedSyncSlides = debounce(syncSlides, 1000);

	return {
		slides,
		addEmptyPage,
		duplicatePage,
		deleteSlidePage,
		updateSlidePage,
		// updateBranding,
		changeTemplate,
		changePalette,
		changeTemplateAndPaletteAndBgColorAndFontFamilyAndColor,
		initSlides,
		slidesHistory,
		slidesHistoryIndex,
		undoChange,
		redoChange,
		slideIndex,
		setSlideIndex,
		gotoPage,
		slidesStatus,
		version,
		updateVersion,
		saveStatus,
		SaveStatus,
		syncSlides,
		setTranscripts,
		isShowingLogo,
		// setIsShowingLogo,
		// changeIsShowingLogo,
		showLogo,
		removeUserName,
		hideLogo,
		updateLogoUrl,
		updateBackgroundUrl,
		isPresenting,
		setIsPresenting,
		setSlides,
		debouncedSyncSlides,
		customTemplateBgColor,
		hasSelectedCustomTemplateBgColor,
		setHasSelectedCustomTemplateBgColor,
		initialLoadedTemplateBgColor,
		setInitialLoadedTemplateBgColor,
		setCustomTemplateBgColor,
		updateCustomBgColorForTemplate,
		updateCustomizedTitleFontFamilyForTemplate,
		updateCustomizedContentFontFamilyForTemplate,
		updateCustomizedSubtitleFontFamilyForTemplate,
		toggleHasSelectedCustomTemplateBgColor,
		initialLoadedTitleFontFamily,
		setInitialLoadedTitleFontFamily,
		customizedTemplateTitleFontFamily,
		setCustomizedTemplateTitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		setHasSelectedCustomizedTemplateTitleFontFamily,
		initialLoadedSubtitleFontFamily,
		setInitialLoadedSubtitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		setCustomizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		setHasSelectedCustomizedTemplateSubtitleFontFamily,
		initialLoadedContentFontFamily,
		setInitialLoadedContentFontFamily,
		customizedTemplateContentFontFamily,
		setCustomizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateContentFontFamily,
		setHasSelectedCustomizedTemplateContentFontFamily,
		initialLoadedContentFontColor,
		setInitialLoadedContentFontColor,
		customizedTemplateContentFontColor,
		setCustomizedTemplateContentFontColor,
		hasSelectedCustomizedTemplateContentFontColor,
		setHasSelectedCustomizedTemplateContentFontColor,
		// subtitle font color
		initialLoadedSubtitleFontColor,
		setInitialLoadedSubtitleFontColor,
		customizedTemplateSubtitleFontColor,
		setCustomizedTemplateSubtitleFontColor,
		hasSelectedCustomizedTemplateSubtitleFontColor,
		setHasSelectedCustomizedTemplateSubtitleFontColor,
		// title font color
		initialLoadedTitleFontColor,
		setInitialLoadedTitleFontColor,
		customizedTemplateTitleFontColor,
		setCustomizedTemplateTitleFontColor,
		hasSelectedCustomizedTemplateTitleFontColor,
		setHasSelectedCustomizedTemplateTitleFontColor,
		// isTemplateLogoLeftSide,
		// setIsTemplateLogoLeftSide,
		// updateTemplateLogoPositionToLeft,
		updateTemplateLogoPosition,
	};
};
