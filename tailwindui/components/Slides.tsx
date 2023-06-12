import React from 'react';
import ImageList from './ImageList';

type AppProps = {
  height?: number,
};

const App: React.FC<AppProps> = ({ height = 80 }) => {
  const foldername = typeof localStorage !== 'undefined' ? localStorage.getItem('foldername') : '';
  const image_files = typeof localStorage !== 'undefined' ?  JSON.parse(localStorage.getItem('image_files') || '') : [];

  const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);

  return (
    <div>
      <ImageList urls={imageUrls} height={height} />
    </div>
  );
};

export default App;
