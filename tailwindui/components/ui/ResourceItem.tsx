import React from 'react';
import { FaFileImage, FaFilePdf, FaFileWord, FaYoutube } from 'react-icons/fa';
import Resource from '@/models/Resource';

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
	if (!fileType) {
		return <FaFilePdf size='32px' fill='#505050' />;
	}
	fileType = fileType.toLowerCase();
	switch (fileType) {
		case 'doc':
			return <FaFilePdf size='32px' fill='#505050' />;
		case 'url':
			return <FaYoutube size='32px' fill='#505050' />;
		case 'youtube':
			return <FaYoutube size='32px' fill='#505050' />;
		case 'pdf':
			return <FaFilePdf size='32px' fill='#505050' />;
		case 'docx':
			return <FaFileWord size='32px' fill='#505050' />;
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
			return <FaFileImage size='32px' fill='#505050' />;
		default:
			return <FaFilePdf size='32px' fill='#505050' />;
	}
};

const getThumbnail = (thumbnailUrl: string) => {
	console.log(thumbnailUrl);
	return <img src={thumbnailUrl} alt='Thumbnail' className='object-contain' />;
};

export const ResourceItem: React.FC<Resource> = ({
	id,
	name,
	type,
	thumbnail_url,
}) => {
	return (
		<div
			key={id}
			className='h-full flex items-center justify-left w-full py-4 px-2'
		>
			<div className='min-w-[32px] max-w-[32px]'>
				{thumbnail_url ? (
					getThumbnail(thumbnail_url)
				) : (
					<FileIcon fileType={type} />
				)}
			</div>
			<div className='text-ellipsis mx-4 overflow-hidden text-[17px] font-creato-medium leading-normal tracking-wide'>
				{name}
			</div>
		</div>
	);
};
