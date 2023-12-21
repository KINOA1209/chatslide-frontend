import React, { useEffect, useState } from 'react';

type ImageListProps = {
	urls: string[];
	token?: string;
	height?: number; // Add new prop here, make it optional.
};

const ImageList: React.FC<ImageListProps> = ({ urls, token, height = 80 }) => {
	// Set default value here
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				};
				const responses = await Promise.all(
					urls.map((url) => fetch(url, { headers })),
				);
				const blobs = await Promise.all(
					responses.map((response) => response.blob()),
				);
				const imageUrls = blobs.map((blob) => URL.createObjectURL(blob));
				setImages(imageUrls);
			} catch (error) {
				console.error('Failed to fetch images:', error);
			}
		};

		fetchImages();

		// Clean up the URLs when the component is unmounted
		return () => {
			images.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [urls]);

	return (
		<div>
			{images.map((imageUrl, index) => (
				<div className={`h-${height} p-4`}>
					{/* apply the height here */}
					<img
						className='object-contain w-full h-full'
						key={index}
						src={imageUrl}
						alt={`Image ${index + 1}`}
					/>
				</div>
			))}
		</div>
	);
};

export default ImageList;
