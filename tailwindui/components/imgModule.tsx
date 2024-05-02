import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import AuthService from '@/services/AuthService';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import ResourceService from '@/services/ResourceService';
import Resource from '@/models/Resource';
import Image from 'next/image';
import ChartSelection from './chart/chartSelection';
import EditChartData from './chart/EditChartData';
import { ChartConfig, ValueDataPoint } from './chart/chartDataConfig';
import { ScatterDataPoint } from 'chart.js';
import DynamicChart from './chart/DynamicChart';
import { ChartTypeRegistry } from 'chart.js';
import {
	convertToChartData,
	convertFromChartData,
} from './chart/chartDataConvert';
import Chart from '@/models/Chart';
import { Rnd } from 'react-rnd';
import { ResourceIcon } from './ui/ResourceItem';

import ImagesPosition from '@/models/ImagesPosition';
import {
	initializeImageData,
	onDragStart,
	onDragStop,
	onResizeStart,
	onResizeStop,
	onMouseLeave,
} from '@/components/slides/drag_resize/dragAndResizeFunction';
import '@/components/slides/drag_resize/dragAndResizeCSS.css';
import { removeTags, useSlides } from '@/hooks/use-slides';
import { LayoutElements } from './slides/templates_customizable_elements/layout_elements';
import Modal from './ui/Modal';
import { InputBox } from './ui/InputBox';
import { SpinIcon } from '@/app/(feature)/icons';
import { FaCheck, FaSearch, FaTrash } from 'react-icons/fa';
import DrlambdaButton, { BigBlueButton } from './button/DrlambdaButton';
import { ToolBar } from './ui/ToolBar';
import ButtonWithExplanation from './button/ButtonWithExplanation';
import { index } from 'd3';
import { GoPencil } from 'react-icons/go';
import { IoMdResize } from 'react-icons/io';
import { Blank } from './ui/Loading';
import { useImageStore } from '@/hooks/use-img-store';
import { LuTrash2 } from 'react-icons/lu';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import { MEDIA_EXTENSIONS } from './file/FileUploadButton';
import RadioButton, { RadioButtonOption } from './ui/RadioButton';
import { Explanation, Instruction } from './ui/Text';
import { WordSelector } from './slides/WordSelector';
import { useSocialPosts } from '@/hooks/use-socialpost';
import { MdImageSearch } from 'react-icons/md';
import { IoMdCrop } from 'react-icons/io';
import IFrameEmbed from './utils/IFrameEmbed';
import useJSScript from '@/hooks/use-JSScript';

interface ImgModuleProp {
	imgsrc: string;
	updateSingleCallback: Function;
	chartArr: Chart[];
	ischartArr: boolean[];
	handleSlideEdit: Function;
	currentSlideIndex: number;
	currentContentIndex: number;
	canEdit: boolean;
	// isDraggingOrResizing: boolean;
	// isImgEditMode: boolean;
	// setShowImgButton: React.Dispatch<React.SetStateAction<boolean>>;
	// zoomLevel: number;
	images_position: ImagesPosition[];
	layoutElements?: LayoutElements;
	customImageStyle?: React.CSSProperties;
	setImgHigherZIndex?: React.Dispatch<React.SetStateAction<boolean>>;
	columnIndex?: number;
	isSlide?: boolean;
	isSocialPostTemp1Cover?: boolean;
	search_illustration?: boolean;
	defaultObjectFit?: 'contain' | 'cover';
	embed_code?: string[];
	embed_code_single?: string;
}

enum ImgQueryMode {
	RESOURCE,
	SEARCH,
	GENERATION,
	CHART_SELECTION,
	EMBED_CODE,
}

const imageLicenseOptions: RadioButtonOption[] = [
	{
		value: 'all',
		text: 'All',
	},
	{
		value: 'creative',
		text: 'Creative',
	},
	{
		value: 'stock',
		text: 'Stock',
	},
	{
		value: 'illustration',
		text: 'Illustration',
	},
	{
		value: 'giphy',
		text: 'Gif',
	},
];

const getImageLicenseExplanation = (license: string) => {
	switch (license) {
		case 'all':
			return 'Images from all websites, some may require licenses';
		case 'illustration':
			return 'Cartoon style illustration images from Freepik';
		case 'stock':
			return 'High quality stock photos from Unsplash';
		case 'creative':
			return 'Images from all websites, free to use';
		case 'giphy':
			return 'Funny animations from Giphy.	Gif may not be animated if you export to PDF / PPTX, or create video.';
		default:
			return '';
	}
};

