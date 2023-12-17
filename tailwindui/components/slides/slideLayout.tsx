import React, { useEffect, useState, useMemo } from 'react';
import { ImgModule } from '@/components/imgModule';
import { MainSlideProps as BaseMainSlideProps } from './slideTemplates';
import coverimg0_png from '@/public/images/template/layout/coverimg0.png';
import coverimg1_png from '@/public/images/template/layout/coverimg1.png';
import col1img0_png from '@/public/images/template/layout/col1img0.png';
import col2img0_png from '@/public/images/template/layout/col2img0.png';
import col3img0_png from '@/public/images/template/layout/col3img0.png';
import col2img1_png from '@/public/images/template/layout/col2img1.png';
import col1img1_png from '@/public/images/template/layout/col1img1.png';
import col3img3_png from '@/public/images/template/layout/col3img3.png';
import col2img2_png from '@/public/images/template/layout/col2img2.png';
import { useLocalImgs } from './slideTemplates';
import { TemplateElements } from './templates_customizable_elements/customizable_elements';
export type LayoutKeys =
	| ''
	| 'Cover_img_0_layout'
	| 'Cover_img_1_layout'
	| 'Col_1_img_0_layout'
	| 'Col_2_img_0_layout'
	| 'Col_3_img_0_layout'
	| 'Col_2_img_1_layout'
	| 'Col_1_img_1_layout'
	| 'Col_2_img_2_layout'
	| 'Col_3_img_3_layout';

// Extend the interface with new fields
interface MainSlideProps extends BaseMainSlideProps {
	brandingColor?: string;
	customizableElements: TemplateElements;
	showContentBulletPoint?: boolean;
}

