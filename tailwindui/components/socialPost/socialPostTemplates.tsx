//import { ImgModule } from '@/components/socialPost/socialPostIllustrationModule';
import { ImgModule } from '@/components/imgModule';
import { useEffect, useMemo, useState } from 'react';
import cover_png from '@/public/images/template/layout/cover.png';
import withimg_png from '@/public/images/template/socialpost_t1_img.png';
import noimg_png from '@/public/images/template/socialpost_t1_no_img.png';
import '@/components/socialPost/templates.css';
import AuthService from '@/services/AuthService';
import { h5Style } from './Styles';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import Chart from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';
import { useSocialPosts } from '@/hooks/use-socialpost';

interface MainSlideProps {
	subtopic: JSX.Element;
	keywords: JSX.Element[] | JSX.Element;
	content: JSX.Element[];
	original_title: JSX.Element;
	English_title: JSX.Element;
	section_title: JSX.Element;
	brief: JSX.Element;
	imgs: string[];
	icon: JSX.Element;
	illustration: string[];
	title: JSX.Element;
	quote: JSX.Element;
	source: JSX.Element;
	update_callback: (imgs: string[]) => void;
	canEdit: boolean;
	//autoSave: Function;
	border_start?: string;
	border_end?: string;
	cover_start?: string;
	cover_end?: string;
	topic: JSX.Element;
	charts: Chart[];
	ischarts: boolean[];
	images_position: ImagesPosition[];
	handleSlideEdit: Function;
}

const useLocalImgs = (
	imgs: string[],
	imgCount: number,
	update_callback: (imgs: string[]) => void,
) => {
	if (imgs === undefined) {
		imgs = [];
	}

	const initialImgs = useMemo(() => {
		let cleanedImgs = imgs.filter((url) => url !== '');
		if (cleanedImgs.length > imgCount) {
			cleanedImgs = cleanedImgs.slice(0, imgCount);
		} else if (cleanedImgs.length < imgCount) {
			cleanedImgs = [
				...cleanedImgs,
				...new Array(imgCount - cleanedImgs.length).fill(''),
			];
		}
		return cleanedImgs;
	}, [imgs, imgCount]);

	const [localImgs, setLocalImgs] = useState<string[]>(initialImgs);

	useEffect(() => {
		update_callback(localImgs);
	}, [localImgs]);

	const updateImgAtIndex = (index: number) => {
		const updateLocalImgs = (url: string) => {
			const newLocalImgs = [...localImgs];
			newLocalImgs[index] = url;
			setLocalImgs(newLocalImgs);
			//console.log('updateLocalImgs', newLocalImgs)
		};
		return updateLocalImgs;
	};

	return { localImgs, updateImgAtIndex };
};

export const First_page_img_1 = ({
	topic,
	keywords,
	imgs,
	border_start,
	border_end,
	cover_start,
	cover_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	images_position,
	handleSlideEdit,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts()
	return (
		<div
			className='relative gap-[32px] flex justify-center items-center'
			style={{
				width: '100%',
				height: '100%',
				background: 'white',
				border: 'none',
			}}
		>
			<div
				className='absolute top-0 left-0 w-full h-full'
				style={{
					border: '12px solid transparent',
					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
					backgroundOrigin: 'border-box',
					backgroundClip: 'content-box, border-box',
				}}
			>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					canEdit={canEdit}
					currentSlideIndex={socialPostsIndex}
					images_position={images_position}
					isSlide={false}
					isSocialPostTemp1Cover={true}
					//autoSave={autoSave}
					//isTemp1Cover={true}
					//cover_start={cover_start}
					//cover_end={cover_end}
					currentContentIndex={0}
				/>
			</div>
			<div className='w-full h-full mx-[3%] flex flex-col justify-between'>
				<div className='mt-[10%] px-[4%] z-[10]'>{topic}</div>
				<div
					className='mb-[6%] mx-[auto]'
					style={{
						border: '3px solid #FFF',
						borderRadius: '5px',
						background: 'rgba(0, 0, 0, 0.4)',
						backdropFilter: 'blur(24px)',
						maxWidth: '93%',
					}}
				>
					{keywords}
				</div>
			</div>
		</div>
	);
};

export const Col_1_img_0 = ({
	subtopic,
	keywords,
	content,
	icon,
	border_start,
	border_end,
	canEdit,
}: MainSlideProps) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				boxSizing: 'border-box',
				border: 'none',
				position: 'relative',
				backgroundColor: '#444',
				padding: '5% 6% 0% 6%',
				backgroundImage: `url('/images/socialpost/template1_bg.png')`,
			}}
		>
			<div className='w-full h-full flex flex-col justify-between'>
				<div className='w-full'>{keywords}</div>
				<div className='w-full'>{subtopic}</div>
				<div
					className='h-full w-full flex flex-row rounded-lg'
					style={{
						border: 'double 4px transparent',
						borderRadius: '30px',
						backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
						backgroundOrigin: 'border-box',
						backgroundClip: 'content-box, border-box',
					}}
				>
					<div className='mt-[5%]'>{content}</div>
				</div>
				<div className='w-full h-[7%] mt-[2%]'>
					<div className='flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px] text-[white]'>
						{icon}DrLambda
					</div>
				</div>
			</div>
		</div>
	);
};

