import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import SocialPostSlide from '@/models/SocialPost';
import Project from '@/models/Project';
import { useProject } from './use-project';
import { useUser } from './use-user';
import debounce from 'lodash.debounce';

const useSocialPostsBear = createBearStore<SocialPostSlide[]>()('socialPosts', [], true)
const useSocialPostsIndex = createBearStore<number>()('socialPostsIndex', 0, true)

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
    const useVersion = createBearStore<number>()('socialPostVersion', 0, true);
    const { socialPostVersion, setSocialPostVersion } = useVersion();
    const { saveStatus, setSaveStatus } = useSaveStatus();
    const { project } = useProject();
    const { token } = useUser();

    const init = async () => {
        if (socialPostsStatus !== SocialPostsStatus.NotInited) return;
        socialPostsStatus = SocialPostsStatus.Initing;

        console.log('-- init social posts: ', { socialPostsStatus, socialPosts });
        setSocialPostVersion(0);
        socialPostsStatus = SocialPostsStatus.Inited;
    }

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
        debouncedSyncSocialPosts(newSlides);
    };

    const updateSlidePage = (
        index: number,
        socialPost: SocialPostSlide,
        rerender: boolean = true,
        updateThumbnail: boolean = true,
    ) => {
        console.log('-- update social post page: ', { index, socialPost });
        const newSlides = [...socialPosts];
        console.log('new slides deck: ', newSlides);
        newSlides[index] = socialPost;
        setSocialPosts(newSlides);

        if (rerender) updateVersion();
        debouncedSyncSocialPosts(newSlides);
    };

    const gotoPage = (index: number) => {
        console.log('-- goto page: ', { index });
        if (index < 0 || index >= socialPosts.length) return;
        setSocialPostsIndex(index);
    };

    const initSocialPosts = (slides: SocialPostSlide[]) => {
        console.log('-- init social posts: ', { socialPosts });
        setSocialPosts(slides);
        setSocialPostsIndex(0);
        socialPostsStatus = SocialPostsStatus.Inited;
    };

    const updateVersion = () => {
        // helps force update slide container
        setSocialPostVersion((prevVersion) => prevVersion + 1);
    };

    const syncSocialPosts = async (
        socialposts: SocialPostSlide[],
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

    const debouncedSyncSocialPosts = debounce(syncSocialPosts, 1000);
    return {
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
    }
}