export const Cover_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	customizableElements,
}: MainSlideProps) => {
	return (
		<>
			<div
				className={`pt-[1rem] px-[2rem] w-full flex flex-col justify-start h-full gap-[2rem]`}
			>
				<div
					className={`${customizableElements.userNameFont} ${customizableElements.userNameFontColor}`}
				>
					{user_name}
				</div>
				<div
					className={`pl-[2rem] basis-0 opacity-50 border
                border-black border-opacity-40 mt-4`}
				></div>
				<div className={` pl-[2rem]`}>{title}</div>
			</div>
		</>
	);
};
export const Cover_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	customizableElements,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);
	return (
		<>
			<div
				className={`pt-[1rem] px-[2rem] w-1/2 flex flex-col justify-start h-full gap-[2rem]`}
			>
				<div
					className={`${customizableElements.userNameFont} ${customizableElements.userNameFontColor}`}
				>
					{user_name}
				</div>
				<div
					className={`pl-[2rem] basis-0 opacity-50 border
                border-black border-opacity-40 mt-4`}
				></div>
				<div className={` pl-[2rem]`}>{title}</div>
			</div>
			<div className={`w-1/2 h-full rounded-md overflow-hidden`}>
				<ImgModule
					imgsrc={localImgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
					autoSave={autoSave}
				/>
			</div>
		</>
	);
};
export const Col_1_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	customizableElements,
}: MainSlideProps) => {
	return (
		<>
			<div className={``}>{topic}</div>
			<div className={``}>{subtopic}</div>
			<div className='h-full w-full flex flex-row overflow-hidden gap-[2.5rem] mt-[1rem] overflow-y-scroll'>
				<div className='flex flex-col gap-[1rem]'>
					<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
					<div className='w-full h-full'>
						{content.map((item, index) => (
							<div className='py-[0.5rem]' key={index}>
								{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
								<ul
									key={index}
									className={`flex flex-row w-full h-full grow pl-4 list-disc `}
								>
									<li>{item}</li>
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
export const Col_2_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	return (
		<>
			<div className={``}>{topic}</div>
			<div className={``}>{subtopic}</div>
			<div className='h-full w-full grid grid-cols-2 gap-[2.5rem] overflow-y-scroll'>
				{content.map((item, index) => (
					<div className='flex flex-col gap-[1rem]' key={index}>
						<div className='mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-creato-medium uppercase leading-10 tracking-widest pt-[2rem]'>
							{index + 1}
						</div>
						<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
						<ul
							key={index}
							className={`flex flex-row w-full h-full grow pl-4 list-disc `}
						>
							<li>{item}</li>
						</ul>
					</div>
				))}
			</div>
		</>
	);
};
export const Col_3_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	return (
		<>
			<div className={``}>{topic}</div>
			<div className={``}>{subtopic}</div>
			<div className='h-full w-full grid grid-cols-3 gap-[2.5rem] overflow-y-scroll'>
				{content.map((item, index) => (
					<div className='flex flex-col gap-[1rem]' key={index}>
						<div className='mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-creato-medium uppercase leading-10 tracking-widest pt-[2rem]'>
							{index + 1}
						</div>
						<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
						<ul
							key={index}
							className={`flex flex-row w-full h-full grow pl-4 list-disc`}
						>
							<li>{item}</li>
						</ul>
					</div>
				))}
			</div>
		</>
	);
};
export const Col_1_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);
	return (
		<>
			{/* area for topic, subtopic and contents */}
			<div className='h-1/3 w-full grid grid-cols-2 gap-[2.5rem]'>
				{/* col1 for topic and subtopic */}
				<div className='flex flex-col gap-[0.5rem]'>
					<div className={``}>{topic}</div>
					<div className={``}>{subtopic}</div>
				</div>
				{/* col 2 for contents */}
				<div className='h-full w-full flex flex-row gap-[2.5rem]'>
					<div className='flex flex-col gap-[1rem]'>
						<div className='opacity-50'></div>
						<div className='w-full h-full'>
							{content.map((item, index) => (
								<div className='py-[0.5rem]' key={index}>
									{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
									<ul
										key={index}
										className={`flex flex-row w-full h-full grow pl-4 list-disc `}
									>
										<li>{item}</li>
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* image section */}
			<div className='mt-[3rem] h-[15rem] grow rounded-md overflow-hidden'>
				<ImgModule
					imgsrc={localImgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
					autoSave={autoSave}
				/>
			</div>
		</>
	);
};
export const Col_2_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		1,
		update_callback,
	);
	return (
		<div className='w-full h-full flex flex-row gap-[2rem] justify-start items-start'>
			<div className={`w-1/2 flex flex-col items-start h-full gap-[0.5rem]`}>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
				{/* contents */}
				<div className='h-full w-full flex flex-row gap-[2.5rem]'>
					<div className='flex flex-col gap-[1rem]'>
						<div className='opacity-50'></div>
						<div className='w-full h-full'>
							{content.map((item, index) => (
								<div className='py-[0.5rem]' key={index}>
									{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
									<ul
										key={index}
										className={`flex flex-row w-full h-full grow pl-4 list-disc`}
									>
										<li>{item}</li>
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className={`w-1/2 h-[90%] rounded-md overflow-hidden items-center`}>
				<ImgModule
					imgsrc={localImgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
					autoSave={autoSave}
				/>
			</div>
		</div>
		// two columns layout (left is text and right is one image)
	);
};
export const Col_2_img_2_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		2,
		update_callback,
	);
	return (
		<>
			<div className='flex flex-col justify-center items-center gap-[0.5rem]'>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
				{/* two columns of images */}
				<div className='mt-[2rem] w-full grid grid-cols-2 gap-[2.5rem] '>
					<div className='h-[11.25rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={localImgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							canEdit={canEdit}
							autoSave={autoSave}
						/>
					</div>
					<div className='h-[11.25rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={localImgs[1]}
							updateSingleCallback={updateImgAtIndex(1)}
							canEdit={canEdit}
							autoSave={autoSave}
						/>
					</div>
				</div>
				{/* two columns of text */}
				<div className='w-full grid grid-cols-2 gap-[2.5rem] mt-[1.5rem]'>
					{content.map((item, index) => (
						<div className='flex flex-col gap-[1rem]' key={index}>
							{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
							<ul
								key={index}
								className={`flex flex-row w-full h-full grow pl-4 list-disc`}
							>
								<li>{item}</li>
							</ul>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export const Col_3_img_3_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	customizableElements,
}: MainSlideProps) => {
	const { localImgs, updateImgAtIndex } = useLocalImgs(
		imgs,
		3,
		update_callback,
	);
	return (
		<>
			<div className='flex flex-col justify-center items-center'>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
				{/* three columns of images */}
				<div className='mt-[2rem] w-full grid grid-cols-3 gap-[2.5rem] '>
					<div className='h-[11.25rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={localImgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							canEdit={canEdit}
							autoSave={autoSave}
						/>
					</div>
					<div className='h-[11.25rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={localImgs[1]}
							updateSingleCallback={updateImgAtIndex(1)}
							canEdit={canEdit}
							autoSave={autoSave}
						/>
					</div>
					<div className='h-[11.25rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={localImgs[2]}
							updateSingleCallback={updateImgAtIndex(2)}
							canEdit={canEdit}
							autoSave={autoSave}
						/>
					</div>
				</div>
				{/* three columns of text */}
				<div className='w-full grid grid-cols-3 gap-[2.5rem] mt-[1.5rem]'>
					{content.map((item, index) => (
						<div className='flex flex-col gap-[1rem]' key={index}>
							{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
							<ul
								key={index}
								className={`flex flex-row w-full h-full grow pl-4 list-disc `}
							>
								<li>{item}</li>
							</ul>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export const layoutOptions = {
	Cover_img_0_layout: Cover_img_0_layout,
	Cover_img_1_layout: Cover_img_1_layout,
	Col_1_img_0_layout: Col_1_img_0_layout,
	Col_2_img_0_layout: Col_2_img_0_layout,
	Col_3_img_0_layout: Col_3_img_0_layout,
	Col_1_img_1_layout: Col_1_img_1_layout,
	Col_2_img_1_layout: Col_2_img_1_layout,
	Col_2_img_2_layout: Col_2_img_2_layout,
	Col_3_img_3_layout: Col_3_img_3_layout,
};

export const availableLayouts = {
	cover: [
		{
			name: 'Cover_img_0_layout' as LayoutKeys,
			img: coverimg0_png.src,
		},
		{
			name: 'Cover_img_1_layout' as LayoutKeys,
			img: coverimg1_png.src,
		},
	],
	main: [
		{
			name: 'Col_1_img_0_layout' as LayoutKeys,
			img: col1img0_png.src,
		},
		{
			name: 'Col_2_img_0_layout' as LayoutKeys,
			img: col2img0_png.src,
		},
		{
			name: 'Col_3_img_0_layout' as LayoutKeys,
			img: col3img0_png.src,
		},
		{
			name: 'Col_2_img_1_layout' as LayoutKeys,
			img: col2img1_png.src,
		},
		{
			name: 'Col_1_img_1_layout' as LayoutKeys,
			img: col1img1_png.src,
		},
		{
			name: 'Col_2_img_2_layout' as LayoutKeys,
			img: col2img2_png.src,
		},
		{
			name: 'Col_3_img_3_layout' as LayoutKeys,
			img: col3img3_png.src,
		},
	],
};
