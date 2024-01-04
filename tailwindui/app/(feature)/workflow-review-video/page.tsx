'use client';

import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import FeedbackButton from '@/components/ui/feedback';
import WorkflowStepsBanner from "@/components/WorkflowStepsBanner";
import {ToastContainer} from "react-toastify";
import VideoService from "@/services/VideoService";
import AuthService from "@/services/AuthService";

const VideoVisualizer = ({
	videoUrl,
}: {
	videoUrl: string;
}) => {
	const videoSource = videoUrl;
	const topic =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic')
			: '';

	const handleDownload = async () => {
		const response = await fetch(videoSource, {
			method: 'GET',
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${topic}.mp4`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
			console.log('Video saved successfully.');
		} else {
			console.error('Failed to save Video.');
		}
	};

	return (
		//<div className='max-w-4xl mx-auto px-4 sm:px-6'>
		<div className='flex flex-col justify-center items-center gap-4 my-4'>
			<div className='w-fit block m-auto'>
				{videoUrl !== '' ?
					<Video videoUrl={videoSource} /> :
					<div>Your video is being generated, please check back later.</div>
				}
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
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (typeof sessionStorage !== 'undefined') {
			const url = sessionStorage.getItem('video_url');
			if (url) {
				setVideoUrl(url);
			} else {
				if (videoJobId === '') {
					router.push('/workflow-edit-script');
				}
				setIsLoading(true);
			}
		} else {
			if (videoJobId === '') {
				router.push('/workflow-edit-script');
			}
			setIsLoading(true);
		}
	})

	const checkVideoJobStatus = async () => {
		try {
			const { userId, idToken: token } =
				await AuthService.getCurrentUserTokenAndId();
			const jobStatus = await VideoService.getVideoJobStatus(videoJobId, token);
			if (jobStatus.job_status === 'completed' && jobStatus.video_url) {
				setVideoUrl(jobStatus.video_url);
				setIsLoading(false); // Stop polling once the video is ready
			}
		} catch (error) {
			console.error("Error fetching video status:", error);
			// Handle errors as needed
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
				currentIndex={4}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				contentRef={contentRef}
				nextIsPaidFeature={true}
				nextText={!isSubmitting ? 'Download Video' : 'Downloading Video'}
				showGPTToggle={false}
			/>

			<ToastContainer enableMultiContainer containerId={'video'} />

			<div
				className={`max-w-4xl px-6 flex flex-col relative mx-auto`}
				ref={contentRef}
			>
				<VideoVisualizer videoUrl={videoUrl || ''} />
			</div>

			<FeedbackButton timeout={30000} />
		</div>
		// <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
		//<div className='max-w-4xl mx-auto' ref={contentRef}>
	);
}
