import useHydrated from '@/hooks/use-hydrated';
import React from 'react';

interface Props {
	videoUrl: string;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
	const videoSource = videoUrl;

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<>
			<video height='720' controls>
				<source src={videoSource} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
		</>
	);
};

export default VideoPlayer;
