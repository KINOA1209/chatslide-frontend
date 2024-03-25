import React from 'react';
import AuthService from '../../services/AuthService';
import {
	LeftSlideNavIcon,
	RightSlideNavIcon,
	ShareSlidesIcon,
} from '@/app/(feature)/slides/icons';
import {
	PresentationModeIcon,
	ChangeLayoutIcon,
	AddSlideIcon,
	DeleteSlideIcon,
	ScriptsIcon,
} from '@/app/(feature)/icons';
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
					className='w-14 h-14 bg-indigo-50 rounded-full shadow border-2 border-indigo-300  hover:bg-Lavender flex justify-center items-center cursor-pointer'
					onClick={openPresent}
				>
					<PresentationModeIcon />
				</div>
			</div>
		</div>
	);
};

export const SlidePagesIndicator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
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
					className='w-14 h-14 bg-indigo-50 rounded-full shadow border-2 border-indigo-300 hover:bg-Lavender flex justify-center items-center cursor-pointer'
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
					className='w-14 h-14 bg-indigo-50 rounded-full shadow border-2 border-indigo-300  hover:bg-Lavender flex justify-center items-center cursor-pointer'
					onClick={deletePage}
				>
					<DeleteSlideIcon />
				</div>
			</div>
		</div>
	);
};
