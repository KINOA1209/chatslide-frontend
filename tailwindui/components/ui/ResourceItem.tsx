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

export const ResourceIcon: React.FC<{ resource: Resource, contain?: boolean }> = ({
	resource,
	contain = false,
}) => {
	if (!resource.thumbnail_url) {
		return <div className='w-[40px]'>
			<FileIcon fileType={resource.type} />
		</div>;
	}
	const style = contain ? { width: '100%', height: '100%', objectFit: 'contain' as 'contain' } : {};
	return (
		<Image
			src={resource.thumbnail_url}
			alt={resource.name}
			width={40}
			height={40}
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
		return <FiFilePlus size='40px' />;
	}
	fileType = fileType.toLowerCase();
	switch (fileType) {
		case 'doc':
			return <FiFilePlus size='40px' />;
		case 'url':
			return <FaYoutube size='40px' fill='#505050' />;
		case 'youtube': // will show thumbnail
			return <FiYoutube size='40px' fill='#505050' />;
		case 'pdf': //unused
			return <FaRegFilePdf size='40px' fill='#505050' />;
		case 'docx': //unused
			return <FaRegFileWord size='40px' fill='#505050' />;
		case 'jpg': //unused
		case 'jpeg': //unused
		case 'png':
		case 'gif':
		case 'logo':
		case 'background':
			return <FaFileImage size='40px' fill='#505050' />;
		default:
			return <FiFilePlus size='40px' />;
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
			className='h-full flex items-center justify-left w-full py-4 px-2'
		>
			<ResourceIcon resource={{ id, name, type, thumbnail_url }} />
			<div className='text-ellipsis mx-4 overflow-hidden text-[17px] font-creato-medium leading-normal tracking-wide'>
				{name}
			</div>
		</div>
	);
};
