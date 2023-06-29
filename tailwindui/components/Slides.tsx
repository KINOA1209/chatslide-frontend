import React from 'react';
import ImageList from './ImageList';

type AppProps = {
  height?: number,
};

const App: React.FC<AppProps> = ({ height = 80 }) => {
  const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
  const image_files = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('image_files') || '[]') : [];

  const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
  console.log(image_files)
  return (
    <div>
      <ImageList urls={imageUrls} height={height} />
    </div>
  );
};

export default App;
