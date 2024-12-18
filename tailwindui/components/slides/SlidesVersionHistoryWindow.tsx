'use client';

import { useSlides } from '@/hooks/use-slides';
import { useState, useRef, Fragment } from 'react';
import { FaTimes, FaEllipsisV, FaCheckCircle } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { ScrollBar } from '../ui/ScrollBar';
import Slide from '@/models/Slide';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { CiCircleCheck } from 'react-icons/ci';

export interface SlidesVersion {
	slides: Slide[];
	timestamp?: string;
}

interface SlidesVersionHistoryWindowProps {
	onToggle?: () => void;
	slidesHistory: SlidesVersion[];
	userName: string;
	onJumpToVersion: (versionIndex: number) => void;
	slidesHistoryIndex: number;
}

export const SlidesVersionHistoryWindow: React.FC<
	SlidesVersionHistoryWindowProps
> = ({
	onToggle,
	slidesHistory,
	userName,
	onJumpToVersion,
	slidesHistoryIndex,
}) => {
	const { updateVersion, setSlides, setSlideIndex, slideIndex } = useSlides();
	const versionHistoryWindowRef = useRef<HTMLDivElement>(null);

	return (
		<section
			className={`hidden sm:flex sm:fixed xl:relative sm:bottom-0 sm:right-0 sm:w-[20rem] max-h-[40rem] sm:flex-col bg-white rounded-lg sm:items-center border border-2 border-gray-200 p-[0.8rem]`}
			ref={versionHistoryWindowRef}
		>
			{/* title and exit button */}
			<div className='flex flex-row w-full justify-between items-center'>
				{/* title text */}
				<div className='flex flex-row items-center gap-4'>
					<div>
						<span
							style={{
								color: 'var(--A2-Library-Neutral-Neutral-40, #605D64)',
								fontSize: '16px',
								fontStyle: 'normal',
								fontWeight: 700,
								lineHeight: '22px',
							}}
						>
							Version History
						</span>
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
			<div className='w-full h-full overflow-y-auto flex flex-col flex-grow'>
				<ScrollBar axial='y'>
					{/* version history render */}
					{slidesHistory
						?.slice()
						.reverse()
						.map((version, versionIndex) => (
							<div
								key={versionIndex}
								className='py-[0.8rem] flex flex-col gap-[0.4rem] w-full'
							>
								<span>Version {versionIndex + 1}</span>
								<div className='flex items-center justify-between'>
									<span
										style={{
											color: '#000000',
											fontSize: '0.875rem',
											fontStyle: 'normal',
											fontWeight: '400',
											lineHeight: '1.25rem',
										}}
									>
										{version.timestamp ?? 'No timestamp'}
									</span>
									<Menu as='div' className='inline-block text-left'>
										{slidesHistoryIndex === versionIndex ? (
											<FaCheckCircle className='text-green-600' />
										) : (
											<div>
												<Menu.Button className='flex items-center'>
													<RiArrowGoBackFill
														className='text-gray-500'
														onClick={() => onJumpToVersion(versionIndex)}
													/>
												</Menu.Button>
											</div>
										)}
									</Menu>
								</div>
								<span
									style={{
										color: '#000000',
										fontSize: '0.75rem',
										fontStyle: 'normal',
										fontWeight: '400',
										lineHeight: '1.25rem',
									}}
								>
									{userName}
								</span>
							</div>
						))}
				</ScrollBar>
			</div>
		</section>
	);
};
