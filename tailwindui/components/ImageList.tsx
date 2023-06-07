import React, { useEffect, useState } from 'react';

const ImageList: React.FC<{ urls: string[] }> = ({ urls }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const blobs = await Promise.all(responses.map(response => response.blob()));
        const imageUrls = blobs.map(blob => URL.createObjectURL(blob));
        setImages(imageUrls);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();

    // Clean up the URLs when the component is unmounted
    return () => {
      images.forEach(url => URL.revokeObjectURL(url));
    };
  }, [urls]);

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageList;
