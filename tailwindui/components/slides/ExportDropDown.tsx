'use client';

import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../../services/AuthService';
import Slide from '../../models/Slide';
import PaywallModal from '../forms/paywallModal';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import {
	FaDownload,
	FaFilePdf,
	FaRegFilePdf,
	FaRing,
	FaSlideshare,
	FaTruckLoading,
} from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useProject } from '@/hooks/use-project';
import { sleep } from '../utils/sleep';

interface ExportToPdfProps {
	slides: Slide[];
	exportSlidesRef: React.RefObject<HTMLDivElement>;
}

const ExportToFile: React.FC<ExportToPdfProps> = ({
	slides,
	exportSlidesRef,
}) => {
	const topic =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic')
			: '';
	const [downloading, setDownloading] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const { project } = useProject();
	const [showDropdown, setShowDropdown] = useState(false);

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

		setShowDropdown(false);

		setDownloading(true);
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
		<div className='flex flex-wrap flex-grow-0'>
			<div className='flex flex-row gap-2'>
				{showPaymentModal && (
					<PaywallModal
						setShowModal={setShowPaymentModal}
						message='Upgrade for more ⭐️credits.'
						showReferralLink={true}
					/>
				)}

				<div className='h-[36px] flex flex-col items-center gap-2'>
					<BigGrayButton
						bgColor='bg-Gray'
						isSubmitting={downloading}
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<FaDownload />
						Export to PDF / PPTX
					</BigGrayButton>

					{showDropdown && (
						<div className='flex flex-col gap-2 bg-gray-100 rounded-xl shadow-md p-2 z-30'>
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
								<span>PDF (high) {!isPaidUser && '🔒'}</span>
							</BigGrayButton>

							<BigGrayButton
								onClick={() => handleExport('pptx', false)}
								isSubmitting={downloading}
								isPaidUser={isPaidUser}
								isPaidFeature={true}
								bgColor='bg-Gray'
							>
								<RiSlideshow2Fill />
								<span>PPTX {!isPaidUser && '🔒'}</span>
							</BigGrayButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ExportToFile;
