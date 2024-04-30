import React, { useState, useRef, useEffect, Fragment, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	AddSectionIcon,
	AddTopicIcon,
	DeleteIcon,
} from '@/app/(feature)/icons';
import { sleep } from '@/utils/sleep';

const minOutlineDetailCount = 1;
const maxOutlineDetailCount = 6;
const minOutlineSectionCount = 1;
const maxOutlineSectionCount = 10;
const maxLength = 60;

const OutlineVisualizer = ({
	outlineData,
	setOutlineData,
	isGPT35,
}: {
	outlineData: Outlines;
	setOutlineData: (outline: Outlines) => void;
	isGPT35: boolean;
}) => {
	const [titleCache, setTitleCache] = useState('');
	const [hoveredDetailIndex, setHoveredDetailIndex] = useState(-1);
	const [hoveredSectionIndex, setHoveredSectionIndex] = useState(-1);

	const handleDetailChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		sectionIndex: number,
		detailIndex: number,
		key: string,
	) => {
		const { value } = e.target;
		if (value.length <= maxLength) {
			const updatedOutlineData = [...outlineData]; // Directly use the current state
			updatedOutlineData[sectionIndex]['content'][detailIndex] = value;
			setOutlineData(updatedOutlineData); // Pass the updated data directly
		}
	};

	const handleAddDetail = (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
		sectionIndex: number,
		detailIndex: number,
	) => {
		e.preventDefault();
		let newOutlineData = [...outlineData];
		newOutlineData[sectionIndex].content.splice(
			detailIndex,
			0,
			'Provide some details about this section',
		);
		// select the input field
		setHoveredDetailIndex(detailIndex);
		setOutlineData(newOutlineData);

		sleep(0.1);

		selectInputBox(sectionIndex, detailIndex); // may not work if adding last detail in the section
	};

	function selectInputBox(sectionIndex: number, detailIndex: number) {
		const inputBoxId = String(sectionIndex) + '-' + String(detailIndex);
		const inputBox = document.querySelector(`input[id="${inputBoxId}"]`);
		console.log(inputBoxId);
		console.log(inputBox);
		if (inputBox) {
			(inputBox as HTMLInputElement).focus();
			// console.log('focused');
			(inputBox as HTMLInputElement).select();
		}
	}

	useEffect(() => {
		// use up and down keys to select the input box
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				e.stopPropagation();
				e.preventDefault();
				if (
					hoveredDetailIndex <
					outlineData[hoveredSectionIndex]?.content.length - 1
				) {
					selectInputBox(hoveredSectionIndex, hoveredDetailIndex + 1);
					setHoveredDetailIndex(hoveredDetailIndex + 1);
				}
			} else if (e.key === 'ArrowUp') {
				e.stopPropagation();
				e.preventDefault();
				if (hoveredDetailIndex > 0) {
					selectInputBox(hoveredSectionIndex, hoveredDetailIndex - 1);
					setHoveredDetailIndex(hoveredDetailIndex - 1);
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	const handleDeleteDetail = (
		e: React.MouseEvent<HTMLDivElement>,
		sectionIndex: number,
		detailIndex: number,
	) => {
		e.preventDefault();
		let newOutlineData = [...outlineData];
		newOutlineData[sectionIndex].content.splice(detailIndex, 1);
		setOutlineData(newOutlineData);
	};

	const handleDeleteSection = (
		e: React.MouseEvent<HTMLDivElement>,
		sectionIndex: number,
	) => {
		e.preventDefault();
		let newOutlineData = [...outlineData];
		newOutlineData.splice(sectionIndex, 1);
		setOutlineData(newOutlineData);
	};

	const handleAddSection = (sectionIndex: number) => {
		console.log('Add section after section index: ' + sectionIndex);
		let newOutlineData = [...outlineData];
		newOutlineData.splice(sectionIndex, 0, {
			title: 'New Section',
			content: ['Provide some details about this section'],
			detailLevel: 'Default',
			section_style: 'default',
		});

		console.log('Add section after section index: ' + sectionIndex);
		setOutlineData(newOutlineData);
	};

	const handleEnterEditSection = (
		e: React.MouseEvent<HTMLDivElement>,
		sectionIndex: number,
	) => {
		e.preventDefault();
		setTitleCache(outlineData[sectionIndex].title);
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLDivElement>,
		sectionIndex: number,
	) => {
		e.preventDefault();
		if (outlineData[sectionIndex].title.length == 0) {
			toast.error("Outline section can't be empty!", {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			const updatedOutlineData = [...outlineData]; // Directly use the current state
			updatedOutlineData[sectionIndex].title = titleCache;
			setOutlineData(updatedOutlineData); // Pass the updated data directly

			setTitleCache('');
		}
	};

	const handleSectionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		sectionIndex: number,
	) => {
		const { value } = e.target;
		if (value.length <= maxLength) {
			const updatedOutlineData = [...outlineData]; // Directly use the current state
			updatedOutlineData[sectionIndex].title = value;
			setOutlineData(updatedOutlineData); // Pass the updated data directly
		}
	};

	return (
		<div>
			<ToastContainer />

			{outlineData &&
				outlineData.map((section: OutlineSection, sectionIndex: number) => (
					<div key={sectionIndex}>
						<div
							className={`OutlineStep-2 flex my-3 items-center justify-center ${
								outlineData.length >= maxOutlineSectionCount
									? 'opacity-50 cursor-not-allowed '
									: ''
							}`}
						>
							<button
								disabled={outlineData.length >= maxOutlineSectionCount}
								onClick={(e) => {
									if (outlineData.length < maxOutlineSectionCount) {
										handleAddSection(sectionIndex);
									}
								}}
								className='focus:outline-none'
							>
								<AddSectionIcon />
							</button>
						</div>

						<div className='flex flex-row gap-4 items-center justify-center'>
							<div
								id={String(sectionIndex)}
								key={sectionIndex + 1}
								className='OutlineStep-3 relative w-full sm:w-3/4 bg-[#F9FAFB] rounded-md shadow border border-gray-200 mx-2 px-1 sm:px-4 py-2'
								onMouseEnter={() => setHoveredSectionIndex(sectionIndex)}
								onMouseLeave={() => setHoveredSectionIndex(-1)}
							>
								{/* section index and title */}
								<div
									className='flex flex-col flex-wrap md:flex-nowrap'
									onClick={(e) => {
										handleEnterEditSection(e, sectionIndex);
									}}
								>
									<input
										key={sectionIndex}
										className='border-none rounded-md focus:border-[#A4BCFD] inline bg-[#F9FAFB] text-neutral-600 grow overflow-ellipsis'
										value={section.title}
										onClick={(e) => (e.target as HTMLInputElement).select()}
										onChange={(e) => handleSectionChange(e, sectionIndex)}
										onBlur={(e) => handleBlur(e, sectionIndex)}
									/>
								</div>
								{hoveredSectionIndex === sectionIndex &&
									outlineData.length > minOutlineSectionCount && (
										<div
											className='absolute -top-[7%] right-[10%]'
											onClick={(e) => {
												handleDeleteSection(e, sectionIndex);
											}}
										>
											<DeleteIcon shadow={true} />
										</div>
									)}
								<div>
									{section.content.map((content: any, detailIndex: number) => (
										<div
											key={sectionIndex + detailIndex}
											className={`flex flex-row w-full relative overflow-visiable mt-2 bg-[white] border-2 rounded-md
														${
															hoveredDetailIndex === detailIndex &&
															sectionIndex === hoveredSectionIndex
																? 'border-[#A4BCFD]'
																: 'border-[#EAECF0]'
														}
													  `}
											onMouseEnter={() => setHoveredDetailIndex(detailIndex)}
											onMouseLeave={() => setHoveredDetailIndex(-1)}
										>
											<div
												className={`flex flex-row border-r-2 border-r-[#EAECF0] items-center justify-center w-[2rem] text-gray-800 overflow-ellipsis`}
											>
												<span>{detailIndex + 1}</span>
											</div>
											<input
												key={detailIndex}
												id={String(sectionIndex) + '-' + String(detailIndex)}
												className={`form-input w-[90%] border-none`}
												value={content}
												onClick={(e) => (e.target as HTMLInputElement).select()}
												onChange={(e) =>
													handleDetailChange(
														e,
														sectionIndex,
														detailIndex,
														'content',
													)
												}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														handleAddDetail(e, sectionIndex, detailIndex + 1);
													}
												}}
												placeholder={`Detail ${detailIndex + 1}`}
											/>
											{hoveredDetailIndex === detailIndex &&
												sectionIndex === hoveredSectionIndex && (
													<>
														<div className='absolute flex flex-row gap-4 bottom-[70%] right-0 mt-1 mr-1'>
															{outlineData[sectionIndex].content.length >
																minOutlineDetailCount && (
																<div
																	onClick={(e) =>
																		handleDeleteDetail(
																			e,
																			sectionIndex,
																			detailIndex,
																		)
																	}
																	id='outline-delete-detail-upper'
																>
																	<DeleteIcon shadow={true} />
																</div>
															)}
															{outlineData[sectionIndex].content.length <
																maxOutlineDetailCount && (
																<div
																	onClick={(e) =>
																		handleAddDetail(
																			e,
																			sectionIndex,
																			detailIndex,
																		)
																	}
																>
																	<AddTopicIcon />
																</div>
															)}
														</div>
														<div className='absolute flex flex-row gap-4 top-[70%] right-0 mb-1 mr-1 z-10'>
															{outlineData[sectionIndex].content.length <
																maxOutlineDetailCount && (
																<div
																	onClick={(e) =>
																		handleAddDetail(
																			e,
																			sectionIndex,
																			detailIndex + 1,
																		)
																	}
																>
																	<AddTopicIcon />
																</div>
															)}
														</div>
													</>
												)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				))}

			<div key={outlineData.length}>
				<div
					className={`OutlineStep-2 flex my-3 items-center justify-center ${
						outlineData.length >= maxOutlineSectionCount
							? 'opacity-50 cursor-not-allowed'
							: ''
					}`}
				>
					<button
						disabled={outlineData.length >= maxOutlineSectionCount}
						onClick={(e) => {
							if (outlineData.length < maxOutlineSectionCount) {
								handleAddSection(outlineData.length);
							}
						}}
						className='focus:outline-none'
					>
						<AddSectionIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default OutlineVisualizer;
