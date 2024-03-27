'use client';

import ButtonWithExplanation from "./ButtonWithExplanation";
import Modal from "../ui/Modal";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import Image from 'next/image';
import brandingIcon from 'public/icons/button/show_logo.svg';
import BrandingSelector from "@/app/(feature)/design/BrandingSelector";
import Resource from "@/models/Resource";
import { useProject } from "@/hooks/use-project";
import { useSlides } from "@/hooks/use-slides";
import PaywallModal from "../paywallModal";


export const BrandingButton: React.FC<{
}> = () => {
	const { project, updateProject } = useProject();
	const { isShowingLogo, updateLogoUrl, updateBackgroundUrl, hideLogo, showDrLambdaLogo } = useSlides();
	const { isPaidUser } = useUser();

	const [showModal, setShowModal] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	return <>
		<PaywallModal
			showModal={showPaymentModal}
			message='Upgrade for this 🌟premium feature!'
			setShowModal={setShowPaymentModal}
		/>
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title='Bradning'
			description='Select customized logo and background for your slides.'
			onConfirm={() => setShowModal(false)}
		>
			<BrandingSelector
				branding={isShowingLogo ? 'yes' : 'no'}
				setBranding={(e) => {
					if (!isPaidUser) {
						setShowPaymentModal(true);
						return;
					}
					if (e === 'yes') {
						showDrLambdaLogo();
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
						if(selectedLogo.length > 0){
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
						if (selectedBackground.length > 0){
							updateBackgroundUrl(selectedBackground[0]?.thumbnail_url || '');
						}
						else{
							updateBackgroundUrl('');
						}
					}}
			/>
		</Modal>
		<ButtonWithExplanation
			button={
				<button onClick={() => setShowModal(true)}>
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