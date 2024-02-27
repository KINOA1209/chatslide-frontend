'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/workflow-edit-topic-css/topic_style.css';
import 'react-toastify/dist/ReactToastify.css';
import PaywallModal from '@/components/forms/paywallModal';
import FeedbackButton from '@/components/ui/feedback';
import WorkflowStepsBanner from '@/components/WorkflowStepsBanner';
import { QuestionExplainIcon } from '@/app/(feature)/icons';
import { FaFilePdf, FaYoutube } from 'react-icons/fa';
import YoutubeService from '@/services/YoutubeService';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import WebService from '@/services/WebpageService';
import Resource from '@/models/Resource';
import { toast, ToastContainer } from 'react-toastify';
import FileUploadModal from '@/components/forms/FileUploadModal';
import SelectedResourcesList from '@/components/SelectedResources';
import { useUser } from '@/hooks/use-user';
import { GPTToggleWithExplanation } from '@/components/button/WorkflowGPTToggle';
import { IoIosLink } from 'react-icons/io';
import { FiYoutube } from 'react-icons/fi';

const MAX_TOPIC_LENGTH = 128;
const MIN_TOPIC_LENGTH = 6;

const audienceList = [
	'Researchers',
	'Students',
	'Business Clients',
	'Office Colleagues',
	'Video Viewers',
	'Myself',
];

interface Project {
	topic: string;
	audience: string;
}

interface FormatData {
	topic: string;
	language: string;
	project_id: string;
	youtube_url: string;
	resources: string[];
	model_name: string;
	post_style: string | null;
}

