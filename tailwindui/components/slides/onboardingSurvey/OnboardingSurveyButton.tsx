import React, { useState, useEffect, useRef } from 'react';
import { itemToIcon } from './SurveyObject';

type OnboardingSurveyButtonProps = {
	textValue: string;
	selectedItems: string[];
	toggleSelection: (textValue: string) => void;
	handleCustomInput?: (value: string) => void;
};

const OnboardingSurveyButton: React.FC<OnboardingSurveyButtonProps> = ({
	textValue,
	selectedItems,
	toggleSelection,
	handleCustomInput,
}) => {
	const isLastItem =
		selectedItems.length === 1 && selectedItems.includes(textValue);
	const tooltipMessage = 'You must select at least one option in this section.';
	const [showTooltip, setShowTooltip] = useState(false);
	const isOtherSelected =
		textValue === 'Other' && selectedItems.includes('Other');

	const handleClick = () => {
		if (isLastItem) {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 2000);
		} else {
			toggleSelection(textValue);
		}
	};

	return (
		<div className='relative flex items-center'>
			<button
				onClick={handleClick}
				className={`rounded-full border-2 px-2 py-1 sm:px-4 sm:py-2 transition-all text-md font-normal leading-normal tracking-wide flex flex-row items-center gap-2
            ${
							selectedItems.includes(textValue)
								? 'bg-[#E5E6FF] text-[#6366F1] border-[#6366F1]'
								: 'bg-white text-black border-gray-300'
						}`}
			>
				{itemToIcon(textValue)} <span>{textValue}</span>
			</button>
			{isOtherSelected && (
				<input
					type='text'
					placeholder='Type here...'
					onBlur={(e) => handleCustomInput?.(e.target.value)}
					className='ml-2 border-2 rounded-md px-3 py-1'
				/>
			)}
			{showTooltip && (
				<span
					className={`absolute bottom-full mb-2 w-auto p-2 text-white bg-black text-xs rounded-lg 
                            shadow-lg translate-y-1 font-normal tracking-wide`}
				>
					{tooltipMessage}
				</span>
			)}
		</div>
	);
};

export default OnboardingSurveyButton;
