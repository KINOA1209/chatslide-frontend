import SelectedResourcesList from '@/components/file/SelectedResources';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import FileUploadModal from '@/components/file/FileUploadModal';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';
import Resource from '@/models/Resource';
import { useEffect, useState } from 'react';
import { PlusLabel } from '@/components/ui/GrayLabel';
import { Instruction } from '@/components/ui/Text';
import RadioButton from '@/components/ui/RadioButton';

interface Props {
	type: string;
	selectedImage: Resource[];
	setSelectedImage: (selectedImage: Resource[]) => void;
	showQuestion?: boolean;
}

const ImageSelector: React.FC<Props> = ({
	type,
	selectedImage,
	setSelectedImage,
	showQuestion = true,
}) => {
	const [showFileModal, setShowFileModal] = useState(false);
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);
	const [selectedValue, setSelectedValue] = useState('no');

	const removeImageAtIndex = (indexToRemove: number) => {
		const newSelectedImage = selectedImage.filter(
			(resource, index) => index !== indexToRemove,
		);
		setSelectedImage(newSelectedImage as Resource[]);
	};

	// useEffect(() => {
	// 	setUseImage(selectedImage.length > 0);
	// }, [selectedImage]);

	return (
		<div>
			<PaywallModal
				showModal={showPaywall}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaywall}
			/>
			{showQuestion && (
				<div className='gap-1 flex flex-col justify-start'>
					<Instruction>
						<div>Do you want to use your own {type} for slides?</div>{' '}
						{!isPaidUser && <PlusLabel />}
					</Instruction>

					<RadioButton
						name={type}
						options={[
							{
								value: 'yes',
								text: 'Yes',
							},
							{
								value: 'no',
								text: 'No',
							},
						]}
						selectedValue={selectedValue}
						setSelectedValue={(value) => {
							if (value === 'yes') {
								if (!isPaidUser) setShowPaywall(true);
								else setSelectedValue('yes');
							} else {
								setSelectedImage([]);
								setSelectedValue('no');
							}
						}}
            cols={3}
					/>
				</div>
			)}

			{(selectedValue === 'yes' || !showQuestion) && (
				<div
					className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-rol justify-start mt-2`}
				>
					<div className=''>
						<SmallBlueButton
							onClick={(e) => {
								e.preventDefault();
								setShowFileModal(true);
							}}
						>
							Select {type}
						</SmallBlueButton>
					</div>
				</div>
			)}

			{
				selectedImage && selectedImage.length > 0 && <div className='mt-[10px]'>
					<SelectedResourcesList
						selectedResources={selectedImage}
						removeResourceAtIndex={removeImageAtIndex}
					/>
				</div>
			}

			<FileUploadModal
				selectedResources={selectedImage}
				setSelectedResources={setSelectedImage}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
				pageInvoked={'theme'}
				type={type}
			/>
		</div>
	);
};

export default ImageSelector;
