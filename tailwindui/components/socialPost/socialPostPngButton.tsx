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

interface ExportToPdfProps {
	socialPostSlide: SocialPostSlide[];
	currentSlideIndex: number;
}

const ExportToPngButton: React.FC<ExportToPdfProps> = ({
	socialPostSlide,
	currentSlideIndex,
}) => {
	const { project } = useProject();
	const topic = project?.topic;

	const res_scenario = SessionStorage.getItem('scenarioType');
	const [downloading, setDownloading] = useState(false);
	const exportSlidesRef = useRef<HTMLDivElement>(null);
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
				zip.file(`slide-${i + 1}.png`, base64Data, { base64: true });
			}
		}
		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, 'slides.zip');
		setDownloading(false);
	};

	return (
		<div className='flex flex-wrap flex-grow-0'>
			<div className=''>
				<ButtonWithExplanation
					button={
						<button onClick={handleSaveImage}>
							{!downloading ? (
								<GoDownload
									style={{
										strokeWidth: '1',
										flex: '1',
										width: '1.5rem',
										height: '1.5rem',
										fontWeight: 'bold',
										color: '#344054',
									}}
								/>
							) : (
								<SpinIcon />
							)}
						</button>
					}
					explanation={'Export to PNGs'}
				/>

				{/* hidden div for export to pdf */}
				<div className='absolute left-[-9999px] top-[-9999px] -z-1'>
					<div ref={exportSlidesRef}>
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
		</div>
	);
};

export default ExportToPngButton;
