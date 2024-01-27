'use client';

import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectProgress from '@/components/WorkflowSteps';
import AuthService from '@/services/AuthService';
import FeedbackButton from '@/components/ui/feedback';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingIcon } from '@/components/ui/LoadingIcon';
import { LeftTurnArrowIcon, QuestionExplainIcon } from '../icons';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import {
	AddScriptIconActive,
	AddScriptIconInactive,
	DeleteScriptIconActive,
	DeleteScriptIconInactive,
	AIEditIconActive,
	AIEditIconInactive,
} from './icons';
import NewWorkflowGPTToggle from '@/components/button/WorkflowGPTToggle';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import Modal from '@/components/ui/Modal';
import VideoService from '@/services/VideoService';
interface UpdateButtonProps {
	callback: Function;
	text: string;
	ind: number;
	subIndex: number;
}

// interface TranscriptWithTitle {
//   title: string
//   subtitle: string
//   script: string
// }
interface TranscriptWithTitle {
	title: string;
	sections: Array<{ subtitle: string; script: string }>;
}

const AIEditButton = ({ callback, text, ind, subIndex }: UpdateButtonProps) => {
	const [updating, setUpdating] = useState(false);
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
		subIndex: number,
		ask: string,
	) => {
		setUpdating((old) => {
			return true;
		});
		callback(e, index, subIndex, ask).then(() => {
			setUpdating((old) => {
				return false;
			});
		});
	};
	return (
		<button
			key={ind + subIndex}
			className={`w-fit px-2 py-1 rounded-xl text-gray-500 hover:text-gray-700 text-xs font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:bg-gray-200`}
			onClick={(e) => handleClick(e, ind, subIndex, text)}
			disabled={updating}
		>
			<div className='flex flex-row'>
				<div className='h-[16px] mr-2' hidden={!updating}>
					<LoadingIcon />
				</div>
				{text}
			</div>
		</button>
	);
};

const UpdateButton = ({ callback, text, ind }: UpdateButtonProps) => {
	const [updating, setUpdating] = useState(false);

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
		ask: string,
	) => {
		setUpdating((old) => {
			return true;
		});
		callback(e, index, ask).then(() => {
			setUpdating((old) => {
				return false;
			});
		});
	};

	return (
		<button
			key={ind + text}
			className='btn w-[154px] text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400'
			onClick={(e) => handleClick(e, ind, 'shorter')}
			disabled={updating}
		>
			<div className='h-[22px] mr-2' hidden={!updating}>
				<LoadingIcon />
			</div>
			{text}
		</button>
	);
};

