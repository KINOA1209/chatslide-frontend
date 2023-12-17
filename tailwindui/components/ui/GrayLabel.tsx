import React, { ReactNode } from 'react';

type InputBoxProps = {
	children: ReactNode;
	bgColor?: string;
};

export const GrayLabel: React.FC<InputBoxProps> = ({
	children,
	bgColor = 'bg-gray-200',
}) => {
	return (
		<div
			className={`text-center text-neutral-800 text-xs font-bold font-creato-medium leading-snug tracking-wide ${bgColor} rounded px-1 py-0.5 ml-2`}
		>
			{children}
		</div>
	);
};

export const TextLabel: React.FC<InputBoxProps> = ({ children }) => {
	return <div className={`text-sm text-gray-700`}>{children}</div>;
};
