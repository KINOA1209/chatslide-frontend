'use client';

import ButtonWithExplanation from './ButtonWithExplanation';
import Modal from '../ui/Modal';
import { useUser } from '@/hooks/use-user';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import brandingIcon from 'public/icons/button/show_logo.svg';
import BrandingSelector from '@/app/(feature)/design/BrandingSelector';
import Resource from '@/models/Resource';
import { useProject } from '@/hooks/use-project';
import { useSlides } from '@/hooks/use-slides';
import PaywallModal from '../paywallModal';
import { Instruction } from '../ui/Text';
import { PlusLabel } from '../ui/GrayLabel';
import { LogoPosition } from '@/models/Slide';
import Toggle from './Toggle';
import Project from '@/models/Project';

export const BrandingButton: React.FC<{}> = () => {
	const { project, updateProject, bulkUpdateProject } = useProject();
	const {
		slides,
		slideIndex,
		updateBranding,
		removeUserName,
	} = useSlides();

	const [logoMode, setLogoMode] = useState(slides[slideIndex]?.logo || 'Default');
	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		project?.selected_logo || [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>(
		project?.selected_background || [],
	);

	const { isPaidUser } = useUser();

	const [showModal, setShowModal] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [applyToAll, setApplyToAll] = useState(true);

	useEffect(() => {
		document.addEventListener('change_logo', (e) => {
			setShowModal(true);
		});

		return () => {
			document.removeEventListener('change_logo', (e) => {
				setShowModal(true);
			});
		};
	}, []);

	const handleConfirm = () => {
		console.log('updating branding to ', logoMode, ', url: ', selectedLogo[0]?.thumbnail_url);
		if (applyToAll) {
			bulkUpdateProject({
				logo: logoMode,
				selected_logo: selectedLogo,
				selected_background: selectedBackground,
			} as Project);
		}

		// update logo
		updateBranding(
			logoMode,
			selectedLogo,
			selectedTemplateLogoPosition,
			selectedBackground,
			applyToAll,
		);

		setShowModal(false);
	};

	const [selectedTemplateLogoPosition, setSelectedTemplateLogoPosition] =
		useState(slides[slideIndex]?.logo_position || 'BottomLeft');

	return (
		<>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Branding'
				description='Select customized logo and background for your slides.'
				onConfirm={handleConfirm}
			>
				<Toggle
					isLeft={applyToAll}
					setIsLeft={setApplyToAll}
					leftText='All Pages'
					rightText='This Page'
				/>

				<BrandingSelector
					logoMode={logoMode}
					setLogoMode={setLogoMode}
					selectedLogo={selectedLogo}
					setSelectedLogo={setSelectedLogo}
					selectedBackground={selectedBackground}
					setSelectedBackground={setSelectedBackground}
					logoPosition={selectedTemplateLogoPosition}
					setLogoPosition={setSelectedTemplateLogoPosition}
				/>
				<Instruction>
					Change branding color and fonts on
					<div
						className='text-blue-600 cursor-pointer'
						onClick={() => {
							setShowModal(false);
							document.dispatchEvent(new Event('change_template'));
						}}
					>
						template card.
					</div>
				</Instruction>

				{slideIndex === 0 && (
					<Instruction>
						<div
							className='text-blue-600 cursor-pointer'
							onClick={() => {
								if (!isPaidUser) {
									setShowPaymentModal(true);
									return;
								}
								removeUserName();
							}}
						>
							Remove 'Created by DrLambda'.
						</div>
						{!isPaidUser && <PlusLabel />}
					</Instruction>
				)}
			</Modal>
			<PaywallModal
				showModal={showPaymentModal}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaymentModal}
			/>
			<ButtonWithExplanation
				button={
					<button onClick={() => setShowModal(true)} className='w-[24px]'>
						<Image src={brandingIcon} alt='Branding' width={24} height={24} />
					</button>
				}
				explanation={'Branding'}
			></ButtonWithExplanation>
		</>
	);
};
