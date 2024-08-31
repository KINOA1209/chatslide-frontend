'use client';

import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SocialPostSlide } from '@/models/SocialPost';
import SocialPostContainer from '@/components/socialPost/socialPostContainer';
import { templateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { downloadImage } from '../utils/DownloadImage';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { SpinIcon } from '@/app/(feature)/icons';
import { GoDownload } from 'react-icons/go';
import { useProject } from '@/hooks/use-project';
import SessionStorage from '@/utils/SessionStorage';
import jsPDF from 'jspdf';
import { Menu, MenuItem } from '../button/Menu';
import { RiImage2Line } from 'react-icons/ri';
import { FaRegFilePdf } from 'react-icons/fa';

interface ExportToPdfProps {
	socialPostSlide: SocialPostSlide[];
	currentSlideIndex: number;
}

const ExportButton: React.FC<ExportToPdfProps> = ({
	socialPostSlide,
	currentSlideIndex,
}) => {
	const { project } = useProject();
	const topic = project?.topic;

	const [downloading, setDownloading] = useState(false);
  const [slideRefs, setSlideRefs] = useState(
		socialPostSlide.map(() => React.createRef<HTMLDivElement>()),
	);

	const handleSaveImage = async () => {
		setDownloading(true);
		const zip = new JSZip();
		for (let i = 0; i < slideRefs.length; i++) {
			const dataUrl = await downloadImage(topic || '', slideRefs[i]);
			if (dataUrl) {
				const base64Data = dataUrl.split(',')[1];
				zip.file(`page-${i + 1}.png`, base64Data, { base64: true });
			}
		}
		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, project?.id + '.zip');
		setDownloading(false);
	};

	const handleSavePdf = async () => {
		if (slideRefs[0].current === null) {
			console.log('slideRefs[0].current is null');
			return;
		}

		setDownloading(true);

		const pdf = new jsPDF({
			// orientation: 'landscape',
			unit: 'px',
			format: [
				slideRefs[0].current.offsetWidth,
				slideRefs[0].current.offsetHeight,
			],
		});

		for (let i = 0; i < slideRefs.length; i++) {
			const dataUrl = await downloadImage(topic || '', slideRefs[i]);
			if (dataUrl) {
				if (i > 0) {
					pdf.addPage();
				}
				pdf.addImage(
					dataUrl,
					'PNG',
					0,
					0,
					slideRefs[0].current.offsetWidth,
					slideRefs[0].current.offsetHeight,
					undefined,
					'NONE',
				);
			}
		}

		pdf.save(project?.id + '.pdf');
		setDownloading(false);
	};

	return (
		<div className='flex flex-wrap flex-grow-0'>
			<Menu
				align='left'
				icon={
					!downloading ? (
						<GoDownload
							style={{
								strokeWidth: '1',
								flex: '1',
								width: '24px',
								height: '24px',
								color: 'var(--colors-text-text-secondary-700, #344054)',
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
					label='PNGs'
					onClick={handleSaveImage}
					icon={<RiImage2Line />}
					isPaidFeature={true}
				/>
				<MenuItem
					label='PDF'
					// onClick={() => handleExport('pptx', false)}  // method by jonas, not working yet
					onClick={handleSavePdf}
					icon={<FaRegFilePdf />}
					isPaidFeature={true}
				/>
			</Menu>

      {/* hidden div for export to pdf */}
				<div className='absolute left-[-9999px] top-[-9999px] -z-1'>
					<div>
						{socialPostSlide.map((slide, index) => (
							<div key={`exportToPdfContainer` + index.toString()}>
								<SocialPostContainer
									slide={slide}
									currentSlideIndex={index}
									exportToPdfMode={true}
									templateDispatch={templateDispatch}
									slideRef={slideRefs[index]}
								/>
							</div>
						))}
					</div>
				</div>
		</div>
	);
};

export default ExportButton;
