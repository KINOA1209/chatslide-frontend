import React from 'react';
import ImageList from './ImageList';

const App: React.FC = () => {
  const foldername = localStorage.getItem('foldername') || '';
  const image_files = JSON.parse(localStorage.getItem('image_files') || '');

  const imageUrls = image_files.map((filename: string) => `http://localhost/api/jpg?foldername=${foldername}&filename=${filename}`);

  return (
    <div>
      <ImageList urls={imageUrls} />
    </div>
  );
};

export default App;
