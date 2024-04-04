import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SocialPostSlide from '@/models/SocialPost';
import dynamic from 'next/dynamic';
import ExportToPngButton from '@/components/socialPost/socialPostPngButton';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import PostDropDown from '../button/PostDropDown';
import ShareButton from '@/components/button/ShareButton';
import { TextLabel } from '../ui/GrayLabel';
import ClickableLink from '@/components/ui/ClickableLink';
import { useProject } from '@/hooks/use-project';
import { ToolBar } from '../ui/ToolBar';
import { useSocialPosts } from '@/hooks/use-socialpost';

const SocialPostHTML = dynamic(
	() => import('@/components/socialPost/socialPostHTML'),
	{ ssr: false },
);

type SocialPostVisualizerProps = {
	//socialPostSlides: SocialPostSlide[];
	//setSocialPostSlides: Function;
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};
const SocialPostVisualizer: React.FC<SocialPostVisualizerProps> = ({
	//socialPostSlides,
	//setSocialPostSlides,
	borderColorOptions,
	res_scenario,
}) => {
	const [host, setHost] = useState('https://drlambda.ai');
	const { isShared, updateIsShared } = useProject();
	const [finalSlideIndex, setFinalSlideIndex] = useState<number>(0);
	const { project } = useProject();
	const { socialPosts, socialPostsIndex } = useSocialPosts()

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
				<ToolBar >
					{/* slides contents */}
					<ExportToPngButton
						socialPostSlide={socialPosts}
						currentSlideIndex={socialPostsIndex}
					/>
					{project &&
						<ShareButton
							setShare={updateIsShared}
							share={isShared}
							project={project}
							host={host}
							isSocialPost={true}
						/>}
				</ToolBar>

				<SocialPostHTML
					//socialPostSlides={socialPostSlides}
					//setSocialPostSlides={setSocialPostSlides}
					//finalSlideIndex={finalSlideIndex}
					//setFinalSlideIndex={setFinalSlideIndex}
					borderColorOptions={borderColorOptions}
					res_scenario={res_scenario}
				/>
			</div>
		</div>
	);
};

export default SocialPostVisualizer;
