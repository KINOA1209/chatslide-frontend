import React, { useState, useEffect, useRef } from 'react';
import '@/components/slides/onboardingSurvey/onboardingSurvey.css';
import { useRouter } from 'next/navigation';
import { SurveyBackIcons } from '../../icons';
import SurveySection from './SurveySection';
import surveyStaticDataObject from './SurveyObject';
import SessionStorage from '@/components/utils/SessionStorage';
import AuthService from '@/services/AuthService';

type OnboardingSurveyProps = {
    handleBack: () => void;
};

const OnboardingSurvey: React.FC<OnboardingSurveyProps> = ({
    handleBack,
}) => {
  const router = useRouter();
  const workflowType = SessionStorage.getItem('workflowType', 'slides');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedReferralSources, setSelectedReferralSources] = useState<string[]>([])
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])
  const [showReferralSection, setShowReferralSection] = useState(false);
  const [showPurposeSection, setShowPurposeSection] = useState(false);

  // ease-in-out effect
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

  const handleNextToReferral = () => {
    setShowReferralSection(true);
  };

  const handleNextToPurpose = () => {
    setShowPurposeSection(true);
  };

  // handle other value when user click other button
  const handleCustomInput = (value: string, section: string) => {
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

  const toggleSelection = (item: string, section: string) => {
    // Toggle the selection and handle the special case for 'Other'
    let selectedArray: string[];
    let updateFunction: React.Dispatch<React.SetStateAction<string[]>>;
    let predefinedArray: string[];
    switch (section) {
        case 'industry':
            selectedArray = selectedIndustries;
            updateFunction = setSelectedIndustries;
            predefinedArray = surveyStaticDataObject.industry.itemsArr;
            break;
        case 'referral':
            selectedArray = selectedReferralSources;
            updateFunction = setSelectedReferralSources;
            predefinedArray = surveyStaticDataObject.referral.itemsArr;
            break;
        case 'purpose':
            selectedArray = selectedPurposes;
            updateFunction = setSelectedPurposes;
            predefinedArray = surveyStaticDataObject.purpose.itemsArr
            break;
        default:
            return;
    }
    let newArray;

    if (selectedArray.includes(item)) {
        newArray = selectedArray.filter(i => i !== item);
        if (item === 'Other') {
            newArray = newArray.filter(i => predefinedArray.includes(i));
        }
    } else {
        newArray = [...selectedArray, item];
    }
    updateFunction(newArray);
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

  const handleLastButtonSubmit = async() => {
    const formData = {
      industries: selectedIndustries.filter(item => item !== 'Other'),
      referral_sources: selectedReferralSources.filter(item => item !== 'Other'),
      purposes: selectedPurposes.filter(item => item !== 'Other'),
    };
    try{
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      const response = await fetch('/api/user/save_survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
        },
        body:JSON.stringify({ OnboardingSurvey: formData})
      });
      if (!response.ok){
        console.error('Failed to submit survey:', response);
      }
      else {
        const result = await response.json()
        console.log('Survey submitted successfully:', result);
        handleBack()
      }
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-4 sm:gap-12'>
      <div className='sticky top-0 w-full z-50 p-4 sm:p-10 bg-zinc-100'>
        <div className='w-full flex flex-row items-center justify-center gap-3 mx-auto'>
          {/* <button onClick={handleBack}>
              <SurveyBackIcons />
          </button> */}
          <OnboardingSurveyProgressBar progress={progress}/>
        </div>
      </div>


      <SurveySection 
        section={'industry'}
        selectedItems={selectedIndustries}
        toggleSelection={(item) => toggleSelection(item, 'industry')}
        showNextSection={showReferralSection}
        handleButtonClick={handleNextToReferral}
        handleCustomInput={(value) => handleCustomInput(value, 'industry')}
      />

      {showReferralSection && (
        <div className={`transition-opacity duration-500 ${referralSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            section={'referral'}
            selectedItems={selectedReferralSources}
            toggleSelection={(item) => toggleSelection(item, 'referral')}
            showNextSection={showPurposeSection}
            handleButtonClick={handleNextToPurpose}
            handleCustomInput={(value) => handleCustomInput(value, 'referral')}
          />
        </div>
      )}

      {showPurposeSection && (
        <div className={`transition-opacity duration-500 ${purposeSectionEffect ? 'opacity-100' : 'opacity-0'}`}>
          <SurveySection 
            section={'purpose'}
            selectedItems={selectedPurposes}
            toggleSelection={(item) => toggleSelection(item, 'purpose')}
            isLastSection={true}
            handleCustomInput={(value) => handleCustomInput(value, 'purpose')}
            handleButtonClick={handleLastButtonSubmit}
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