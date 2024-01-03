import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import dynamic from 'next/dynamic';
import ExportToPngButton from '@/components/socialPost/socialPostPngButton';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import SocialPostRepostButton from '@/components/socialPost/socialPostRepostButton'

const SocialPostHTML = dynamic(
	() => import('@/components/socialPost/socialPostHTML'),
	{ ssr: false },
);

type SocialPostVisualizerProps = {
	socialPostSlides: SocialPostSlide[];
	setSocialPostSlides: Function;
	borderColorOptions: ThemeObject[];
};
const SocialPostVisualizer: React.FC<SocialPostVisualizerProps> = ({
	socialPostSlides,
	setSocialPostSlides,
	borderColorOptions,
}) => {
	const [host, setHost] = useState('https://drlambda.ai');
	const [share, setShare] = useState(false);
	const [finalSlideIndex, setFinalSlideIndex] = useState<number>(0);

	useEffect(() => {
		setShare(sessionStorage.getItem('is_shared') === 'true');
	}, []);

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
	return (
		<div>
			<div className='px-4 sm:px-6 flex flex-col justify-center items-center gap-4'>
				<div className='flex flex-row'>
					{/* slides contents */}
					<div className='flex flex-row justify-end items-center'>
						{/* want some more script Form submission */}
						<ExportToPngButton
							socialPostSlide={socialPostSlides}
							currentSlideIndex={finalSlideIndex}
						/>
					</div>
					{/* <div>
						<SocialPostRepostButton
							socialPostSlides = {socialPostSlides}
						/>
					</div> */}
				</div>

				<SocialPostHTML
					socialPostSlides={socialPostSlides}
					setSocialPostSlides={setSocialPostSlides}
					finalSlideIndex={finalSlideIndex}
					setFinalSlideIndex={setFinalSlideIndex}
					borderColorOptions={borderColorOptions}
				/>
			</div>
		</div>
	);
};

export default SocialPostVisualizer;
