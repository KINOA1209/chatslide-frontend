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
			className={`text-center text-neutral-800 text-xs font-bold leading-snug tracking-wide ${bgColor} rounded px-1 py-0.5 ml-2`}
		>
			{children}
		</div>
	);
};

export const BlueLabel: React.FC<InputBoxProps> = ({ children }) => {
	return (
		<div
			className={`max-h-6 text-center text-Blue text-xs font-bold leading-snug tracking-wide bg-Sky border border-1 border-Blue rounded px-1 py-0.5`}
		>
			{children}
		</div>
	);
};


export const PlusLabel: React.FC = () => {
	return (
		<BlueLabel>Plus</BlueLabel>
	);
};

export const ProLabel: React.FC = () => {
	return (
		<BlueLabel>Pro</BlueLabel>
	);
}

export const TextLabel: React.FC<InputBoxProps> = ({ children }) => {
	return <div className={`text-sm text-gray-700`}>{children}</div>;
};
