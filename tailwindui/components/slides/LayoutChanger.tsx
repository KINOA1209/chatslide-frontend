import React, { useEffect } from 'react';
import { SlideKeys } from '@/models/Slide';
import { LayoutKeys } from './slideLayout';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { FiLayout } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Slide from '@/models/Slide';
import { useSlides } from '@/hooks/use-slides';
type LayoutProps = {
	currentSlideIndex: number;
	slides: Slide[]; //{ layout: string }[];
	handleSlideEdit: Function;
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
	const [applyToAll, setApplyToAll] = React.useState(false);
	const [selectedLayout, setSelectedLayout] = React.useState<LayoutKeys | null>(
		null,
	);
	const { updateLayoutAllNonCoverPages } = useSlides();

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
		const filteredContent = slides[slideIndex].content.filter((element) => {
			//need to filter out <p><br></p>, <li><p><br></p></li>, <li><span ...></span></li> or <li><span ...>  </span></li>
			//multipe space also should be filtered
			const isEmptyOrWhitespace =
				!element.trim() || /^<(\w+)(\s+[^>]*)?>\s*<\/\1>$/.test(element.trim());
			const hasOnlyEmptyHTML = /<(p|li)(\s+[^>]*)?>\s*(<[^>]+>\s*)*<\/\1>/.test(
				element.trim(),
			);
			return !isEmptyOrWhitespace && !hasOnlyEmptyHTML;
		});
		handleSlideEdit([layoutName, filteredContent], slideIndex, [
			'layout',
			'content',
		]);
	};

	useEffect(() => {
		document.addEventListener('change_layout', (e) => {
			setShowModal(true);
		});

		return () =>
			document.removeEventListener('change_layout', (e) => {
				setShowModal(true);
			});
	}, []);

	return (
		<>
			<ButtonWithExplanation
				explanation='Change Page Layout'
				button={
					<button onClick={() => setShowModal(true)}>
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
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				onConfirm={() => {
					setShowModal(false);

					if (applyToAll && selectedLayout) {
						updateLayoutAllNonCoverPages(selectedLayout);
					}
				}}
				title='Change Page Layout'
			>
				<div className='max-w-[40rem] w-full h-full grid grid-cols-3 gap-4 p-2'>
					{layoutsToDisplay.map((currLayout, index) => {
						// Check if slides[currentSlideIndex] is defined
						if (
							slides[currentSlideIndex] &&
							currLayout.name !== slides[currentSlideIndex].layout
						) {
							return (
								<div
									key={`layout-${index}-${currLayout}`} // Use the name as the key
									onClick={(e) => {
										updateLayout(e, currLayout.name, currentSlideIndex);
										setSelectedLayout(currLayout.name);
									}}
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
									onClick={(e) => {
										updateLayout(e, currLayout.name, currentSlideIndex);
										setSelectedLayout(currLayout.name);
									}}
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

					{/* apply to all checkbox */}
					{currentSlideIndex !== 0 && (
						<div className='col-span-3'>
							<label className='flex items-center space-x-2'>
								<input
									type='checkbox'
									className='form-checkbox text-blue-500'
									checked={applyToAll}
									onChange={() => setApplyToAll(!applyToAll)}
								/>
								<span>Apply to all non-cover pages</span>
							</label>
						</div>
					)}
				</div>
			</Modal>
		</>
	);
};

export default LayoutChanger;
