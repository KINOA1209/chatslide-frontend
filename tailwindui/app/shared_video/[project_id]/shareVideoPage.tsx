'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import { Blank, Loading } from '@/components/ui/Loading';
import { useProject } from '@/hooks/use-project';
import useHydrated from '@/hooks/use-hydrated';
import { useSearchParams } from 'next/navigation';
import Video from '@/components/Video';

interface ShareVideoPageProps {
	project_id: string;
}

const ShareVideoPage: React.FC<ShareVideoPageProps> = ({ project_id }) => {
	const { project, initProject } = useProject();
	const [loading, setLoading] = useState(true);
	const [loadingFailed, setLoadingFailed] = useState(false);
	const [postType, setPostType] = useState<string>('casual_topic');
	const params = useSearchParams();
	const [videoUrl, setVideoUrl] = useState('');

	useEffect(() => {
		const init = async () => {
			let project;
			try {
				project = await ProjectService.getSharedProjectDetails(
					project_id,
					false,
					'video',
				);
			} catch (error) {
				console.error(`Error fetching project ${project_id} details:`, error);
				setLoading(false);
				setLoadingFailed(true);
				return;
			}

			initProject(project);
			console.log('project', project);

			if (project) {
				setVideoUrl(project.video_url || '');
				setLoading(false);
			} else {
				console.error(`Project with ID ${project_id} not found.`);
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

	return (
		<>
			{/* <ToastContainer /> */}
			{videoUrl !== '' ? (
				<div className='flex flex-col h-full items-center justify-center overflow-hidden'>
					<Video videoUrl={videoUrl} />
				</div>
			) : (
				<Blank>
					<div>We're sorry your video link is not found 😭.</div>
				</Blank>
			)}
		</>
	);
};

export default ShareVideoPage;
