import SelectedResourcesList from '@/components/file/SelectedResources';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import FileUploadModal from '@/components/file/FileUploadModal';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';
import Resource from '@/models/Resource';
import { useState } from 'react';
import { PlusLabel } from '@/components/ui/GrayLabel';

interface Props {
	type: string;
	selectedImage: Resource[];
	setSelectedImage: (selectedImage: Resource[]) => void;
}

const ImageSelector: React.FC<Props> = ({
	type,
	selectedImage,
	setSelectedImage,
}) => {
	const [useImage, setUseImage] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	const { isPaidUser } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);

	const removeImageAtIndex = (indexToRemove: number) => {
		const newSelectedImage = selectedImage.filter(
			(resource, index) => index !== indexToRemove,
		);
		setSelectedImage(newSelectedImage as Resource[]);
	};

	return (
		<div>
			<PaywallModal
				showModal={showPaywall}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaywall}
			/>
			<div className='gap-1 flex flex-col justify-start'>
				<span className='text-md font-bold flex flex-row gap-2'>
					<div>Do you want to use your {type} for slides?</div> {!isPaidUser && <PlusLabel />}
				</span>
				<form className='flex flex-row gap-x-4 mt-2 items-center'>
					<label>
						<div className='flex flex-row items-center gap-x-1'>
							<input
								type='radio'
								value='yes'
								checked={useImage}
								onChange={(e) => {
									if (!isPaidUser) setShowPaywall(true);
									else setUseImage(true);
								}}
							/>
							<span>Yes</span>
						</div>
					</label>
					<label>
						<div className='flex flex-row items-center gap-x-1'>
							<input
								type='radio'
								value='no'
								checked={!useImage}
								onChange={(e) => setUseImage(false)}
							/>
							<span>No</span>
						</div>
					</label>
				</form>
			</div>

			{useImage && (
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

			{useImage && (
				<div className='mt-[10px]'>
					<SelectedResourcesList
						selectedResources={selectedImage}
						removeResourceAtIndex={removeImageAtIndex}
					/>
				</div>
			)}

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
