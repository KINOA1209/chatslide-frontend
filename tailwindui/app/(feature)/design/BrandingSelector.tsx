import { Instruction } from "@/components/ui/Text"
import ImageSelector from "./ImageSelector"
import RadioButton from "@/components/ui/RadioButton"
import Resource from "@/models/Resource";
import { PlusLabel } from "@/components/ui/GrayLabel";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import PaywallModal from "@/components/paywallModal";


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

const BrandingSelector: React.FC<{
	showLogo: boolean;
	setShowLogo: (showLogo: boolean) => void;
	selectedLogo: Resource[];
	setSelectedLogo: (selectedLogo: Resource[]) => void;
	selectedBackground: Resource[];
	setSelectedBackground: (selectedBackground: Resource[]) => void;
}> = ({
	showLogo,
	setShowLogo,
	selectedLogo,
	setSelectedLogo,
	selectedBackground,
	setSelectedBackground,
}) => {
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
						Do you want to show logo on your slides? {!isPaidUser && <PlusLabel />}
					</Instruction>
					<RadioButton
						options={brandingOptions}
						selectedValue={showLogo ? 'yes' : 'no'}
						setSelectedValue={(e) =>{
							if (e === 'no' && !isPaidUser) {
								setShowPaywall(true);
								return;
							}
							setShowLogo(e === 'yes' ? true : false);
						}}
						name='branding'
					/>
				</div>

				{/* customized logo */}
				{showLogo &&
					<ImageSelector
						type='logo'
						selectedImage={selectedLogo}
						setSelectedImage={setSelectedLogo}
					/>}
				{/* background */}
				<ImageSelector
					type='background'
					selectedImage={selectedBackground}
					setSelectedImage={setSelectedBackground}
				/>
			</div>
		)
	};

export default BrandingSelector;