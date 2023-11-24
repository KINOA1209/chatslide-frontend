'use client'

import { useState } from 'react';
import MyResourcePageHeader from './MyResourcePageHeader';
import MyFiles from '@/components/newFileManagement';


export default function FileManagementServer() {

  // State to trigger update
  const [filesUpdated, setFilesUpdated] = useState(false);

  // Callback function to be called after files are uploaded
  const handleFilesUploaded = () => {
    setFilesUpdated(true);
  };

  return (
    <section className='grow flex flex-col'>
      <MyResourcePageHeader onFilesUploaded={handleFilesUploaded} />
      <MyFiles selectable={false} filesUpdated={filesUpdated} setFilesUpdated={setFilesUpdated} />
    </section>
  )
}
