'use client';

import { useState } from 'react';
import MyResourcePageHeader from './MyResourcePageHeader';
import MyFiles from '@/components/file/FileManagement';

export default function FileManagementServer() {
	const [showUploadOptionsMenu, setShowUploadOptionsMenu] = useState(false);
	return (
		<section className='grow flex flex-col'>
			<MyResourcePageHeader
				showUploadOptionsMenu={showUploadOptionsMenu}
				setShowUploadOptionsMenu={setShowUploadOptionsMenu}
			/>
			<MyFiles selectable={false} pageInvoked='resources' />
		</section>
	);
}
