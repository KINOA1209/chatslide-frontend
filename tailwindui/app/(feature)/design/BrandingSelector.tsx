import { Instruction } from "@/components/ui/Text"
import ImageSelector from "./ImageSelector"
import RadioButton from "@/components/ui/RadioButton"
import Resource from "@/models/Resource";
import { PlusLabel } from "@/components/ui/GrayLabel";
import { useUser } from "@/hooks/use-user";


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
	branding: string;
	setBranding: (branding: string) => void;
	selectedLogo: Resource[];
	setSelectedLogo: (selectedLogo: Resource[]) => void;
	selectedBackground: Resource[];
	setSelectedBackground: (selectedBackground: Resource[]) => void;
}> = ({
	branding,
	setBranding,
	selectedLogo,
	setSelectedLogo,
	selectedBackground,
	setSelectedBackground,
}) => {
		const { isPaidUser } = useUser();

		return (
			<div>
				<div>
					<Instruction>
						Do you want to use DrLambda branding for your slides? {!isPaidUser && <PlusLabel />}
					</Instruction>
					<RadioButton
						options={brandingOptions}
						selectedValue={branding}
						setSelectedValue={setBranding}
						name='branding'
					/>
				</div>

				{/* logo */}
				<ImageSelector
					type='logo'
					selectedImage={selectedLogo}
					setSelectedImage={setSelectedLogo}
				/>
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