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
import PngType from '@/public/icons/fileTypes/PngType.png';
import YoutubeType from '@/public/icons/fileTypes/Youtube.png';
import ImageType from '@/public/icons/fileTypes/ImageType.png';
import GeneralFileType from '@/public/icons/fileTypes/GeneralFileType.png';
import { getLogoUrl } from '@/utils/getHost';

export const ResourceIcon: React.FC<{
	resource: Resource;
	contain?: boolean;
}> = ({ resource, contain = false }) => {
	// console.log('resource.file_extension is', resource.file_extension);
	if (!resource.thumbnail_url) {
		return (
			<div className='p-[10px]'>
				<FileIcon
					fileType={
						resource.file_extension ? resource.file_extension : resource.type
					}
				/>
			</div>
		);
	}
	const style = contain
		? { width: '100%', height: '100%', objectFit: 'contain' as 'contain' }
		: {};
	return (
		<Image
			src={resource.thumbnail_url}
			alt={resource.name}
			width={40}
			height={40}
			unoptimized={true}
			style={style}
			onError={(e) => {
				e.currentTarget.src = getLogoUrl();
			}}
		/>
	);
};

const FileIconStyle = {
	width: '20px',
	height: '20px',
	// objectFit: 'contain' as 'contain',
};

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
	if (!fileType) {
		return <FiFilePlus style={FileIconStyle} />;
	}
	fileType = fileType.toLowerCase();
	// console.log('current file type: ', fileType);
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
					}}
				/>
			);
		case 'docx': //unused
			return <FaRegFileWord style={FileIconStyle} fill='#505050' />;
		case 'jpg': //unused
		case 'jpeg': //unused
		case 'png':
			return (
				// <FaRegFilePdf
				// 	style={{ width: '20px', height: '20px' }}
				// 	fill='#505050'
				// />
				<Image
					src={PngType.src}
					alt={'png_file'}
					width={20}
					height={20}
					unoptimized={true}
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
					}}
				/>
			);
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
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
					style={FileIconStyle}
					onError={(e) => {
						e.currentTarget.src = getLogoUrl();
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
	// Get file extension
	const lastDotIndex = name.lastIndexOf('.');
	const fileExtension =
		lastDotIndex !== -1 ? name.slice(lastDotIndex + 1).toLowerCase() : '';

	// console.log('resource file extension: ', name, fileExtension);
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
			<div style={{ width: '40px', height: '40px' }}>
				{/* Ensure consistent dimensions for the file icon */}
				<ResourceIcon
					resource={{
						id,
						name,
						type,
						thumbnail_url,
						file_extension: fileExtension,
					}}
				/>
			</div>
			{/* <ResourceIcon resource={{ id, name, type, thumbnail_url }} /> */}

			<div
				className='mx-1 text-sm tracking-tight'
				style={{
					// border: 'solid 2px blue',
					flex: 1, // Allow the filename to expand
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
