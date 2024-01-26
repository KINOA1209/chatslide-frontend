import React, { useState, useEffect, useRef } from 'react';
import '@/components/slides/onboardingSurvey/onboardingSurvey.css';
import { SurveyBackIcons } from '../../icons';

type OnboardingSurveyProps = {
    handleBack: () => void;
};

const OnboardingSurvey: React.FC<OnboardingSurveyProps> = ({
    handleBack,
}) => {
  const industryArr = [
    'Advertising and marketing', 'Aerospace', 'Agriculture', 'Information and technology',
    'Construction', 'Education', 'Energy', 'Entertainment', 'Fashion', 'Finance and economic',
    'Food and beverage', 'Health care', 'Hospitality', 'Manufacturing', 'Media and news',
    'Mining', 'Pharmaceutical', 'Telecommunication', 'Transportation', 'Other'
  ]

  const referralSourceArr = [
    'Search Engine', 'Google Ads', 'Facebook Ads', 'Youtube Ads', 'Facebook post/group',
    'Twitter post', 'Instagram post/story', 'Referral', 'Other'
  ]

  const purposeArr = [
    'Educational lecture', 'Conference talk', 'Portfolio', 'Technical / data-driven', 
    'Business presentation', 'Information webinar', 'Project proposal', 'Personal',
    'Workshop / training', 'Research presentation', 'Narrative', 'Other'
  ]

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedReferralSources, setSelectedReferralSources] = useState<string[]>([])
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])
  const [showReferralSection, setShowReferralSection] = useState(false);
  const [showPurposeSection, setShowPurposeSection] = useState(false);
  const [referralSectionEffect, setReferralSectionEffect] = useState(false);
  const [purposeSectionEffect, setPurposeSectionEffect] = useState(false);

  useEffect(() => {
    if (showReferralSection) {
      setReferralSectionEffect(true);
    }
  }, [showReferralSection]);

  useEffect(() => {
    if (showPurposeSection) {
      setPurposeSectionEffect(true);
    }
  }, [showPurposeSection]);

  const toggleSelection = (item: string, selectedArr: string[], setSelectedArr: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selectedArr.includes(item)) {
      if (selectedArr.length === 1) {
          // Show an alert or popup
          alert("You need to select at least 1 choice for each section.");
          return; // Prevent unselecting the last item
      }
      setSelectedArr(selectedArr.filter(i => i !== item));
  } else {
      setSelectedArr([...selectedArr, item]);
  }
  };

  const handleNextToReferral = () => {
    setShowReferralSection(true);
  };

  const handleNextToPurpose = () => {
    setShowPurposeSection(true);
  };

  const totalSections = 3

  const getCurrentState = () => {
      let currentState = 1;
      if (showReferralSection) currentState++;
      if (showPurposeSection) currentState++;
      return currentState;
  };

  const progress = (getCurrentState() / totalSections) * 100;

  console.log(selectedIndustries)
  console.log(selectedReferralSources)
  console.log(selectedPurposes)
  return (
    <div className='flex flex-col justify-center items-center gap-4 sm:gap-12'>
      <div className='sticky top-0 w-full z-50 p-4 sm:p-10 bg-zinc-100'>
        <div className='w-full flex flex-row items-center justify-center gap-3 mx-auto'>
          <button onClick={handleBack}>
              <SurveyBackIcons />
          </button>
          <OnboardingSurveyProgressBar progress={progress}/>
        </div>
      </div>


      <SurveySection 
        title="What industry do you work for?"
        items={industryArr}
        selectedItems={selectedIndustries}
        toggleSelection={(item) => toggleSelection(item, selectedIndustries, setSelectedIndustries)}
        isButtonEnabled={selectedIndustries.length > 0}
        showNextSection={showReferralSection}
        handleButtonClick={handleNextToReferral}
      />

      {showReferralSection && (
        <div className={`transition-opacity duration-500 ${referralSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            title="Where did you find us?"
            items={referralSourceArr}
            selectedItems={selectedReferralSources}
            toggleSelection={(item) => toggleSelection(item, selectedReferralSources, setSelectedReferralSources)}
            isButtonEnabled={selectedReferralSources.length > 0}
            showNextSection={showPurposeSection}
            handleButtonClick={handleNextToPurpose}
          />
        </div>
      )}

      {showPurposeSection && (
        <div className={`transition-opacity duration-500 ${purposeSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            title="What's the purpose of your output?"
            items={purposeArr}
            selectedItems={selectedPurposes}
            toggleSelection={(item) => toggleSelection(item, selectedPurposes, setSelectedPurposes)}
            isButtonEnabled={selectedPurposes.length > 0}
            isLastSection={true}
          />
        </div>
      )}
    </div>
  )
};

export default OnboardingSurvey;

type SurveySectionProps = {
  title: string;
  items: string[];
  selectedItems: string[];
  toggleSelection: (item: string, selectedItems: string[]) => void;
  isButtonEnabled: boolean;
  showNextSection?: boolean;
  handleButtonClick?: () => void;
  isLastSection?: boolean;
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

//buttons for survey
type OnboardingSurveyButtonProps = {
  textValue: string;
  selectedArr: string[]
  toggleSelection: (textValue: string) => void;
}
const OnboardingSurveyButton: React.FC<OnboardingSurveyButtonProps> = ({ 
  textValue, 
  selectedArr, 
  toggleSelection, 
}) => {
  const isLastItem = selectedArr.length === 1 && selectedArr.includes(textValue);
  const tooltipMessage = "You must select at least one option in this section.";
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (isLastItem) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 3 seconds
    } else {
        toggleSelection(textValue);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleClick}
        className={`rounded-full border-2 px-4 py-2 transition-all font-creato-regular text-md font-normal leading-normal tracking-wide
          ${selectedArr.includes(textValue) ? 'bg-[#E5E6FF] text-[#6366F1] border-[#6366F1]' : 'bg-white text-black border-gray-300'
        }`}
      >
        <div className='flex flex-row gap-2 items-center justify-center'>
          <input 
            type="checkbox" 
            checked={selectedArr.includes(textValue)}
            readOnly
            className="text-[#6366F1] focus:ring-0 rounded"></input>
          {textValue}
        </div>
      </button>
      {showTooltip && (
        <span className={`absolute bottom-full mb-2 w-auto p-2 text-white bg-black text-xs rounded-lg 
                        shadow-lg translate-y-1 font-creato-regular font-normal tracking-wide`}
        >
            {tooltipMessage}
        </span>
      )}
    </div>
  );
};

type OnboardingSurveyProgressBarProps = {
  progress: number;
};

const OnboardingSurveyProgressBar: React.FC<OnboardingSurveyProgressBarProps> = ({
  progress,
}) => {

  return (
    <div className="w-full progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>    
        </div>
    </div>
  )
};