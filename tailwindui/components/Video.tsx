import React from 'react';

interface Props {
	videoUrl: string;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
	const videoSource = videoUrl;

	return (
		<video height='720' controls>
			<source src={videoSource} type='video/mp4' />
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoPlayer;
