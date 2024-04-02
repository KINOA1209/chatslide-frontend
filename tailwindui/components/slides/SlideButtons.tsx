'use client';

import React, { useEffect, useState } from 'react';
import {
	LeftSlideNavIcon,
	RightSlideNavIcon,
} from '@/app/(feature)/slides/icons';
import { GoPlus, GoShare } from 'react-icons/go';
import { LuTrash2, LuPalette } from 'react-icons/lu';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import Modal from '../ui/Modal';
import TemplateSelector from '@/app/(feature)/design/TemplateSelector';
import { FiPlay } from 'react-icons/fi';
import { FaRegClone } from 'react-icons/fa';
import { PaletteKeys, TemplateKeys } from './slideTemplates';
import availablePalettes from './palette';
import { useProject } from '@/hooks/use-project';
import { useSlides } from '@/hooks/use-slides';

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
		<ButtonWithExplanation
			button={
				<button onClick={openPresent}>
					<FiPlay
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Present'}
		/>
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

	useEffect(() => {
		document.addEventListener('add_page', (e) => {
			addPage();
		});

		return () => document.removeEventListener('add_page', (e) => {
			addPage();
		});
	}, []);

	return (
		<ButtonWithExplanation
			button={
				<button onClick={addPage}>
					<GoPlus
						style={{
							strokeWidth: '0.9',
							flex: '1',
							width: '1.7rem',
							height: '1.7rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Add Page'}
		/>
	);
};

export const DuplicateSlidePageButton: React.FC<{
	currentSlideIndex: number;
	duplicatePage: () => void;
}> = ({ currentSlideIndex, duplicatePage }) => {

	useEffect(() => {
		document.addEventListener('duplicate_page', (e) => {
			duplicatePage();
		});

		return () => document.removeEventListener('duplicate_page', (e) => {
			duplicatePage();
		});
	}, []);

	return (
		<ButtonWithExplanation
			button={
				<button onClick={duplicatePage}>
					<FaRegClone
						style={{
							strokeWidth: '1',
							flex: '1',
							width: '1.3rem',
							height: '1.3rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Duplicate Page'}
		/>
	);
};

export const DeleteSlideButton: React.FC<{
	currentSlideIndex: number;
	deletePage: () => void;
}> = ({ currentSlideIndex, deletePage }) => {

	useEffect(() => {
		document.addEventListener('delete_page', (e) => {
			deletePage();
		});

		return () => document.removeEventListener('delete_page', (e) => {
			deletePage();
		});
	}, []);

	return (
		<ButtonWithExplanation
			button={
				<button onClick={deletePage}>
					<LuTrash2
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Delete Page'}
		/>
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
}> = ({
}) => {
	const { project } = useProject();
	const { changeTemplateAndPalette } = useSlides();
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateKeys>(project?.template || 'Default');
	const [showModal, setShowModal] = useState(false);
	// Assert the type of selectedTemplate as TemplateKeys
	// const paletteOption =
	// 	availablePalettes[
	// 		selectedTemplate as keyof typeof availablePalettes
	// 	] || [];
	// layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	const [selectedPaletteOption, setSelectedPaletteOption] = useState<PaletteKeys>(project?.palette || 'Original');

	const handleConfirm = () => {
		console.log('selectedTemplate:', selectedPaletteOption);
		changeTemplateAndPalette(selectedTemplate, selectedPaletteOption);
		setShowModal(false);
	};

	useEffect(() => {
		document.addEventListener('change_template', (e) => {
			setShowModal(true);
		});

		return () => document.removeEventListener('change_template', (e) => {
			setShowModal(true);
		});
	}, []);

	return (
		<>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Change Template'
				description='Select a template for your slides'
				onConfirm={handleConfirm}
			>
				<div className='max-w-[60rem]'>
					<TemplateSelector
						// paletteOptions={paletteOption}
						paletteOptions={
							availablePalettes[
								selectedTemplate as keyof typeof availablePalettes
							] || ['Original']
						}
						template={selectedTemplate}
						palette={selectedPaletteOption}
						setTemplate={setSelectedTemplate}
						setPalette={setSelectedPaletteOption}
					/>
				</div>
			</Modal>
			<ButtonWithExplanation
				button={
					<button
						onClick={() => {
							setShowModal(true);
						}}
					>
						<LuPalette
							style={{
								strokeWidth: '2',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								fontWeight: 'bold',
								color: '#344054',
							}}
						/>
					</button>
				}
				explanation={'Change Template'}
			/>
		</>
	);
};
