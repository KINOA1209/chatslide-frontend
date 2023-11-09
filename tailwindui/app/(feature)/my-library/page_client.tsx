'use client'
import MyFiles from '@/components/newFileManagement'
import React, { useState, useEffect} from 'react'
import MyResourcePageHeader from '@/app/(feature)/my-library/MyResourcePageHeader'

export default function FileManagementClient() {
    // State to trigger update
    const [filesUpdated, setFilesUpdated] = useState(false);

    // Callback function to be called after files are uploaded
    const handleFilesUploaded = () => {
        setFilesUpdated(true);
    };

    return (
        <div className= 'h-screen'>
            <MyResourcePageHeader onFilesUploaded={handleFilesUploaded}/>
            <MyFiles selectable={false} filesUpdated={filesUpdated} setFilesUpdated={setFilesUpdated}/>
        </div>
    )
}