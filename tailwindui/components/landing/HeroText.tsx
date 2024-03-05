import React, { useState, useEffect } from 'react';
import TextCarousel from './TextCarousel';

const HeroText = () => {
	return (
		<div
			className={`flex flex-col items-center transition-opacity duration-1000`}
		>
			<div className='flex flex-col sm:flex-row items-start sm:items-end space-x-4'>
				<h1 className='text-4xl sm:text-5xl font-extrabold leading-tighter tracking-tighte font-creato-medium mb-0.5'>
					Documents to
				</h1>
				<div>
					<TextCarousel
						slides={['Slides', 'Social Posts', 'Video']}
						interval={3000}
						color='text-blue-700'
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroText;
