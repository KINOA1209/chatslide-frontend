'use client';

import { useSlides } from '@/hooks/use-slides';
import { useState, useRef, Fragment } from 'react';
import { FaTimes, FaEllipsisV } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { ScrollBar } from '../ui/ScrollBar';
import Slide from '@/models/Slide';

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
								fontFamily: 'Creato Display Medium',
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
			<div className='w-full h-full overflow-y-scroll flex flex-col flex-grow'>
				<ScrollBar axial='y'>
					{/* version history render */}
					{slidesHistory.reverse().map((version, versionIndex) => (
						<div
							key={versionIndex}
							className='py-[0.8rem] flex flex-col gap-[0.4rem] w-full'
						>
							<span
								style={{
									color: '#000000',
									fontFamily: 'Creato Display Medium',
									fontSize: '0.875rem',
									fontStyle: 'normal',
									fontWeight: '400',
									lineHeight: '1.25rem',
								}}
							>
								Version {versionIndex + 1}
							</span>
							{slidesHistoryIndex === versionIndex && (
								<span
									style={{
										color: '#707C8A',
										fontFamily: 'Creato Display Medium',
										fontSize: '0.6rem',
										fontStyle: 'normal',
										fontWeight: '700',
										lineHeight: '1rem',
									}}
								>
									(current)
								</span>
							)}
							<div className='flex items-center justify-between'>
								<span
									style={{
										color: '#000000',
										fontFamily: 'Creato Display Medium',
										fontSize: '0.875rem',
										fontStyle: 'normal',
										fontWeight: '400',
										lineHeight: '1.25rem',
									}}
								>
									{version.timestamp ?? 'No timestamp'}
								</span>
								<Menu as='div' className='inline-block text-left'>
									<div>
										<Menu.Button className='flex items-center'>
											<FaEllipsisV className='text-gray-500' />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
											<div className='px-1 py-1'>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => onJumpToVersion(versionIndex)}
															className={`${
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700'
															} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
														>
															Restore this Version
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<span
								style={{
									color: '#000000',
									fontFamily: 'Creato Display Medium',
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
