'use client';

import MyFiles from '@/components/file/FileManagement';

export default function FileManagementServer() {
	// const [showUploadOptionsMenu, setShowUploadOptionsMenu] = useState(false);
	return (
		<section className='grow flex flex-col px-4 pt-4 sm:px-8 sm:pt-8'>
			{/* <MyResourcePageHeader
				showUploadOptionsMenu={showUploadOptionsMenu}
				setShowUploadOptionsMenu={setShowUploadOptionsMenu}
				// localFileUploadButton={}
				// uploadFromCloudButton={}
			/> */}
			<MyFiles selectable={false} pageInvoked='resources' />
		</section>
	);
}
