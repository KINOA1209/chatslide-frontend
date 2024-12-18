import React, { useState, useEffect } from 'react';
import '@/components/slides/onboardingSurvey/onboardingSurvey.css';
import SurveySection from './SurveySection';
import surveyStaticDataObject from './SurveyObject';
import { useUser } from '@/hooks/use-user';
import { isChatslide } from '@/utils/getHost';
import { getUserCountryCode } from '@/utils/userLocation';

type OnboardingSurveyProps = {
	handleBack: () => void;
};

const OnboardingSurvey: React.FC<OnboardingSurveyProps> = ({ handleBack }) => {
	const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
	const [selectedReferralSources, setSelectedReferralSources] = useState<
		string[]
	>([]);
	const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
	const [showReferralSection, setShowReferralSection] = useState(true);
	const [showPurposeSection, setShowPurposeSection] = useState(false);

	// ease-in-out effect
	const [referralSectionEffect, setReferralSectionEffect] = useState(false);
	const [purposeSectionEffect, setPurposeSectionEffect] = useState(false);
  const [location, setLocation] = useState<string>('');
	const { token } = useUser();

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

  useEffect(() => {
    getUserCountryCode().then((code) => {
      setLocation(code);
    });
  }, []);

	const handleNextToPurpose = () => {
		setShowPurposeSection(true);
	};

	const handleNextToIndustry = () => {
		setShowReferralSection(false);
	};

	// handle other value when user click other button
	const handleCustomInput = (value: string, section: string) => {
		let updateFunction;
		let predefinedArray: string[];
		switch (section) {
			case 'industry':
				updateFunction = setSelectedIndustries;
				predefinedArray = surveyStaticDataObject.industry.itemsArr;
				break;
			case 'referral':
				updateFunction = setSelectedReferralSources;
				predefinedArray = surveyStaticDataObject.referral.itemsArr;
				break;
			case 'purpose':
				updateFunction = setSelectedPurposes;
				predefinedArray = surveyStaticDataObject.purpose.itemsArr;
				break;
			default:
				return;
		}
		updateFunction((prev) => {
			// Filter out any value that is not in the predefined array
			let newArray = prev.filter((item) => predefinedArray.includes(item));

			// Add the new custom value if it's not empty and not already included
			if (value.trim() && !newArray.includes(value)) {
				newArray.push(value);
			}
			return newArray;
		});
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
				predefinedArray = surveyStaticDataObject.purpose.itemsArr;
				break;
			default:
				return;
		}
		let newArray;

		//if Item is detected, then we delete it from the arr, otherwise, we add it to the arr
		if (selectedArray.includes(item)) {
			newArray = selectedArray.filter((i) => i !== item);
			if (item === 'Other') {
				newArray = newArray.filter((i) => predefinedArray.includes(i));
			}
		} else {
			newArray = [...selectedArray, item];
		}
		updateFunction(newArray);
	};

	//progress bar
	const totalSections = 3;
	const getCurrentState = () => {
		let currentState = 1;
		if (!showReferralSection) currentState++;
		if (showPurposeSection) currentState++;
		return currentState;
	};
	const progress = (getCurrentState() / totalSections) * 100;

	const handleLastButtonSubmit = async () => {
		const filterOtherUnlessOnly = (arr: string[], predefinedArr: string[]) => {
			//if user type custom value, hasNonPredefinedItem will return true
			const hasNonPredefinedItem = arr.some(
				(item) => !predefinedArr.includes(item),
			);

			if (arr.includes('Other') && hasNonPredefinedItem) {
				return arr.filter((item) => item !== 'Other');
			}

			return arr;
		};
		const formData = {
			industries: filterOtherUnlessOnly(
				selectedIndustries,
				surveyStaticDataObject.industry.itemsArr,
			),
			referral_sources: filterOtherUnlessOnly(
				selectedReferralSources,
				surveyStaticDataObject.referral.itemsArr,
			),
			purposes: filterOtherUnlessOnly(
				selectedPurposes,
				surveyStaticDataObject.purpose.itemsArr,
			),
			platform: isChatslide() ? 'chatslide' : 'drlambda',
			location: location,
		};
		//console.log(formData)
		try {
			const response = await fetch('/api/user/save_survey', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ OnboardingSurvey: formData }),
			});
			if (!response.ok) {
				console.error('Failed to submit survey:', response);
				handleBack();
			} else {
				const result = await response.json();
				console.log('Survey submitted successfully:', result);
				handleBack();
			}
		} catch (error) {
			console.error('Failed to submit survey:', error);
			handleBack();
		}
	};

	return (
		<div className='flex flex-col justify-center items-center gap-4 sm:gap-6 overflow-y-auto'>
			<div className='w-full p-4 sm:p-y-8 sm:p-x-4'>
				<div className='w-full flex flex-row items-center justify-center gap-3 mx-auto'>
					{/* <button onClick={handleBack}>
              <SurveyBackIcons />
          </button> */}
					<OnboardingSurveyProgressBar progress={progress} />
				</div>
			</div>

			{showReferralSection && (
				<div
					className={`transition-opacity duration-500 ${referralSectionEffect ? 'opacity-100' : 'opacity-0'}`}
				>
					<SurveySection
						section={'referral'}
						selectedItems={selectedReferralSources}
						toggleSelection={(item) => toggleSelection(item, 'referral')}
						showNextSection={showPurposeSection}
						handleButtonClick={handleNextToIndustry}
						handleCustomInput={(value) => handleCustomInput(value, 'referral')}
					/>
				</div>
			)}

			{!showReferralSection && !showPurposeSection && (
				<SurveySection
					section={'industry'}
					selectedItems={selectedIndustries}
					toggleSelection={(item) => toggleSelection(item, 'industry')}
					showNextSection={showReferralSection}
					handleButtonClick={handleNextToPurpose}
					handleCustomInput={(value) => handleCustomInput(value, 'industry')}
				/>
			)}

			{showPurposeSection && (
				<div
					className={`transition-opacity duration-500 ${purposeSectionEffect ? 'opacity-100' : 'opacity-0'}`}
				>
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
	);
};

export default OnboardingSurvey;

type OnboardingSurveyProgressBarProps = {
	progress: number;
};

const OnboardingSurveyProgressBar: React.FC<
	OnboardingSurveyProgressBarProps
> = ({ progress }) => {
	return (
		<div className='w-full progress-bar-container'>
			<div className='progress-bar' style={{ width: `${progress}%` }}></div>
		</div>
	);
};
