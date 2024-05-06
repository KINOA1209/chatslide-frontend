import React from 'react';

export const WrappableRow: React.FC<{
	children: React.ReactNode;
	type: 'flex' | 'grid';
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'; // for flex type
	cols?: number; // for grid type
}> = ({ children, type, justify = 'start', cols = 2 }) => {
	if (type === 'grid') {
		return (
			<div
				className={`w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${cols} gap-2 items-start`}
			>
				{children}
			</div>
		);
	}

	return (
		<div
			className={`flex flex-col mx-auto md:mx-0 md:flex-row gap-2 justify-${justify} items-start`}
		>
			{children}
		</div>
	);
};
