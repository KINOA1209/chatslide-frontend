'use client';

import React, { useState, useEffect, useRef } from 'react';
import Slide from '../../models/Slide';
import PaywallModal from '../paywallModal';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import {
	FaRegFilePdf,
} from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useProject } from '@/hooks/use-project';
import { sleep } from '../../utils/sleep';
import Modal from '../ui/Modal';
import { GoDownload } from 'react-icons/go';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import SaveScriptsButton from './script/SaveScriptsButton';
import { SpinIcon } from '@/app/(feature)/icons';
import { PlusLabel } from '../ui/GrayLabel';
import { ToastContainer, toast } from 'react-toastify';
import SlideContainer from './SlideContainer';
import { templateDispatch } from './templateDispatch';
import { useSlides } from '@/hooks/use-slides';
import { uneditableTemplateDispatch } from './SlidesHTML';

interface ExportToPdfProps {
	exportSlidesRef: React.RefObject<HTMLDivElement>;
	hasScript?: boolean;
}

const ExportToFile: React.FC<ExportToPdfProps> = ({
	exportSlidesRef,
	hasScript,
}) => {
	const topic =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic')
			: '';
	const [downloading, setDownloading] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const { project } = useProject();
	const [showModal, setShowModal] = useState(false);
	const { slides } = useSlides();

	async function exportToPdfFrontend() {
		const file = await generatePdf(topic || '', exportSlidesRef, slides.length);
		if (file) {
			//save file to session storage
			const fileUrl = URL.createObjectURL(file);
			sessionStorage.setItem('pdfUrl', fileUrl);

			//download file
			const link = document.createElement('a');
			link.href = URL.createObjectURL(file);
			link.download = (topic ? topic : 'drlambda') + '.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		// await generatePDF(exportSlidesRef, exportOptions);
	}

	const handleExport = async (type: string, frontend: boolean) => {
		if (!project) return;

		setShowModal(false);

		setDownloading(true);
		
		let waitTime = 15;
		if (!frontend) {
			waitTime += 15;
		}
		if (type === 'pptx') {
			waitTime += 30;
		}

		toast.info(`Exporting your file, please wait for about ${waitTime}s...`, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});


		if (frontend) {
			await exportToPdfFrontend();
		} else {
			ProjectService.exportToFileBackend(token, project.id, type);

			// wait for 10s for prev file to be deleted
			await sleep(10000);

			const maxAttempts = 30; // try 30 times in 60 seconds
			for (let attempts = 0; attempts < maxAttempts; attempts++) {
				try {
					console.log(`Attempt ${attempts}: Trying to download the file...`);

					const ok = await ProjectService.downloadFile(
						project.foldername,
						`slides.${type}`,
						type,
					);

					if (ok) {
						console.log('Download successful. Stopping attempts.');
						break;
					} else {
						console.log('Download not successful yet.');
					}
					await sleep(2000);
				} catch (error) {
					console.error('Error during file download:', error);
				}
			}
		}
		setDownloading(false);
	};

	return (
		<div>
			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='Upgrade for more ⭐️credits.'
				showReferralLink={true}
			/>

			<ToastContainer />

			<ButtonWithExplanation
				button={
					<button
						onClick={() => setShowModal(!showModal)}
					>
						{!downloading ? <GoDownload
							style={{
								strokeWidth: '1',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								fontWeight: 'bold',
								color: '#2943E9',
							}}
						/> :
							<SpinIcon />}
					</button>
				}
				explanation={'Export'}
			/>

			{/* hidden div for export to pdf */}
				<div className='fixed left-[-9999px] top-[-9999px] -z-1'>
					<div ref={exportSlidesRef}>
						{/* Render all of your slides here. This can be a map of your slides array */}
						{slides.map((slide, index) => (
							<div
								key={`exportToPdfContainer` + index.toString()}
								style={{ pageBreakAfter: 'always' }}
							>
								<SlideContainer
									slide={slide}
									index={index}
									templateDispatch={uneditableTemplateDispatch}
									exportToPdfMode={true}
								/>
							</div>
						))}
					</div>
				</div>

			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Export to PDF / PPTX'
				description='Choose the format and quality of the export.'
			>
				<div className='flex flex-row flex-wrap gap-4'>
					<BigGrayButton
						onClick={() => handleExport('pdf', true)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						bgColor='bg-Gray'
					>
						<FaRegFilePdf />
						<span>PDF (medium)</span>
					</BigGrayButton>

					<BigGrayButton
						onClick={() => handleExport('pdf', false)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						isPaidFeature={true}
						bgColor='bg-Gray'
					>
						<FaRegFilePdf />
						<span className='flex flex-row gap-2 items-center'>PDF (high) {!isPaidUser && <PlusLabel />}</span>
					</BigGrayButton>

					<BigGrayButton
						onClick={() => handleExport('pptx', false)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						isPaidFeature={true}
						bgColor='bg-Gray'
					>
						<RiSlideshow2Fill />
						<span className='flex flex-row gap-2 items-center'>PPTX {!isPaidUser && <PlusLabel />}</span>
					</BigGrayButton>

					{hasScript &&
						<SaveScriptsButton slides={slides} />}
				</div>
			</Modal>
		</div>
	);
};

export default ExportToFile;
