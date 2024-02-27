import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import {
	LeftSlideNavIcon,
	RightSlideNavIcon,
	ShareSlidesIcon,
} from '@/app/(feature)/workflow-review-slides/icons';
import {
	PresentationModeIcon,
	ChangeLayoutIcon,
	AddSlideIcon,
	DeleteSlideIcon,
	ScriptsIcon,
} from '@/app/(feature)/icons';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import { FaShare, FaShareAlt } from 'react-icons/fa';
import { InputBox } from '../ui/InputBox';
import { TextLabel } from '../ui/GrayLabel';
import { useProject } from '@/hooks/use-project';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
type SaveButtonProps = {
	saveSlides: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ saveSlides }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit rounded-full overflow-hidden'>
				<button
					className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
					onClick={saveSlides}
				>
					Save
				</button>
			</div>
		</div>
	);
};

type PresentButtonProps = {
	openPresent: () => void;
};

export const PresentButton: React.FC<PresentButtonProps> = ({
	openPresent,
}) => {
	return (
		<div className='col-span-1 hidden sm:block'>
			<div className='w-fit h-fit'>
				{/* <button
          className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
          onClick={openPresent}
        >
          Present
        </button> */}
				<div
					className='w-6 h-6 rounded shadow flex justify-center items-center cursor-pointer'
					onClick={openPresent}
				>
					<PresentationModeIcon />
				</div>
			</div>
		</div>
	);
};

type ShareToggleButtonProps = {
	share: boolean;
	setShare: (share: boolean) => void;
  project_id: string;
};

export const ShareToggleButton: React.FC<ShareToggleButtonProps> = ({
	share,
	setShare,
  project_id,
}) => {
  const { token } = useUser();
	const toggleShare = async () => {
    setShare(!share);  // updates db as well 
	};

	return (
		<div className='col-span-1'>
			<BigGrayButton onClick={toggleShare}>
				<div className='flex flex-row items-center gap-x-2'>
					{!share ? 'Share' : 'Stop Sharing'}
					<FaShareAlt />
				</div>
			</BigGrayButton>
		</div>
	);
};

export const SlidePagesIndicator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
}> = ({ currentSlideIndex, slides }) => {
	return (
		<div className='col-span-1'>
			<div className='w-20 h-7 px-4 py-1 bg-indigo-400 rounded-3xl justify-center items-center gap-2 inline-flex'>
				<div className='flex flex-row text-center'>
					<span className='text-zinc-100 text-xs font-bold font-creato-medium leading-tight tracking-wide'>
						{currentSlideIndex + 1}
					</span>
					<span className='text-zinc-100 text-xs font-normal font-creato-medium leading-tight tracking-wide'>
						{' / '}
					</span>
					<span className='text-zinc-100 text-xs font-bold font-creato-medium leading-tight tracking-wide'>
						{slides.length}
					</span>
				</div>
			</div>
		</div>
	);
};

export const SlideLeftNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full'>
				<button
					disabled={currentSlideIndex === 0}
					className='text-white text-2xl mx-4 my-1 disabled:text-black'
					onClick={() => goToSlide(currentSlideIndex - 1)}
				>
					{/* &#9664; */}
					<LeftSlideNavIcon />
				</button>
			</div>
		</div>
	);
};

export const SlideRightNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full'>
				<button
					disabled={currentSlideIndex === slides.length - 1}
					className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
					onClick={() => goToSlide(currentSlideIndex + 1)}
				>
					{/* &#9654; */}
					<RightSlideNavIcon />
				</button>
			</div>
		</div>
	);
};

export const AddSlideButton: React.FC<{
	currentSlideIndex: number;
	addPage: () => void;
}> = ({ currentSlideIndex, addPage }) => {
	return (
		<div className='col-span-1 hidden sm:block'>
			<div className='w-fit h-fit'>
				<div
					className='w-6 h-6 shadow rounded flex justify-center items-center cursor-pointer'
					onClick={addPage}
				>
					<AddSlideIcon />
				</div>
			</div>
		</div>
	);
};

export const DeleteSlideButton: React.FC<{
	currentSlideIndex: number;
	deletePage: () => void;
}> = ({ currentSlideIndex, deletePage }) => {
	return (
		<div className='col-span-1 hidden sm:block'>
			<div className='w-fit h-fit'>
				<div
					className='w-6 h-6 shadow rounded flex justify-center items-center cursor-pointer'
					onClick={deletePage}
				>
					<DeleteSlideIcon />
				</div>
			</div>
		</div>
	);
};

// use to change the template. selection box
// export const ChangeTemplateOptions: React.FC<{
//   templateOptions: string[]
//   onChangeTemplate: (newTemplate: string) => void
// }> = ({ templateOptions, onChangeTemplate }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState('')
//   const handleTemplateChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedTemplate(event.target.value)
//   }
//   const applyTemplateChange = () => {
//     if (selectedTemplate) {
//       onChangeTemplate(selectedTemplate)
//     }
//   }
//   useEffect(() => console.log('templateOptions are:', templateOptions), [])
//   return (
//     <div className='relative'>
//       <select
//         className='border border-gray-300 rounded-md px-3 py-1 mr-2'
//         onChange={handleTemplateChange}
//         value={selectedTemplate}
//       >
//         <option value='' disabled>
//           Select Template
//         </option>
//         {templateOptions.map((template) => (
//           <option key={template} value={template}>
//             {template}
//           </option>
//         ))}
//       </select>
//       <button
//         className='bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer'
//         onClick={applyTemplateChange}
//       >
//         Apply
//       </button>
//     </div>
//   )
// }
export const ChangeTemplateOptions: React.FC<{
	currentTemplate: string;
	templateOptions: string[];
	onChangeTemplate: (newTemplate: string) => void;
}> = ({ currentTemplate, templateOptions, onChangeTemplate }) => {
	const [selectedTemplate, setSelectedTemplate] =
		useState<string>(currentTemplate);

	// useEffect(
	// 	() => console.log('templateOptions are:', templateOptions),
	// 	[selectedTemplate],
	// );

	return (
		<div className='flex flex-col'>
			<TextLabel>Select Template:</TextLabel>

			<DropDown
				width='20rem'
				onChange={(e) => {
					setSelectedTemplate(e.target.value);
					onChangeTemplate(e.target.value);
				}}
				defaultValue={currentTemplate}
			>
				<option value='Default'>Default</option>
				<option value='Fun_Education_001'>Education</option>
				<option value='Business_002'>Business</option>
				<option value='Clean_Lifestyle_003'>Clean Lifestyle</option>
				<option value='Fun_Education_004'>Fun</option>
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
			</DropDown>
		</div>
	);
};
