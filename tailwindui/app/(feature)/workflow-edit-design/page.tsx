'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react';
import ContentWithImageImg from '@/public/images/summary/content_with_image.png';
import ContentOnlyImg from '@/public/images/summary/content_only.png';
import ContentInBrandingColorImg from '@/public/images/summary/content_in_branding_color.png';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import { ToastContainer } from 'react-toastify';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit';
import FileUploadModal from '@/components/forms/FileUploadModal';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import Resource from '@/models/Resource';
import SelectedResourcesList from '@/components/SelectedResources';


export default function ThemePage(){
    const [theme, setTheme] = useState('content_with_image');
    const [useSchoolTemplate, setUseSchoolTemplate] = useState(false);
    const [useLogo, setUseLogo] = useState(false);
	const [schoolTemplate, setSchoolTemplate] = useState('Default' as string);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showFileModal, setShowFileModal] = useState(false);
    const [isGpt35, setIsGpt35] = useState(true);
    const storedOutline = 
        typeof window !== 'undefined'
            ? sessionStorage.getItem('outline_content')
            : null

    const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
        typeof window !== 'undefined' &&
            sessionStorage.selectedLogo != undefined
            ? JSON.parse(sessionStorage.selectedLogo)
            : [],
    );
    const outlineContent = storedOutline ? JSON.parse(storedOutline) : null

    const removeLogoAtIndex = (indexToRemove: number) => {
		setSelectedLogo((currentLogo) =>
			currentLogo.filter((_, index) => index !== indexToRemove),
		);
	};

    useEffect(() => {
        sessionStorage.setItem('schoolTemplate', schoolTemplate);
        sessionStorage.setItem('theme', theme);
        if (selectedLogo && selectedLogo.length > 0) {
            sessionStorage.setItem('selectedLogo_id', selectedLogo[0].id)
        }
        else{
            sessionStorage.removeItem('selectedLogo_id');
        }
      }, [schoolTemplate, theme, selectedLogo]);


    return(
        <div>
            <ToastContainer />

            <FileUploadModal
				selectedResources={selectedLogo}
				setSelectedResources={setSelectedLogo}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
                pageInvoked = {'theme'}
			/>

            <WorkflowStepsBanner
                currentIndex={2}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                isPaidUser={true}
                contentRef={contentRef}
                nextIsPaidFeature={false}
                showGPTToggle={true}
                setIsGpt35={setIsGpt35}
                nextText={!isSubmitting ? 'Create Slides' : 'Creating Slides'}
            />

            {outlineContent && (
				<GenerateSlidesSubmit
					outline={outlineContent}
					isGPT35={isGpt35}
					isSubmitting={isSubmitting}
					setIsSubmitting={setIsSubmitting}
				/>
			)}
            <div className='gap-y-4 w-full flex flex-col items-center my-[6rem]'>
                {/* design */}
                <div
                    className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1 font-creato-regular'
                    id='SummaryStep-4'
                >
                    <div className='additional_container my-2 lg:my-5 border border-2 border-gray-200 flex flex-col gap-y-4'>
                        <div className='title2'>
                            <p className='text-3xl'>Design</p>
                            <p id='after2'> (Optional)</p>
                        </div>
                        <span className='text-md text-gray-500'>
                            Customize the design for your slide
                        </span>
                         {/* school */}
                         <div className='grid grid-cols-2 gap-x-4'>
                            <div className='gap-1 flex flex-col justify-start'>
                                <span className='text-md font-bold'>Do you want to use a school deck template?</span>
                                <form className='flex flex-row gap-x-4 mt-2'>
                                    <label>
                                        <input
                                            type='radio'
                                            value='yes'
                                            checked={useSchoolTemplate}
                                            onChange={(e) => {
                                                setUseSchoolTemplate(true)
                                                setSchoolTemplate('Harvard')
                                            }}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            value='no'
                                            checked={!useSchoolTemplate}
                                            onChange={(e) => {
                                                setUseSchoolTemplate(false)
                                                setSchoolTemplate('default')
                                            }}
                                        />
                                        No
                                    </label>
                                </form>
                            </div>

                            {useSchoolTemplate && (
                                <div className='gap-1 flex flex-col justify-start'>
                                    <span className='text-md font-bold'>Select your school:</span>
                                    <select
                                        className='border border-2 border-gray-400 rounded-lg bg-gray-100'
                                        onChange={(e) => setSchoolTemplate(e.target.value)}
                                    >
                                        <option value='Stanford'>Stanford University</option>
                                        <option value='Berkeley'>UC Berkeley</option>
                                        <option value='Harvard'>Harvard University</option>
                                        <option value='MIT'>Massachusetts Institute of Technology</option>
                                        <option value='Princeton'>Princeton University</option>
                                        <option value='Caltech'>California Institute of Technology</option>
                                        <option value='Columbia'>Columbia University</option>
                                        <option value='JHU'>Johns Hopkins University</option>
                                        <option value='Yale'>Yale University</option>
                                        <option value='UPenn'>University of Pennsylvania</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        {/* theme */}
                        {/* {!useSchoolTemplate ? ( */}
                            <div>
                                <span className='text-md font-bold'>What theme do you want to choose?</span>
                                <div className='grid grid-cols-3 gap-x-4 mt-3'>
                                    {[
                                        {
                                            img: ContentWithImageImg,
                                            value: 'content_with_image',
                                            alt: 'Content with image',
                                        },
                                        {
                                            img: ContentOnlyImg,
                                            value: 'content_only',
                                            alt: 'Content only',
                                        },
                                        {
                                            img: ContentInBrandingColorImg,
                                            value: 'content_in_branding_color',
                                            alt: 'Content in branding color',
                                        },
                                    ].map(({ img, value, alt }) => (
                                        <div
                                            key={value}
                                            className={`border border-2 rounded-lg border-gray-400 px-2 py-2 ${
                                                theme === value ? 'border-gray-400' : 'border-white'
                                            }`}
                                        >
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='theme'
                                                    value={value}
                                                    checked={theme === value}
                                                    onChange={() => setTheme(value)}
                                                    style={{ display: 'none' }} // Hides the radio button
                                                />
                                                <div onClick={() => setTheme(value)}>
                                                    <Image src={img} alt={alt} />
                                                </div>
                                                {alt}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/*logo section*/}
                                {!useSchoolTemplate && (
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div className='gap-1 flex flex-col justify-start'>
                                        <span className='text-md font-bold'>Do you want to use your logo?</span>
                                        <form className='flex flex-row gap-x-4 mt-2'>
                                            <label>
                                                <input
                                                    type='radio'
                                                    value='yes'
                                                    checked={useLogo}
                                                    onChange={(e) => setUseLogo(true)}
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type='radio'
                                                    value='no'
                                                    checked={!useLogo}
                                                    onChange={(e) => setUseLogo(false)}
                                                />
                                                No
                                            </label>
                                        </form>
                                    </div>
                                                        
                                    {useLogo && (
                                        <div className='gap-1 flex flex-col justify-start'>
                                            <span className='ml-2 text-md font-bold'>Upload Logo:</span>
                                            <div className=''>
                                                <SmallBlueButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowFileModal(true);
                                                    }}
                                                >
                                                    Browse File
                                                </SmallBlueButton>
                                            </div>
                                        </div>
                                    )}
                                </div>)}
                            </div>
                        {/* ) : (
                            <div>
                                <span className='text-md font-bold'>School template preview</span>
                            </div>
                        )} */}
                        {useLogo && (
                        <>
                            {selectedLogo.length > 0 && <hr id='add_hr' />}
                            <div className='mt-[10px]'>
                                <SelectedResourcesList
                                    selectedResources={selectedLogo}
                                    removeResourceAtIndex={removeLogoAtIndex}
                                />
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}