import React from 'react';

interface ToggleProps {
	isLeft: boolean;
	setIsLeft: (value: boolean) => void;
	leftText?: string;
	rightText?: string;
}

const Toggle: React.FC<ToggleProps> = ({
	isLeft,
	setIsLeft,
	leftText,
	rightText,
}) => {
	return (
		<div className='toggle items-center md:flex'>
			<div className='flex items-center'>
				<button
					type='button'
					onClick={() => setIsLeft(true)}
					className={`py-2 px-4 rounded-l-full text-lg font-bold ${
						isLeft ? 'bg-Blue text-white' : 'bg-gray-200'
					}`}
				>
					{leftText || 'Monthly'}
				</button>
				<button
					type='button'
					onClick={() => setIsLeft(false)}
					className={`py-2 px-4 rounded-r-full text-lg font-bold ${
						isLeft ? 'bg-gray-200' : 'bg-Blue text-white'
					}`}
				>
					{rightText || 'Yearly (17% off)'}
				</button>
			</div>
		</div>
	);
};

export default Toggle;
