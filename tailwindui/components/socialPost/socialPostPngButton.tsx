'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import PaywallModal from '../paywallModal';
import SocialPostContainer from '@/components/socialPost/socialPostContainer';
import { templateDispatch as defaultTemplateDispatch } from '@/components/socialPost/socialPostTemplateDispatch';
import { templateDispatch as defaultTemplateDispatch2 } from '@/components/socialPost//socialPostTemplate2Dispatch';
import { templateDispatch as defaultTemplateDispatch3 } from '@/components/socialPost/socialPostTemplate3Dispatch';
import { BigGrayButton } from '../button/DrlambdaButton';
import { FaDownload } from 'react-icons/fa';
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
	const [slideRef, setSlideRef] = useState(React.createRef<HTMLDivElement>());

	function selectTemplateDispatch() {
		switch (res_scenario) {
			case 'casual_topic':
				return defaultTemplateDispatch;
			case 'serious_subject':
				return defaultTemplateDispatch2;
			case 'reading_notes':
				return defaultTemplateDispatch3;
			default:
				return defaultTemplateDispatch;
		}
	}

	const handleSaveImage = async () => {
		setDownloading(true);
		await downloadImage(topic || '', slideRef);
		setDownloading(false);
	};

	return (
		<div className='flex flex-wrap flex-grow-0'>
			<div className=''>

				<ButtonWithExplanation
					button={
						<button
							onClick={handleSaveImage}
						>
							{!downloading ? 
							<GoDownload
								style={{
									strokeWidth: '1',
									flex: '1',
									width: '1.5rem',
									height: '1.5rem',
									fontWeight: 'bold',
									color: '#344054',
								}}
							/> :
								<SpinIcon />}
						</button>
					}
					explanation={'Save this Page'}
				/>
		
				{/* hidden div for export to pdf */}
				<div className='absolute left-[-9999px] top-[-9999px] -z-1'>
					<div ref={exportSlidesRef}>
						<div key={`exportToPdfContainer` + currentSlideIndex.toString()}>
							<SocialPostContainer
								slides={socialPostSlide}
								currentSlideIndex={currentSlideIndex}
								exportToPdfMode={true}
								templateDispatch={selectTemplateDispatch()}
								slideRef={slideRef}
								onSlideRefUpdate={setSlideRef}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExportToPngButton;
