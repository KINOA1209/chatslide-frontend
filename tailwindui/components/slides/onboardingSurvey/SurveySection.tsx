import React, { useState, useEffect, useRef } from 'react';
import OnboardingSurveyButton from './OnboardingSurveyButton';

type SurveySectionProps = {
    title: string;
    items: string[];
    selectedItems: string[];
    toggleSelection: (item: string, selectedItems: string[]) => void;
    isButtonEnabled: boolean;
    showNextSection?: boolean;
    handleButtonClick?: () => void;
    isLastSection?: boolean;
    handleCustomInput?: (value: string) => void;
  };
  
const SurveySection: React.FC<SurveySectionProps> = ({
title,
items,
selectedItems,
toggleSelection,
isButtonEnabled,
showNextSection,
handleButtonClick,
isLastSection = false,
handleCustomInput,
}) => (
<div className='flex flex-col text-center font-creato-medium'>
    <span className='text-2xl font-semibold leading-normal tracking-wide'>{title}</span>
    <div className='mt-6 max-w-[100%] md:max-w-[55%] mx-auto'>
    <div className='flex flex-wrap items-center gap-3'>
        {items.map((item) => (
        <OnboardingSurveyButton
            key={item}
            textValue={item}
            selectedArr={selectedItems}
            toggleSelection={(selectedItem) => toggleSelection(selectedItem, selectedItems)}
            handleCustomInput={handleCustomInput}
        />
        ))}
    </div>
    {!showNextSection && (
        <div className='mt-6 flex justify-end'>
        <button 
            className={`${isButtonEnabled ? 'bg-blue-700': 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-[4rem] rounded-lg`}
            onClick={isButtonEnabled ? handleButtonClick : undefined}
            disabled={!isButtonEnabled}
        >
            {isLastSection ? 'Submit' : 'Next'}
        </button>
        </div>
    )}
    </div>
</div>
);

export default SurveySection
