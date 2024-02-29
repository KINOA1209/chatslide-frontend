import React from 'react';
import { FaFileImage, FaFilePdf, FaFileWord, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import Resource from '@/models/Resource';

export const ResourceIcon: React.FC<{ resource: Resource }> = ({
	resource,
}) => {
	if (!resource.thumbnail_url) {
		return <FileIcon fileType={resource.type} />;
	}
	return (
		<Image
			src={resource.thumbnail_url}
			alt={resource.name}
			width={40}
			height={40}
			unoptimized={true}
			onError={(e) => {
				e.currentTarget.src = 'https://drlambda.ai/images/logo_no_text.png';
			}}
		/>
	);
};

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
	if (!fileType) {
		return <FaFilePdf size='40px' fill='#505050' />;
	}
	fileType = fileType.toLowerCase();
	switch (fileType) {
		case 'doc':
			return <FaFilePdf size='40px' fill='#505050' />;
		case 'url':
			return <FaYoutube size='40px' fill='#505050' />;
		case 'youtube':
			return <FaYoutube size='40px' fill='#505050' />;
		case 'pdf':
			return <FaFilePdf size='40px' fill='#505050' />;
		case 'docx':
			return <FaFileWord size='40px' fill='#505050' />;
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
		case 'logo':
		case 'background':
			return <FaFileImage size='40px' fill='#505050' />;
		default:
			return <FaFilePdf size='40px' fill='#505050' />;
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
