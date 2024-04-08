import React from 'react';
import { Transition } from '@headlessui/react'; // Assuming you're using Headless UI for Transitions
import { SlideKeys } from '@/models/SocialPost';
import { ChangeLayoutIcon } from '@/app/(feature)/icons';
import { FiLayout } from 'react-icons/fi';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { useSocialPosts } from '@/hooks/use-socialpost';

type LayoutProps = {
	openModal: () => void;
	showLayout: boolean;
	closeModal: () => void;
	currentSlideIndex: number;
	templateSamples: {
		cover: { name: string; img: string }[];
		main: { name: string; img: string }[];
	};
	slides: { template: string }[];
	handleSlideEdit: Function;
};

const LayoutChanger: React.FC<LayoutProps> = ({
	openModal,
	showLayout,
	closeModal,
	currentSlideIndex,
	templateSamples,
	slides,
	handleSlideEdit,
}) => {
	const updateTemplate = (
		e: React.MouseEvent<HTMLDivElement>,
		templateName: string,
		slideIndex: number,
	) => {
		e.preventDefault();
		console.log('updateLayout', templateName, slideIndex);
		handleSlideEdit(templateName, slideIndex, 'template', undefined, true);
	};

	return (
		<div className='col-span-1 flex flex-row-reverse hidden sm:block z-20'>
			<ButtonWithExplanation
				explanation='Change Page Layout'
				button={
					<button
						onClick={openModal}>
						<FiLayout
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
			/>
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
										<div className='w-full h-fit grid grid-cols-2 gap-4 p-2'>
											{currentSlideIndex === 0
												? templateSamples.cover.map((temp, index) => {
													if (!slides[currentSlideIndex]) {
														return <></>;
													}
													if (
														temp.name !== slides[currentSlideIndex].template
													) {
														return (
															<div
																key={'layout1' + index}
																onClick={(e) =>
																	updateTemplate(
																		e,
																		temp.name,
																		currentSlideIndex,
																	)
																}
																className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[3px] outline-slate-300 hover:outline-[#5168F6]'
															>
																<img
																	src={temp.img}
																	className='w-full h-full object-contain'
																/>
															</div>
														);
													} else {
														return (
															<div
																key={'layout2' + index}
																onClick={(e) =>
																	updateTemplate(
																		e,
																		temp.name,
																		currentSlideIndex,
																	)
																}
																className='w-full aspect-video bg-white rounded-md overflow-hidden cursor-pointer outline outline-[#5168F6] outline-[3px]'
															>
																<img
																	src={temp.img}
																	className='w-full h-full object-contain'
																/>
															</div>
														);
													}
												})
												: templateSamples.main.map((temp, index) => {
													if (
														temp.name !== slides[currentSlideIndex].template
													) {
														return (
															<div
																key={'layout3' + index}
																onClick={(e) =>
																	updateTemplate(
																		e,
																		temp.name,
																		currentSlideIndex,
																	)
																}
																className='w-full aspect-[0.75/1] bg-white rounded-md overflow-hidden cursor-pointer outline outline-[3px] outline-slate-300 hover:outline-[#5168F6]'
															>
																<img
																	src={temp.img}
																	className='w-full h-full object-contain'
																/>
															</div>
														);
													} else {
														return (
															<div
																key={'layout4' + index}
																onClick={(e) =>
																	updateTemplate(
																		e,
																		temp.name,
																		currentSlideIndex,
																	)
																}
																className='w-full aspect-[0.75/1] bg-white rounded-md overflow-hidden cursor-pointer outline outline-[#5168F6] outline-[3px]'
															>
																<img
																	src={temp.img}
																	className='w-full h-full object-contain'
																/>
															</div>
														);
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
