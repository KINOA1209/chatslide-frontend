import {
	LeftSlideNavIcon,
	RightSlideNavIcon,
} from '@/app/(feature)/slides/icons';


const SlidePagesIndicator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
}> = ({ currentSlideIndex, slides }) => {
	return (
		<div className='col-span-1'>
			<div className='w-20 h-7 px-4 py-1 bg-indigo-400 rounded-3xl justify-center items-center gap-2 inline-flex'>
				<div className='flex flex-row text-center'>
					<span className='text-zinc-100 text-xs font-bold  leading-tight tracking-wide'>
						{currentSlideIndex + 1}
					</span>
					<span className='text-zinc-100 text-xs font-normal  leading-tight tracking-wide'>
						{' / '}
					</span>
					<span className='text-zinc-100 text-xs font-bold  leading-tight tracking-wide'>
						{slides.length}
					</span>
				</div>
			</div>
		</div>
	);
};

const SlideLeftNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1' id='slide-left-navigator'>
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

const SlideRightNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1' id='slide-right-navigator'>
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

export { SlidePagesIndicator, SlideLeftNavigator, SlideRightNavigator };
