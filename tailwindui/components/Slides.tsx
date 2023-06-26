import React from 'react';
import ImageList from './ImageList';

type AppProps = {
  height?: number,
};

const App: React.FC<AppProps> = ({ height = 80 }) => {
  const foldername = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('foldername') : '';
  const page_count = typeof sessionStorage !== 'undefined' ? parseInt(sessionStorage.getItem('page_count') || '0', 10) : 0;

  const image_files = Array.from({ length: page_count }, (_, index) => `page${index + 1}.jpg`);

  const imageUrls = image_files.map((filename: string) => `/api/jpg?foldername=${foldername}&filename=${filename}`);
  console.log(image_files)
  return (
    <div>
      <ImageList urls={imageUrls} height={height} />
    </div>
  );
};

export default App;
