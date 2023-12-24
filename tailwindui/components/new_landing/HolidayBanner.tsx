import React, { useEffect, useState } from 'react';

const BlackFridayBanner: React.FC = () => {
	const targetDate = new Date('2024-01-02T00:00:00');
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
				<div className='w-screen pt-[28px] bg-black text-white text-center p-4 shadow-md'>
					<p className='text-xl my-4'>
						❄️ Winter Holidays Limited Deal! 🎉 Save{' '}
						<span className='text-red-500'>90%</span> on your DrLambda
						subscription! 💸
					</p>
					<a
						href='#pricing'
						className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300 inline-block text-center'
					>
						Get This Deal Now!
					</a>
					<p className='text-xs font-semibold mt-2'>
						⏰ {initialTimeRemaining} ⏰
					</p>
				</div>
			)}
		</>
	);
};

export default BlackFridayBanner;
