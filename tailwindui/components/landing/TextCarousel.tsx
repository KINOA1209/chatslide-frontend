'use client';

import React, { useState, useEffect } from 'react';

interface Props {
	slides: string[];
	interval?: number; // Time interval for automatic slide change in milliseconds
	color?: string;
	alignment?: string;
}

const TextCarousel: React.FC<Props> = ({
	slides,
	interval = 3000,
	color = 'text-blue-500',
	alignment = 'left',
}) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex >= slides.length - 1 ? 0 : prevIndex + 1,
		);
	};

	useEffect(() => {
		const slideTimer = setTimeout(nextSlide, interval);

		// Cleanup the timer when the component is unmounted or before re-running the effect
		return () => {
			clearTimeout(slideTimer);
		};
	}, [currentIndex]);

	return (
		<div className='carousel-container relative overflow-hidden h-[4rem] max-w-xl mx-auto'>
			<ul
				className='carousel-list flex flex-col transition-transform duration-500'
				style={{ transform: `translateY(-${currentIndex * 4}rem)` }}
			>
				{slides.map((slide, index) => (
					<li
						key={index}
						className='carousel-item h-[4rem] text-center py-1 flex-none'
					>
						<h1
							className={`text-5xl font-extrabold leading-tighter tracking-tighter text-${alignment} ${color} font-creato-medium `}
						>
							{slide}
						</h1>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TextCarousel;
