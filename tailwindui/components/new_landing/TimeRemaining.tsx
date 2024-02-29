'use client';

import React, { useEffect, useState } from 'react';

interface Props {
	initialTimeRemaining: string;
}

const TimeRemaining: React.FC<Props> = ({ initialTimeRemaining }) => {
	const targetDate = new Date('2024-02-11T00:00:00');
	const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

	useEffect(() => {
		const updateRemainingTime = () => {
			const now = new Date();
			const difference = targetDate.getTime() - now.getTime();

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / (1000 * 60)) % 60);
				const seconds = Math.floor((difference / 1000) % 60);
				setTimeRemaining(
					`${days}d ${hours}h ${minutes}min ${seconds}s remaining`,
				);
			} else {
				setTimeRemaining('The offer has ended.');
			}
		};

		const interval = setInterval(updateRemainingTime, 1000);
		updateRemainingTime(); // Initial update
		return () => clearInterval(interval);
	}, []);

	return <>{timeRemaining}</>;
};

export default TimeRemaining;
