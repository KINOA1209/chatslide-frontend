import React from 'react';

interface Props {
    filename: string;
    foldername: string;
}

const VideoPlayer: React.FC<Props> = ({ filename, foldername }) => {
    const videoSource = `/api/video?foldername=${foldername}&filename=${filename}`;

    return (
        <video height="720" controls>
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
