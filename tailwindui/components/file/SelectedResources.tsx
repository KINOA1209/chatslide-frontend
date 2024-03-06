import React, { useState } from 'react';
import { FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import { DeleteIcon, SpinIcon } from '@/app/(feature)/icons';
import { FiSearch } from 'react-icons/fi';
import Resource from '@/models/Resource';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '../paywallModal';
import ResourceService from '@/services/ResourceService';
import { ResourceIcon } from '../ui/ResourceItem';

type SelectedResourcesListProps = {
	selectedResources: Resource[];
	removeResourceAtIndex: (index: number) => void;
};

type ResourceEntryProps = {
	resource: Resource;
	index: number;
	removeResourceAtIndex: (index: number) => void;
};

const ResourceEntry: React.FC<ResourceEntryProps> = ({
	resource,
	index,
	removeResourceAtIndex,
}) => {
	const [runningOCR, setRunningOCR] = useState(false);
	const [doneOCR, setDoneOCR] = useState(false);
	const { isPaidUser, token } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);

	async function handleOCR() {
		if (runningOCR || doneOCR) return;
		if (!isPaidUser) {
			setShowPaywall(true);
			return;
		}
		setRunningOCR(true);
		console.log('OCR');
		const ok = await ResourceService.ocr(resource.id, token);
		setRunningOCR(false);
		if (ok) setDoneOCR(true);
	}

	return (
		<div className='flex items-center bg-white rounded min-h-[50px] justify-between'>
			<PaywallModal
				message='Subscribe to use OCR'
				showModal={showPaywall}
				setShowModal={setShowPaywall}
			/>

			<div className='flex items-center gap-2'>
				<ResourceIcon resource={resource} />
				<div className='flex-wrap'>{resource.name.replace('.txt', '')}</div>
			</div>
			<div className='flex items-center gap-4'>
				{resource.type === 'doc' && (
					<button onClick={handleOCR} disabled={runningOCR}>
						<span className='flex flex-row items-center gap-1'>
							{doneOCR && <FaCheckCircle className='text-green-500' />}
							<FiSearch
								className={`w-[20px] h-[20px] ${runningOCR && 'animate-bounce'}`}
							/>
							OCR
							{!isPaidUser && '🔒'}
						</span>
					</button>
				)}
				<button onClick={() => removeResourceAtIndex(index)}>
					<DeleteIcon />
				</button>
			</div>
		</div>
	);
};

const SelectedResourcesList: React.FC<SelectedResourcesListProps> = ({
	selectedResources,
	removeResourceAtIndex,
}) => {
	return (
		<ul className='flex flex-col gap-4' style={{ overflowY: 'auto' }}>
			{selectedResources.map((resource, index) => (
				<li key={index}>
					<ResourceEntry
						resource={resource}
						index={index}
						removeResourceAtIndex={removeResourceAtIndex}
					/>
				</li>
			))}
		</ul>
	);
};

export default SelectedResourcesList;
