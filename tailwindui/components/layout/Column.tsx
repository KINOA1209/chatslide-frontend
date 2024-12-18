import React from 'react';

export const Column: React.FC<{
	children: React.ReactNode;
	width?: string;
	customStyle?: React.CSSProperties;
}> = ({ children, width = '', customStyle = {} }) => {
	return (
		<div
			className={
				'flex flex-col w-full dpr:w-full mx-auto py-4 gap-y-2 ' +
				(width ? `w-[${width}]` : 'md:w-4/5 lg:w-3/4 xl:w-2/3 ')
			}
			style={customStyle}
		>
			{children}
		</div>
	);
};
