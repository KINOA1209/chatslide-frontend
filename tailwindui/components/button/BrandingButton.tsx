'use client';

import ButtonWithExplanation from "./ButtonWithExplanation";
import Modal from "../ui/Modal";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import Image from 'next/image';
import brandingIcon from 'public/icons/button/show_logo.svg';
import BrandingSelector from "@/app/(feature)/design/BrandingSelector";
import Resource from "@/models/Resource";
import { useProject } from "@/hooks/use-project";
import { useSlides } from "@/hooks/use-slides";
import PaywallModal from "../paywallModal";
import { Instruction } from "../ui/Text";
import { PlusLabel } from "../ui/GrayLabel";


export const BrandingButton: React.FC<{
}> = () => {
	const { project, updateProject } = useProject();
	const { isShowingLogo, updateLogoUrl, updateBackgroundUrl, hideLogo, showLogo, removeUserName } = useSlides();
	const { isPaidUser } = useUser();

	const [showModal, setShowModal] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	useEffect(() => {
		document.addEventListener('change_logo', (e) => {
			setShowModal(true);
		});

		return () => document.removeEventListener('change_logo', (e) => {
			setShowModal(true);
		});
	}, []);

	useEffect(() => {
		document.addEventListener('change_background', (e) => {
			setShowModal(true);
		});

		return () => document.removeEventListener('change_background', (e) => {
			setShowModal(true);
		});
	}, []);

	return <>
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title='Branding'
			description='Select customized logo and background for your slides.'
			onConfirm={() => setShowModal(false)}
		>
			<BrandingSelector
				showLogo={isShowingLogo}
				setShowLogo={(e) => {
					if (e) {
						showLogo();
					}
					else {
						hideLogo();
						updateProject('selected_logo', []);
					}
				}}
				selectedLogo={project?.selected_logo || []}
				setSelectedLogo={
					(selectedLogo: Resource[]) => {
						console.log('updating branding to ', selectedLogo[0]?.thumbnail_url)
						updateProject('selected_logo', selectedLogo);
						if (selectedLogo.length > 0) {
							updateLogoUrl(selectedLogo[0]?.thumbnail_url || '');
						}
						else {
							updateLogoUrl('');
						}
					}}
				selectedBackground={project?.selected_background || []}
				setSelectedBackground={
					(selectedBackground: Resource[]) => {
						updateProject('selected_background', selectedBackground);
						if (selectedBackground.length > 0) {
							updateBackgroundUrl(selectedBackground[0]?.thumbnail_url || '');
						}
						else {
							updateBackgroundUrl('');
						}
					}}
			/>
			<Instruction>
				<div className='text-blue-600 cursor-pointer'
					onClick={() => {
						if(!isPaidUser){
							setShowPaymentModal(true);
							return;
						}
						removeUserName();
					}}
				>Remove 'Created by DrLambda'.</div>
				{!isPaidUser && <PlusLabel />}
			</Instruction>

		</Modal>
		<PaywallModal
			showModal={showPaymentModal}
			message='Upgrade for this 🌟premium feature!'
			setShowModal={setShowPaymentModal}
		/>
		<ButtonWithExplanation
			button={
				<button onClick={() => setShowModal(true)} className='w-[24px]'>
					<Image
						src={brandingIcon}
						alt='Branding'
						width={24}
						height={24}
					/>
				</button>
			}
			explanation={'Branding'}
		></ButtonWithExplanation>
	</>
};