const TranscriptVisualizer = ({
	transcripts,
}: //   imageUrls,
{
	transcripts: TranscriptWithTitle[];
	//   imageUrls: []
}) => {
	// const [transcriptList, setTranscriptList] = useState<string[]>(transcripts)
	// const [transcriptList, setTranscriptList] =
	//   useState<TranscriptWithTitle[]>(transcripts)
	const router = useRouter();
	const [hasSlides, setHasSlides] = useState<boolean>(false);
	const [authToken, setAuthToken] = useState<string>();
	const [hoveredIcons, setHoveredIcons] = useState<{
		sectionIndex: number | null;
		subsectionIndex: number | null;
		iconIndex: number | null;
	}>({ sectionIndex: null, subsectionIndex: null, iconIndex: null });
	const [showAIDropdown, setShowAIDropdown] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
			setAuthToken(idToken);
		};

		fetchData();
	}, []);

	const [transformedTranscripts, setTransformedTranscripts] = useState<
		Array<{
			title: string;
			sections: Array<{ subtitle: string; script: string }>;
		}>
	>(transcripts);

	const handleChangeScriptText = (
		sectionIndex: number,
		subIndex: number,
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { value } = event.target;

		const newData = [...transformedTranscripts];
		newData[sectionIndex].sections[subIndex].script = value;
		setTransformedTranscripts(newData);

		// setTranscriptList(newData)
		sessionStorage.setItem(
			'transcripts',
			JSON.stringify(
				newData
					.map((section) => section.sections.map((sub) => sub.script))
					.flat(),
			),
		);
		sessionStorage.setItem('transcriptWithTitle', JSON.stringify(newData));
	};

	const handleUpdateScript = async (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
		subIndex: number,
		ask: string,
	) => {
		e.preventDefault();
		const { subtitle, script } =
			transformedTranscripts[index].sections[subIndex];
		const language =
			typeof window !== 'undefined'
				? sessionStorage.getItem('language')
				: 'English';

		const updateData = {
			ask: ask,
			text: script, // Use the 'script' field from the object
			language: language,
		};

		console.log('updateData is ', updateData);

		try {
			const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

			const response = await fetch('/api/update_script', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			});

			if (response.ok) {
				const resp = await response.json();
				console.log(resp.data);
				const res = resp.data.res;

				// Update local data
				let newData = [...transformedTranscripts];
				newData[index].sections[subIndex].script = res;
				// sessionStorage.setItem('transcripts', JSON.stringify(newData))
				sessionStorage.setItem(
					'transcripts',
					JSON.stringify(
						newData
							.map((section) => section.sections.map((sub) => sub.script))
							.flat(),
					),
				);
				sessionStorage.setItem('transcriptWithTitle', JSON.stringify(newData));

				setTransformedTranscripts(newData);

				toast.success('Script has been updated!', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				alert('Request failed: ' + response.status);
				console.log(response);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			{transformedTranscripts.map((section, index) => (
				<div
					className='rounded bg-[#FCFCFC] border-solid border-2 border-blue-200 mb-[1rem]'
					key={index}
				>
					{/* per section (same title) */}
					<div
						tabIndex={index}
						id={index.toString()}
						className='flex flex-col px-4 py-2 gap-4'
					>
						<div className='text-gray-400 text-xs font-bold font-creto-medium leading-tight tracking-tight'>
							Section {index + 1}
						</div>
						<div className='pb-4 text-neutral-900 text-lg font-bold font-creto-medium leading-tight tracking-tight border-b-2 border-gray-300'>
							{section.title}
						</div>
						{/* subtitle and script*/}
						<div className='px-4 py-2 rounded-md justify-start items-end gap-2.5 flex flex-col'>
							{section.sections.map((subsection, subIndex) => (
								<div
									key={subIndex}
									className={`w-full border-2 border-black px-2 py-1 relative `}
									onMouseEnter={() =>
										setHoveredIcons({
											sectionIndex: index,
											subsectionIndex: subIndex,
											iconIndex: null,
										})
									}
									onMouseLeave={() =>
										setHoveredIcons({
											sectionIndex: null,
											subsectionIndex: null,
											iconIndex: null,
										})
									}
								>
									{/* {subIndex} */}
									{/*  add, delete, ai edit icons for this section when hovering on this   */}
									{hoveredIcons.sectionIndex === index &&
										hoveredIcons.subsectionIndex === subIndex && (
											// Display active icons when hovering over a specific icon
											<div className='active-icons flex relative'>
												{showAIDropdown ? (
													<div className='w-28 h-14 absolute top-[20px] right-0'>
														{/* Your choice box content */}
														<div className='w-28 h-14 px-2 py-1 left-0 top-0 absolute rounded-xl bg-gray-300 flex flex-col'>
															<AIEditButton
																callback={handleUpdateScript}
																text={'shorter'}
																ind={index}
																subIndex={subIndex}
															/>
															<AIEditButton
																callback={handleUpdateScript}
																text={'funnier'}
																ind={index}
																subIndex={subIndex}
															/>
														</div>
													</div>
												) : null}
												{/* add script button */}
												{/* <div
                            className='absolute -top-4 right-[0.5rem]'
                            onMouseEnter={() =>
                              setHoveredIcons({
                                sectionIndex: index,
                                subsectionIndex: subIndex,
                                iconIndex: 0,
                              })
                            }
                            onMouseLeave={() =>
                              setHoveredIcons((prev) =>
                                prev.sectionIndex === index &&
                                prev.subsectionIndex === subIndex
                                  ? { ...prev, iconIndex: null }
                                  : prev
                              )
                            }
                          >
                            {hoveredIcons.iconIndex === 0 ? (
                              <AddScriptIconActive />
                            ) : (
                              <AddScriptIconInactive />
                            )}
                          </div> */}
												{/* delete script */}
												{/* <div
                            className='absolute -top-4 right-[3rem]'
                            onMouseEnter={() =>
                              setHoveredIcons({
                                sectionIndex: index,
                                subsectionIndex: subIndex,
                                iconIndex: 1,
                              })
                            }
                            onMouseLeave={() =>
                              setHoveredIcons((prev) =>
                                prev.sectionIndex === index &&
                                prev.subsectionIndex === subIndex
                                  ? { ...prev, iconIndex: null }
                                  : prev
                              )
                            }
                          >
                            {hoveredIcons.iconIndex === 1 ? (
                              <DeleteScriptIconActive />
                            ) : (
                              <DeleteScriptIconInactive />
                            )}
                          </div> */}
												{/* AI edit choice */}
												<div
													className='absolute -top-4 right-[5.5rem]'
													onMouseEnter={() => {
														setHoveredIcons({
															sectionIndex: index,
															subsectionIndex: subIndex,
															iconIndex: 2,
														});
														// setAIEEditHovered(true) // Add this line
													}}
													onMouseLeave={() => {
														setHoveredIcons((prev) =>
															prev.sectionIndex === index &&
															prev.subsectionIndex === subIndex
																? { ...prev, iconIndex: null }
																: prev,
														);
														// setAIEEditHovered(false)
													}}
												>
													{hoveredIcons.iconIndex === 2 ? (
														<div
															onClick={
																() => setShowAIDropdown(!showAIDropdown) // Add this line
															}
														>
															<ButtonWithExplanation
																button={<AIEditIconActive />}
																explanation='AI Edit'
															/>
														</div>
													) : (
														<AIEditIconInactive />
													)}
												</div>
											</div>
										)}

									<div
										className={`rounded-md justify-start items-center gap-2.5
                    }`}
									>
										<div
											className={`px-4 py-2 rounded-md bg-[#D1DEFC] text-indigo-500 text-xs font-bold font-creato-medium leading-none tracking-tight flex-nowrap`}
										>
											{subsection.subtitle}
										</div>
										{/* comment for now: this is editable input version */}
										{/* <input
                        key={index + subIndex}
                        className={`rounded-md w-fit px-4 py-2 bg-[#D1DEFC] text-indigo-500 text-xs font-bold font-creato-medium leading-none tracking-tight`}
                        value={subsection.subtitle}
                        onChange={(event) =>
                          handleChangeSubtitleText(subIndex, event)
                        }
                        // readOnly
                      /> */}
									</div>
									{/* <div className='bg-[#FCFCFC] block form-input w-full text-gray-800 resize-none border-none p-4'>{subsection.script}</div> */}
									<textarea
										key={subIndex}
										className={`h-80 ${
											subIndex === hoveredIcons.subsectionIndex
												? 'hover:bg-gray-300'
												: 'bg-[#FCFCFC] '
										}  block w-full text-gray-800 mb-2 resize-none border-none p-4 `}
										value={subsection.script}
										onChange={(event) =>
											handleChangeScriptText(index, subIndex, event)
										}
										// readOnly
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default function WorkflowStep4() {
	const storedOutline =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('outline')
			: null;
	const outline = storedOutline ? JSON.parse(storedOutline) : null;
	const outlineRes = outline ? JSON.parse(outline.res) : null;

	const transcriptData =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('transcripts')
			: null;
	// parsed transcriptData
	const transcripts = transcriptData ? JSON.parse(transcriptData) : [];

	const flattenedOutline = outlineRes
		? Object.keys(outlineRes).flatMap((sectionIndex) => {
				const section = outlineRes[sectionIndex];
				return section.content.map((subtitle: string) => ({
					title: section.title,
					subtitle,
				}));
			})
		: [];

	const transcriptWithTitleData = flattenedOutline.map((item, index) => ({
		title: item.title,
		subtitle: item.subtitle,
		script: transcripts[index] || '',
	}));

	const transformedTranscriptsData = transcriptWithTitleData.reduce(
		(
			acc: Array<{
				title: string;
				sections: Array<{ subtitle: string; script: string }>;
			}>,
			data,
			index,
		) => {
			// Check if the current section has the same title as the previous section
			if (
				index > 0 &&
				data.title === transcriptWithTitleData[index - 1].title
			) {
				// Add the subtitle and script to the previous section
				acc[acc.length - 1].sections.push({
					subtitle: data.subtitle,
					script: data.script,
				});
			} else {
				// Create a new section if the title is different
				acc.push({
					title: data.title,
					sections: [{ subtitle: data.subtitle, script: data.script }],
				});
			}
			return acc;
		},
		[],
	);

	const [transcriptWithTitle, setTranscriptWithTitle] = useState<
		TranscriptWithTitle[]
	>(transformedTranscriptsData);
	const titles = transcriptWithTitle.map((section) => section.title);
	const foldername =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('foldername')
			: '';
	const language =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('language')
			: 'English';
	const router = useRouter();
	useEffect(() => {
		// Store 'transcriptWithTitle' in session storage
		sessionStorage.setItem(
			'transcriptWithTitle',
			JSON.stringify(transcriptWithTitleData),
		);
	}, []);

	useEffect(() => {
		console.log(
			'transcriptData with title state variable:',
			transcriptWithTitle,
		);
	}, [transcriptWithTitle]);

	const contentRef = useRef<HTMLDivElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		console.log('submitting');

		const fetchData = async () => {
			try {
				const { userId, idToken: token } =
					await AuthService.getCurrentUserTokenAndId();
				const project_id = sessionStorage.getItem('project_id') || '';
				const job_id = await VideoService.generateVideo(project_id, foldername, language, token);
				sessionStorage.setItem('video_job_id', job_id);
				router.push('workflow-review-video');
			} catch (error) {
				console.error('Error in fetchData:', error);
				// TODO: add toast prompts for user
			}
			setIsSubmitting(false);
		};

		if (isSubmitting) {
			fetchData();
		}
	}, [isSubmitting]);

	// Function to scroll to a specific section
	const scrollToSection = (sectionId: number) => {
		const sectionElement = document.getElementById(String(sectionId));
		if (sectionElement) {
			const offset = 240; // Adjust this value based on your rem size
			const elementPosition = sectionElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div>
			<ToastContainer />

			<WorkflowStepsBanner
				currentIndex={4}
				isSubmitting={isSubmitting}
				setIsSubmitting={setIsSubmitting}
				contentRef={contentRef}
				nextText={!isSubmitting ? 'Create Video' : 'Creating Video'}
			/>

			{/* overview nav section */}
			<div className='w-1/4 fixed top-[15.5rem] overflow-y-auto flex justify-center'>
				<div className='w-2/3 bg-neutral-50 rounded-md border border-gray-200 hidden sm:block overflow-y-auto'>
					<div className='h-5 text-neutral-900 text-xs font-bold font-creato-medium leading-tight tracking-wide px-4 py-3'>
						OVERVIEW
					</div>
					<ol className='list-none px-4 py-4'>
						{titles.map((title, index) => (
							<li
								className='pb-2 opacity-60 text-neutral-900 text-s tracking-wider font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:text-black  hover:rounded-md hover:bg-gray-200'
								key={index}
								onClick={() => scrollToSection(index)}
							>
								<span className=''>
									{index + 1}. {title}
								</span>
							</li>
						))}
					</ol>
				</div>
			</div>

			<div className='flex justify-end'>
				<div className='mt-[5rem] w-full sm:w-3/4 px-5' ref={contentRef}>
					<TranscriptVisualizer transcripts={transcriptWithTitle} />
				</div>
			</div>

			{/*{isSubmitting && (
				<Modal showModal={isSubmitting} setShowModal={setIsSubmitting}>
					<div className='min-h-[4rem] mx-4 my-4'>
						Your video is being generated ⏳. <br />
						We will send the finished video to your email address.
					</div>
				</Modal>
			)}*/}

			<FeedbackButton />
		</div>
	);
}
