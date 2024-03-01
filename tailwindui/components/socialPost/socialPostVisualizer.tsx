import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import dynamic from 'next/dynamic';
import ExportToPngButton from '@/components/socialPost/socialPostPngButton';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import PostDropDown from '../button/PostDropDown';
import { ShareToggleButton } from '@/components/slides/SlideButtons';
import { TextLabel } from '../ui/GrayLabel';
import ClickableLink from '@/components/ui/ClickableLink';
import { useProject } from '@/hooks/use-project';

const SocialPostHTML = dynamic(
	() => import('@/components/socialPost/socialPostHTML'),
	{ ssr: false },
);

type SocialPostVisualizerProps = {
	socialPostSlides: SocialPostSlide[];
	setSocialPostSlides: Function;
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};
const SocialPostVisualizer: React.FC<SocialPostVisualizerProps> = ({
	socialPostSlides,
	setSocialPostSlides,
	borderColorOptions,
	res_scenario,
}) => {
	const [host, setHost] = useState('https://drlambda.ai');
	const { isShared, updateIsShared } = useProject();
	const [finalSlideIndex, setFinalSlideIndex] = useState<number>(0);
	const { project } = useProject();

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
				<div className='flex flex-col sm:flex-row justify-end items-center gap-1 sm:gap-4'>
					{/* slides contents */}
					<ExportToPngButton
						socialPostSlide={socialPostSlides}
						currentSlideIndex={finalSlideIndex}
					/>
					<ShareToggleButton
						setShare={updateIsShared}
						share={isShared}
						project_id={project?.id || ''}
					/>
					<PostDropDown
						slides={socialPostSlides}
						post_type='socialpost'
						setShare={updateIsShared}
					/>
				</div>
				{isShared && (
					<div className='w-[100] md:w-[40rem] flex-grow'>
						<TextLabel>View only link:</TextLabel>
						<ClickableLink link={`${host}/shared/${project?.id}`} />
					</div>
				)}

				<SocialPostHTML
					socialPostSlides={socialPostSlides}
					setSocialPostSlides={setSocialPostSlides}
					finalSlideIndex={finalSlideIndex}
					setFinalSlideIndex={setFinalSlideIndex}
					borderColorOptions={borderColorOptions}
					res_scenario={res_scenario}
				/>
			</div>
		</div>
	);
};

export default SocialPostVisualizer;
