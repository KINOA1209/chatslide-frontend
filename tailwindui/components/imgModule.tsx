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
import { FiUploadCloud } from 'react-icons/fi';

import Position from '@/types/Position';
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
import { InputBox, NewInputBox } from './ui/InputBox';
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
import IFrameEmbed, { executeScripts } from './utils/IFrameEmbed';
import useJSScript from '@/hooks/use-JSScript';
import { LayoutKeys } from './slides/slideLayout';
import { Media } from '@/models/Slide';
import YoutubeEmbed from './utils/YoutubeEmbed';
import { SocialPostLayoutKeys } from './socialPost/socialPostLayouts';
import { IoMdSearch } from 'react-icons/io';
import { BsStars } from 'react-icons/bs';
import { PiFiles } from 'react-icons/pi';
import { MdOutlineAddChart } from 'react-icons/md';
import { SlSocialYoutube } from 'react-icons/sl';
import { CiSearch } from 'react-icons/ci';
// import material tailwind component
// import { Select, Option } from '@/components/ui/MaterialTailwindComponents';

import { Select, Option } from '@material-tailwind/react';

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
	image_positions: Position[];
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
	media_types?: Media[];
	media_type?: Media;
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
	{
		value: 'icon',
		text: 'Icon',
	},
];

const getImageLicenseExplanation = (license: string) => {
	switch (license) {
		case 'all':
			return ' (Images from all websites, some may require licenses)';
		case 'illustration':
			return ' (Cartoon style illustration images from Freepik)';
		case 'stock':
			return ' (High quality stock photos from Unsplash)';
		case 'creative':
			return ' (Images from all websites, free to use)';
		case 'giphy':
			return ' (Funny animations from Giphy.	Gif may not be animated if you export to PDF / PPTX, or create video)';
		case 'icon':
			return ' (Icons from Icons8)';
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
	image_positions,
	layoutElements,
	customImageStyle,
	setImgHigherZIndex,
	columnIndex = 0,
	isSlide = true,
	isSocialPostTemp1Cover = false,
	defaultObjectFit = 'contain',
	embed_code,
	embed_code_single,
	media_types,
	media_type,
}: ImgModuleProp) => {
	// Replace width and height attributes with '100%'

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

	useEffect(() => {
		if (imgsrc !== '') {
			setSelectedImg(imgsrc);
		}
	}, [imgsrc]);

	const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (sourceImage) {
			const droppedImageUrl = sourceImage;
			// Update the image source with the dropped image URL

			let updated_media_typesArr = [
				...(media_types || ['image', 'image', 'image']),
			];
			updated_media_typesArr[currentContentIndex] = 'image';

			let updated_ischartArr = [...ischartArr];
			updated_ischartArr[currentContentIndex] = false;

			handleSlideEdit(
				[updated_media_typesArr, updated_ischartArr],
				currentSlideIndex,
				['media_types', 'is_chart'],
			);

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
		if (url.includes('freepik') || url.includes('icons8')) {
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
		let updated_media_typesArr = [
			...(media_types || ['image', 'image', 'image']),
		];
		updated_media_typesArr[currentContentIndex] = 'image';

		let updated_ischartArr = [...ischartArr];
		updated_ischartArr[currentContentIndex] = false;
		handleSlideEdit(
			[updated_media_typesArr, updated_ischartArr],
			currentSlideIndex,
			['media_types', 'is_chart'],
		);

		updateSingleCallback(
			decodeImageUrl((e.target as HTMLImageElement).getAttribute('src')),
			false,
			{},
		);

		// close modal
		closeModal();
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
			<div
				className='w-full h-full flex flex-col'
				style={{ padding: '10px', gap: '16px' }}
			>
				{/* <div className='w-full h-full overflow-y-auto p-1'> */}
				{/* upload prompting area */}
				<div
					onClick={handleClick}
					className='upload-image hover:bg-[#CAD0D3] cursor-pointer'
					style={{
						display: 'flex',
						padding: 'var(--spacing-xl, 16px) var(--spacing-3xl, 24px)',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 'var(--spacing-xs, 4px)',
						alignSelf: 'stretch',
						borderRadius: 'var(--radius-xl, 12px)',
						border: '1px solid var(--Colors-Border-border-secondary, #EAECF0)',
						background: 'var(--Colors-Background-bg-primary, #FFF)',
					}}
				>
					<input
						type='file'
						id='file-upload'
						ref={inputFileRef}
						onChange={handleFileChange}
						style={{ display: 'none' }}
					/>
					{/* icon position */}
					<div
						className='upload-icon-box'
						style={{
							borderRadius: 'var(--radius-md, 8px)',
							border:
								'1px solid var(--Component-colors-Components-Icons-Featured-icons-Modern-featured-icon-modern-border, #EAECF0)',
							boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
							display: 'flex',
							width: '40px',
							padding: '10px',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<FiUploadCloud style={{ color: '#344054' }} />
					</div>

					{/* upload prompt text */}
					<div
						className='upload-prompt-text-area'
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '4px',
						}}
					>
						<span
							style={{
								color:
									'var(--Component-colors-Components-Buttons-Tertiary-color-button-tertiary-color-fg, #3538CD)',
								fontFamily: 'Inter Medium',
								fontSize: '14px',
								fontStyle: 'normal',
								fontWeight: '600',
								lineHeight: '20px',
							}}
						>
							Click to upload
						</span>
						<span
							style={{
								color: 'var(--colors-text-text-tertiary-600, #475467)',
								fontSize: '12px',
								fontStyle: 'normal',
								fontWeight: '400',
								lineHeight: '18px',
							}}
						>
							SVG, PNG, JPG or GIF (max. 800x400px)
						</span>
					</div>
				</div>

				<div className='w-full h-fit grid grid-cols-2 gap-1 md:gap-2'>
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
				{/* </div> */}
			</div>
		</div>
	);

	const imgSearchDiv = (
		<div
			className='w-full h-full flex flex-col gap-[16px]'
			style={{ padding: '10px' }}
		>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (imageLicense == 'illustration') {
						await handleIllustrationSearchSubmit(e);
					} else {
						await handleImageSearchSubmit(e);
					}
				}}
				className='w-full flex flex-col gap-[16px]'
			>
				{/* search box input area */}
				<div>
					<span
						style={{
							color: 'var(--colors-text-text-secondary-700, #344054)',
							fontSize: '14px',
							fontStyle: 'normal',
							fontWeight: '500',
							lineHeight: '20px',
							marginBottom: '8px',
						}}
					>
						Search
					</span>
					<InputBox>
						{searching ? (
							<SpinIcon />
						) : (
							<button type='submit'>
								{/* <FaSearch className='h-[20px] w-[20px] text-gray-400' /> */}
								<CiSearch className='h-[20px] w-[20px] text-gray-400'></CiSearch>
							</button>
						)}
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
					</InputBox>

					<WordSelector text={getSearchText()} setQuery={setKeyword} />
				</div>
				{/* Image type selection */}
				<div className='w-full'>
					<span
						style={{
							color: 'var(--colors-text-text-secondary-700, #344054)',
							fontSize: '14px',
							fontStyle: 'normal',
							fontWeight: '500',
							lineHeight: '20px',
							marginBottom: '8px',
						}}
					>
						Image Type
					</span>
					<RadioButton
						options={imageLicenseOptions}
						selectedValue={imageLicense}
						setSelectedValue={setImageLicense}
						name='imageLicense'
						cols={3}
					/>

					<Explanation>{getImageLicenseExplanation(imageLicense)}</Explanation>
					{/* <Select
						// label='Select Image License'
						value={imageLicense}
						onChange={(val) => setImageLicense(val || 'all')} // Ensure val is a string
						// onChange={(val) => console.log('change option')} // Ensure val is a string
					>
						{imageLicenseOptions.map((option) => (
							<Option key={option.value} value={option.value}>
								<span className='font-bold'>{option.text}</span>{' '}
								<span className='font-normal'>
									{getImageLicenseExplanation(option.value)}
								</span>
							</Option>
						))}
					</Select> */}
				</div>
			</form>
			{/* Search result images display area */}
			<div className='search-result-images w-full h-[350px] overflow-y-scroll p-1'>
				<div className='w-full h-fit grid grid-cols-2 gap-1 md:gap-2'>
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
										unoptimized={
											!url?.includes('freepik') && !url.includes('icons8')
										}
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
										unoptimized={
											url?.includes('freepik') || url?.includes('icons8')
												? false
												: true
										}
										alt='selected image'
										layout='responsive'
										objectFit='contain' // This will keep the aspect ratio and make sure the image fits within the container
										className='w-full h-full' // Additional CSS classes if needed
										width={100}
										height={100}
										onError={(e) =>
											setSearchResult(searchResult.filter((img) => img !== url))
										}
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
		<div
			className='w-full h-full flex flex-col'
			style={{ padding: '10px', gap: '8px' }}
		>
			{/* input area */}
			<form onSubmit={handleImageGenerationSubmit} className='w-full'>
				<span
					style={{
						color: 'var(--colors-text-text-secondary-700, #344054)',
						fontSize: '14px',
						fontStyle: 'normal',
						fontWeight: '500',
						lineHeight: '20px',
						marginBottom: '8px',
					}}
				>
					Generate by keywords
				</span>

				{/* <Explanation>
					Highlight the keywords you want to use for search:
				</Explanation> */}

				{/* <Explanation>Or directly enter the keywords below:</Explanation> */}
				<InputBox>
					{searching ? (
						<SpinIcon />
					) : (
						<button type='submit'>
							{/* <FaSearch className='h-[24px] w-[24px] text-gray-400' /> */}
							<CiSearch className='h-[20px] w-[20px] text-gray-400'></CiSearch>
						</button>
					)}
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
				</InputBox>
				<WordSelector text={getSearchText()} setQuery={setKeyword} />
			</form>
			{/* search result display area */}
			<div className='w-full h-full overflow-y-auto p-1'>
				<div className='w-full h-fit grid grid-cols-2 gap-1 md:gap-2'>
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

			let updated_media_typesArr = [
				...(media_types || ['image', 'image', 'image']),
			];
			updated_media_typesArr[currentContentIndex] = 'chart';
			//autosave ischart
			let updated_ischartArr = [...ischartArr];
			updated_ischartArr[currentContentIndex] = true;
			handleSlideEdit(
				[updated_chartArr, updated_ischartArr, updated_media_typesArr],
				currentSlideIndex,
				['chart', 'is_chart', 'media_types'],
			);
			// setMediaType((prevState) => ({ ...prevState, chart: true }));
			closeModal();
		} else {
			closeModal();
		}
	};

	// const iFrameDimension = (layout: LayoutKeys) => {
	// 	if (layout === 'Cover_img_1_layout' || layout === 'Col_2_img_1_layout') {
	// 		return 'width="450px" height="500px"';
	// 	} else if (layout === 'Full_img_only_layout') {
	// 		return 'width="940px" height="520px"';
	// 	} else if (layout === 'Col_2_img_2_layout') {
	// 		return 'width="400px" height="150px"';
	// 	} else if (layout === 'Col_1_img_1_layout') {
	// 		return 'width="940px" height="150px"';
	// 	} else {
	// 		return 'width="300px" height="100px"';
	// 	}
	// };

	// Regular expression to find width and height attributes
	// const regex = /width="(\d+)" height="(\d+)"/;

	// const modified_embed_code_single =
	// 	embed_code_single &&
	// 	embed_code_single.replace(
	// 		regex,
	// 		iFrameDimension(slides[slideIndex].layout),
	// 	);

	// const [mediaType, setMediaType] = useState({
	// 	image: false,
	// 	embed: true,
	// 	chart: false,
	// });
	// handle all embed code related
	const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState<string>(
		embed_code_single || '',
	);
	// const [currentStoredEmbedCode, setCurrentStoredEmbedCode] = useState<string>(
	// 	modified_embed_code_single || '',
	// );
	const [inputValue, setInputValue] = useState(currentYoutubeUrl);
	const handleDoneEmbeddingCode = () => {
		if (selectedQueryMode === ImgQueryMode.EMBED_CODE && embed_code) {
			let updated_embed_code = [...embed_code];
			updated_embed_code[currentContentIndex] = currentYoutubeUrl || '';

			let updated_media_typesArr = [
				...(media_types || ['image', 'image', 'image']),
			];
			let updated_ischartArr = [...ischartArr];
			updated_ischartArr[currentContentIndex] = false;
			updated_media_typesArr[currentContentIndex] = 'embed';
			// console.log('currentStoredEmbedCode', currentStoredEmbedCode);
			handleSlideEdit(
				[updated_embed_code, updated_media_typesArr, updated_ischartArr],
				currentSlideIndex,
				['embed_code', 'media_types', 'is_chart'],
			);
			// setMediaType((prevState) => ({ ...prevState, embed: true }));
			closeModal();
		} else {
			closeModal();
		}
	};

	const handleConfirmClick = () => {
		if (
			// inputValue.startsWith('<iframe') ||
			// (inputValue.startsWith('<blockquote') &&
			inputValue.includes('youtube.com')
		) {
			// setEmbedCode(inputValue);
			// const modified_embed_code_input =
			// 	inputValue &&
			// 	inputValue.replace(regex, iFrameDimension(slides[slideIndex].layout));
			// setCurrentStoredEmbedCode(modified_embed_code_input); // Update currentStoredEmbedCode in parent
			setCurrentYoutubeUrl(inputValue);
		} else {
			// setErrorMessage(
			// 	'Please paste embed code that starts with <iframe> or <blockquote>.',
			// );
			toast.error(
				// 'Please paste youtube embed code that starts with <iframe> or <blockquote>.',
				'Please paste in youtube video link',
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

	const isConfirmDisabled = inputValue.trim() === '';

	// useEffect(() => {
	// 	executeScripts(currentStoredEmbedCode);
	// }, [currentStoredEmbedCode]);

	const EmbedCodeDiv = (
		<div className='flex flex-col gap-y-2 p-[10px]'>
			<ToastContainer />

			<Explanation>Only Youtube video link is supported for now.</Explanation>

			{/* <div
				className='link-input-and-add-button'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			> */}
			<NewInputBox
				placeholder='Paste YouTube video link here'
				value={inputValue}
				onChange={setInputValue}
				maxLength={undefined}
				rows={1}
				textarea
			/>
			{/* add link button */}
			<div className='w-full mx-auto flex justify-center items-center'>
				<BigBlueButton
					// isSubmitting={uploading || searching}
					onClick={handleConfirmClick}
					disabled={isConfirmDisabled}
					customizeStyle={{
						cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
						// marginBottom: '6px',
					}}
				>
					Preview
				</BigBlueButton>
			</div>
			{/* </div> */}

			<div className='w-full mx-auto flex flex-col justify-center items-center'>
				{/* <h1>Embedding Example</h1> */}
				{/* <IFrameEmbed
					currentStoredEmbedCode={currentStoredEmbedCode}
					// setCurrentStoredEmbedCode={handleUpdateStoredEmbedCode}
					// handleConfirmClick={handleConfirmClick}
				/> */}
				<YoutubeEmbed
					layout={isSlide ? slides[slideIndex]?.layout : ''}
					link={currentYoutubeUrl}
					canEdit={canEdit}
				></YoutubeEmbed>
				{selectedQueryMode === ImgQueryMode.EMBED_CODE && currentYoutubeUrl && (
					<BigBlueButton
						isSubmitting={uploading || searching}
						onClick={(e) => {
							e.preventDefault();
							handleDoneEmbeddingCode();
						}}
						customizeStyle={{ marginTop: '6px' }}
					>
						Add
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
			| Position
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
		event.preventDefault();
		if (isImgEditMode) {
			handleSave();
		}
		// prevent enlarge image on preview section
		if (canEdit) {
			setIsImgEditMode(!isImgEditMode);
			setImgHigherZIndex && setImgHigherZIndex(!isImgEditMode);
		}
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

	//reposition to default if images changed
	useEffect(() => {
		// make sure we got non-zero value for parentDimension
		if (
			isParentDimension &&
			image_positions[currentContentIndex] &&
			Object.keys(image_positions[currentContentIndex]).length == 0
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
		const initializedData = initializeImageData(image_positions, imageRefs);
		setImagesDimensions(initializedData);
	}, [image_positions]);

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

	type CombinedLayoutKeys = LayoutKeys | SocialPostLayoutKeys;
	const showIconsFunctionText = (layout: CombinedLayoutKeys) => {
		// console.log(
		// 	'passed in layout test',
		// 	layout,
		// 	layout === 'First_page_img_1_reading_notes',
		// );
		if (
			layout === 'Col_2_img_2_layout' ||
			layout === 'Col_3_img_3_layout' ||
			layout === 'Col_2_img_1_left_casual_topic' ||
			layout === 'Col_2_img_1_right_casual_topic' ||
			layout === 'Col_1_img_1_reading_notes' ||
			layout === 'First_page_img_1_reading_notes' ||
			layout === 'First_page_img_1_casual_topic'
		) {
			return false;
		} else {
			return true;
		}
	};

	let layoutEntry = isSlide
		? slides[slideIndex]?.layout
		: // : socialPosts[socialPostsIndex]?.template;
			socialPosts[socialPostsIndex]?.layout;
	// Ensure layoutEntry is always a string
	layoutEntry = Array.isArray(layoutEntry) ? layoutEntry[0] : layoutEntry;

	// console.log('selected img url', selectedImg);
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [isMovement, setIsMovement] = useState<boolean>(false);

	return (
		<>
			{/* select image modal */}
			{createPortal(
				<Modal showModal={showModal} setShowModal={setShowModal} title='Media'>
					{/* <div className='flex grow h-[400px] w-full sm:w-[600px] flex-col overflow-auto'> */}
					<div
						className='grow h-[400px] w-full sm:w-[600px] grid grid-cols-4 overflow-auto'
						style={{ borderTop: '1px solid #E7E9EB' }}
					>
						{/* the different choices tab */}
						<div
							className='tab-choices w-full flex flex-col col-span-1'
							ref={typeRef}
							style={{
								borderRight: '1px solid #E7E9EB',
								justifyContent: 'flex-start',
								alignItems: 'flex-start',
								padding: '10px',
							}}
						>
							{/* <div className='w-full grid grid-cols-5'> */}
							{/* <div className='w-full flex flex-col'> */}
							<span
								style={{
									color: '#919DAA',
									fontSize: '12px',
									fontStyle: 'normal',
									fontWeight: '700',
									lineHeight: '20px',
									marginBottom: '8px',
								}}
							>
								Image
							</span>
							<button
								className='cursor-pointer whitespace-nowrap flex flex-row justify-start w-full items-center gap-[4px] hover:bg-[#F4F4F4] '
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
								style={{
									borderRadius: 'var(--radius-sm, 6px)',
									padding: 'var(--spacing-md, 8px) var(--spacing-lg, 12px)',
									// gap: '16px',
								}}
							>
								<IoMdSearch style={{ width: '24px', height: '24px' }} />
								<span
									style={{
										color: 'var(--colors-text-text-secondary-700, #344054)',
										fontSize: '14px',
										fontStyle: 'normal',
										fontWeight: '700',
										lineHeight: '22px',
									}}
								>
									Search
								</span>
							</button>
							<button
								className='cursor-pointer whitespace-nowrap flex flex-row justify-start w-full items-center gap-[4px] hover:bg-[#F4F4F4] '
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
								style={{
									borderRadius: 'var(--radius-sm, 6px)',
									padding: 'var(--spacing-md, 8px) var(--spacing-lg, 12px)',
									// gap: '16px',
								}}
							>
								<BsStars style={{ width: '24px', height: '24px' }} />
								<span
									style={{
										color: 'var(--colors-text-text-secondary-700, #344054)',
										fontSize: '14px',
										fontStyle: 'normal',
										fontWeight: '700',
										lineHeight: '22px',
									}}
								>
									AI Generate
								</span>
							</button>
							<button
								className='cursor-pointer whitespace-nowrap flex flex-row justify-start w-full items-center gap-[4px] hover:bg-[#F4F4F4] '
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
								style={{
									borderRadius: 'var(--radius-sm, 6px)',
									padding: 'var(--spacing-md, 8px) var(--spacing-lg, 12px)',
									// gap: '16px',
								}}
							>
								<PiFiles style={{ width: '24px', height: '24px' }} />
								<span
									style={{
										color: 'var(--colors-text-text-secondary-700, #344054)',
										fontSize: '14px',
										fontStyle: 'normal',
										fontWeight: '700',
										lineHeight: '22px',
									}}
								>
									My Uploads
								</span>
							</button>

							{isSlide && (
								<>
									<span
										style={{
											color: '#919DAA',
											fontSize: '12px',
											fontStyle: 'normal',
											fontWeight: '700',
											lineHeight: '20px',
											marginBottom: '8px',
										}}
									>
										Graph
									</span>
									<button
										className='cursor-pointer whitespace-nowrap flex flex-row justify-start w-full items-center gap-[4px] hover:bg-[#F4F4F4] '
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
										style={{
											borderRadius: 'var(--radius-sm, 6px)',
											padding: 'var(--spacing-md, 8px) var(--spacing-lg, 12px)',
											// gap: '16px',
										}}
									>
										<MdOutlineAddChart
											style={{ width: '24px', height: '24px' }}
										/>

										<span
											style={{
												color: 'var(--colors-text-text-secondary-700, #344054)',
												fontSize: '14px',
												fontStyle: 'normal',
												fontWeight: '700',
												lineHeight: '22px',
											}}
										>
											Chart
										</span>
									</button>
								</>
							)}

							{isSlide && (
								<>
									<span
										style={{
											color: '#919DAA',
											fontSize: '12px',
											fontStyle: 'normal',
											fontWeight: '700',
											lineHeight: '20px',
											marginBottom: '8px',
										}}
									>
										Embed
									</span>
									<button
										className='cursor-pointer whitespace-nowrap flex flex-row justify-start w-full items-center gap-[4px] hover:bg-[#F4F4F4] '
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
										style={{
											borderRadius: 'var(--radius-sm, 6px)',
											padding: 'var(--spacing-md, 8px) var(--spacing-lg, 12px)',
											// gap: '16px',
										}}
									>
										<SlSocialYoutube
											style={{ width: '24px', height: '24px' }}
										/>
										<span
											style={{
												color: 'var(--colors-text-text-secondary-700, #344054)',
												fontSize: '14px',
												fontStyle: 'normal',
												fontWeight: '700',
												lineHeight: '22px',
											}}
										>
											Youtube
										</span>
									</button>
								</>
							)}

							{/* </div> */}
							{/* sliding animation */}
							{/* <div className='w-full bg-slate-200 mb-2'>
								<div
									className={`w-1/5 h-[2px] bg-black
										${hoverQueryMode == ImgQueryMode.SEARCH && 'ml-0'} 
										${hoverQueryMode == ImgQueryMode.RESOURCE && 'ml-[20%]'} 
										${hoverQueryMode == ImgQueryMode.GENERATION && 'ml-[40%]'} 
										${hoverQueryMode == ImgQueryMode.CHART_SELECTION && 'ml-[60%]'} 
										${hoverQueryMode == ImgQueryMode.EMBED_CODE && 'ml-[80%]'} 
                                		transition-all ease-in-out`}
								></div>
							</div> */}
						</div>

						{/* tab divs contents */}
						<div className='tab-divs-contents col-span-3'>
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
			{
				<div
					onDrop={handleImageDrop}
					onDragOver={(e) => e.preventDefault()}
					// onClick={openModal}
					onMouseDown={(e) => {
						setIsClicked(true);
					}}
					onMouseMove={() => {
						setIsMovement(isClicked);
					}}
					onMouseUp={() => {
						if (!isMovement) {
							openModal();
						}
						setIsClicked(false);
						setIsMovement(false);
					}}
					className={`w-full h-full transition ease-in-out duration-150 relative ${
						canEdit ? 'hover:bg-[#CAD0D3] cursor-pointer' : ''
					} flex flex-col items-center justify-center`} //${canEdit && !isImgEditMode ? 'cursor-pointer' : ''}
					style={{
						overflow: isImgEditMode ? 'visible' : 'hidden',
						borderRadius: customImageStyle?.borderRadius,
					}}
				>
					{ischartArr &&
					ischartArr[currentContentIndex] &&
					media_types &&
					media_types[currentContentIndex] === 'chart' &&
					selectedChartType &&
					chartData.length > 0 ? ( // chart
						<div
							className='w-full h-full flex items-center justify-center overflow-hidden '
							// onClick={openModal}
						>
							<DynamicChart
								chartType={selectedChartType}
								chartData={chartData}
								isPreview={!canEdit}
							/>
						</div>
					) : isSlide &&
					  embed_code &&
					  embed_code[currentContentIndex] &&
					  media_types &&
					  media_types[currentContentIndex] === 'embed' ? ( // embed code
						<div
							// onMouseEnter={() => setShowImgButton(true)}
							// onMouseLeave={() => setShowImgButton(false)}
							onClick={() => openModal()}
						>
							{/* <div
								dangerouslySetInnerHTML={{
									__html: embed_code[currentContentIndex],
								}}
							></div> */}
							<YoutubeEmbed
								link={currentYoutubeUrl}
								// layout={isSlide ? slides[slideIndex].layout : ''}
								layout={isSlide ? slides[slideIndex]?.layout : ''}
								canEdit={canEdit}
							></YoutubeEmbed>
						</div>
					) : !imgsrc || imgLoadError ? ( // upload icon
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
							// onClick={openModal}
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
									unoptimized={
										imgsrc?.includes('freepik') || imgsrc?.includes('icons8')
											? false
											: true
									}
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
										if (imgsrc)
											// if we have a image url, but it is not valid
											updateSingleCallback('shuffle', false, {});
									}}
								/>
							</Rnd>
							{canEdit && showImgButton && (
								<div
									className={`absolute ${
										layoutEntry === 'Col_1_img_1_reading_notes'
											? ' top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'
											: isImgEditMode
												? 'top-2 left-2'
												: 'top-2 left-4'
									}`}
									style={{ zIndex: 100 }}
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
												<span>
													{showIconsFunctionText(layoutEntry) ? 'Change' : ''}
												</span>
											</button>
										)}

										<button
											onClick={toggleImgEditMode}
											onMouseDown={(e) => {
												e.stopPropagation();
											}}
											onMouseUp={(e) => {
												e.stopPropagation();
											}}
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
													<span>
														{showIconsFunctionText(layoutEntry) ? 'Resize' : ''}
													</span>
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
													onClick={(e) => {
														updateSingleCallback('');
														e.stopPropagation();
														e.preventDefault();
													}}
													onMouseDown={(e) => {
														e.stopPropagation();
													}}
													onMouseUp={(e) => {
														e.stopPropagation();
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
													<span>
														{showIconsFunctionText(layoutEntry) ? 'Delete' : ''}
													</span>
												</button>
												{project?.additional_images && (
													<button
														className='flex flex-row items-center justify-center gap-1'
														onClick={(e) => {
															updateSingleCallback('shuffle', false, {});
															e.preventDefault();
															e.stopPropagation();
														}}
														onMouseDown={(e) => {
															e.stopPropagation();
														}}
														onMouseUp={(e) => {
															e.stopPropagation();
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
														<span>
															{showIconsFunctionText(layoutEntry)
																? 'Shuffle'
																: ''}
														</span>
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
			}
		</>
	);
};
