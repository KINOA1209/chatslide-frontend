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
import { useSlides } from '@/hooks/use-slides';
import Position from '@/types/Position';

const brandingOptions = [
	{
		value: 'Default',
		text: getBrand() + ' Logo',
	},
	{
		value: 'No',
		text: 'No Logo',
	},
	{
		value: 'Custom',
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
	// showLogo: boolean;
	// setShowLogo: (showLogo: boolean) => void;
	logoMode: string;
	setLogoMode: (logoMode: string) => void;
	selectedLogo: Resource[];
	setSelectedLogo: (selectedLogo: Resource[]) => void;
	selectedBackground: Resource[];
	setSelectedBackground: (selectedBackground: Resource[]) => void;
	logoPosition: LogoPosition;
	setLogoPosition: (position: LogoPosition) => void;
	buttonCols?: number;
	setNumericLogoPosition?: (position: Position) => void;
}> = ({
	logoMode,
	setLogoMode,
	selectedLogo,
	setSelectedLogo,
	selectedBackground,
	setSelectedBackground,
	logoPosition,
	setLogoPosition,
	buttonCols = 3,
  setNumericLogoPosition
}) => {
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);
	const { slides, slideIndex, updateBranding } = useSlides();

	useEffect(() => {
		console.log('logoMode', logoMode);

		if (logoMode === 'No') {
			setSelectedLogo([]);
		} else if (logoMode === 'Custom') {
		} else if (logoMode === 'Default') {
			setSelectedLogo([]);
		}
	}, [logoMode]);

	return (
		<div className='flex flex-col gap-y-2'>
			{showPaywall && (
				<PaywallModal
					showModal={showPaywall}
					setShowModal={setShowPaywall}
					message='Unlock this feature to customize logo on your slides.'
				/>
			)}

			<div>
				<Instruction boldenFont={true}>
					What logo do you want to put on your slides?{' '}
					{!isPaidUser && <PlusLabel />}
				</Instruction>
				<RadioButton
					options={brandingOptions}
					selectedValue={logoMode}
					setSelectedValue={(mode) => {
						if (mode !== 'Default' && !isPaidUser) {
							setShowPaywall(true);
							return;
						}
						setLogoMode(mode as 'No' | 'Default' | 'Custom');
					}}
					name='branding'
					cols={buttonCols}
				/>
			</div>

			{/* customized logo */}
			{logoMode == 'Custom' && (
				<ImageSelector
					type='logo'
					selectedImage={selectedLogo}
					setSelectedImage={setSelectedLogo}
					showQuestion={false}
				/>
			)}

			{/* select position to put logo */}
			{logoMode != 'No' && (
				<div>
					<PaywallModal
						showModal={showPaywall}
						setShowModal={setShowPaywall}
						message='Unlock this feature to adjust your logo position'
					/>
					<Instruction boldenFont={true}>
						Where do you want to put the logo?{' '}
					</Instruction>
					<RadioButton
						options={LogoPositionOptions}
						selectedValue={logoPosition}
						setSelectedValue={(e) => {
							// setIsTemplateLogoLeftSide(e === 'yes' ? true : false);
							setLogoPosition(e as LogoPosition);
							// updateTemplateLogoPosition(e as LogoPosition); // do not update slides on design page
						}}
						name='logoPosition'
						cols={buttonCols}
					/>
					{setNumericLogoPosition &&
            slides?.[slideIndex]?.logo_numeric_position &&
						Object.keys(slides[slideIndex].logo_numeric_position).length >
							0 && (
							<Instruction>
								<div
									className='text-blue-600 cursor-pointer'
									onClick={() =>
										setNumericLogoPosition(
											slides[slideIndex].logo_numeric_position,
										)
									}
								>
									Apply custom logo position of this page to all pages.
								</div>
							</Instruction>
						)}
				</div>
			)}

			{/* background */}
			<ImageSelector
				type='background'
				selectedImage={selectedBackground}
				setSelectedImage={setSelectedBackground}
				buttonCols={buttonCols}
			/>
		</div>
	);
};

export default BrandingSelector;
