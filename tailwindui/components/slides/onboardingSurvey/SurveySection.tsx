import React, { useState, useEffect, useRef } from 'react';
import OnboardingSurveyButton from './OnboardingSurveyButton';
import surveyStaticDataObject from './SurveyObject';
import { BigBlueButton } from '@/components/button/DrlambdaButton';

type SurveySectionProps = {
	section: string;
	selectedItems: string[];
	toggleSelection: (item: string, selectedItems: string[]) => void;
	showNextSection?: boolean;
	handleButtonClick?: () => void;
	isLastSection?: boolean;
	handleCustomInput?: (value: string) => void;
	ref?: React.RefObject<HTMLDivElement>;
};

const SurveySection: React.FC<SurveySectionProps> = ({
	section,
	selectedItems,
	toggleSelection,
	showNextSection,
	handleButtonClick,
	isLastSection = false,
	handleCustomInput,
	ref,
}) => {
	const isButtonEnabled = selectedItems.length > 0;
	const sectionObject = surveyStaticDataObject[section];

	return (
		<div className='flex flex-col text-center font-creato-medium' ref={ref}>
			<span className='text-2xl font-semibold leading-normal tracking-wide'>
				{sectionObject.question}
			</span>
			<div className='mt-6 max-w-[100%] md:max-w-[80%] mx-auto'>
				<div className='flex flex-wrap items-center justify-center gap-3'>
					{sectionObject.itemsArr.map((item) => (
						<OnboardingSurveyButton
							key={item}
							textValue={item}
							selectedItems={selectedItems}
							toggleSelection={(selectedItem) =>
								toggleSelection(selectedItem, selectedItems)
							}
							handleCustomInput={handleCustomInput}
						/>
					))}
				</div>
				{!showNextSection && (
					<div className='mt-6 flex justify-end gap-x-4'>
						<BigBlueButton
							onClick={handleButtonClick}
							disabled={!isButtonEnabled}
						>
							{isLastSection ? 'Submit' : 'Next'}
						</BigBlueButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default SurveySection;
