import React, { useRef, useEffect } from "react";

interface Props {
    filename: string;
    foldername: string;
}

const PlayButton: React.FC<Props> = ({ filename, foldername }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audioElem = audioRef.current;
        if (audioElem) {
            audioElem.addEventListener('ended', () => setIsPlaying(false));
        }
        return () => {
            if (audioElem) {
                audioElem.removeEventListener('ended', () => setIsPlaying(false));
            }
        };
    }, []);

    const audioSource = `/api/audio?foldername=${foldername}&filename=${filename}`;

    return (
        <div>
            <audio ref={audioRef} src={audioSource} preload="auto" />
            <button 
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" 
                onClick={handleAudio}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default PlayButton;
