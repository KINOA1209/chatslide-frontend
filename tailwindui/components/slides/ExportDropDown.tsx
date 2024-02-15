'use client';

import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../../services/AuthService';
import Slide from '../../models/Slide';
import PaywallModal from '../forms/paywallModal';
import { BigGrayButton, DropDown } from '../button/DrlambdaButton';
import { FaDownload, FaRing, FaTruckLoading } from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';

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

	const handleExport = async (type: string) => {
    if (!isPaidUser && type === 'pptx') {
      setShowPaymentModal(true);
      return;
    }

    setDownloading(true);
    let frontend = false;  // toggle this to switch between frontend and backend pdf generation
    if (frontend) {
      await exportToPdfFrontend();
    } else{
      const project_id = sessionStorage.getItem('project_id') || '';
      await ProjectService.exportToFileBackend(token, project_id, type);
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

        {/* <DropDown
          onChange={(event) => handleExport(event.target.value)}
          displayText='Export to File 📁'
          disabled={downloading}
        >
            <option value={'pdf'}>
              Export to PDF {downloading && '⏳'}
            </option>
            <option value={'pptx'}>
             Export to PPTX {!isPaidUser && '🔒'} {downloading && '⏳'}
            </option>
        </DropDown> */}
        <div className='h-[36px] flex flex-row items-center gap-2'>
          <FaDownload />
          Export to
        </div>

        <BigGrayButton
          onClick={() => handleExport('pdf')}
          isSubmitting={downloading}
          isPaidUser={isPaidUser}
          bgColor='bg-Gray'
        >
          <span>PDF</span>
        </BigGrayButton>

        <BigGrayButton
          onClick={() => handleExport('pptx')}
          isSubmitting={downloading}
          isPaidUser={isPaidUser}
          bgColor='bg-Gray'
        >
          <span>PPTX {!isPaidUser && '🔒'}</span>
        </BigGrayButton>
			</div>
		</div>
	);
};

export default ExportToFile;