//casual topic temp1 img layout
export const Col_2_img_1 = ({
	subtopic,
	content,
	keywords,
	imgs,
	icon,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	images_position,
	handleSlideEdit,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);

	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts()
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				boxSizing: 'border-box',
				border: 'none',
				position: 'relative',
				backgroundColor: '#444',
				padding: '5% 6% 0% 6%',
				backgroundImage: `url('/images/socialpost/template1_bg.png')`,
			}}
		>
			<div className='w-full h-full flex flex-col justify-between'>
				<div className='w-full'>{keywords}</div>
				<div className='w-full'>{subtopic}</div>
				<div
					className='h-[73%] w-full flex flex-col rounded-lg'
					style={{
						border: 'double 4px transparent',
						borderRadius: '30px',
						backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_end}, ${border_start})`,
						backgroundOrigin: 'border-box',
						backgroundClip: 'content-box, border-box',
					}}
				>
					<div className='mt-[5%]'>{content}</div>
					<div
						className='w-full h-[auto] rounded-md overflow-hidden'
						style={{
							borderBottomLeftRadius: '26px',
							borderBottomRightRadius: '26px',
						}}
					>
						<ImgModule
							imgsrc={imgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							canEdit={canEdit}
							currentSlideIndex={socialPostsIndex}
							images_position={images_position}
							isSlide={false}
							currentContentIndex={0}
						/>
					</div>
				</div>
				<div className='w-full h-[7%] mt-[2%]'>
					<div className='flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px] text-[white]'>
						{icon}DrLambda
					</div>
				</div>
			</div>
		</div>
	);
};

export const First_page_img_1_template2 = ({
	original_title,
	imgs,
	icon,
	update_callback,
	canEdit,
	charts,
	ischarts,
	images_position,
	handleSlideEdit,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);
	const [username, setUsername] = useState(null);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts()
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const username = await AuthService.getCurrentUserDisplayName();
				setUsername(username);
			} catch (error) {
				console.log('No authenticated user.');
			}
		};

		fetchUser();
	}, []);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				border: 'none',
				position: 'relative',
				backgroundColor: '#CED0CC',
				padding: '22px',
			}}
		>
			<div className='w-full h-full flex flex-col justify-between'>
				<div className='w-full flex flex-col'>
					<div
						className='mx-[1%] px-[2%] mr-[auto] flex items-end'
						style={h5Style}
					>
						<div className='flex justify-start'>by {username}</div>
					</div>
					<div className=''>{original_title}</div>
				</div>
				<div className='w-full h-1/2 flex rounded-md'>
					<ImgModule
						imgsrc={imgs[0]}
						updateSingleCallback={updateImgAtIndex(0)}
						chartArr={charts}
						ischartArr={ischarts}
						handleSlideEdit={handleSlideEdit}
						canEdit={canEdit}
						currentSlideIndex={socialPostsIndex}
						images_position={images_position}
						isSlide={false}
						currentContentIndex={0}
					/>
				</div>
			</div>
		</div>
	);
};

export const img_0_template2 = ({
	section_title,
	original_title,
	brief,
	content,
	icon,
	update_callback,
	canEdit,
}: MainSlideProps) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				boxSizing: 'border-box',
				border: 'none',
				position: 'relative',
				backgroundColor: '#CED0CC',
				backgroundImage: `url('/images/socialpost/template2_bg.png')`,
			}}
		>
			<div
				className='w-full h-[8%]'
				style={{
					borderBottom: '1px solid #E7E5E5',
				}}
			>
				<div
					className='h-full px-[2%] mx-[4%] flex justify-start items-end'
					style={{
						borderLeft: '1px solid #E7E5E5',
						borderRight: '1px solid #E7E5E5',
					}}
				>
					{original_title}
				</div>
			</div>
			<div
				className='w-full h-[12%]'
				style={{
					borderBottom: '1px solid #E7E5E5',
				}}
			>
				<div
					className='h-full px-[2%] py-[1%] mx-[4%] flex justify-start items-end'
					style={{
						borderLeft: '1px solid #E7E5E5',
						borderRight: '1px solid #E7E5E5',
					}}
				>
					{section_title}
				</div>
			</div>
			<div
				className='w-full h-[75%]'
				style={{
					borderBottom: '1px solid #E7E5E5',
				}}
			>
				<div
					className='h-[auto] px-[2%] mx-[4%] flex justify-start flex-col'
					style={{
						borderLeft: '1px solid #E7E5E5',
						borderRight: '1px solid #E7E5E5',
					}}
				>
					{brief}
					{content}
				</div>
			</div>
			<div className='w-full h-[6%]'>
				<div
					className='h-full px-[2%] mx-[4%] flex justify-center items-center'
					style={{
						borderLeft: '1px solid #E7E5E5',
						borderRight: '1px solid #E7E5E5',
					}}
				>
					<div className='flex flex-row justify-center items-center font-creato-medium leading-normal tracking-wide text-[15px]'>
						{icon}DrLambda
					</div>
				</div>
			</div>
		</div>
	);
};

export const First_page_img_1_template3 = ({
	illustration,
	title,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	images_position,
	handleSlideEdit,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		illustration,
		1,
		update_callback,
	);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts()
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				boxSizing: 'border-box',
				border: 'none',
				position: 'relative',
				backgroundColor: 'white',
			}}
		>
			<div
				className='w-full h-full flex flex-col justify-between'
				style={{
					border: '8px solid transparent',
					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
					backgroundOrigin: 'border-box',
					backgroundClip: 'content-box, border-box',
				}}
			>
				<div className='mx-[auto]'>{title}</div>
				<div
					className='w-full h-1/2 flex'
					style={{
						borderRadius: '20px',
					}}
				>
					<ImgModule
						imgsrc={illustration[0]}
						updateSingleCallback={updateImgAtIndex(0)}
						chartArr={charts}
						ischartArr={ischarts}
						handleSlideEdit={handleSlideEdit}
						canEdit={canEdit}
						currentSlideIndex={socialPostsIndex}
						images_position={images_position}
						isSlide={false}
						currentContentIndex={0}
					/>
				</div>
			</div>
		</div>
	);
};

export const img_1_template3 = ({
	illustration,
	quote,
	source,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	images_position,
	handleSlideEdit,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		illustration,
		1,
		update_callback,
	);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts()
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				boxSizing: 'border-box',
				border: 'none',
				position: 'relative',
				backgroundColor: 'white',
			}}
		>
			<div
				className='w-full h-full flex flex-col justify-between'
				style={{
					border: '8px solid transparent',
					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
					backgroundOrigin: 'border-box',
					backgroundClip: 'content-box, border-box',
					fontFamily: 'Cormorant, sans-serif',
				}}
			>
				<div
					className='w-full h-1/2 flex'
					style={{
						borderRadius: '20px',
						overflow: 'hidden',
					}}
				>
					<ImgModule
						imgsrc={illustration[0]}
						updateSingleCallback={updateImgAtIndex(0)}
						chartArr={charts}
						ischartArr={ischarts}
						handleSlideEdit={handleSlideEdit}
						canEdit={canEdit}
						currentSlideIndex={socialPostsIndex}
						images_position={images_position}
						isSlide={false}
						currentContentIndex={0}
					/>
				</div>
				<div id='asterisk_section' className='mx-[auto] text-center'>
					*
				</div>
				<div className='px-[7%]'>{quote}</div>
				<div id='source_section' className='mb-[10%]'>
					{source}
				</div>
			</div>
		</div>
	);
};

export default {
	Col_2_img_1: Col_2_img_1,
	First_page_img_1: First_page_img_1,
	Col_1_img_0: Col_1_img_0,
	First_page_img_1_template2: First_page_img_1_template2,
	img_0_template2: img_0_template2,
	First_page_img_1_template3: First_page_img_1_template3,
	img_1_template3: img_1_template3,
};

export const templateSamples = {
	cover: [
		{
			name: 'First_page_img_1',
			img: cover_png.src,
		},
	],
	main: [
		{
			name: 'Col_1_img_0',
			img: noimg_png.src,
		},
		{
			name: 'Col_2_img_1',
			img: withimg_png.src,
		},
	],
};
