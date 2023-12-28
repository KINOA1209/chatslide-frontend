'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import ProjectProgress from '@/components/steps';
import FeedbackButton from '@/components/ui/feedback';
import WorkflowStepsBanner from "@/components/WorkflowStepsBanner";
import {ToastContainer} from "react-toastify";
import SlideVisualizer from "@/components/slides/SlideVisualizer";

const VideoVisualizer = ({
	videoFile,
	foldername,
}: {
	videoFile: string;
	foldername: string;
}) => {
	const router = useRouter();
	const videoSource = `/api/video?foldername=${foldername}&filename=${videoFile}`;
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
				<Video filename={videoFile} foldername={foldername} />
			</div>
		</div>
	);
};

export default function WorkflowStep6() {
	const videoFile =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('video_file') || ''
			: '';
	const foldername =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('foldername') || ''
			: '';
	const contentRef = useRef<HTMLDivElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
				<VideoVisualizer videoFile={videoFile} foldername={foldername} />
			</div>

			<FeedbackButton timeout={30000} />
		</div>
		// <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
		//<div className='max-w-4xl mx-auto' ref={contentRef}>
	);
}
