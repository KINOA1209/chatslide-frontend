import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
interface CustomAudioPlayerProps {
	audioFile: Blob; // Changed from File to Blob
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioFile }) => {
	const waveformRef = useRef<HTMLDivElement>(null);
	const wavesurfer = useRef<WaveSurfer | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const abortController = new AbortController(); // Create an AbortController instance
		if (waveformRef.current) {
			// Initialize WaveSurfer
			wavesurfer.current = WaveSurfer.create({
				container: waveformRef.current,
				waveColor: '#d9dcff',
				progressColor: '#4353ff',
				barWidth: 4,
				barRadius: 10,
				barGap: 4,
			});

			// Load the audio file
			wavesurfer.current.load(URL.createObjectURL(audioFile));

			// Set the duration when ready
			wavesurfer.current.on('ready', () => {
				setDuration(wavesurfer.current?.getDuration() || 0);
			});

			// Update the current time as the audio plays
			wavesurfer.current.on('audioprocess', () => {
				setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
			});

			// Listen for play/pause events
			wavesurfer.current.on('play', () => setIsPlaying(true));
			wavesurfer.current.on('pause', () => setIsPlaying(false));
			wavesurfer.current.on('finish', () => setIsPlaying(false));

			// Cleanup on unmount
			// Cleanup on unmount
			return () => {
				if (wavesurfer.current) {
					try {
						abortController.abort(); // Abort any ongoing operations
						wavesurfer.current.destroy(); // Safely destroy the instance
						wavesurfer.current = null;
					} catch (error) {
						console.error('Error destroying WaveSurfer instance:', error);
					}
				}
			};
		}
	}, [audioFile]);

	// Format time in MM:SS
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	// Calculate remaining time
	const remainingTime = Math.max(0, duration - currentTime);

	const handlePlayPause = () => {
		if (wavesurfer.current) {
			wavesurfer.current.playPause();
		}
	};

	return (
		<div className='custom-audio-player flex items-center'>
			<Button
				onClick={handlePlayPause}
				className='play-button ml-6'
				variant={'defaultWhiteBg'}
			>
				{isPlaying ? (
					<FaPause className='w-[20px] h-[20px] text-[#344054]' />
				) : (
					<FaPlay className='w-[20px] h-[20px] text-[#344054]' />
				)}
			</Button>
			<div ref={waveformRef} className='waveform flex-grow' />
			<div className='ml-6 text-[#344054] font-inter'>
				{formatTime(remainingTime)}
			</div>
		</div>
	);
};

export default CustomAudioPlayer;
