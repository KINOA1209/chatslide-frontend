'use client';

import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../../services/AuthService';
import Slide from '../../models/Slide';
import PaywallModal from '../forms/paywallModal';
import { BigGrayButton } from '../button/DrlambdaButton';
import { FaDownload, FaRing, FaTruckLoading } from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';

interface ExportToPdfProps {
	slides: Slide[];
	exportSlidesRef: React.RefObject<HTMLDivElement>;
}

const ExportToPdfButton: React.FC<ExportToPdfProps> = ({
	slides,
	exportSlidesRef,
}) => {
	const topic =
		typeof sessionStorage !== 'undefined'
			? sessionStorage.getItem('topic')
			: '';
	const [user, setUser] = useState(null);
	const [downloadingPDF, setDownloadingPDF] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	// const exportOptions: Options = {
	// 	filename: (topic ? topic : 'drlambda') + '.pdf',
	// 	method: 'save',
	// 	resolution: Resolution.MEDIUM,
	// 	page: {
	// 		margin: Margin.NONE,
	// 		format: [254, 143], // 960x540 px in mm
	// 		orientation: 'landscape',
	// 	},
	// 	canvas: {
	// 		mimeType: 'image/jpeg',
	// 		qualityRatio: 1,
	// 	},
	// 	overrides: {
	// 		pdf: {
	// 			compress: true,
	// 		},
	// 		canvas: {
	// 			useCORS: true,
	// 		},
	// 	},
	// };

	useEffect(() => {
		// Create a scoped async function within the hook.
		const fetchUser = async () => {
			const user = await AuthService.getCurrentUser();
			if (user) {
				setUser(user);
			}
		};
		// Execute the created function directly
		fetchUser();
	}, []);

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

	const handleSavePDF = async () => {
		setDownloadingPDF(true);
    let frontend = false;  // toggle this to switch between frontend and backend pdf generation
    if (frontend) {
      await exportToPdfFrontend();
    } else{
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      const project_id = sessionStorage.getItem('project_id') || '';
      await ProjectService.exportToPdfBackend(idToken, project_id);
    }
		setDownloadingPDF(false);
	};

	return (
		<div className='flex flex-wrap flex-grow-0'>
			<div className='px-3'>
				{showPaymentModal && (
					<PaywallModal
						setShowModal={setShowPaymentModal}
						message='Upgrade for more ⭐️credits.'
						showReferralLink={true}
					/>
				)}

				<BigGrayButton onClick={handleSavePDF} isSubmitting={downloadingPDF}>
					<div className='flex flex-row items-center gap-x-2'>
						Export to PDF
						<FaDownload className='text-gray-800' />
					</div>
				</BigGrayButton>
			</div>
		</div>
	);
};

export default ExportToPdfButton;
