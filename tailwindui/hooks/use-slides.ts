import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Slide from '@/models/Slide';
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import { useUser } from './use-user';
import { useChatHistory } from './use-chat-history';
import { useProject } from './use-project';
import { debounce } from '@/utils/sleep';
import Project from '@/models/Project';

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
	const { updateProject, bulkUpdateProject } = useProject();
	const { saveStatus, setSaveStatus } = useSaveStatus();
	const { clearChatHistory } = useChatHistory();

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

	const showDrLambdaLogo = () => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: '', logo: 'Default'};
		});
		setIsShowingLogo(true);
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		syncSlides(newSlides, true);
	};

	const updateLogoUrl = (logo_url: string) => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: logo_url};
		});
		setIsShowingLogo(true);
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		syncSlides(newSlides, true);
	}

	const hideLogo = () => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, logo_url: '', logo: '' };
		});
		setIsShowingLogo(false);
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		syncSlides(newSlides, true);
	};

	const updateBackgroundUrl = (background_url: string) => {
		const newSlides = slides.map((slide, index) => {
			return { ...slide, background_url: background_url };
		});
		setSlides(newSlides);
		updateSlideHistory(newSlides);
		syncSlides(newSlides, true);
	}

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
		const newSlides = [...slides];
		newSlides.splice(index + 1, 0, newSlide);
		setSlides(newSlides);
		setSlideIndex(index + 1);

		updateVersion();
		updateSlideHistory(newSlides);
		syncSlides(newSlides, false, newSlides.length);
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
		syncSlides(newSlides, false, newSlides.length);
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
		syncSlides(newSlides, false, newSlides.length);
	};

	const updateSlidePage = (
		index: number,
		slide: Slide,
		rerender: boolean = true,
	) => {
		console.log('-- update slide page: ', { index, slide });
		const newSlides = [...slides];
		console.log('new slides deck: ', newSlides);
		newSlides[index] = slide;
		setSlides(newSlides);

		if (rerender) updateVersion();
		updateSlideHistory(newSlides);
		debouncedSyncSlides(newSlides, index === 0);
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
		if (slidesHistoryIndex > 0) {
			setSlides(slidesHistory[slidesHistoryIndex - 1]);
			setSlidesHistoryIndex(slidesHistoryIndex - 1);
			updateVersion();
		}
		console.log('Performing undo...');
		// document.execCommand('undo', false, undefined); // Change null to undefined

		// TODO: check if the cover page is changed
		syncSlides(
			slidesHistory[slidesHistoryIndex - 1],
			false,
			slidesHistory[slidesHistoryIndex - 1].length,
		);
	};

	const redoChange = () => {
		if (slidesHistoryIndex < slidesHistory.length - 1) {
			setSlides(slidesHistory[slidesHistoryIndex + 1]);
			setSlidesHistoryIndex(slidesHistoryIndex + 1);
			updateVersion();
		}
		// Add your redo logic here
		console.log('Performing redo...');
		// document.execCommand('redo', false, undefined); // Change null to undefined

		// TODO: check if the cover page is changed
		syncSlides(
			slidesHistory[slidesHistoryIndex + 1],
			false,
			slidesHistory[slidesHistoryIndex + 1].length,
		);
	};

	const removeTags = (text: string | string[]) => {
		if (Array.isArray(text)) {
			return text.map((t) => t.replace(/<[^>]*>?/gm, ''));
		} else {
			return text.replace(/<[^>]*>?/gm, '');
		}
	};

	const changePalette = (newPalette: PaletteKeys) => {
		console.log('Changing color theme to:', newPalette);
		let newSlides = slides.map((slide, index) => {
			return {
				...slide,
				palette: newPalette,
				images_position: [{}, {}, {}],
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
		syncSlides(newSlides, true);
	};

	const changeTemplate = (newTemplate: TemplateKeys) => {
		console.log('Changing template to:', newTemplate);
		let newSlides = slides.map((slide, index) => {
			return { ...slide, template: newTemplate, images_position: [{}, {}, {}] };
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
		syncSlides(newSlides, true);
	};

	const changeTemplateAndPalette = (
		newTemplate: TemplateKeys,
		newPalette: PaletteKeys,
	) => {
		console.log(
			'-- changeTemplateAndPalette:',
			newTemplate,
			newPalette,
		);

		let newSlides = slides.map((slide, index) => {
			return {
				...slide,
				template: newTemplate,
				palette: newPalette,
				images_position: [{}, {}, {}],
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

		updateVersion();
		updateSlideHistory(newSlides);
		syncSlides(newSlides, true);
	}

	const initSlides = (slides: Slide[]) => {
		console.log('-- init slides: ', { slides });
		setSlides(slides);
		setIsShowingLogo(slides?.some((slide) => slide.logo || slide.logo_url));
		setSlideIndex(0);
		setSlidesHistory([slides]);
		setSlidesHistoryIndex(0);
		clearChatHistory();
		setIsPresenting(false);
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
		syncSlides(newSlides);
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
					setSaveStatus(SaveStatus.UpToDate);
					console.log('Auto-save successful.');
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

	const debouncedSyncSlides = debounce(syncSlides, 500);

	return {
		slides,
		addEmptyPage,
		duplicatePage,
		deleteSlidePage,
		updateSlidePage,
		// updateBranding,
		changeTemplate,
		changePalette,
		changeTemplateAndPalette,
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
		showDrLambdaLogo,
		hideLogo,
		updateLogoUrl,
		updateBackgroundUrl,
		isPresenting,
		setIsPresenting,
	};
};
