'use client';

import React, { useState, useEffect, useRef } from 'react';
import Slide from '../../models/Slide';
import PaywallModal from '../paywallModal';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import { FaImage, FaRegFilePdf, FaRegFilePowerpoint } from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import { RiAppleFill, RiAppleLine, RiImage2Line, RiKeynoteLine, RiSlideshow2Fill } from 'react-icons/ri';
import { useProject } from '@/hooks/use-project';
import { sleep } from '../../utils/sleep';
import Modal from '../ui/Modal';
import { GoDownload } from 'react-icons/go';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import SaveScriptsButton, { handleSaveScripts } from '../script/SaveScriptsButton';
import { SpinIcon } from '@/app/(feature)/icons';
import { PlusLabel } from '../ui/GrayLabel';
import { ToastContainer, toast } from 'react-toastify';
import SlideContainer from './SlideContainer';
import { templateDispatch } from './templateDispatch';
import { useSlides } from '@/hooks/use-slides';
import { uneditableTemplateDispatch } from '@/components/slides/templateDispatch';
import { FiDownload } from 'react-icons/fi';
import { Menu, MenuItem } from '../button/Menu';
import { PiFileText, PiMicrosoftPowerpointLogo } from 'react-icons/pi';

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

	const downloadThumbnail = () => {
		const url = project?.thumbnail_url;
		if (url) {
			const link = document.createElement('a');
			link.href = url;
			link.download = 'thumbnail.png';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	const handleExport = async (
		type: 'pptx' | 'key' | 'pdf',
		frontend: boolean,
	) => {
		if (!project) return;

    if(!isPaidUser) {
      setShowPaymentModal(true);
      return;
    }

		setShowExportToPdfModal(false);

		setDownloading(true);

		let waitTime = 10;
		if (!frontend) {
			waitTime += 10;
		}
		if (type === 'pptx' || type === 'key') {
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
				message='Upgrade to export your work!'
				showReferralLink={false}
			/>

			<ToastContainer />

			<Menu
        align='left'
				icon={
					!downloading ? (
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
					)
				}
				mode='hover'
				iconPadding='0'
			>
				<MenuItem
					label='PDF'
					onClick={() => handleExport('pdf', false)}
					icon={
						<>
							<FaRegFilePdf /> {!isPaidUser && <PlusLabel />}{' '}
						</>
					}
				/>
				<MenuItem
					label='PowerPoint'
					onClick={() => handleExport('pptx', false)}
					icon={
						<>
							<FaRegFilePowerpoint /> {!isPaidUser && <PlusLabel />}{' '}
						</>
					}
				/>
				<MenuItem
					label='Keynote'
					onClick={() => handleExport('key', false)}
					icon={
						<>
							<RiKeynoteLine /> {!isPaidUser && <PlusLabel />}{' '}
						</>
					}
				/>
				<MenuItem
					label='Thumbnail'
					onClick={() => downloadThumbnail()}
					icon={<RiImage2Line />}
				/>
				{hasScript && (
					<MenuItem
						label='Save Scripts'
						icon={<PiFileText />}
						onClick={() => handleSaveScripts(slides) }
					/>
				)}
			</Menu>
		</div>
	);
};

export default ExportToFile;
