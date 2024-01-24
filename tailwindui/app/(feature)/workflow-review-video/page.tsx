'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import FeedbackButton from '@/components/ui/feedback';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import AuthService from '@/services/AuthService';

const VideoVisualizer = ({ videoUrl, status }: { videoUrl: string, status: string }) => {
	const videoSource = videoUrl;
	const topic =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic') || 'drlambda_video'
			: 'drlambda_video';

	return (
		//<div className='max-w-4xl mx-auto px-4 sm:px-6'>
		<div className='flex flex-col justify-center items-center gap-4 my-4'>
			<div className='w-fit block m-auto'>
				{videoUrl !== '' ? (
					<Video videoUrl={videoSource} />
				) : status === 'failed' ? (
					<div>We're sorry your video generation failed :( please retry generation in the script page again.</div>
				) : (
					<div>Your video is being generated. It usually takes 10 - 20 minutes to finish. You could safely leave the page and check back later.</div>
				)}
			</div>
		</div>
	);
};

export default function WorkflowStep6() {
	const videoJobId =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('video_job_id') || ''
			: '';
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string>();
	const [jobStatus, setJobStatus] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	const showErrorAndRedirect = () => {
		toast.error(`Your video is being generated, please wait a bit...`, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			containerId: 'reviewVideo',
		});
		router.push('/workflow-edit-script');
	};

	useEffect(() => {
		if (typeof sessionStorage !== 'undefined') {
			const url = sessionStorage.getItem('video_url');
			if (url) {
				setVideoUrl(url);
			} else {
				if (videoJobId === '') {
					showErrorAndRedirect();
				}
				setIsLoading(true);
			}
		}
		if (isLoading) {
			checkVideoJobStatus();
		}
	}, []);

	const checkVideoJobStatus = async () => {
		if (!isLoading) {
			return;
		}
		try {
			const { userId, idToken: token } =
				await AuthService.getCurrentUserTokenAndId();
			const jobStatus = await VideoService.getVideoJobStatus(videoJobId, token);
			console.log(
				`jobStatus = ${jobStatus}, job_status = ${jobStatus.job_status}, video_url = ${jobStatus.video_url}`,
			);
			setJobStatus(jobStatus.job_status);
			if ((jobStatus.job_status === 'completed') || (jobStatus.job_status === 'failed')) {
				if (jobStatus.video_url) {
					setVideoUrl(jobStatus.video_url);
				}
				setIsLoading(false); // Stop polling once the video is ready or failed
			}
		} catch (error) {
			console.error('Error fetching video status:', error);

			if ((error as Error).message.includes('404')) {
				showErrorAndRedirect();
			}
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

	return (
		<div className='min-h-[90vh] w-full bg-white'>
			{/* flex col container for steps, title, etc */}

			<WorkflowStepsBanner
				currentIndex={5}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				contentRef={contentRef}
				nextIsPaidFeature={true}
				lastStep={true}
			/>

			<ToastContainer enableMultiContainer containerId={'video'} />

			<div
				className={`max-w-4xl px-6 flex flex-col relative mx-auto`}
				ref={contentRef}
			>
				<VideoVisualizer videoUrl={videoUrl || ''} status={jobStatus || ''} />
			</div>

			<FeedbackButton />
		</div>
		// <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
		//<div className='max-w-4xl mx-auto' ref={contentRef}>
	);
}
