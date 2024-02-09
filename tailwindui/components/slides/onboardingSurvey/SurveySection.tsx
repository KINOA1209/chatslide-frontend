import React, { useState, useEffect, useRef } from 'react';
import OnboardingSurveyButton from './OnboardingSurveyButton';
import surveyStaticDataObject from './SurveyObject';

type SurveySectionProps = {
  section: string;
  selectedItems: string[];
  toggleSelection: (item: string, selectedItems: string[]) => void;
  showNextSection?: boolean;
  handleButtonClick?: () => void;
  isLastSection?: boolean;
  handleCustomInput?: (value: string) => void;
};

const SurveySection: React.FC<SurveySectionProps> = ({
  section,
  selectedItems,
  toggleSelection,
  showNextSection,
  handleButtonClick,
  isLastSection = false,
  handleCustomInput,
}) => {
  const isButtonEnabled = selectedItems.length > 0
  const sectionObject = surveyStaticDataObject[section]

  return (
    <div className='flex flex-col text-center font-creato-medium'>
      <span className='text-2xl font-semibold leading-normal tracking-wide'>{sectionObject.question}</span>
      <div className='mt-6 max-w-[100%] md:max-w-[55%] mx-auto'>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          {sectionObject.itemsArr.map((item) => (
            <OnboardingSurveyButton
              key={item}
              textValue={item}
              selectedItems={selectedItems}
              toggleSelection={(selectedItem) => toggleSelection(selectedItem, selectedItems)}
              handleCustomInput={handleCustomInput}
            />
          ))}
        </div>
        {!showNextSection && (
          <div className='mt-6 flex justify-end'>
            <button
              className={`${isButtonEnabled ? 'bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-[4rem] rounded-lg`}
              onClick={isButtonEnabled ? handleButtonClick : undefined}
              disabled={!isButtonEnabled}
            >
              {isLastSection ? 'Submit' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default SurveySection
