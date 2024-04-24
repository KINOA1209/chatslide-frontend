'use client';

import React, { useEffect, useRef, useState } from 'react';
import Video from '@/components/Video';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Loading, Blank } from '@/components/ui/Loading';
import { useProject } from '@/hooks/use-project';
import useHydrated from '@/hooks/use-hydrated';
import { Column } from '@/components/layout/Column';
import { ToolBar } from '@/components/ui/ToolBar';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { GoDownload } from 'react-icons/go';
import { SpinIcon } from '../icons';
import Modal from '@/components/ui/Modal';
import { Explanation } from '@/components/ui/Text';
import { SiQuicktime } from 'react-icons/si';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FaChrome } from 'react-icons/fa';
import ShareButton from '@/components/button/ShareButton';
import { getOrigin } from '@/utils/getHost';


const VideoVisualizer = ({
	videoUrl,
	status,
}: {
	videoUrl: string;
	status: string;
}) => {
	const videoSource = videoUrl;
	const [isDownloading, setIsDownloading] = useState(false);
	const [showQuickTimeModal, setShowQuickTimeModal] = useState(false);
	const { project, isShared, updateIsShared } = useProject();
	const [host, setHost] = useState(getOrigin());
	const [showShareModal, setShowShareModal] = useState(false);

	
	useEffect(() => {
		if (
			window.location.hostname !== 'localhost' &&
			window.location.hostname !== '127.0.0.1'
		) {
			setHost('https://' + window.location.hostname);
		} else {
			setHost(window.location.hostname);
		}
	}, []);


	const QuickTimeModal = () => {
		return (
			<Modal
				showModal={showQuickTimeModal}
				setShowModal={setShowQuickTimeModal}
				title='Device Compatibility Notice'
				width='40rem'
				canClose={true}
			>
				<div className='flex flex-col items-center gap-y-4'>
					<div className='flex flex-row gap-x-2'>
						<SiQuicktime
							style={{
								flex: '1',
								width: '3rem',
								height: '3rem',
								color: '#344054',
							}}
						/>
						<FaChrome
							style={{
								width: '3rem',
								height: '3rem',
								color: '#4285F4', // Google's blue color
							}}
						/>
					</div>
					<Explanation>
						If you're using QuickTime on Mac or certain apps on Chromebook to play the video, you might experience an issue where the audio is missing 😕.
						We recommend playing the video in the free <a href='https://www.videolan.org/vlc/'>VLC player</a>.
						If you upload the video to social media, the audio will be fine 👍.
					</Explanation>
				</div>
			</Modal>
		);
	}


	async function downloadVideo() {
		setIsDownloading(true);

		// if user is using mac, tell users not use QuickTime Player to play the video
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		const isChromebook = navigator.userAgent.toLowerCase().includes('cros');
		if (isMac || isChromebook) {
			setShowQuickTimeModal(true);
		}

		try {
			// Fetch the video data from the server
			const response = await fetch(videoSource);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			// Retrieve the video blob
			const videoBlob = await response.blob();

			// Create a URL for the blob
			const videoUrl = URL.createObjectURL(videoBlob);

			// Create an anchor tag and force download
			const a = document.createElement('a');
			a.href = videoUrl;
			a.download = 'video.mp4'; // You can customize the filename
			document.body.appendChild(a);
			a.click();

			// Clean up by revoking the Blob URL and removing the anchor tag
			URL.revokeObjectURL(videoUrl);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Download failed:', error);
		}
		setIsDownloading(false);
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<>
			{videoUrl !== '' ? (
				<Column>
					<QuickTimeModal />
					<div className='flex flex-row justify-center'>
						<ToolBar>
							<ButtonWithExplanation
								button={
									<button
										onClick={downloadVideo}
										disabled={isDownloading}
									>
										{!isDownloading ?
											<GoDownload
												style={{
													strokeWidth: '1',
													flex: '1',
													width: '1.5rem',
													height: '1.5rem',
													fontWeight: 'bold',
													color: '#344054',
												}}
											/> :
											<SpinIcon />
										}
									</button>
								}
								explanation={'Download'}
							/>
							{project && (
								<ShareButton
									setShare={updateIsShared}
									share={isShared}
									project={project}
									host={host}
									shareEntry={'video'}
									showShareModal={showShareModal}
									setShowShareModal={setShowShareModal}
								/>
							)}
						</ToolBar>
					</div>
					<Video videoUrl={videoSource} />
				</Column >
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
						Your video is being generated ⏳. It usually takes 5 minutes (20 minutes if with avatar) to
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

	const params = useSearchParams();
	const router = useRouter();

	if (!project) {
		if (params.get('id')) {
			router.push(`/project/${params.get('id')}`);
		}
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
