'use client';

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
import { DropDown, SmallBlueButton } from '@/components/button/DrlambdaButton';
import Resource from '@/models/Resource';
import SelectedResourcesList from '@/components/SelectedResources';
import dynamic from 'next/dynamic';
import ImageSelector from './ImageSelector';
import RadioButtonWithImage, {
	ImageOption,
} from '@/components/ui/RadioButtonWithImage';
import useHydrated from '@/hooks/use-hydrated';
import { SlidesStatus, useSlides } from '@/hooks/use-slides';
import { TemplateKeys } from '@/components/slides/slideTemplates';
// const { changeTemplate } = useSlides();

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{
		ssr: false,
	},
);

export default function ThemePage() {
	const [theme, setTheme] = useState('content_with_image');
	const [schoolTemplate, setSchoolTemplate] = useState(
		'Business_002' as string,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isGpt35, setIsGpt35] = useState(true);
	const storedOutline =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('outline')
			: null;

	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		typeof window !== 'undefined' && sessionStorage.selectedLogo != undefined
			? JSON.parse(sessionStorage.selectedLogo)
			: [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>([]);
	const outline = storedOutline ? JSON.parse(storedOutline) : null;
	const outlineRes = outline ? JSON.parse(outline.res) : null;
	const [outlineContent, setOutlineContent] = useState<OutlineSection[] | null>(
		null,
	);

	const imageChoices: ImageOption[] = [
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
	];

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

	useEffect(() => {
		sessionStorage.setItem('schoolTemplate', schoolTemplate);
		sessionStorage.setItem('theme', theme);
		if (selectedLogo && selectedLogo.length > 0) {
			sessionStorage.setItem('selectedLogo_id', selectedLogo[0].id);
		} else {
			sessionStorage.removeItem('selectedLogo_id');
		}
		if (selectedBackground && selectedBackground.length > 0) {
			sessionStorage.setItem('selectedBackground_id', selectedBackground[0].id);
		} else {
			sessionStorage.removeItem('selectedBackground_id');
		}
	}, [schoolTemplate, theme, selectedLogo, selectedBackground]);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className=''>
			<ToastContainer />

			<WorkflowStepsBanner
				currentIndex={2}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				isPaidUser={true}
				contentRef={contentRef}
				nextIsPaidFeature={false}
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
			<div className='gap-y-4 w-full flex flex-col items-center md:my-[6rem]'>
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
							Customize the design for your slide, you can also skip this step
							and use the default
						</span>
						{/* school */}
						<div className='grid grid-cols-2 gap-x-4'>
							<div
								className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
							>
								<span className='text-md font-bold'>Select your template:</span>
								<DropDown
									width='20rem'
									onChange={(e) => setSchoolTemplate(e.target.value)}
									// onChange={(e) =>
									// 	changeTemplate(e.target.value as TemplateKeys)
									// }
									defaultValue={schoolTemplate}
									style='input'
								>
									<option value='Default'>Default</option>
									<option value='Fun_Education_004'>Fun</option>
									<option value='Business_002'>Business</option>
									<option value='Stanford'>Stanford University</option>
									<option value='Berkeley'>UC Berkeley</option>
									<option value='Harvard'>Harvard University</option>
									<option value='MIT'>
										Massachusetts Institute of Technology
									</option>
									<option value='Princeton'>Princeton University</option>
									<option value='Caltech'>
										California Institute of Technology
									</option>
									<option value='Columbia'>Columbia University</option>
									<option value='JHU'>Johns Hopkins University</option>
									<option value='Yale'>Yale University</option>
									<option value='UPenn'>University of Pennsylvania</option>
								</DropDown>
							</div>
						</div>
						<div className='w-full mt-4 flex flex-col'>
							<span className='text-md font-bold'>School template preview</span>
							<SlideDesignPreview selectedTemplate={schoolTemplate} />
						</div>
						{/* theme */}
						<div>
							<span className='text-md font-bold'>
								How many images do you want to generate?
							</span>
							<RadioButtonWithImage
								options={imageChoices}
								selectedValue={theme}
								setSelectedValue={setTheme}
							/>
						</div>
						{/* logo */}
						<ImageSelector
							type='logo'
							selectedImage={selectedLogo}
							setSelectedImage={setSelectedLogo}
						/>
						{/* background */}
						<ImageSelector
							type='background'
							selectedImage={selectedBackground}
							setSelectedImage={setSelectedBackground}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
