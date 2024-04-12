'use client';

import React from 'react';
import {
	FaFileImage,
	FaRegFilePdf,
	FaYoutube,
	FaRegFileWord,
} from 'react-icons/fa';
import Image from 'next/image';
import Resource from '@/models/Resource';
import { FiFilePlus, FiGlobe, FiYoutube } from 'react-icons/fi';
import PDFType from '@/public/icons/fileTypes/PDFType.png';
import YoutubeType from '@/public/icons/fileTypes/Youtube.png';
import ImageType from '@/public/icons/fileTypes/ImageType.png';
import GeneralFileType from '@/public/icons/fileTypes/GeneralFileType.png';

export const ResourceIcon: React.FC<{
	resource: Resource;
	contain?: boolean;
}> = ({ resource, contain = false }) => {
	console.log('resource type is ', resource.type);
	if (!resource.thumbnail_url) {
		return <FileIcon fileType={resource.type} />;
	}
	const style = contain
		? { width: '100%', height: '100%', objectFit: 'contain' as 'contain' }
		: {};
	return (
		<Image
			src={resource.thumbnail_url}
			alt={resource.name}
			width={20}
			height={20}
			unoptimized={true}
			style={style}
			onError={(e) => {
				e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
			}}
		/>
	);
};

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
	if (!fileType) {
		return <FiFilePlus style={{ width: '20px', height: '20px' }} />;
	}
	fileType = fileType.toLowerCase();
	switch (fileType) {
		case 'doc':
			// return <FiFilePlus style={{ width: '20px', height: '20px' }} />;
			return (
				<Image
					src={GeneralFileType.src}
					alt={'General File Type'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
		case 'url':
			return (
				<Image
					src={YoutubeType.src}
					alt={'youtube'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
		case 'youtube': // will show thumbnail
			return (
				// <FiYoutube style={{ width: '20px', height: '20px' }} fill='#505050' />
				<Image
					src={YoutubeType.src}
					alt={'youtube'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
		case 'pdf': //unused
			return (
				// <FaRegFilePdf
				// 	style={{ width: '20px', height: '20px' }}
				// 	fill='#505050'
				// />
				<Image
					src={PDFType.src}
					alt={'PDF_File'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
		case 'docx': //unused
			return (
				<FaRegFileWord
					style={{ width: '20px', height: '20px' }}
					fill='#505050'
				/>
			);
		case 'jpg': //unused
		case 'jpeg': //unused
		case 'png':
		case 'gif':
		case 'logo':
		case 'background':
			return (
				// <FaFileImage style={{ width: '20px', height: '20px' }} fill='#505050' />
				<Image
					src={ImageType.src}
					alt={'image_type'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
		default:
			// return <FiFilePlus style={{ width: '20px', height: '20px' }} />;
			return (
				<Image
					src={GeneralFileType.src}
					alt={'General File Type'}
					width={20}
					height={20}
					unoptimized={true}
					style={{ width: '20px', height: '20px' }}
					onError={(e) => {
						e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
					}}
				/>
			);
	}
};

export const ResourceItem: React.FC<Resource> = ({
	id,
	name,
	type,
	thumbnail_url,
}) => {
	// remove text like `.txt` from the end of the file name
	name = name.replace('.txt', '');

	return (
		<div
			key={id}
			className='flex items-center justify-left w-full'
			style={{
				// width: '168px',
				// textOverflow: 'ellipsis',
				overflow: 'hidden',
			}}
		>
			<ResourceIcon resource={{ id, name, type, thumbnail_url }} />
			<div
				className='mx-1 text-sm tracking-tight'
				style={{
					// border: 'solid 2px blue',
					whiteSpace: 'normal',
					textOverflow: 'ellipsis',
					display: 'block',
					overflow: 'hidden',
					fontSize: '14px',
					color: 'var(--colors-text-text-tertiary-600, #475467)',
				}}
			>
				{name}
			</div>
		</div>
	);
};
