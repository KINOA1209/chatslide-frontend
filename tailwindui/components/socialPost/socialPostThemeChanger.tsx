import React from 'react';
import { useState } from 'react';
import { Transition } from '@headlessui/react'; // Assuming you're using Headless UI for Transitions
import { SlideKeys } from '@/components/socialPost/socialPostHTML';
import { ThemeIcon } from '@/app/(feature)/icons';

type ThemeProps = {
	openTheme: () => void;
	showTheme: boolean;
	closeTheme: () => void;
	currentSlideIndex: number;
	borderColorOptions: ThemeObject[];
	handleSlideEdit: (
		content: string | string[] | ThemeObject,
		slideIndex: number,
		tag: SlideKeys,
	) => void;
};

export interface ThemeObject {
	border_start: string;
	border_end: string;
	cover_start: string;
	cover_end: string;
}
const ThemeChanger: React.FC<ThemeProps> = ({
	openTheme,
	showTheme,
	closeTheme,
	currentSlideIndex,
	borderColorOptions,
	handleSlideEdit,
}) => {
	const [selectedTheme, setSelectedTheme] = useState(borderColorOptions[5]);
	const handleThemeSelect = (option: ThemeObject) => {
		setSelectedTheme(option);
		handleSlideEdit(option, currentSlideIndex, 'theme');
	};
	return (
		<div className='col-span-1 flex flex-row-reverse hidden sm:block'>
			<div
				className='w-14 h-14 bg-indigo-50 rounded-full shadow border-2 border-indigo-300  hover:bg-Lavender flex justify-center items-center cursor-pointer'
				onClick={openTheme}
			>
				<ThemeIcon />
			</div>

			<Transition
				className='h-[100vh] w-[100vw] z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
				show={showTheme}
				onClick={closeTheme}
				enter='transition ease duration-300 transform'
				enterFrom='opacity-0 translate-y-12'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease duration-300 transform'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-12'
			>
				<div className='grow md:grow-0'></div>
				<Transition
					className='bg-[#F4F4F4] w-full h-3/4 md:h-fit
                            md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                            overflow-hidden flex flex-col p-4'
					show={showTheme}
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
					<h4 className='font-semibold text-xl text-center'>Theme Color</h4>
					<div className='w-full text-center mb-3'>
						Change color of the post
					</div>
					<div className='grow flex flex-col overflow-hidden mt-6 mb-5'>
						<div className='w-full h-fit grid grid-cols-5 gap-4 p-2'>
							{borderColorOptions.map((option, index) => (
								<div
									key={'colorCircle' + index.toString()}
									className='flex justify-center items-center'
								>
									<div
										className='w-[45px] h-[45px] rounded-full overflow-hidden cursor-pointer'
										style={{ background: `${option.border_start}` }}
										onClick={() => handleThemeSelect(option)}
									>
										{selectedTheme.border_start === option.border_start &&
											selectedTheme.border_end === option.border_end &&
											selectedTheme.cover_start === option.cover_start &&
											selectedTheme.cover_end === option.cover_end && (
												<div className='w-full h-full rounded-full flex justify-center items-center'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='32'
														height='32'
														viewBox='0 0 32 32'
														fill='none'
													>
														<path
															d='M6.66797 17.332L12.0013 22.6654L25.3346 9.33203'
															stroke='white'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												</div>
											)}
									</div>
								</div>
							))}
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
										closeTheme();
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

export default ThemeChanger;
