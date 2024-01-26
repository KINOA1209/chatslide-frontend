import React, { useState, useEffect, useRef } from 'react';
import '@/components/slides/onboardingSurvey/onboardingSurvey.css';
import { SurveyBackIcons } from '../../icons';
import SurveySection from './SurveySection';

type OnboardingSurveyProps = {
    handleBack: () => void;
};

const OnboardingSurvey: React.FC<OnboardingSurveyProps> = ({
    handleBack,
}) => {
  const industryArr:string[] = [
    'Advertising and marketing', 'Aerospace', 'Agriculture', 'Information and technology',
    'Construction', 'Education', 'Energy', 'Entertainment', 'Fashion', 'Finance and economic',
    'Food and beverage', 'Health care', 'Hospitality', 'Manufacturing', 'Media and news',
    'Mining', 'Pharmaceutical', 'Telecommunication', 'Transportation', 'Other'
  ]

  const referralSourceArr:string[] = [
    'Search Engine', 'Google Ads', 'Facebook Ads', 'Youtube Ads', 'Facebook post/group',
    'Twitter post', 'Instagram post/story', 'Referral', 'Other'
  ]

  const purposeArr:string[] = [
    'Educational lecture', 'Conference talk', 'Portfolio', 'Technical/data-driven', 
    'Business presentation', 'Information webinar', 'Project proposal', 'Personal',
    'Workshop/training', 'Research presentation', 'Narrative', 'Other'
  ]

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedReferralSources, setSelectedReferralSources] = useState<string[]>([])
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])
  const [showReferralSection, setShowReferralSection] = useState(false);
  const [showPurposeSection, setShowPurposeSection] = useState(false);

  // ease-in-out effect
  const [referralSectionEffect, setReferralSectionEffect] = useState(false);
  const [purposeSectionEffect, setPurposeSectionEffect] = useState(false);

  const handleCustomInput = (value: string, section: 'industry' | 'referral' | 'purpose') => {
    let updateFunction;
    switch (section) {
        case 'industry':
            updateFunction = setSelectedIndustries;
            break;
        case 'referral':
            updateFunction = setSelectedReferralSources;
            break;
        case 'purpose':
            updateFunction = setSelectedPurposes;
            break;
        default:
            return;
    }
    updateFunction(prev => prev.includes('Other') ? [...prev,value] : prev);
};

const toggleSelection = (item: string, section: 'industry' | 'referral' | 'purpose') => {
    // Toggle the selection and handle the special case for 'Other'
    let selectedArray: string[];
    let updateFunction: React.Dispatch<React.SetStateAction<string[]>>;
    let predefinedArray: string[];
    switch (section) {
        case 'industry':
            selectedArray = selectedIndustries;
            updateFunction = setSelectedIndustries;
            predefinedArray = industryArr;
            break;
        case 'referral':
            selectedArray = selectedReferralSources;
            updateFunction = setSelectedReferralSources;
            predefinedArray = referralSourceArr;
            break;
        case 'purpose':
            selectedArray = selectedPurposes;
            updateFunction = setSelectedPurposes;
            predefinedArray = purposeArr
            break;
        default:
            return;
    }
    if (item == 'Other'){
      if (selectedArray.includes(item)) {
        const newArray = selectedArray.filter(i => i !== item);
        updateFunction(newArray.filter(i => predefinedArray.includes(i)));
      }
      else {
        updateFunction([...selectedArray, item]);
      }
    }
    else{
      if (selectedArray.includes(item)) {
        updateFunction(selectedArray.filter(i => i !== item));
      } 
      else {
        updateFunction([...selectedArray, item]);
      }
    }
};

  //progress bar 
  const totalSections = 3
  const getCurrentState = () => {
      let currentState = 1;
      if (showReferralSection) currentState++;
      if (showPurposeSection) currentState++;
      return currentState;
  };
  const progress = (getCurrentState() / totalSections) * 100;

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

  const handleNextToReferral = () => {
    setShowReferralSection(true);
  };

  const handleNextToPurpose = () => {
    setShowPurposeSection(true);
  };

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
        toggleSelection={(item) => toggleSelection(item, 'industry')}
        isButtonEnabled={selectedIndustries.length > 0}
        showNextSection={showReferralSection}
        handleButtonClick={handleNextToReferral}
        handleCustomInput={(value) => handleCustomInput(value, 'industry')}
      />

      {showReferralSection && (
        <div className={`transition-opacity duration-500 ${referralSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            title="Where did you find us?"
            items={referralSourceArr}
            selectedItems={selectedReferralSources}
            toggleSelection={(item) => toggleSelection(item, 'referral')}
            isButtonEnabled={selectedReferralSources.length > 0}
            showNextSection={showPurposeSection}
            handleButtonClick={handleNextToPurpose}
            handleCustomInput={(value) => handleCustomInput(value, 'referral')}
          />
        </div>
      )}

      {showPurposeSection && (
        <div className={`transition-opacity duration-500 ${purposeSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            title="What's the purpose of your output?"
            items={purposeArr}
            selectedItems={selectedPurposes}
            toggleSelection={(item) => toggleSelection(item, 'purpose')}
            isButtonEnabled={selectedPurposes.length > 0}
            isLastSection={true}
            handleCustomInput={(value) => handleCustomInput(value, 'purpose')}
          />
        </div>
      )}
    </div>
  )
};

export default OnboardingSurvey;

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