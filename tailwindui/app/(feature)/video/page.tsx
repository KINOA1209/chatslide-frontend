'use client';

import React, { useEffect, useRef, useState } from 'react';
import Video from '@/components/Video';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Loading, Blank } from '@/components/ui/Loading';
import { useProject } from '@/hooks/use-project';
import useHydrated from '@/hooks/use-hydrated';

const VideoVisualizer = ({
	videoUrl,
	status,
}: {
	videoUrl: string;
	status: string;
}) => {
	const videoSource = videoUrl;

	return (
		<>
			{videoUrl !== '' ? (
				<div className='w-full sm:w-3/4 mx-auto border rounded border-2 border-gray-200 p-4'>
					<Video videoUrl={videoSource} />
				</div>
			) : status === 'failed' ? (
				<Blank>
					<div>
						We're sorry your video generation failed 😭. please retry generation
						in the script page again.
					</div>
				</Blank>
			) : (
				<Loading>
					<p>
						Your video is being generated ⏳. It usually takes 5 minutes to
						finish.{' '}
					</p>
					<p>
						You can safely leave the page and check back later. Or stay on this page and wait.
					</p>
					<p>
						Once the video is ready, we will also send you an notifying email 📧.
					</p>
				</Loading>
			)}
		</>
	);
};

export default function WorkflowStep6() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { project, updateProject } = useProject();
	const [videoUrl, setVideoUrl] = useState<string>(project?.video_url || '');
	const [jobStatus, setJobStatus] = useState<string>();
	const [isLoading, setIsLoading] = useState(project?.video_url ? false : true);
	const { token } = useUser();

	if (!project) {
		return <Blank>Project not found</Blank>;
	}

	const checkVideoJobStatus = async () => {
		if (!isLoading) {
			return;
		}
		try {
			const jobStatus = await VideoService.getVideoJobStatus(project.id, token);
			console.log(
				`jobStatus = ${jobStatus}, job_status = ${jobStatus.job_status}, video_url = ${jobStatus.video_url}`,
			);
			setJobStatus(jobStatus.job_status);
			if (
				jobStatus.job_status === 'completed' ||
				jobStatus.job_status === 'failed'
			) {
				if (jobStatus.video_url) {
					setVideoUrl(jobStatus.video_url);
					updateProject('video_url', jobStatus.video_url);
				}
				setIsLoading(false); // Stop polling once the video is ready or failed
			}
		} catch (error) {
			console.error('Error fetching video status:', error);
		}
	};

	useEffect(() => {
		// Only set up polling if the video is not ready yet
		if (isLoading) {
			const intervalId = setInterval(checkVideoJobStatus, 15000); // Poll every 15 seconds

			// Clean up the interval on component unmount
			return () => clearInterval(intervalId);
		}
	}, [isLoading]);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='h-full w-full bg-white flex flex-col'>
			{/* flex col container for steps, title, etc */}

			<WorkflowStepsBanner
				currentIndex={5}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				nextIsPaidFeature={true}
				lastStep={true}
			/>

			<VideoVisualizer videoUrl={videoUrl || ''} status={jobStatus || ''} />
		</div>
		// <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
		//<div className='max-w-4xl mx-auto' ref={contentRef}>
	);
}