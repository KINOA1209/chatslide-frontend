import React from 'react';
import { Transition } from '@headlessui/react'; // Assuming you're using Headless UI for Transitions
import { SlideKeys } from '@/models/Slide';
import { ChangeLayoutIcon } from '@/app/(feature)/icons';
import { LayoutKeys } from './slideLayout';
type LayoutProps = {
	openModal: () => void;
	showLayout: boolean;
	closeModal: () => void;
	currentSlideIndex: number;
	// templateSamples: {
	//   cover: { name: string; img: string }[]
	//   main: { name: string; img: string }[]
	// }
	slides: { layout: string }[];
	handleSlideEdit: (
		content: string | string[],
		slideIndex: number,
		tag: SlideKeys,
	) => void;
	availableLayouts: {
		cover: { name: LayoutKeys; img: string }[];
		main: { name: LayoutKeys; img: string }[];
	};
};

const LayoutChanger: React.FC<LayoutProps> = ({
	openModal,
	showLayout,
	closeModal,
	currentSlideIndex,
	// templateSamples,
	slides,
	handleSlideEdit,
	availableLayouts,
}) => {
	// const updateTemplate = (
	//   e: React.MouseEvent<HTMLDivElement>,
	//   templateName: string,
	//   slideIndex: number
	// ) => {
	//   e.preventDefault()
	//   handleSlideEdit(templateName, slideIndex, 'template')
	// }
	const availableLayoutsNonCover = availableLayouts.main; // Assuming main contains non-cover layouts
	const availableLayoutsCover = availableLayouts.cover; // Add your cover layouts here
	// Filter layouts based on the currentSlideIndex
	const layoutsToDisplay =
		currentSlideIndex === 0 ? availableLayoutsCover : availableLayoutsNonCover;

	const updateLayout = (
		e: React.MouseEvent<HTMLDivElement>,
		layoutName: LayoutKeys,
		slideIndex: number,
	) => {
		e.preventDefault();
		console.log('updateLayout', layoutName, slideIndex);
		handleSlideEdit(layoutName, slideIndex, 'layout');
	};

	return (
		<div className='col-span-1 flex flex-row-reverse hidden sm:block'>
			{/* <div className='w-fit h-fit rounded-full overflow-hidden'>
                <button
                    className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
                    onClick={openModal}>Change Layout</button>
            </div> */}
			{/* change layout icon */}
			<div
				className='w-6 h-6 shadow rounded flex justify-center items-center cursor-pointer'
				onClick={openModal}
			>
				<ChangeLayoutIcon />
			</div>

			<Transition
				className='h-[100vh] w-[100vw] z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
				show={showLayout}
				onClick={closeModal}
				enter='transition ease duration-300 transform'
				enterFrom='opacity-0 translate-y-12'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease duration-300 transform'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-12'
			>
				<div className='grow md:grow-0'></div>
				<Transition
					className='bg-gray-100 w-full h-3/4 md:h-fit
                    md:max-w-3xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                    overflow-hidden flex flex-col p-4'
					show={showLayout}
					enter='transition ease duration-500 transform delay-300'
					enterFrom='opacity-0 translate-y-12'
					enterTo='opacity-100 translate-y-0'
					leave='transition ease duration-300 transform'
					leaveFrom='opacity-100 translate-y-0'
					leaveTo='opacity-0 translate-y-12'
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<h4 className='font-semibold text-xl text-center'>Page Layout</h4>
					<div className='w-full text-center mb-3'>
						Change layout of current page
					</div>
					<div className='grow flex flex-col overflow-hidden'>
						<div className='mt-2 mb-5 grow overflow-hidden'>
							<div className='w-full h-full'>
								<div className='w-full h-full flex flex-col'>
									<div className='w-full h-full overflow-y-auto'>
										<div className='w-full h-fit grid grid-cols-3 gap-4 p-2'>
											{layoutsToDisplay.map((currLayout, index) => {
												// Check if slides[currentSlideIndex] is defined
												if (
													slides[currentSlideIndex] &&
													currLayout.name !== slides[currentSlideIndex].layout
												) {
													return (
														<div
															key={`layout-${index}-${currLayout}`} // Use the name as the key
															onClick={(e) =>
																updateLayout(
																	e,
																	currLayout.name,
																	currentSlideIndex,
																)
															}
															className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[3px] outline-slate-300 hover:outline-[#5168F6]'
														>
															<img
																src={currLayout.img}
																className='w-full h-full object-contain'
															/>
														</div>
													);
												} else if (slides[currentSlideIndex]) {
													return (
														<div
															key={`layout-${index}-${currLayout}`} // Use the name as the key
															onClick={(e) =>
																updateLayout(
																	e,
																	currLayout.name,
																	currentSlideIndex,
																)
															}
															className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[#5168F6] outline-[3px]'
														>
															<img
																src={currLayout.img}
																className='w-full h-full object-contain'
															/>
														</div>
													);
												} else {
													// Handle the case when slides[currentSlideIndex] is undefined
													return <></>;
												}
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full mx-auto'>
						<div className='w-full flex flex-wrap'>
							<div className='w-full'>
								<button
									// className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full rounded-lg"
									type='button'
									onClick={(e) => {
										e.preventDefault();
										closeModal();
									}}
								>
									Done
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</Transition>
		</div>
	);
};

export default LayoutChanger;
