import React, { useState, useRef, useEffect, Fragment, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	AddSectionIcon,
	AddTopicIcon,
	DeleteIcon,
} from '@/app/(feature)/icons';

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
		e: React.MouseEvent<HTMLDivElement>,
		sectionIndex: number,
		detailIndex: number,
	) => {
		e.preventDefault();
		let newOutlineData = [...outlineData];
		newOutlineData[sectionIndex].content.splice(detailIndex, 0, 'Provide some details about this section');
		setOutlineData(newOutlineData);
	};

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
							className={`OutlineStep-2 my-[1rem] ${outlineData.length >= maxOutlineSectionCount
								? 'opacity-50 cursor-not-allowed'
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

						<div className='flex flex-row gap-4'>
							<div
								id={String(sectionIndex)}
								key={sectionIndex + 1}
								className='OutlineStep-3 relative w-full sm:w-3/4 bg-neutral-50 rounded-md shadow border border-gray-200 px-1 sm:px-4 py-2'
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
									<h3 className='text-lg'>Section {sectionIndex + 1}</h3>
									<input
										key={sectionIndex}
										className='border-none outline-none focus:outline-slate-300 bg-neutral-50 rounded inline text-xl font-bold grow overflow-ellipsis'
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
								<div className='mt-4'>
									{section.content.map((content: any, detailIndex: number) => (
										<ul
											key={detailIndex}
											className='flex mb-1 sm:list-disc px-2 sm:px-8'
										>
											<li
												className='w-full relative overflow-visiable'
												onMouseEnter={() => setHoveredDetailIndex(detailIndex)}
												onMouseLeave={() => setHoveredDetailIndex(-1)}
											>
												<input
													key={detailIndex}
													className={`form-input border-none w-full text-gray-800 grow overflow-ellipsis ${hoveredDetailIndex === detailIndex &&
														sectionIndex === hoveredSectionIndex
														? 'bg-gray-200'
														: 'bg-neutral-50 '
														}`}
													value={content}
													onClick={(e) =>
														(e.target as HTMLInputElement).select()
													}
													onChange={(e) =>
														handleDetailChange(
															e,
															sectionIndex,
															detailIndex,
															'content',
														)
													}
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
											</li>
										</ul>
									))}
								</div>
							</div>
						</div>
					</div>
				))}

			<div key={outlineData.length}>
				<div
					className={`OutlineStep-2 my-[1rem] ${outlineData.length >= maxOutlineSectionCount
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
