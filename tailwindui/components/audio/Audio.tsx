import React, { useRef, useEffect, useState } from 'react';
import { useAudio } from '@/components/audio/AudioContext';

interface Props {
	index: string;
	filename: string;
	foldername: string;
	token?: string;
}

const PlayButton: React.FC<Props> = ({
	index,
	filename,
	foldername,
	token,
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
	const { playingId, setPlayingId } = useAudio();

	const handleAudio = () => {
		if (audioRef.current) {
			if (playingId == index) {
				setPlayingId(null);
			} else {
				setPlayingId(index);
			}
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			if (playingId === index) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [playingId, index]);

	useEffect(() => {
		const audioElem = audioRef.current;
		if (audioElem) {
			audioElem.addEventListener('ended', () => setPlayingId(null));
		}
		return () => {
			if (audioElem) {
				audioElem.removeEventListener('ended', () => setPlayingId(null));
			}
		};
	}, []);

	useEffect(() => {
		const fetchAudio = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				};
				const response = await fetch(
					`/api/audio?foldername=${foldername}&filename=${filename}`,
					{ headers },
				);
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
			{audioBlobUrl && (
				<audio ref={audioRef} src={audioBlobUrl} preload='auto' />
			)}
			<button
				className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'
				onClick={handleAudio}
			>
				{playingId == index ? 'Pause' : 'Play'}
			</button>
		</div>
	);
};

export default PlayButton;
