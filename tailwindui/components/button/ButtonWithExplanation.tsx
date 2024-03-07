'use client';

import { useState } from 'react';

function ButtonWithExplanation({
	button,
	explanation,
}: {
	button: JSX.Element;
	explanation: string;
}) {
	const [showExplanation, setShowExplanation] = useState(false);

	return (
		<div
			className='relative cursor-pointer'
			onMouseEnter={() => setShowExplanation(true)}
			onMouseLeave={() => setShowExplanation(false)}
		>
			<div className='flex items-center justify-center'>{button}</div>
			{showExplanation  && <div
				className={`flex absolute z-10 p-1 bg-black text-white rounded-md transition-opacity duration-200`}
			>
				<div className='whitespace-nowrap text-left text-zinc-100 text-sm font-normal font-creato-medium leading-snug tracking-tight'>
					{explanation}
				</div>
			</div>}
		</div>
	);
}

export default ButtonWithExplanation;
