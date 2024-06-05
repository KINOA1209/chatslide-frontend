import { Instruction } from '@/components/ui/Text';
import ImageSelector from './ImageSelector';
import RadioButton from '@/components/ui/RadioButton';
import Resource from '@/models/Resource';
import { PlusLabel } from '@/components/ui/GrayLabel';
import { useUser } from '@/hooks/use-user';
import { useEffect, useState } from 'react';
import PaywallModal from '@/components/paywallModal';
import { LogoPosition } from '@/models/Slide';
import { getBrand } from '@/utils/getHost';

const brandingOptions = [
	{
		value: 'default',
		text: getBrand() + ' Logo',
	},
	{
		value: 'no',
		text: 'No Logo',
	},
	{
		value: 'custom',
		text: 'Custom Logo',
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
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);
	const [logoMode, setLogoMode] = useState<'no' | 'default' | 'custom'>(
		isPaidUser ? selectedLogo?.length>0 ? 'custom' : 'no' : 'default',
	);

	useEffect(() => {
		console.log('logoMode', logoMode);

		if (logoMode === 'no') {
			setSelectedLogo([]);
			setShowLogo(false);
		} else if (logoMode === 'custom') {
      if(selectedLogo?.length > 0)
			  setShowLogo(true);
		} else if (logoMode === 'default') {
			setSelectedLogo([]);
			setShowLogo(true);
		}
	}, [logoMode]);

  	useEffect(() => {
			console.log('logoMode', logoMode);

			if (selectedLogo?.length > 0) {
        setShowLogo(true);
      }
		}, [selectedLogo]);

	return (
		<div>
			<div>
				<PaywallModal
					showModal={showPaywall}
					setShowModal={setShowPaywall}
					message='Unlock this feature to customize logo on your slides.'
				/>
				<Instruction>
					What logo do you want to put on your slides?{' '}
					{!isPaidUser && <PlusLabel />}
				</Instruction>
				<RadioButton
					options={brandingOptions}
					selectedValue={logoMode}
					setSelectedValue={(mode) => {
						if (mode !== 'default' && !isPaidUser) {
							setShowPaywall(true);
							return;
						}
						setLogoMode(mode as 'no' | 'default' | 'custom');
					}}
					name='branding'
				/>
			</div>

			{/* customized logo */}
			{logoMode == 'custom' && (
				<ImageSelector
					type='logo'
					selectedImage={selectedLogo}
					setSelectedImage={setSelectedLogo}
					showQuestion={false}
				/>
			)}

			{/* select position to put logo */}
			{showLogo && (
				<div>
					<PaywallModal
						showModal={showPaywall}
						setShowModal={setShowPaywall}
						message='Unlock this feature to adjust your logo position'
					/>
					<Instruction>Where do you want to put the logo? </Instruction>
					<RadioButton
						options={LogoPositionOptions}
						selectedValue={logoPosition}
						setSelectedValue={(e) => {
							// setIsTemplateLogoLeftSide(e === 'yes' ? true : false);
							setLogoPosition(e as LogoPosition);
							// updateTemplateLogoPosition(e as LogoPosition); // do not update slides on design page
						}}
						name='logoPosition'
					/>
				</div>
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
