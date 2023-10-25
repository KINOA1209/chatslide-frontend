import React, { useRef, useEffect, useState } from "react";

interface Props {
    filename: string;
    foldername: string;
    token?: string;
}

const PlayButton: React.FC<Props> = ({ filename, foldername, token }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);

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

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await fetch(`/api/audio?foldername=${foldername}&filename=${filename}`, { headers });
                const audioBlob = await response.blob();
                const blobUrl = URL.createObjectURL(audioBlob);
                setAudioBlobUrl(blobUrl);
            } catch (error) {
                console.error('Failed to fetch audio:', error);
            }
        };

        fetchAudio();
    }, []);

    // const audioSource = `/api/audio?foldername=${foldername}&filename=${filename}`;

    return (
        <div>
            {audioBlobUrl && <audio ref={audioRef} src={audioBlobUrl} preload="auto" />}
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
