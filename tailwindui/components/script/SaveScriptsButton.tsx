'use client';

import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../../services/AuthService';
import Slide from '../../models/Slide';
import PaywallModal from '../paywallModal';
import { BigGrayButton } from '../button/DrlambdaButton';
import { FaDownload, FaRing, FaTruckLoading } from 'react-icons/fa';
import { generatePdf } from '../utils/DownloadImage';
import ProjectService from '@/services/ProjectService';

interface Props {
	slides: Slide[];
}

const SaveScriptsButton: React.FC<Props> = ({ slides }) => {
	const handleSaveScripts = async () => {
		const transcripts = slides.map((slide) => slide.transcript);
		const formattedTranscripts = transcripts.join('\n\n');
		const blob = new Blob([formattedTranscripts], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'scripts.txt';
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<BigGrayButton onClick={handleSaveScripts}>
			<div className='flex flex-row items-center gap-x-2'>
				<FaDownload className='text-gray-800' />
				Save Scripts
			</div>
		</BigGrayButton>
	);
};

export default SaveScriptsButton;
