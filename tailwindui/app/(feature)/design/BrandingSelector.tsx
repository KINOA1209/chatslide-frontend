import { Instruction } from '@/components/ui/Text';
import ImageSelector from './ImageSelector';
import RadioButton from '@/components/ui/RadioButton';
import Resource from '@/models/Resource';
import { PlusLabel } from '@/components/ui/GrayLabel';
import { useUser } from '@/hooks/use-user';
import { useState } from 'react';
import PaywallModal from '@/components/paywallModal';
import { useSlides } from '@/hooks/use-slides';
import { LogoPosition } from '@/models/Slide';

const brandingOptions = [
	{
		value: 'yes',
		text: 'Yes',
	},
	{
		value: 'no',
		text: 'No',
	},
];

const LogoPositionOptions = [
	{
		value: 'BottomLeft' as LogoPosition,
		text: 'Bottom Left',
	},
	{
		value: 'BottomRight' as LogoPosition,
		text: 'Bottom Right',
	},
	{
		value: 'TopLeft' as LogoPosition,
		text: 'Top Left',
	},
	{
		value: 'TopRight' as LogoPosition,
		text: 'Top Right',
	},
];

const BrandingSelector: React.FC<{
	showLogo: boolean;
	setShowLogo: (showLogo: boolean) => void;
	selectedLogo: Resource[];
	setSelectedLogo: (selectedLogo: Resource[]) => void;
	selectedBackground: Resource[];
	setSelectedBackground: (selectedBackground: Resource[]) => void;
	logoPosition: LogoPosition;
	setLogoPosition: (position: LogoPosition) => void;
}> = ({
	showLogo,
	setShowLogo,
	selectedLogo,
	setSelectedLogo,
	selectedBackground,
	setSelectedBackground,
	logoPosition,
	setLogoPosition,
}) => {
	const {
		// isTemplateLogoLeftSide,
		// setIsTemplateLogoLeftSide,
		// updateTemplateLogoPositionToLeft,
		updateTemplateLogoPosition,
	} = useSlides();
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);

	return (
		<div>
			<div>
				<PaywallModal
					showModal={showPaywall}
					setShowModal={setShowPaywall}
					message='Unlock this feature to add your logo to your slides.'
				/>
				<Instruction>
					Do you want to show logo on your slides?{' '}
					{!isPaidUser && <PlusLabel />}
				</Instruction>
				<RadioButton
					options={brandingOptions}
					selectedValue={showLogo ? 'yes' : 'no'}
					setSelectedValue={(e) => {
						if (e === 'no' && !isPaidUser) {
							setShowPaywall(true);
							return;
						}
						setShowLogo(e === 'yes' ? true : false);
					}}
					name='branding'
				/>
			</div>

			{/* select position to put logo */}
			{showLogo && (
				<div>
					<PaywallModal
						showModal={showPaywall}
						setShowModal={setShowPaywall}
						message='Unlock this feature to adjust your logo position'
					/>
					<Instruction>
						Where do you want to put the logo?{' '}
					</Instruction>
					<RadioButton
						options={LogoPositionOptions}
						selectedValue={logoPosition}
						setSelectedValue={(e) => {
							// setIsTemplateLogoLeftSide(e === 'yes' ? true : false);
							setLogoPosition(e as LogoPosition);
							updateTemplateLogoPosition(e as LogoPosition);
						}}
						name='logoPosition'
					/>
				</div>
			)}

			{/* customized logo */}
			{showLogo && (
				<ImageSelector
					type='logo'
					selectedImage={selectedLogo}
					setSelectedImage={setSelectedLogo}
				/>
			)}
			{/* background */}
			<ImageSelector
				type='background'
				selectedImage={selectedBackground}
				setSelectedImage={setSelectedBackground}
			/>
		</div>
	);
};

export default BrandingSelector;
