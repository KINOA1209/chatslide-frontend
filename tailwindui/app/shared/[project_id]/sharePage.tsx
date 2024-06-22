'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import { useSlides } from '@/hooks/use-slides';
import { Blank, Loading } from '@/components/ui/Loading';
import { useProject } from '@/hooks/use-project';
import useHydrated from '@/hooks/use-hydrated';
import { useSearchParams } from 'next/navigation';
import { useSocialPosts } from '@/hooks/use-socialpost';
import EmbeddedSlide from './EmbeddedSlide';
import Project from '@/models/Project';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

const SocialPostHTML = dynamic(
	() => import('@/components/socialPost/socialPostHTML'),
	{
		ssr: false,
	},
);

interface SharePageProps {
  project: Project;  // one of project or project_id should be supplied
	embed?: boolean;
}

const SharePage: React.FC<SharePageProps> = ({ project, embed = false }) => {
	const { initProject } = useProject();
	const [loading, setLoading] = useState(true);
	const [loadingFailed, setLoadingFailed] = useState(false);
	const { initSlides } = useSlides();
	const { initSocialPosts } = useSocialPosts();
	const [postType, setPostType] = useState<string>('casual_topic');
	const params = useSearchParams();
	const initSlideIndex = parseInt(params.get('page') || '1') - 1;
	const borderColorOptions = [
		{
			border_start: '#FF7A41',
			border_end: '#D63300',
			cover_start: '#B83700 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FFBE41',
			border_end: '#D68000',
			cover_start: '#AB8C1E 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#96EB2C',
			border_end: '#23830B',
			cover_start: '#579C00 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FB42FF',
			border_end: '#767EFF',
			cover_start: '#9F4FC9 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#41C6FF',
			border_end: '#0055D6',
			cover_start: '#2593C8 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#937C67',
			border_end: '#4F361F',
			cover_start: '#725947 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		}, // default
		{
			border_start: '#D0BF9E',
			border_end: '#AC9067',
			cover_start: '#725E16 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#AFC593',
			border_end: '#62735D',
			cover_start: '#52702D 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#CCACCD',
			border_end: '#66589D',
			cover_start: '#593F66 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#9DC0CE',
			border_end: '#556379',
			cover_start: '#214150 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
	];

	useEffect(() => {
		console.log('initSlideIndex', initSlideIndex);

		const init = async () => {
			initProject(project);
			console.log('project', project);

			if (project) {
				if (!project.content_type || project.content_type === 'presentation') {
					const slides = ProjectService.parseSlides(
						project.presentation_slides || '',
					);
					initSlides(slides);
					setLoading(false);
				} else if (project.content_type === 'social_posts') {
					setPostType(project.post_type || ''); // Ensure project.post_type is not undefined
					const socialposts = ProjectService.parseSocialPosts(
						project.social_posts || '',
						project.post_type || '',
					); // Ensure project.social_posts and project.post_type are not undefined
					initSocialPosts(socialposts);
					setLoading(false);
				}
			} else {
      console.error(`Project not found.`);
				setLoading(false);
				setLoadingFailed(true);
			}
		};

		init();
	}, []);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	if (loading) return <Loading />;

	if (loadingFailed || project?.topic === 'Project not found')
		return (
			<Blank>
				<div>
					❌ Oops! It looks like we couldn't find the project. <br />
					🔍 Could you double-check the project ID and make sure it's shared?
				</div>
			</Blank>
		);

	if (embed) return <EmbeddedSlide initSlideIndex={initSlideIndex} />;

	return (
		<>
			<ToastContainer />
			{(!project?.content_type || project?.content_type === 'presentation') && (
				<SlidesHTML isViewing={true} />
			)}

			{project?.content_type === 'social_posts' && (
				<div>
					<SocialPostHTML
						isViewing={true}
						borderColorOptions={borderColorOptions}
						res_scenario={postType}
					/>
				</div>
			)}
		</>
	);
};

export default SharePage;
