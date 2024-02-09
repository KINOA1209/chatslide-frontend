import React, { useEffect, useState } from 'react';
import TimeRemaining from './TimeRemaining';

const HolidayBanner: React.FC = () => {
	const targetDate = new Date('2024-02-11T00:00:00');
	const now = new Date();
	const difference = targetDate.getTime() - now.getTime();
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	let initialTimeRemaining = 'Loading...';

	if (difference > 0) {
		// Calculate initial time remaining
		// ...
		initialTimeRemaining = `${days}d ${hours}h ${minutes}min remaining`;
	} else {
		initialTimeRemaining = 'The offer has ended.';
	}

	return (
		<>
			{difference > 0 && (
				<div className='w-screen bg-black text-white text-center p-4 shadow-md'>
					<p className='text-xl'>
						🐲 Year of Dragon Limited Deal! <br/>
            🧧 Start with
						<span className='text-red-500'>100</span> more credits! 💸
					</p>
					<a
						href='/referral/DRAGON2024'
						className='bg-red-500 text-white font-bold my-2 py-2 px-4 rounded hover:bg-red-600 transition duration-300 inline-block text-center'
					>
						Get This Deal Now!
					</a>
					<p className='text-xs font-semibold mt-2'>
						⏰ <TimeRemaining initialTimeRemaining={initialTimeRemaining}/> ⏰
					</p>
				</div>
			)}
		</>
	);
};

export default HolidayBanner;
