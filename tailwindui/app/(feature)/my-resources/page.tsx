'use client';

import { useState } from 'react';
import MyResourcePageHeader from './MyResourcePageHeader';
import MyFiles from '@/components/file/FileManagement';

export default function FileManagementServer() {
	return (
		<section className='grow flex flex-col'>
			<MyResourcePageHeader />
			<MyFiles selectable={false} />
		</section>
	);
}
