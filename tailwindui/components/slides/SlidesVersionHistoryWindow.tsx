'use client';

import { useSlides } from '@/hooks/use-slides';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ScrollBar } from '../ui/ScrollBar';
import Slide from '@/models/Slide';

// type VersionHistoryContents = {
// 	// timeStamp: string;
// 	// userName: string;
// 	slidesHistory: Slide[][];
// };

export interface SlidesVersion {
	slides: Slide[];
	timestamp?: string;
}

interface SlidesVersionHistoryWindowProps {
	onToggle?: () => void;
	slidesHistory: SlidesVersion[];
	userName: string;
}

export const SlidesVersionHistoryWindow: React.FC<
	SlidesVersionHistoryWindowProps
> = ({ onToggle, slidesHistory, userName }) => {
	const { updateVersion, setSlides, setSlideIndex, slideIndex } = useSlides();
	const versionHistoryWindowRef = useRef<HTMLDivElement>(null);

	return (
		<section
			className={`hidden sm:flex sm:fixed xl:relative sm:bottom-0 sm:right-0 sm:z-50 sm:w-[20rem] sm:h-[30rem] xl:h-full sm:flex-col bg-white rounded-lg sm:items-center border border-2 border-gray-200`}
			ref={versionHistoryWindowRef}
		>
			{/* title and exit button */}
			<div className='flex flex-row w-full justify-between items-center h-[5rem] p-2'>
				{/* title text */}
				<div className='flex flex-row items-center gap-4'>
					<div className='text-neutral-900 text-sm font-semibold font-inter'>
						<span>Version History</span>
					</div>
				</div>

				<div className='flex flex-row gap-2'>
					{/* exit button */}
					{onToggle && (
						<button onClick={onToggle}>
							<FaTimes color='#5168F6' />
						</button>
					)}
				</div>
			</div>

			{/* history text area */}
			<div className='w-full h-full border-t-2 border-gray-300 overflow-y-scroll p-2 flex flex-col flex-grow'>
				<ScrollBar axial='y'>
					{/* version history render */}
					{slidesHistory.map((version, versionIndex) => (
						<div key={versionIndex} className='mb-4'>
							<h3 className='text-sm font-semibold'>
								Version {versionIndex + 1}
							</h3>
							<h2>{userName}</h2>
							<h1>{version.timestamp ?? 'No timestamp'}</h1>
							{version.slides.map((slide, slideIndex) => (
								<div key={slideIndex} className='flex items-center gap-2 mb-2'>
									<div className='text-xs'>
										<span>Slide {slideIndex + 1}</span>
									</div>
								</div>
							))}
						</div>
					))}
				</ScrollBar>
			</div>
		</section>
	);
};
