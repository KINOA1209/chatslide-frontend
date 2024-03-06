import React from 'react';
import { Transition } from '@headlessui/react'; // Assuming you're using Headless UI for Transitions
import { SlideKeys } from '@/models/Slide';
import { ChangeLayoutIcon } from '@/app/(feature)/icons';
import { LayoutKeys } from './slideLayout';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { FiLayout } from 'react-icons/fi';
import Modal from '../ui/Modal';
type LayoutProps = {
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
	currentSlideIndex,
	// templateSamples,
	slides,
	handleSlideEdit,
	availableLayouts,
}) => {
	const [showModal, setShowModal] = React.useState(false);

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
		<>
			<ButtonWithExplanation
				explanation='Change Page Layout'
				button={
					<button
						onClick={() => setShowModal(true)}>
						<FiLayout
							style={{
								strokeWidth: '2',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								fontWeight: 'bold',
								color: '#2943E9',
							}}
						/>
					</button>
				}
			/>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				onConfirm={() => { setShowModal(false) }}
				title='Change Page Layout'>
				<div className='grow flex flex-col overflow-hidden'>
					<div className='mt-2 mb-5 grow overflow-hidden'>
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
			</Modal >
		</>
	);
};

export default LayoutChanger;
