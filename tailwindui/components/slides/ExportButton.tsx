'use client';

import React, { useState, useEffect, useRef } from 'react';
import Slide from '../../models/Slide';
import PaywallModal from '../paywallModal';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import { FaRegFilePdf } from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useProject } from '@/hooks/use-project';
import { sleep } from '../../utils/sleep';
import Modal from '../ui/Modal';
import { GoDownload } from 'react-icons/go';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import SaveScriptsButton from '../script/SaveScriptsButton';
import { SpinIcon } from '@/app/(feature)/icons';
import { PlusLabel } from '../ui/GrayLabel';
import { ToastContainer, toast } from 'react-toastify';
import SlideContainer from './SlideContainer';
import { templateDispatch } from './templateDispatch';
import { useSlides } from '@/hooks/use-slides';
import { uneditableTemplateDispatch } from '@/components/slides/templateDispatch';
import { FiDownload } from 'react-icons/fi';
interface ExportToPdfProps {
	exportSlidesRef: React.RefObject<HTMLDivElement>;
	hasScript?: boolean;
	showExportToPdfModal: boolean; // Accept showCloneModal as prop
	setShowExportToPdfModal: React.Dispatch<React.SetStateAction<boolean>>;
	width?: string;
	height?: string;
}

const ExportToFile: React.FC<ExportToPdfProps> = ({
	exportSlidesRef,
	hasScript,
	showExportToPdfModal,
	setShowExportToPdfModal,
	width,
	height,
}) => {
	const [downloading, setDownloading] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const { project } = useProject();
	const topic = project?.topic;
	// const [showModal, setShowModal] = useState(false);
	const { slides, saveStatus, SaveStatus } = useSlides();

	useEffect(() => {
		document.addEventListener('download_slide', (e) => {
			setShowExportToPdfModal(true);
		});

		return () =>
			document.removeEventListener('download_slide', (e) => {
				setShowExportToPdfModal(true);
			});
	}, []);

	async function exportToPdfFrontend() {
		const file = await generatePdf(topic || '', exportSlidesRef, slides.length);

		// wait until saveStatus = 'saved'
		while (saveStatus !== SaveStatus.UpToDate) {
			console.log('Waiting for saveStatus to be UpToDate');
			await sleep(200);
		}

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

		setShowExportToPdfModal(false);

		setDownloading(true);

		let waitTime = 10;
		if (!frontend) {
			waitTime += 10;
		}
		if (type === 'pptx') {
			waitTime += 20;
		}

		const toastId = toast.info(
			`Exporting your file, please wait for about ${waitTime}s...`,
			{
				position: 'top-center',
				autoClose: waitTime * 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				draggable: true,
				progress: undefined,
			},
		);

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
						project.foldername ?? '', // Use optional chaining and provide a default value if foldername is undefined
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
		if (toastId) {
			toast.dismiss(toastId);
		}
		const url = `/api/${type}?foldername=${project.foldername}&filename=slides.${type}`;
		const message = (
			<div>
				Download should start now. If you do not see it, click{' '}
				<a href={url} target='_blank' className='text-blue-600'>
					this
				</a>
				.
			</div>
		);
		toast.success(message, {
			position: 'top-center',
			autoClose: waitTime * 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			pauseOnFocusLoss: false,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<div>
			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='You need more ⭐️credits'
				showReferralLink={true}
			/>

			<ToastContainer />

			<ButtonWithExplanation
				button={
					<button
						onClick={() => setShowExportToPdfModal(!showExportToPdfModal)}
					>
						{!downloading ? (
							<GoDownload
								style={{
									strokeWidth: '1',
									flex: '1',
									width: `${width ? width : '24px'}`,
									height: `${height ? height : '24px'}`,
									// fontWeight: 'bold',
									color: 'var(--colors-text-text-secondary-700, #344054)',
									// fontWeight: 'bold',
								}}
							/>
						) : (
							<SpinIcon />
						)}
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
				showModal={showExportToPdfModal}
				setShowModal={setShowExportToPdfModal}
				title='Export to PDF / PPTX'
				description='Choose the format and quality of the export.'
			>
				<div className='flex flex-row flex-wrap gap-4'>
					{/* <BigGrayButton
						onClick={() => handleExport('pdf', true)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						bgColor='bg-Gray'
					>
						<FaRegFilePdf />
						<span>PDF (medium)</span>
					</BigGrayButton> */}

					<BigGrayButton
						onClick={() => handleExport('pdf', false)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						isPaidFeature={true}
						bgColor='bg-Gray'
					>
						<FaRegFilePdf />
						<span className='flex flex-row gap-2 items-center'>
							PDF
							{/* (high) */}
							{!isPaidUser && <PlusLabel />}
						</span>
					</BigGrayButton>

					<BigGrayButton
						onClick={() => handleExport('pptx', false)}
						isSubmitting={downloading}
						isPaidUser={isPaidUser}
						isPaidFeature={true}
						bgColor='bg-Gray'
					>
						<RiSlideshow2Fill />
						<span className='flex flex-row gap-2 items-center'>
							PPTX {!isPaidUser && <PlusLabel />}
						</span>
					</BigGrayButton>

					{hasScript && <SaveScriptsButton slides={slides} />}
				</div>
			</Modal>
		</div>
	);
};

export default ExportToFile;