export default function Topic_SocialPost() {
	const contentRef = useRef<HTMLDivElement>(null);
	const [user, setUser] = useState(null);
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const [linkUrl, setLinkUrl] = useState('' as string);
	const [linkError, setLinkError] = useState('');
	const [topicError, setTopicError] = useState('');
	const [urlIsYoutube, setUrlIsYoutube] = useState(false);
	const [isGpt35, setIsGpt35] = useState(true);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [showProjectPopup, setProjectPopup] = useState(false);
	const [showLanguagePopup, setLanguagePopup] = useState(false);
	const [showSupportivePopup, setSupportivePopup] = useState(false);
	const { isPaidUser } = useUser();
	const [isAddingLink, setIsAddingLink] = useState(false);

  const { token } = useUser();

	// bind form data between input and sessionStorage
	const [topic, setTopic] = useState(
		typeof window !== 'undefined' && sessionStorage.topic != undefined
			? sessionStorage.topic
			: '',
	);

	const [scenarioType, setscenarioType] = useState(
		typeof window !== 'undefined' && sessionStorage.scenarioType != undefined
			? sessionStorage.scenarioType
			: '',
	);

	const [audience, setAudience] = useState(
		typeof window !== 'undefined' && sessionStorage.audience != undefined
			? sessionStorage.audience
			: 'unselected',
	);
	const [language, setLanguage] = useState(
		typeof window !== 'undefined' && sessionStorage.language != undefined
			? sessionStorage.language
			: 'English',
	);
	const [selectedResources, setSelectedResources] = useState<Resource[]>(
		typeof window !== 'undefined' &&
			sessionStorage.selectedResources != undefined
			? JSON.parse(sessionStorage.selectedResources)
			: [],
	);

	useEffect(() => {
		if (selectedResources.length > 0) {
			if (topic.length == 0) {
				setTopic(formatName(selectedResources[0].name));
			}
		}
	}, [selectedResources]);

	useEffect(() => {
		const clientTopic = sessionStorage.getItem('topic');
		if (clientTopic) {
			setTopic(clientTopic);
		}
		const currScenario = sessionStorage.getItem('scenarioType');
		if (currScenario) {
			setscenarioType(currScenario);
		}
	}, []);

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const updateTopic = (topic: string) => {
		if (topic.length >= MIN_TOPIC_LENGTH) {
			setTopicError('');
		}
		if (topic.length > MAX_TOPIC_LENGTH) {
			setTopic(topic.slice(0, MAX_TOPIC_LENGTH));
		} else {
			setTopic(topic);
		}
	};

	const handleSubmit = async () => {
		console.log('submitting');

		if (topic.length < MIN_TOPIC_LENGTH) {
			setTopicError(`Please enter at least ${MIN_TOPIC_LENGTH} characters.`);
			toast.error(
				`Please enter at least ${MIN_TOPIC_LENGTH} characters for topic.`,
			);
			setIsSubmitting(false);
			return;
		}

		if (linkError) {
			console.log(linkError); // continue without the invalid link
		}

		const project_id =
			typeof window !== 'undefined' && sessionStorage.project_id != undefined
				? sessionStorage.project_id
				: '';

		setIsSubmitting(true);

		const formData = {
			topic: topic,
			language: language,
			project_id: project_id,
			//youtube_url: youtube,
			resources: selectedResources.map((resource: Resource) => resource.id),
			model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
			post_style: scenarioType,
		};
		sessionStorage.setItem('topic', formData.topic);
		sessionStorage.setItem('language', formData.language);
		sessionStorage.setItem(
			'selectedResources',
			JSON.stringify(selectedResources),
		);

		try {
			const outlinesJson = await callSocialPost(formData as FormatData);
			//console.log(outlinesJson)
			//const searchImagesResponse = await callSearchImages(JSON.stringify(formData.topic))
			setIsSubmitting(false);

			// Store the data in session storage
			sessionStorage.setItem('foldername', outlinesJson.data.foldername);
			sessionStorage.setItem('project_id', outlinesJson.data.project_id);
			sessionStorage.setItem('socialPost', outlinesJson.data.res);
			//sessionStorage.setItem('socialPostImages', JSON.stringify(searchImagesResponse.data.images))

			// Retrieve the existing resources from sessionStorage and parse them
			const resources: string[] = JSON.parse(
				sessionStorage.getItem('resources') || '[]',
			);

			// Add the new YouTube URL to the resources list if it's not empty
			// const youtube_id: string = outlinesJson.data.youtube_id

			// if (youtube_id.trim() !== '') {
			//   resources.push(youtube_id)
			// }

			// Convert the updated list to a JSON string
			const updatedResourcesJSON: string = JSON.stringify(resources);

			// Store the updated JSON string back in sessionStorage
			sessionStorage.setItem('resources', updatedResourcesJSON);

			// Redirect to a new page with the data
			router.push('/workflow-review-socialpost');
		} catch (error) {
			console.error('Error:', error);
			setIsSubmitting(false);
		}
	};

	// api/social_posts helper function
	async function callSocialPost(formData: FormatData) {
		const response = await fetch('/api/social_posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
			if (response.status == 402) {
				setShowPaymentModal(true);
				setIsSubmitting(false);
			} else {
        toast.error(`Server is busy now. Please try again later. Reference code: ` + sessionStorage.getItem('project_id'));
				setIsSubmitting(false);
			}
		}
		return await response.json();
	}

	async function addLink(link: string) {
		if (!isValidUrl(link)) {
			setLinkError('This does not seem like a valid link.');
			return;
		}
		if (!isPaidUser && selectedResources.length >= 1) {
			setLinkError('Please subscribe to add more resources.');
			return;
		}
		setLinkError('');
		setIsAddingLink(true);
		if (urlIsYoutube) {
			addYoutubeLink(link);
		} else {
			addWebpageLink(link);
		}
	}

	const isValidUrl = (urlString: string): boolean => {
		try {
			new URL(urlString);
			return true;
		} catch (error) {
			return false;
		}
	};

	function formatName(name: string) {
    // remove file extension
    name = name.replace(/\.[^/.]+$/, "");

		if (name.length > MAX_TOPIC_LENGTH) {
			return name.slice(0, MAX_TOPIC_LENGTH - 3) + '...';
		}
		return name;
	}

	async function addYoutubeLink(link: string) {
		try {
			const videoDetails = await YoutubeService.getYoutubeInfo(link, token);

			if (!videoDetails?.id) {
				setLinkError('The Youtube link is invalid.');
				setIsAddingLink(false);
				return;
			}

			setSelectedResources((prevList) => [...prevList, videoDetails]);
		} catch (error: any) {
			console.error('Error fetching YouTube video details: ', error);
			setLinkError('Error fetching YouTube video details');
		}
		setIsAddingLink(false);
	}

	async function addWebpageLink(link: string) {
		try {
			const pageDetails = await WebService.getWebpageInfo(link, token);

			if (!pageDetails?.id) {
				setLinkError('The webpage link is invalid.');
				setIsAddingLink(false);
				return;
			}

			setSelectedResources((prevList) => [...prevList, pageDetails]);
		} catch (error: any) {
			console.error('Error reading webpage details: ', error);
			setLinkError('Error reading webpage details');
		}
		setIsAddingLink(false);
	}

	const handleLinkChange = (link: string) => {
		// url format: https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
		// search params will be ignored
		// sample: https://www.youtube.com/watch?v=Ir3eJ1t13fk
		// sample: http://youtu.be/lalOy8Mbfdc?t=1s
		// sample: https://www.youtube.com/v/-wtIMTCHWuI?app=desktop

		if (link === '') {
			setLinkUrl('');
			setLinkError('');
			return;
		}
		setLinkUrl(link);
		setLinkError('');
		// validate url against youtube
		const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/;
		const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/;
		const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/;
		if (regex1.test(link)) {
			const essentialLink = link.match(regex1);
			if (essentialLink && essentialLink.length > 0) {
				setLinkUrl('https://www.' + essentialLink[0]);
				setUrlIsYoutube(true);
			}
		} else if (regex2.test(link)) {
			const essentialLink = link.match(regex2);
			if (essentialLink && essentialLink.length > 0) {
				const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
				if (vID && vID.length > 0) {
					setLinkUrl('https://www.youtube.com/watch?v=' + vID[0]);
					setUrlIsYoutube(true);
				}
			}
		} else if (regex3.test(link)) {
			const essentialLink = link.match(regex3);
			if (essentialLink && essentialLink.length > 0) {
				const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
				if (vID && vID.length > 0) {
					setLinkUrl('https://www.youtube.com/watch?v=' + vID[0]);
					setUrlIsYoutube(true);
				}
			}
		} else {
			// url is not youtube, assuming it is a web link
			setUrlIsYoutube(false);
		}
	};

	const openProjectPopup = () => {
		setProjectPopup(true);
	};

	const closeProjectPopup = () => {
		setProjectPopup(false);
	};

	const openLanguagePopup = () => {
		setLanguagePopup(true);
	};

	const closeLanguagePopup = () => {
		setLanguagePopup(false);
	};

	const openSupportivePopup = () => {
		setSupportivePopup(true);
	};

	const closeSupportivePopup = () => {
		setSupportivePopup(false);
	};

	const removeResourceAtIndex = (indexToRemove: number) => {
		setSelectedResources((currentResources) =>
			currentResources.filter((_, index) => index !== indexToRemove),
		);
	};

	return (
		<section>
			{showPaymentModal && (
				<PaywallModal
					setShowModal={setShowPaymentModal}
					message='Upgrade for more ⭐️credits.'
					showReferralLink={true}
				/>
			)}

			<ToastContainer />

			<FileUploadModal
				selectedResources={selectedResources}
				setSelectedResources={setSelectedResources}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
        pageInvoked={'summary'}
			/>

			<form onSubmit={handleSubmit}>		
				<WorkflowStepsBanner
					currentIndex={0}
					isSubmitting={isSubmitting}
					setIsSubmitting={setIsSubmitting}
					isPaidUser={isPaidUser}
					contentRef={contentRef}
					nextIsPaidFeature={false}
					nextText={
						!isSubmitting ? 'Create Post' : 'Creating Post...'
					}
				/>
				{/* main content */}
				<div className='gap-y-4 w-full flex flex-col items-center'>

          <GPTToggleWithExplanation setIsGpt35={setIsGpt35} />

					{/* Project Summary section */}
					<div className='w-full lg:w-2/3  px-3 my-3 lg:my-1'>
						{/* title */}
						<div className='title1'>
							<p>Project Summary</p>
							<p id='after1'> (Required)</p>
						</div>

						{/* text area section */}
						<div className='project_container w-full my-2 lg:my-5 border border-2 border-gray-200'>
							<div className='flex items-center gap-1'>
								<p>Topic</p>
								<div className='relative inline-block'>
									<div
										className='cursor-pointer'
										onMouseEnter={openProjectPopup}
										onMouseLeave={closeProjectPopup}
										onTouchStart={openProjectPopup}
										onTouchEnd={closeProjectPopup}
									>
										<QuestionExplainIcon />
										{showProjectPopup && (
											<div
												id='project_popup'
												className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[5rem] md:w-80 md:h-[4rem] flex justify-center items-center'
											>
												The main subject or theme of your project. It will set
												the direction and focus of the contents.
											</div>
										)}
									</div>
								</div>
							</div>
							<div className='textfield'>
								<textarea
									onChange={(e) => updateTopic(e.target.value)}
									className='focus:ring-0 text-l md:text-xl bg-gray-100'
									id='topic'
									value={topic}
									maxLength={MAX_TOPIC_LENGTH}
									required
									placeholder='How to use ultrasound to detect breast cancer'
								></textarea>
								{
									<div className='text-gray-500 text-sm mt-1'>
										{MAX_TOPIC_LENGTH - topic.length} characters left
									</div>
								}
								{topicError && (
									<div className='text-red-500 text-sm mt-1'>{topicError}</div>
								)}
							</div>

							{/* DropDown menu section */}
							<div className='dropdown_container w-full gap-2 lg:flex'>
								<div className='language_container mt-[1rem] lg:mt-[0rem]'>
									<div className='language gap-1'>
										<span>Language</span>
										<div className='relative inline-block'>
											<div
												className='cursor-pointer'
												onMouseEnter={openLanguagePopup}
												onMouseLeave={closeLanguagePopup}
												onTouchStart={openLanguagePopup}
												onTouchEnd={closeLanguagePopup}
											>
												<QuestionExplainIcon />
												{showLanguagePopup && (
													<div
														id='language_popup'
														className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[13rem] h-[3rem] md:w-[14rem] md:h-[3rem] flex justify-center items-center'
													>
														Specify the intended language of your projects.
													</div>
												)}
											</div>
										</div>
									</div>
									<div className='language_drop'>
										<select
											className='focus:ring-0 bg-gray-100 border border-2 border-gray-200'
											id='language'
											value={language}
											onChange={(e) => setLanguage(e.target.value)}
											required
										>
											<option key='English' value='English'>
												🇺🇸 English (United States)
											</option>
											<option key='British English' value='British English'>
												🇬🇧 English (British)
											</option>
											<option key='Spanish' value='Spanish'>
												🌎 Español (Latinoamérica)
											</option>
											<option
												key='Continental Spanish'
												value='Continental Spanish'
											>
												🇪🇸 Español (España)
											</option>
											<option key='Chinese' value='Chinese'>
												🇨🇳 中文 (简体)
											</option>
											<option
												key='Traditional Chinese'
												value='Traditional Chinese'
											>
												🇹🇼 中文 (繁體)
											</option>
											<option key='Russian' value='Russian'>
												🇷🇺 Русский
											</option>
											<option key='Ukrainian' value='Ukrainian'>
												🇺🇦 Українська
											</option>
                      <option key='French' value='French'>
                        🇫🇷 Français
                      </option>
                      <option key='German' value='German'>
                        🇩🇪 Deutsch
                      </option>
                      <option key='Brazilian Portuguese' value='Brazilian Portuguese'>
                        🇧🇷 Português (Brasil)
                      </option>
                      <option key='Portuguese' value='Portuguese'>
                        🇵🇹 Português
                      </option>
											<option key='Hindi' value='Hindi'>
												🇮🇳 हिन्दी
											</option>
											<option key='Japanese' value='Japanese'>
												🇯🇵 日本語
											</option>
											<option key='Korean' value='Korean'>
												🇰🇷 한국어
											</option>
											<option key='Arabic' value='Arabic'>
												🇸🇦 العربية
											</option>
											<option key='Hebrew' value='Hebrew'>
												🇮🇱 עברית
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* supplementary section */}
					<div className='supp_container w-full lg:w-2/3 px-3 my-3 lg:my-1'>
						<div className='title2'>
							<p>Supporting Documents</p>
							<p id='after2'> (Optional)</p>
						</div>

						<div className='additional_container my-2 lg:my-5 border border-2 border-gray-200'>
							<div className='upload gap-1'>
								<span>Add Resources</span>
								{/* <QuestionExplainIcon /> */}
								<div className='relative inline-block'>
									<div
										className='cursor-pointer'
										onMouseEnter={openSupportivePopup}
										onMouseLeave={closeSupportivePopup}
										onTouchStart={openSupportivePopup}
										onTouchEnd={closeSupportivePopup}
									>
										<QuestionExplainIcon />
										{showSupportivePopup && (
											<div
												id='supportive_popup'
												className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[6rem] md:w-80 md:h-[5rem] flex justify-center items-center'
											>
												Any additional files that can enhance and provide
												context to your projects. This could be research data,
												images, charts, or reference materials.
											</div>
										)}
									</div>
								</div>
							</div>

							<div className='link_container bg-gray-100 border border-2 border-gray-200'>
								<div
									id='link_text_container'
									className='flex items-center w-full'
								>
                  <div className='flex items-center gap-1'>
                    <IoIosLink />
                    <FiYoutube />
                    𝕏
                  </div>
                  <div className='w-full'>
                    <label htmlFor='link_text'></label>
                    <input
                      id='link'
                      type='text'
                      className='text-sm md:text-l form-input w-full border-none bg-gray-100'
                      value={linkUrl}
                      onChange={(e) => handleLinkChange(e.target.value)}
                      placeholder='Paste webpage, Youtube, or 𝕏 link'
                    />
									</div>
									<SmallBlueButton
										onClick={(e) => {
											addLink(linkUrl);
										}}
										isSubmitting={isAddingLink}
									>
										{isAddingLink ? 'Adding...' : 'Add'}
									</SmallBlueButton>
								</div>

								{linkError && (
									<div id='link_error' className='text-sm text-red-500'>
										{linkError}
									</div>
								)}
							</div>

							<div className='drop_file bg-gray-100 border border-2 border-gray-200'>
								<div className='flex items-center w-full'>
									<FaFilePdf />
									<span className='text-sm md:text-l'>Drop files here or </span>
									<SmallBlueButton
										onClick={(e) => {
											e.preventDefault();
											setShowFileModal(true);
										}}
									>
										Browse File
									</SmallBlueButton>
								</div>
							</div>
							{selectedResources.length > 0 && <hr id='add_hr' />}
							<div className='mt-[10px]'>
								<SelectedResourcesList
									selectedResources={selectedResources}
									removeResourceAtIndex={removeResourceAtIndex}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
			<FeedbackButton />
		</section>
	);
}
