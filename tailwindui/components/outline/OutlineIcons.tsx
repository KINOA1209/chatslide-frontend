import React from 'react';

interface IconProps {
	size?: number;
	color?: string;
	className?: string;
}

export const CardReviewIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'black',
	className = '',
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill={color}
		className={className}
	>
		<path
			d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 5V8H5V5H19ZM19 10V14H5V10H19ZM5 19V16H19V19H5Z'
			fill={color}
		/>
	</svg>
);

export const PageReviewIcon: React.FC<IconProps> = ({
	size = 18,
	color = 'black',
	className = '',
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 18 18'
		fill={color}
		className={className}
	>
		<path
			d='M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z'
			fill={color}
		/>
		<path d='M11 14H4V12H11V14ZM14 10H4V8H14V10ZM14 6H4V4H14V6Z' fill={color} />
	</svg>
);