export const ImgModule = ({
	imgsrc,
	updateSingleCallback,
	chartArr,
	ischartArr,
	handleSlideEdit,
	currentSlideIndex,
	currentContentIndex,
	canEdit,
	// isDraggingOrResizing,
	// isImgEditMode,
	// setShowImgButton,
	// zoomLevel,
	images_position,
	layoutElements,
	customImageStyle,
	setImgHigherZIndex,
	columnIndex = 0,
	isSlide = true,
	isSocialPostTemp1Cover = false,
	defaultObjectFit = 'contain',
	embed_code,
	embed_code_single,
}: ImgModuleProp) => {
	const sourceImage = useImageStore((state) => state.sourceImage);
	const { project } = useProject();
	const { slideIndex, slides } = useSlides();
	const [showModal, setShowModal] = useState(false);
	const [keyword, setKeyword] = useState(getSearchText());
	const [searchResult, setSearchResult] = useState<string[]>([]);
	const [resources, setResources] = useState<Resource[]>([]);
	const [searching, setSearching] = useState(false);
	const [selectedImg, setSelectedImg] = useState<string>('');
	const searchRef = useRef<HTMLInputElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { token, updateCreditsFE } = useUser();
	const { socialPosts, socialPostsIndex } = useSocialPosts();
	const [objectFit, setObjectFit] = useState(defaultObjectFit);

	const [hoverQueryMode, setHoverQueryMode] = useState<ImgQueryMode>(
		ImgQueryMode.SEARCH,
	);
	const [selectedQueryMode, setSelectedQueryMode] = useState<ImgQueryMode>(
		ImgQueryMode.SEARCH,
	);

	const [uploading, setUploading] = useState(false);
	const [imageLicense, setImageLicense] = useState('all');

	function getSearchText() {
		const slide = slides[slideIndex];
		if (!slide) return '';
		switch (slide?.layout) {
			case 'Cover_img_1_layout':
				return removeTags(slide.head) as string;
			case 'Col_2_img_1_layout':
				return removeTags(slide.subtopic) as string;
			case 'Col_1_img_1_layout':
				return removeTags(slide.subtopic) as string;
			case 'Col_2_img_2_layout':
				return removeTags(slide.content[columnIndex]) as string;
			case 'Col_3_img_3_layout':
				return removeTags(slide.content[columnIndex]) as string;
		}
		return '';
	}

	// useEffect(() => {
	//     console.log(selectedQueryMode);
	// }, [selectedQueryMode]);

	useEffect(() => {
		if (imgsrc !== '') {
			setSelectedImg(imgsrc);
		}
	}, [imgsrc]);

	useEffect(() => {
		if (embed_code_single && embed_code_single !== '') {
			setCurrentStoredEmbedCode(embed_code_single);
		}
	}, [embed_code_single]);

	const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (sourceImage) {
			const droppedImageUrl = sourceImage;
			// Update the image source with the dropped image URL
			updateSingleCallback(droppedImageUrl, false, {});
		}
	};

	const openModal = () => {
		if (canEdit && !isImgEditMode) {
			setShowImgButton(false);
			setShowModal(true);
			fetchFiles();
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setSearching(false);
	};

	const handleImageSearchSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		setSelectedQueryMode(ImgQueryMode.SEARCH);
		setSearchResult([]);
		setSearching(true);

		const response = await fetch('/api/search_images', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				search_keyword: (e.target as HTMLFormElement).search_keyword.value,
				license: imageLicense,
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					const error = response.status;
					console.error(error, response);
				}
			})
			.then((parsedResponse) => {
				if (parsedResponse.data.images.length === 0) {
					toast.error(
						'No images found, please try another keyword or search engine',
						{
							position: 'top-center',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'light',
							containerId: 'slides',
						},
					);
				}
				setSearchResult(parsedResponse.data.images);
			})
			.catch((e) => {
				console.error(e);
			});
		setSearching(false);
	};

	const handleIllustrationSearchSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		setSelectedQueryMode(ImgQueryMode.SEARCH);
		setSearchResult([]);
		setSearching(true);
		const dummyParam = `dummy=${Math.random()}`;
		const response = await fetch(
			`/api/search_illustration_images?keyword=${encodeURIComponent(
				keyword,
			)}&${dummyParam}`,
			{
				mode: 'cors',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (response.ok) {
			try {
				const parsedResponse = await response.json();
				if (parsedResponse.data.images.length === 0) {
					toast.error(
						'No images found, please try another keyword or search engine',
						{
							position: 'top-center',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'light',
							containerId: 'slides',
						},
					);
				}
				setSearchResult(parsedResponse.data.images);
			} catch (error) {
				console.error(error);
			}
		} else {
			const error = response.status;
			console.error(error, response);
		}
		setSearching(false);
	};

	const handleImageGenerationSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		setSelectedQueryMode(ImgQueryMode.GENERATION);
		setSearchResult([]);
		setSearching(true);

		const response = await fetch('/api/generate_images', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				prompt: (e.target as HTMLFormElement).search_keyword.value,
			}),
		})
			.then((response) => {
				if (response.ok) {
					updateCreditsFE(-10);
					return response.json();
				} else if (response.status === 402) {
					setShowPaymentModal(true);
				} else if (response.status === 401) {
					// violates content policy
					const error = response.status;
					toast.error(
						'This query violates our content policy, please use another one. Your credit is refunded.',
						{
							position: 'top-center',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'light',
							containerId: 'slides',
						},
					);
					console.error(error, response);
				}
			})
			.then((parsedResponse) => {
				setSearchResult(parsedResponse?.data?.images || []);
			})
			.catch((e) => {
				console.error(e);
			});
		setSearching(false);
	};

	const decodeImageUrl = (url: string | null): string => {
		if (!url) return '';
		if (url.includes('freepik')) {
			const urlMatch = url.match(/url=([^&]+)/);
			if (urlMatch && urlMatch[1]) {
				const decodedUrl = decodeURIComponent(decodeURIComponent(urlMatch[1]));
				//console.log('decodedurl', decodedUrl)
				return decodedUrl;
			}
			//console.log('url parameter not found',url)
			// If 'url' parameter is not found, return the original url
			return url;
		}
		// If 'freepik' is not included in the url, return the original url
		//console.log('freepik not found', url)
		return url;
	};

	const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		// update image here to template & source html
		// reset images position after changing image
		updateSingleCallback(
			decodeImageUrl((e.target as HTMLImageElement).getAttribute('src')),
			false,
			{},
		);
	};

	const fetchFiles = async (file_id?: string) => {
		ResourceService.fetchResources(['media'], token).then((resources) => {
			const resourceTemps = resources.map((resource) => {
				if (file_id && resource.id === file_id) {
					updateSingleCallback(resource.thumbnail_url);
				}
				return { thumbnail_url: resource.thumbnail_url };
			});

			// extend the array to include images from pdf_images
			const pdf_images = project?.pdf_images || [];
			const pdfImageResources = pdf_images.map((pdf_image: string) => {
				return {
					thumbnail_url: pdf_image,
				};
			});
			resourceTemps.push(...pdfImageResources);
			setResources(resourceTemps as Resource[]);
		});
	};

	const onFileSelected = async (file: File | null) => {
		if (file == null) {
			return;
		}
		const body = new FormData();
		setUploading(true);
		body.append('file', file);
		const response = await fetch('/api/upload_user_file', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: body,
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					toast.error('File upload failed', {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						containerId: 'slides',
					});
					throw (response.status, response);
				}
			})
			.then((parsedResponse) => {
				const file_id = parsedResponse.data.file_id;
				fetchFiles(file_id);
			})
			.catch((error) => console.error);
		setUploading(false);
	};

	// useEffect(() => {
	//     fetchFiles();
	//     console.log('fetching files');
	// }, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const extensions = MEDIA_EXTENSIONS; // For checking logic
		const sizeLimit = 10 * 1024 * 1024; // 16mb
		const file = e.target.files ? e.target.files[0] : null;
		if (file?.size && file?.size > sizeLimit) {
			toast.error('The maximum file size supported is 10 MB.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				containerId: 'slides',
			});
			return;
		}

		const ext = file?.name.split('.').pop()?.toLowerCase();
		if (ext && !extensions.includes(ext)) {
			toast.error(ext.toUpperCase() + ' file is not supported!', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				containerId: 'slides',
			});
			return;
		}

		onFileSelected(file);
	};

	const handleClick = () => {
		if (inputFileRef.current) {
			inputFileRef.current.click();
		}
	};

	const handleMouseOver = (
		e: React.MouseEvent<HTMLButtonElement>,
		type: ImgQueryMode,
	) => {
		setHoverQueryMode(type);
		console.log('hover', type);
	};

	const handleMouseOut = (
		e: React.MouseEvent<HTMLButtonElement>,
		type: ImgQueryMode,
	) => {
		setHoverQueryMode(selectedQueryMode);
		console.log('out', selectedQueryMode);
	};

	const resourceSelectionDiv = (
		<div className='w-full h-full'>
			<div className='w-full h-full flex flex-col'>
				<div className='w-full h-full overflow-y-auto p-1'>
					{/* My resources tab*/}
					<div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
						<div
							onClick={handleClick}
							className='upload-image w-full h-fit rounded-md overflow-hidden aspect-square flex flex-col items-center justify-center bg-[#E7E9EB] hover:bg-[#CAD0D3] cursor-pointer'
						>
							<input
								type='file'
								id='file-upload'
								ref={inputFileRef}
								onChange={handleFileChange}
								style={{ display: 'none' }}
							/>
							{/* upload area icon and text */}
							<svg
								className='w-12 h-12'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g clipPath='url(#clip0_250_2609)'>
									<path
										d='M22.2859 25.7139V46.2853M22.2859 25.7139L15.4287 32.571M22.2859 25.7139L29.143 32.571'
										stroke='#A6B1BB'
										strokeWidth={3}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M41.1429 27.7712C42.4164 27.0364 43.5176 26.0371 44.3722 24.8407C45.2269 23.6443 45.815 22.2786 46.0971 20.8356C46.3793 19.3926 46.3487 17.9059 46.0076 16.4758C45.6665 15.0456 45.0227 13.7052 44.1197 12.5449C43.2167 11.3846 42.0754 10.4313 40.7728 9.74943C39.4702 9.06754 38.0366 8.67284 36.5685 8.59194C35.1004 8.51104 33.6321 8.74582 32.2624 9.28045C30.8928 9.81507 29.6537 10.6371 28.6287 11.6912C27.7298 8.50205 25.7068 5.74616 22.9335 3.93297C20.1603 2.11979 16.8244 1.37192 13.5425 1.82763C10.2606 2.28333 7.25461 3.91179 5.08029 6.41196C2.90597 8.91213 1.71032 12.1149 1.71437 15.4283C1.7168 18.5453 2.78096 21.5685 4.73151 23.9998'
										stroke='#A6B1BB'
										strokeWidth={3}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</g>
								<defs>
									<clipPath id='clip0_250_2609'>
										<rect width={48} height={48} fill='white' />
									</clipPath>
								</defs>
							</svg>
							<div className='text-[#A6B1BB]'>Upload</div>
						</div>
						{/* resources images arrays */}
						{resources.map((resource, index) => {
							if (resource.thumbnail_url === selectedImg) {
								return (
									<div
										onClick={handleImageClick}
										key={index}
										className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-2`}
									>
										<ResourceIcon resource={resource} contain={true} />
									</div>
								);
							} else {
								return (
									<div
										onClick={handleImageClick}
										key={index}
										className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-2`}
									>
										<ResourceIcon resource={resource} contain={true} />
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);

	const imgSearchDiv = (
		<div className='w-full h-full flex flex-col'>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (imageLicense == 'illustration') {
						await handleIllustrationSearchSubmit(e);
					} else {
						await handleImageSearchSubmit(e);
					}
				}}
				className='w-full flex flex-col gap-y-2'
			>
				<div>
					<RadioButton
						options={imageLicenseOptions}
						selectedValue={imageLicense}
						setSelectedValue={setImageLicense}
						name='imageLicense'
						cols={5}
					/>

					<Explanation>{getImageLicenseExplanation(imageLicense)}</Explanation>
				</div>
				<div>
					<InputBox>
						<input
							id='search_keyword'
							type='text'
							className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
							placeholder='Search from internet'
							required
							ref={searchRef}
							onClick={(e) => {
								(e.target as HTMLInputElement)?.select();
							}}
							onChange={(e) => {
								setKeyword(e.target.value);
							}}
							value={keyword}
						/>
						{searching ? (
							<SpinIcon />
						) : (
							<button type='submit'>
								<FaSearch className='h-[24px] w-[24px] text-gray-400' />
							</button>
						)}
					</InputBox>

					<WordSelector text={getSearchText()} setQuery={setKeyword} />
				</div>
			</form>
			<div className='w-full h-full overflow-y-auto p-1'>
				<div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
					{searchResult.map((url, index) => {
						if (url === selectedImg) {
							return (
								<div
									onClick={handleImageClick}
									key={index}
									className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-[3px]`}
								>
									<Image
										src={url} // URL of the image
										unoptimized={!url?.includes('freepik')}
										alt='searched image'
										layout='responsive'
										objectFit='contain' // This will keep the aspect ratio and make sure the image fits within the container
										className='w-full h-full flex items-center justify-center' // Additional CSS classes if needed
										width={100}
										height={100}
									/>
								</div>
							);
						} else {
							return (
								<div
									onClick={handleImageClick}
									key={index}
									className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-[3px]`}
								>
									<Image
										src={url} // URL of the image
										unoptimized={url?.includes('freepik') ? false : true}
										alt='selected image'
										layout='responsive'
										objectFit='contain' // This will keep the aspect ratio and make sure the image fits within the container
										className='w-full h-full' // Additional CSS classes if needed
										width={100}
										height={100}
									/>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);

	const imgGenerationDiv = (
		<div className='w-full h-full flex flex-col'>
			<form onSubmit={handleImageGenerationSubmit} className='w-full'>
				<Explanation>
					Highlight the keywords you want to use for search:
				</Explanation>
				<WordSelector text={getSearchText()} setQuery={setKeyword} />
				<Explanation>Or directly enter the keywords below:</Explanation>
				<InputBox>
					<input
						id='search_keyword'
						type='text'
						className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
						placeholder='Generate from AI (10⭐️)'
						required
						ref={searchRef}
						onClick={(e) => {
							(e.target as HTMLInputElement)?.select();
						}}
						onChange={(e) => {
							setKeyword(e.target.value);
						}}
						value={keyword}
					/>
					{searching ? (
						<SpinIcon />
					) : (
						<button type='submit'>
							<FaSearch className='h-[24px] w-[24px] text-gray-400' />
						</button>
					)}
				</InputBox>
			</form>
			<div className='w-full h-full overflow-y-auto p-1'>
				<div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2'>
					{searchResult.map((url, index) => {
						if (url === selectedImg) {
							return (
								<div
									onClick={handleImageClick}
									key={index}
									className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square outline-[#5168F6] outline outline-[3px]`}
								>
									<img className='w-full h-full object-contain' src={url} />
								</div>
							);
						} else {
							return (
								<div
									onClick={handleImageClick}
									key={index}
									className={`cursor-pointer w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square hover:outline-[#5168F6] hover:outline outline-[3px]`}
								>
									<img className='w-full h-full object-contain' src={url} />
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
	// tab for chart
	const [chartModalContent, setChartModalContent] = useState('selection');
	const [selectedChartType, setSelectedChartType] = useState<
		keyof ChartTypeRegistry | null
	>(null);
	const [chartData, setChartData] = useState<
		ValueDataPoint[] | ScatterDataPoint[]
	>([]);
	const imgmoduleRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLDivElement | null>(null);
	const typeRef = useRef<HTMLDivElement | null>(null);
	const doneButtonRef = useRef<HTMLDivElement | null>(null);
	const handleChartSelect = (chartType: keyof ChartTypeRegistry) => {
		setSelectedChartType(chartType);
		setChartModalContent('edit');
	};
	useEffect(() => {
		if (chartArr && chartArr.length > 0) {
			const chartConfig = chartArr[currentContentIndex];
			if (!chartConfig) {
				console.error('Invalid chart configuration');
				return;
			}
			const { chartType, chartData: parsedData } = convertFromChartData(
				chartArr[currentContentIndex],
			);
			if (chartType) {
				setSelectedChartType(chartType);
				setChartData(parsedData);
			}
		}
	}, []);

	const handleDoneClickChart = async () => {
		if (
			selectedQueryMode === ImgQueryMode.CHART_SELECTION &&
			selectedChartType &&
			chartData.length
		) {
			//autosave chart data
			const updated_chartdata = convertToChartData(
				selectedChartType,
				chartData,
			);
			let updated_chartArr = [...chartArr];
			updated_chartArr[currentContentIndex] = updated_chartdata;

			//autosave ischart
			let updated_ischartArr = [...ischartArr];
			updated_ischartArr[currentContentIndex] = true;
			handleSlideEdit(
				[updated_chartArr, updated_ischartArr],
				currentSlideIndex,
				['chart', 'is_chart'],
			);
			closeModal();
		} else {
			closeModal();
		}
	};

	// handle all embed code related
	const [currentStoredEmbedCode, setCurrentStoredEmbedCode] =
		useState<string>('');
	const [inputValue, setInputValue] = useState('');
	const handleDoneEmbeddingCode = () => {
		if (selectedQueryMode === ImgQueryMode.EMBED_CODE && embed_code) {
			let updated_embed_code = [...embed_code];
			updated_embed_code[currentContentIndex] = currentStoredEmbedCode;
			console.log('currentStoredEmbedCode', currentStoredEmbedCode);
			handleSlideEdit(updated_embed_code, currentSlideIndex, 'embed_code');
			closeModal();
		} else {
			closeModal();
		}
	};
	const handleUpdateStoredEmbedCode = (embedCode: string) => {
		// useJSScript(embedCode);
		setCurrentStoredEmbedCode(embedCode);
	};

	// useEffect(() => {
	// 	console.log(
	// 		'embed_code[currentContentIndex]',
	// 		embed_code[currentContentIndex],
	// 	);
	// }, [currentStoredEmbedCode]);

	const handleConfirmClick = () => {
		if (
			inputValue.startsWith('<iframe') ||
			inputValue.startsWith('<blockquote')
		) {
			// setEmbedCode(inputValue);
			setCurrentStoredEmbedCode(inputValue); // Update currentStoredEmbedCode in parent
		} else {
			// setErrorMessage(
			// 	'Please paste embed code that starts with <iframe> or <blockquote>.',
			// );
			toast.error(
				'Please paste embed code that starts with <iframe> or <blockquote>.',
				{
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				},
			);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newInputValue = event.target.value;
		setInputValue(newInputValue);
		// setErrorMessage('');
	};

	const isConfirmDisabled = inputValue.trim() === '';

	useEffect(() => {
		console.log('currentStoredEmbedCode is', currentStoredEmbedCode);
	}, [currentStoredEmbedCode]);
	const EmbedCodeDiv = (
		<div>
			<ToastContainer />
			{/* <h1>Iframe</h1> */}
			<textarea
				rows={5}
				// cols={50}
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Paste embed code here'
				style={{ marginBottom: '10px', width: '100%', maxWidth: '100%' }}
			></textarea>
			<div className='w-full mx-auto flex justify-center items-center'>
				<BigBlueButton
					// isSubmitting={uploading || searching}
					onClick={handleConfirmClick}
					disabled={isConfirmDisabled}
					customizeStyle={{
						cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
					}}
				>
					Confirm pasting
				</BigBlueButton>
			</div>
			<div className='w-full mx-auto flex flex-col justify-center items-center'>
				{/* <h1>Embedding Example</h1> */}
				<IFrameEmbed
					currentStoredEmbedCode={currentStoredEmbedCode}
					// setCurrentStoredEmbedCode={handleUpdateStoredEmbedCode}
					// handleConfirmClick={handleConfirmClick}
				/>
				{selectedQueryMode === ImgQueryMode.EMBED_CODE &&
					currentStoredEmbedCode && (
						<BigBlueButton
							isSubmitting={uploading || searching}
							onClick={(e) => {
								e.preventDefault();
								handleDoneEmbeddingCode();
							}}
						>
							Add Embed Code
						</BigBlueButton>
					)}
			</div>
		</div>
	);

	const chartSelectionDiv = (
		<div>
			{chartModalContent === 'selection' && (
				<ChartSelection onSelect={handleChartSelect} />
			)}

			{chartModalContent === 'edit' && selectedChartType && (
				<>
					<div className='hidden sm:flex'>
						<EditChartData
							chartType={selectedChartType}
							chartData={chartData}
							setChartData={setChartData}
							onBack={() => setChartModalContent('selection')}
							imgModuleRef={imgmoduleRef}
							titleRef={titleRef}
							typeRef={typeRef}
							doneButtonRef={doneButtonRef}
						/>
					</div>
					<div className='flex sm:hidden'>
						<Blank>Please use desktop to edit chart</Blank>
					</div>
				</>
			)}
		</div>
	);

	//for drag and resize

	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const imageRefs = Array(3)
		.fill(null)
		.map(() => useRef<HTMLDivElement>(null));
	//const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = useState<
		(
			| ImagesPosition
			| { x?: number; y?: number; height?: number; width?: number }
		)[]
	>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(
		Array(3).fill({ x: 0, y: 0 }),
	);
	const [isImgEditMode, setIsImgEditMode] = useState(false);
	const [showImgButton, setShowImgButton] = useState(false);
	const [zoomLevel, setZoomLevel] = useState(100);
	const [parentDimension, setParentDimension] = useState({
		height: 0,
		width: 0,
	});
	const [isParentDimension, setIsParentDimension] = useState(false);
	const [imgLoadError, setImgLoadError] = useState(false);
	const prevDimensionRef = useRef(parentDimension);

	//handler for drag and resize also autosave
	const handleSave = onMouseLeave(
		slideIndex,
		imagesDimensions,
		hasInteracted,
		setHasInteracted,
		setShowImgButton,
		handleSlideEdit,
	);
	const handleDragStart = onDragStart(
		//setIsDraggingOrResizing,
		startPos,
		setStartPos,
		setHasInteracted,
	);
	const handleResizeStart = onResizeStart(
		//setIsDraggingOrResizing,
		setHasInteracted,
	);
	const handleDragStop = onDragStop(
		imagesDimensions,
		setImagesDimensions,
		startPos,
		//setIsDraggingOrResizing,
	);
	const handleResizeStop = onResizeStop(
		imagesDimensions,
		setImagesDimensions,
		//setIsDraggingOrResizing,
	);

	const toggleImgEditMode = (event: any) => {
		event.stopPropagation();
		if (isImgEditMode) {
			handleSave();
		}
		// prevent enlarge image on preview section
		if (canEdit) {
			setIsImgEditMode(!isImgEditMode);
			setImgHigherZIndex && setImgHigherZIndex(!isImgEditMode);
		}
	};

	const applyZoom = () => {
		handleSave();
		setIsImgEditMode(false);
	};

	const customScale = (
		width: number,
		height: number,
		parentWidth: number,
		parentHeight: number,
	) => {
		const aspectRatio = width / height;
		const parentAspectRatio = parentWidth / parentHeight;
		let newWidth, newHeight, newX, newY;

		// vertical image initialization (perform as contain)
		// vertical image: image is taller than its wide
		if (aspectRatio <= 1) {
			newWidth = parentWidth;
			newHeight = parentWidth / aspectRatio;
			newX = 0;
			newY = (parentHeight - newHeight) / 2;
		} else {
			// Compare the aspect ratios to decide how to scale
			if (aspectRatio > parentAspectRatio) {
				// Image is wider than the container proportionally
				newWidth = parentHeight * aspectRatio;
				newHeight = parentHeight;
				newX = (parentWidth - newWidth) / 2; // Center horizontally
				newY = 0;
			} else {
				// Image is taller than the container proportionally
				newWidth = parentWidth;
				newHeight = parentWidth / aspectRatio;
				newX = 0; // Align to left
				newY = (parentHeight - newHeight) / 2; // Center vertically
			}
		}
		return { width: newWidth, height: newHeight, x: newX, y: newY };
	};

	const onZoomChange = (newZoomLevel: number) => {
		const scale = newZoomLevel / 100;
		const dimension = imagesDimensions[currentContentIndex];
		const currentWidth = dimension.width ?? 0;
		const currentHeight = dimension.height ?? 0;
		const newWidth = currentWidth * scale;
		const newHeight = currentHeight * scale;
		//const currentX = dimension.x ?? 0;
		//const currentY = dimension.y ?? 0;

		//const deltaX = (newWidth - imageSize.width) / 2;
		//const deltaY = (newHeight - imageSize.height) / 2;
		//const newX = currentX - deltaX;
		//const newY = currentY - deltaY;

		const updatedDimensions = [...imagesDimensions];
		updatedDimensions[currentContentIndex] = {
			...dimension,
			width: newWidth,
			height: newHeight,
			//x: newX,
			//y: newY,
		};

		setImagesDimensions(updatedDimensions);
	};

	//reposition to default if images changed
	useEffect(() => {
		// make sure we got non-zero value for parentDimension
		if (
			isParentDimension &&
			images_position[currentContentIndex] &&
			Object.keys(images_position[currentContentIndex]).length == 0
		) {
			const img = new window.Image();
			img.src = imgsrc;
			img.onload = () => {
				const {
					height: newHeight,
					width: newWidth,
					x: newX,
					y: newY,
				} = customScale(
					img.naturalWidth,
					img.naturalHeight,
					parentDimension.width,
					parentDimension.height,
				);
				if (newWidth !== imageSize.width || newHeight !== imageSize.height) {
					setImageSize({ width: newWidth, height: newHeight });
				}
				const updatedDimensions = [...imagesDimensions];
				updatedDimensions[currentContentIndex] = {
					...updatedDimensions[currentContentIndex],
					width: newWidth,
					height: newHeight,
					x: newX,
					y: newY,
				};
				setImagesDimensions(updatedDimensions);
			};
		}
	}, [imgsrc, isParentDimension]);

	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		setImagesDimensions(initializedData);
	}, [images_position]);

	// useEffect(() => {
	// 	const currentElement = imageRefs[currentContentIndex]?.current;
	// 	if (
	// 		currentElement &&
	// 		currentElement.clientHeight > 0 &&
	// 		currentElement.clientWidth > 0
	// 	) {
	// 		const newDimensions = {
	// 			height: currentElement.clientHeight,
	// 			width: currentElement.clientWidth,
	// 		};
	// 		if (
	// 			newDimensions.height !== parentDimension.height ||
	// 			newDimensions.width !== parentDimension.width
	// 		) {
	// 			setParentDimension(newDimensions);
	// 			setIsParentDimension(true);
	// 		}
	// 	} else {
	// 		setIsParentDimension(false);
	// 	}
	// }, [currentContentIndex, imageRefs, parentDimension]);

	// new version to get parent container's dimension, reduce unnecessary state updates
	// prevent infinite loop bugs
	useEffect(() => {
		const currentElement = imageRefs[currentContentIndex]?.current;
		if (currentElement) {
			const { clientHeight, clientWidth } = currentElement;
			// Only update if there's a real change in dimensions
			if (
				clientHeight !== parentDimension.height ||
				clientWidth !== parentDimension.width
			) {
				setParentDimension({ height: clientHeight, width: clientWidth });
				setIsParentDimension(clientHeight > 0 && clientWidth > 0);
			}
		} else {
			if (isParentDimension) {
				setIsParentDimension(false);
			}
		}
	}, [currentContentIndex, imageRefs]);

	//detect the mouse click event is outside the image container or not, if it's, trigger autosave
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const currentRef = imageRefs[currentContentIndex]?.current;
			if (
				isImgEditMode &&
				currentRef &&
				!currentRef.contains(event.target as Node)
			) {
				toggleImgEditMode(event);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [currentContentIndex, imageRefs, isImgEditMode, toggleImgEditMode]);

	//resize indicator
	const circle_indicator: CSSProperties = {
		width: '15px',
		height: '15px',
		backgroundColor: 'white',
		border: '1px solid magenta',
		borderRadius: '50%',
		zIndex: 53,
		position: 'absolute',
	};

	const rectangular_indicator: CSSProperties = {
		borderRadius: '35%',
		backgroundColor: 'white',
		border: '1px solid magenta',
		zIndex: 53,
		position: 'absolute',
	};

	const rectangular_horizontal: CSSProperties = {
		width: '25px',
		height: '10px',
		left: '50%',
		transform: 'translateX(-50%)',
	};

	const rectangular_vertical: CSSProperties = {
		width: '10px',
		height: '25px',
		top: '50%',
		transform: 'translateY(-50%)',
	};

	const showIconsFunctionText = (layout: string) => {
		if (layout === 'Col_2_img_2_layout' || layout === 'Col_3_img_3_layout') {
			return false;
		} else {
			return true;
		}
	};

	const layoutEntry = isSlide
		? slides[slideIndex]?.layout
		: socialPosts[socialPostsIndex]?.template;

	return (
		<>
			{/* select image modal */}
			{createPortal(
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					title='Image / Chart / Embed Code'
				>
					<div className='flex grow h-[400px] w-full sm:w-[600px] flex-col overflow-auto'>
						<div className='w-full flex flex-col' ref={typeRef}>
							<div className='w-full grid grid-cols-5'>
								<button
									className='cursor-pointer whitespace-nowrap py-2 flex flex-row justify-center items-center'
									onClick={(e) => {
										setSelectedQueryMode(ImgQueryMode.SEARCH);
										setSearchResult([]);
										// setKeyword('');
									}}
									onMouseOver={(e) => {
										handleMouseOver(e, ImgQueryMode.SEARCH);
									}}
									onMouseOut={(e) => {
										handleMouseOut(e, ImgQueryMode.SEARCH);
									}}
								>
									Search
								</button>
								<button
									className='cursor-pointer whitespace-nowrap py-2 flex flex-row justify-center items-center'
									onClick={(e) => {
										setSelectedQueryMode(ImgQueryMode.RESOURCE);
										setSearchResult([]);
										// setKeyword('');
									}}
									onMouseOver={(e) => {
										handleMouseOver(e, ImgQueryMode.RESOURCE);
									}}
									onMouseOut={(e) => {
										handleMouseOut(e, ImgQueryMode.RESOURCE);
									}}
								>
									My Resources
								</button>
								<button
									className='cursor-pointer whitespace-nowrap py-2 flex flex-row justify-center items-center'
									onClick={(e) => {
										setSelectedQueryMode(ImgQueryMode.GENERATION);
										setSearchResult([]);
										// setKeyword('');
									}}
									onMouseOver={(e) => {
										handleMouseOver(e, ImgQueryMode.GENERATION);
									}}
									onMouseOut={(e) => {
										handleMouseOut(e, ImgQueryMode.GENERATION);
									}}
								>
									Generate
								</button>
								<button
									className='cursor-pointer whitespace-nowrap py-2 flex flex-row justify-center items-center'
									onClick={(e) => {
										setSelectedQueryMode(ImgQueryMode.CHART_SELECTION);
										setSearchResult([]);
										// setKeyword('');
									}}
									onMouseOver={(e) => {
										handleMouseOver(e, ImgQueryMode.CHART_SELECTION);
									}}
									onMouseOut={(e) => {
										handleMouseOut(e, ImgQueryMode.CHART_SELECTION);
									}}
								>
									Chart
								</button>
								<button
									className='cursor-pointer whitespace-nowrap py-2 flex flex-row justify-center items-center'
									onClick={(e) => {
										setSelectedQueryMode(ImgQueryMode.EMBED_CODE);
										setSearchResult([]);
										// setKeyword('');
									}}
									onMouseOver={(e) => {
										handleMouseOver(e, ImgQueryMode.EMBED_CODE);
									}}
									onMouseOut={(e) => {
										handleMouseOut(e, ImgQueryMode.EMBED_CODE);
									}}
								>
									Embed
								</button>
							</div>
							{/* sliding animation */}
							<div className='w-full bg-slate-200 mb-2'>
								<div
									className={`w-1/4 h-[2px] bg-black
										${hoverQueryMode == ImgQueryMode.SEARCH && 'ml-0'} 
										${hoverQueryMode == ImgQueryMode.RESOURCE && 'ml-[20%]'} 
										${hoverQueryMode == ImgQueryMode.GENERATION && 'ml-[40%]'} 
										${hoverQueryMode == ImgQueryMode.CHART_SELECTION && 'ml-[60%]'} 
										${hoverQueryMode == ImgQueryMode.EMBED_CODE && 'ml-[80%]'} 
                                		transition-all ease-in-out`}
								></div>
							</div>
						</div>

						{/* tab divs */}
						<div className='overflow-grow'>
							{selectedQueryMode == ImgQueryMode.RESOURCE &&
								resourceSelectionDiv}
							{selectedQueryMode == ImgQueryMode.SEARCH && imgSearchDiv}
							{selectedQueryMode == ImgQueryMode.GENERATION && imgGenerationDiv}
							{selectedQueryMode == ImgQueryMode.CHART_SELECTION &&
								chartSelectionDiv}
							{selectedQueryMode == ImgQueryMode.EMBED_CODE && EmbedCodeDiv}
						</div>
					</div>

					{selectedQueryMode === ImgQueryMode.CHART_SELECTION &&
						selectedChartType &&
						chartData.length > 0 &&
						chartModalContent !== 'selection' && (
							<div
								className='w-full mx-auto flex justify-center items-center'
								ref={doneButtonRef}
							>
								<BigBlueButton
									isSubmitting={uploading || searching}
									onClick={(e) => {
										e.preventDefault();
										handleDoneClickChart();
									}}
								>
									Add Chart
								</BigBlueButton>
							</div>
						)}
				</Modal>,
				document.body,
			)}

			{/* image itself */}
			{currentStoredEmbedCode ? ( // embed code
				<div dangerouslySetInnerHTML={{ __html: currentStoredEmbedCode }}></div>
			) : (
				<div
					onDrop={handleImageDrop}
					onDragOver={(e) => e.preventDefault()}
					onClick={openModal}
					className={`w-full h-full transition ease-in-out duration-150 relative ${
						selectedImg === ''
							? 'bg-[#E7E9EB]'
							: canEdit
								? 'hover:bg-[#CAD0D3]'
								: ''
					} flex flex-col items-center justify-center`} //${canEdit && !isImgEditMode ? 'cursor-pointer' : ''}
					style={{
						overflow: isImgEditMode ? 'visible' : 'hidden',
						borderRadius: customImageStyle?.borderRadius,
					}}
				>
					{ischartArr &&
					ischartArr[currentContentIndex] &&
					selectedChartType &&
					chartData.length > 0 ? ( // chart
						<div
							className='w-full h-full flex items-center justify-center overflow-hidden '
							// onClick={openModal}
						>
							<DynamicChart
								chartType={selectedChartType}
								chartData={chartData}
								isPrview={!canEdit}
							/>
						</div>
					) : selectedImg === '' || imgLoadError ? ( // updload icon
						// if loading is fail and in editable page we show the error image
						// otherwise(like presentation) show a empty div
						canEdit ? (
							<div
								className='flex flex-col items-center justify-center cursor-pointer'
								// onClick={openModal}
							>
								<svg
									className='w-20 h-20 opacity-50'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<rect x='0' fill='none' width='24' height='24' />
									<g>
										<path d='M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z' />
									</g>
								</svg>
								<div className='text-black opacity-50'>
									{canEdit && 'Click to add image'}
								</div>
							</div>
						) : (
							<div></div>
						)
					) : (
						// image

						<div
							className={`
						${isImgEditMode ? 'rndContainerWithOutBorder' : ''}
						${!isSlide ? 'absolute top-0 left-0 w-full h-full' : ''}
					`}
							style={{
								...layoutElements?.rndContainerCSS,
							}}
							ref={imageRefs[currentContentIndex]}
							onMouseEnter={() => setShowImgButton(true)}
							onMouseLeave={() => setShowImgButton(false)}
							onClick={openModal}
						>
							{!isSlide && isSocialPostTemp1Cover && (
								<div
									className='absolute inset-0'
									style={{
										backgroundImage: `linear-gradient(180deg, ${socialPosts[socialPostsIndex].theme.cover_start}, ${socialPosts[socialPostsIndex].theme.cover_end} 40%)`,
										zIndex: 2,
									}}
								/>
							)}
							<Rnd
								className={`${isImgEditMode ? 'rndContainerWithBorder' : ''}`}
								style={{ ...layoutElements?.rndCSS }}
								size={{
									width:
										imagesDimensions[currentContentIndex]?.width ??
										'max-content',
									//imageRefs[currentContentIndex]?.current?.clientWidth ??
									//imageSize.width ? imageSize.width : ,
									height:
										imagesDimensions[currentContentIndex]?.height ?? 'auto',
									// imageRefs[currentContentIndex]?.current?.clientHeight ??
									//imageSize.height ? imageSize.height : 'auto',
								}}
								position={{
									x: imagesDimensions[currentContentIndex]?.x ?? 0,
									y: imagesDimensions[currentContentIndex]?.y ?? 0,
								}}
								enableResizing={canEdit && isImgEditMode}
								lockAspectRatio={false}
								disableDragging={
									!canEdit || !showImgButton || !isImgEditMode || showModal
								}
								onDragStart={handleDragStart(currentContentIndex)}
								onDragStop={handleDragStop(currentContentIndex)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(currentContentIndex)}
								resizeHandleStyles={{
									topLeft: { ...circle_indicator, left: '-7px' },
									topRight: { ...circle_indicator, right: '-7px' },
									bottomLeft: { ...circle_indicator, left: '-7px' },
									bottomRight: { ...circle_indicator, right: '-7px' },
									top: { ...rectangular_indicator, ...rectangular_horizontal },
									bottom: {
										...rectangular_indicator,
										...rectangular_horizontal,
									},
									left: { ...rectangular_indicator, ...rectangular_vertical },
									right: { ...rectangular_indicator, ...rectangular_vertical },
								}}
							>
								<Image
									unoptimized={imgsrc?.includes('freepik') ? false : true}
									style={{
										//dont use contain, it will make resize feature always resize based on aspect ratio
										objectFit: 'fill',
										height: '100%',
										//width: 'auto',
										width: '100%',
										// borderRadius: customImageStyle?.borderRadius,
										//transform: `scale(${zoomLevel / 100})`,
										//transformOrigin: 'center center',
									}}
									src={imgsrc}
									alt='Image'
									// layout='contain'
									width={960}
									height={540}
									// objectFit='contain'
									className={`transition ease-in-out duration-150 ${
										canEdit
											? isImgEditMode
												? 'brightness-100'
												: 'hover:brightness-50'
											: ''
									}`}
									onError={(e) => {
										console.log('failed to load image', imgsrc);
										setImgLoadError(true);
										updateSingleCallback('shuffle', false, {});
									}}
								/>
							</Rnd>
							{canEdit && showImgButton && (
								<div
									className={`absolute top-2 font-creato-medium ${
										isImgEditMode ? 'left-2' : 'left-4'
									}`}
									style={{ zIndex: 53 }}
								>
									<ToolBar>
										{!isImgEditMode && (
											<button
												onClick={openModal}
												className='flex flex-row items-center justify-center gap-1'
											>
												<MdImageSearch
													style={{
														width: '1.2rem',
														height: '1.2rem',
														color: '#344054',
														fontWeight: 'bold',
													}}
												/>
												{showIconsFunctionText(layoutEntry) ? 'Change' : ''}
											</button>
										)}

										<button
											onClick={toggleImgEditMode}
											className='flex flex-row items-center justify-center gap-1'
										>
											{!isImgEditMode ? (
												<>
													<IoMdCrop
														style={{
															strokeWidth: '0.8',
															width: '1.2rem',
															height: '1.2rem',
															fontWeight: 'bold',
															color: '#344054',
														}}
													/>
													{showIconsFunctionText(layoutEntry) ? 'Resize' : ''}
												</>
											) : (
												<>
													<FaCheck
														style={{
															strokeWidth: '0.8',
															width: '1rem',
															height: '1rem',
															fontWeight: 'bold',
															color: '#344054',
														}}
													/>
													Apply
												</>
											)}
										</button>

										{!isImgEditMode && (
											<>
												<button
													className='flex flex-row items-center justify-center gap-1'
													onClick={() => {
														updateSingleCallback('');
													}}
												>
													<LuTrash2
														style={{
															strokeWidth: '2',
															flex: '1',
															width: '1rem',
															height: '1rem',
															fontWeight: 'bold',
															color: '#344054',
														}}
													/>
													{showIconsFunctionText(layoutEntry) ? 'Delete' : ''}
												</button>
												{project?.additional_images && (
													<button
														className='flex flex-row items-center justify-center gap-1'
														onClick={() => {
															updateSingleCallback('shuffle', false, {});
														}}
													>
														<HiOutlineRefresh
															style={{
																strokeWidth: '2',
																flex: '1',
																width: '1rem',
																height: '1rem',
																fontWeight: 'bold',
																color: '#344054',
															}}
														/>
														{showIconsFunctionText(layoutEntry)
															? 'Shuffle'
															: ''}
													</button>
												)}
											</>
										)}
									</ToolBar>
								</div>
							)}
							{/* {isImgEditMode && canEdit && (
							<ResizeSlider
								zoomLevel={zoomLevel}
								setZoomLevel={setZoomLevel}
								applyZoom={applyZoom}
								onZoomChange={onZoomChange}
							/>
					)} */}
						</div>
					)}
				</div>
			)}
		</>
	);
};
