import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import { SocialPostSlide } from '@/models/SocialPost';
import Project from '@/models/Project';
import { useProject } from './use-project';
import { useUser } from './use-user';
import debounce from 'lodash.debounce';
import { useChatHistory } from './use-chat-history';

const useSocialPostsBear = createBearStore<SocialPostSlide[]>()(
	'socialPosts',
	[],
	true,
);
const useSocialPostsIndex = createBearStore<number>()(
	'socialPostsIndex',
	0,
	true,
);
const useSocialPostsVersion = createBearStore<number>()(
	'socialPostVersion',
	0,
	true,
);
const useSocialPostsHistoryBear = createBearStore<SocialPostSlide[][]>()(
	'socialPostsHistory',
	[],
	true,
);
const useSocialPostsHistoryIndex = createBearStore<number>()(
	'socialPostsHistoryIndex',
	0,
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

export enum SocialPostsStatus {
	NotInited,
	Initing,
	Inited,
}

let socialPostsStatus: SocialPostsStatus = SocialPostsStatus.NotInited;

export const useSocialPosts = () => {
	const { socialPosts, setSocialPosts } = useSocialPostsBear();
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPostsIndex();
	const { socialPostVersion, setSocialPostVersion } = useSocialPostsVersion();
	const { saveStatus, setSaveStatus } = useSaveStatus();
	const { project } = useProject();
	const { token } = useUser();
	const { socialPostsHistory, setSocialPostsHistory } =
		useSocialPostsHistoryBear();
	const { socialPostsHistoryIndex, setSocialPostsHistoryIndex } =
		useSocialPostsHistoryIndex();
	const { clearChatHistory } = useChatHistory();

	const init = async () => {
		if (socialPostsStatus !== SocialPostsStatus.NotInited) return;
		socialPostsStatus = SocialPostsStatus.Initing;

		setSocialPostVersion(0);
		setSocialPostsHistory([socialPosts]);
		setSocialPostsHistoryIndex(0);
		console.log('-- init social posts: ', { socialPostsStatus, socialPosts });
		socialPostsStatus = SocialPostsStatus.Inited;
	};

	useEffect(() => {
		void init();
	}, []);

	const addEmptyPage = (index: number) => {
		console.log('-- add empty page: ', { index });
		let newSlide = new SocialPostSlide();
		newSlide.template = socialPosts[index].template;
		const newSlides = [...socialPosts];
		newSlides.splice(index + 1, 0, newSlide);
		setSocialPosts(newSlides);
		setSocialPostsIndex(index + 1);

		updateVersion();
		updateSocialPostHistory(newSlides);
		debouncedSyncSocialPosts(newSlides);
	};

	const duplicatePage = (index: number) => {
		console.log('-- duplicate page: ', { index });
		const oldSlide = socialPosts[index];
		const newSlide = { ...oldSlide };
		const newSlides = [...socialPosts];
		newSlides.splice(index + 1, 0, newSlide);
		setSocialPosts(newSlides);
		setSocialPostsIndex(index + 1);

		updateVersion();
		updateSocialPostHistory(newSlides);
		debouncedSyncSocialPosts(newSlides);
	};

	const deleteSlidePage = (index: number) => {
		console.log('-- delete slide page: ', { index });
		const newSlides = [...socialPosts];
		newSlides.splice(index, 1);
		setSocialPosts(newSlides);

		if (socialPostsIndex >= newSlides.length) {
			setSocialPostsIndex(newSlides.length - 1);
		}

		updateVersion();
		updateSocialPostHistory(newSlides);
		debouncedSyncSocialPosts(newSlides);
	};

	const updateSocialPostsPage = (
		index: number,
		socialPost: SocialPostSlide,
		rerender: boolean = true,
		updateThumbnail: boolean = true,
	) => {
		console.log('-- update social post page: ', { index, socialPost });
		const newSocialPosts = [...socialPosts];
		console.log('new social posts deck: ', newSocialPosts);
		newSocialPosts[index] = socialPost;
		setSocialPosts(newSocialPosts);

		if (rerender) updateVersion();
		updateSocialPostHistory(newSocialPosts);
		debouncedSyncSocialPosts(newSocialPosts);
	};

	const gotoPage = (index: number) => {
		console.log('-- goto page: ', { index });
		if (index < 0 || index >= socialPosts.length) return;
		setSocialPostsIndex(index);
	};

	const initSocialPosts = (social_posts: SocialPostSlide[]) => {
		console.log('-- init social posts: ', { socialPosts });
		setSocialPosts(social_posts);
		setSocialPostsIndex(0);
		setSocialPostsHistory([social_posts]);
		setSocialPostsHistoryIndex(0);
		clearChatHistory();
		socialPostsStatus = SocialPostsStatus.Inited;
	};

	const updateVersion = () => {
		// helps force update slide container
		setSocialPostVersion((prevVersion) => prevVersion + 1);
	};

	const syncSocialPosts = async (socialposts: SocialPostSlide[]) => {
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
			final_posts: socialposts,
			project_id: project_id,
		};

		console.log('Saving socialposts:', formData);

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

	const updateSocialPostHistory = (social_posts: SocialPostSlide[]) => {
		console.log('-- social posts changed, adding to history: ', {
			socialPosts,
		});

		setSocialPostsHistory((prevHistory) => {
			// Truncate history up to the current index, then append the new slides
			const updatedHistory = [
				...prevHistory.slice(0, socialPostsHistoryIndex + 1),
				social_posts,
			];

			// Check if the updated history exceeds 10 entries
			if (updatedHistory.length > 10) {
				// Calculate how many entries to remove from the start to keep the length at 10
				const entriesToRemove = updatedHistory.length - 10;
				return updatedHistory.slice(entriesToRemove);
			}

			return updatedHistory;
		});

		setSocialPostsHistoryIndex((prevIndex) => {
			// Calculate the new index based on the updated history. It should be the position of the newly added slides.
			// This assumes the new slides always become the last entry in the history.
			const updatedIndex = Math.min(prevIndex + 1, 9);
			return updatedIndex;
		});
	};

	const undoChange = () => {
		if (socialPostsHistoryIndex <= 0) return;

		if (socialPostsHistory[socialPostsHistoryIndex - 1].length === 0) {
			return;
		}
		setSocialPosts(socialPostsHistory[socialPostsHistoryIndex - 1]);
		const maxSlideIndex =
			socialPostsHistory[socialPostsHistoryIndex - 1].length - 1;
		if (socialPostsIndex > maxSlideIndex) {
			setSocialPostsIndex(maxSlideIndex);
		}
		setSocialPostsHistoryIndex(socialPostsHistoryIndex - 1);
		updateVersion();
		console.log('Performing undo...');
		debouncedSyncSocialPosts(socialPostsHistory[socialPostsHistoryIndex - 1]);
	};

	const redoChange = () => {
		if (socialPostsHistoryIndex >= socialPostsHistory.length - 1) return;
		setSocialPosts(socialPostsHistory[socialPostsHistoryIndex + 1]);
		setSocialPostsHistoryIndex(socialPostsHistoryIndex + 1);
		updateVersion();
		// Add your redo logic here
		console.log('Performing redo...');
		debouncedSyncSocialPosts(socialPostsHistory[socialPostsHistoryIndex + 1]);
	};

	const debouncedSyncSocialPosts = debounce(syncSocialPosts, 1000);
	return {
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
	};
};
