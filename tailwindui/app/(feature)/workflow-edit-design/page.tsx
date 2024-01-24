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
import SlideDesignPreview from '@/components/slides/SlideDesignPreview';
interface OutlineSection {
	title: string;
	content: string[];
	detailLevel: string;
	section_style: string;
}


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
        typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('outline')
        : null;

    const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
        typeof window !== 'undefined' &&
            sessionStorage.selectedLogo != undefined
            ? JSON.parse(sessionStorage.selectedLogo)
            : [],
    );
	const outline = storedOutline ? JSON.parse(storedOutline) : null;
	const outlineRes = outline ? JSON.parse(outline.res) : null;
    const [outlineContent, setOutlineContent] = useState<OutlineSection[] | null>(
		null,
	);
    useEffect(() => {
		if (outlineRes) {
			const newOutlineContent = Object.keys(outlineRes).map((key) => {
				return {
					title: outlineRes[key]['title'],
					content: outlineRes[key]['content'],
					detailLevel: outlineRes[key]['detailLevel'],
					section_style: outlineRes[key]['section_style'],
				};
			});
			setOutlineContent(newOutlineContent);
		}
	}, []);
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
        <div className=''>
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
                            Customize the design for your slide, you can also skip this step and use the default
                        </span>
                         {/* school */}
                         <div className='grid grid-cols-2 gap-x-4'>
                            <div className='gap-1 flex flex-col justify-start'>
                                <span className='text-md font-bold'>Do you want to use a school deck template?</span>
                                <form className='flex flex-row gap-x-4 mt-2 items-center'>
                                    <label>
                                        <div className='flex flex-row items-center gap-x-1'>
                                        <input
                                            type='radio'
                                            value='yes'
                                            checked={useSchoolTemplate}
                                            onChange={(e) => {
                                                setUseSchoolTemplate(true)
                                                setSchoolTemplate('Stanford')
                                            }}
                                        />
                                        <span>Yes</span>
                                        </div>
                                    </label>
                                    <label>
                                        <div className='flex flex-row items-center gap-x-1'>
                                            <input
                                                type='radio'
                                                value='no'
                                                checked={!useSchoolTemplate}
                                                onChange={(e) => {
                                                    setUseSchoolTemplate(false)
                                                    setSchoolTemplate('default')
                                                }}
                                            />
                                            <span>No</span>
                                        </div>
                                    </label>
                                </form>
                            </div>

                          
                            <div className={`transition-opacity duration-300 ease-in-out ${useSchoolTemplate ? 'opacity-100' : 'opacity-0'} gap-1 flex flex-col justify-start`}>
                                <span className='text-md font-bold'>Select your school:</span>
                                <select
                                    className='pl-3 border border-2 border-gray-400 rounded-md bg-gray-100'
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
                            
                        </div>
                        {/* theme */}
                            <div>
                                <span className='text-md font-bold'>What theme do you want to choose?</span>
                                <div className='grid grid-cols-3 gap-x-4 mt-3'>
                                    {[
                                        {
                                            img: ContentWithImageImg,
                                            value: 'content_with_image',
                                            alt: 'More images<br>(70% decks contain images)',
                                        },
                                        {
                                            img: ContentOnlyImg,
                                            value: 'content_only',
                                            alt: 'Less images<br>(30% decks contain images)',
                                        },
                                        // {
                                        //     img: ContentInBrandingColorImg,
                                        //     value: 'content_in_branding_color',
                                        //     alt: 'Content in branding color',
                                        // },
                                    ].map(({ img, value, alt }) => (
                                        <div
                                            key={value}
                                            className={`rounded-lg py-2 }`}
                                        >
                                            <label>
                                                <div onClick={() => setTheme(value)}>
                                                    <Image src={img} alt={alt} />
                                                </div>
                                                <div className='flex flex-row items-center gap-x-2'>
                                                    <input
                                                        type='radio'
                                                        name='theme'
                                                        value={value}
                                                        checked={theme === value}
                                                        onChange={() => setTheme(value)}
                                                    />
                                                    <span dangerouslySetInnerHTML={{ __html: alt }}></span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {useSchoolTemplate && (
                                <div className='w-full mt-4 flex flex-col'>
                                    <span className='text-md font-bold'>School template preview</span>
                                    <SlideDesignPreview selectedTemplate={schoolTemplate}/>
                                </div>
                                )}

                                {/*logo section*/}
                                {!useSchoolTemplate && (
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div className='gap-1 flex flex-col justify-start'>
                                        <span className='text-md font-bold'>Do you want to use your logo?</span>
                                        <form className='flex flex-row gap-x-4 mt-2 items-center'>
                                            <label>
                                                <div className='flex flex-row items-center gap-x-1'>
                                                    <input
                                                        type='radio'
                                                        value='yes'
                                                        checked={useLogo}
                                                        onChange={(e) => setUseLogo(true)}
                                                    />
                                                    <span>Yes</span>
                                                </div>
                                            </label>
                                            <label>
                                                <div className='flex flex-row items-center gap-x-1'>
                                                    <input
                                                        type='radio'
                                                        value='no'
                                                        checked={!useLogo}
                                                        onChange={(e) => setUseLogo(false)}
                                                    />
                                                    <span>No</span>
                                                </div>
                                            </label>
                                        </form>
                                    </div>
                                                        
                                    <div className={`transition-opacity duration-300 ease-in-out ${useLogo ? 'opacity-100' : 'opacity-0'} gap-1 flex flex-col justify-start`}>
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
                                    
                                </div>)}
                            </div>
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