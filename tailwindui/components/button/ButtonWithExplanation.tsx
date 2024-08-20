'use client';

import React, { useState } from 'react';

function ButtonWithExplanation({
	button,
	explanation = '',
	id,
	position = 'bottom',
}: {
	button: JSX.Element;
	explanation?: string | JSX.Element;
	id?: string;
	position?: 'top' | 'right' | 'bottom' | 'left';
}) {
	const [showExplanation, setShowExplanation] = useState(false);

	const explanationText = typeof explanation === 'string' ? explanation : '';

	const positionClasses = {
		top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
		right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
		bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
	};

	return (
		<div
			className='relative cursor-pointer'
			onMouseEnter={() => setShowExplanation(true)}
			onMouseLeave={() => setShowExplanation(false)}
			id={id ? id : 'toolbar-' + explanationText.replace(/[^A-Za-z0-9]/g, '_')}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className='flex items-center justify-center'>{button}</div>
			{showExplanation && explanation && (
				<div
					className={`flex absolute z-10 p-1 bg-black text-white rounded-md transition-opacity duration-200 ${positionClasses[position]}`}
				>
					<div className='whitespace-nowrap text-left text-zinc-100 text-sm font-normal leading-snug tracking-tight'>
						{explanation}
					</div>
				</div>
			)}
		</div>
	);
}

export default ButtonWithExplanation;