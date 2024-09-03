'use client';
import SelectedResourcesList from '@/components/file/SelectedResources';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import FileUploadModal from '@/components/file/FileUploadModal';
import PaywallModal from '@/components/paywallModal';
import { useUser } from '@/hooks/use-user';
import Resource from '@/models/Resource';
import { useEffect, useState } from 'react';
import { PlusLabel } from '@/components/ui/GrayLabel';
import { Explanation, Instruction } from '@/components/ui/Text';
import RadioButton from '@/components/ui/RadioButton';
import axios from 'axios';
import ResourceService from '@/services/ResourceService';
import Image from 'next/image'; // Import the Image component
import { SpinIcon } from '../icons';
import ImageSelector from './ImageSelector';
import { ResourceItem, getFileExtension } from '@/components/ui/ResourceItem';

interface Props {
	type: string;
	selectedTemplate: Resource[];
	setSelectedTemplate: (
		selectedTemplate:
			| Resource[]
			| ((prevSelectedTemplate: Resource[]) => Resource[]),
	) => void;
	showQuestion?: boolean;
	extractedTemplateImgUrl: string;
	setExtractedTemplateImgUrl: (imgUrl: string) => void;
	selectedBackground: Resource[];
	setSelectedBackground: React.Dispatch<React.SetStateAction<Resource[]>>;
	buttonCols?: number;
}

interface UploadResponse {
	data: {
		id: string;
		name: string;
		type: string;
		timestamp: string;
		thumbnail_url: string;
	};
}

interface TemplateResponse {
	data: {
		images_url: string;
	};
}

const PPTXTemplateSelector: React.FC<Props> = ({
	type,
	selectedTemplate,
	setSelectedTemplate,
	showQuestion = true,
	extractedTemplateImgUrl,
	setExtractedTemplateImgUrl,
	selectedBackground,
	setSelectedBackground,
	buttonCols = 3,
}) => {
	// console.log('selectedTemplate', selectedTemplate);
	const [showFileModal, setShowFileModal] = useState(false);
	const { isPaidUser, token } = useUser();
	const [showPaywall, setShowPaywall] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string>('no');
	// const [extractedTemplateImgUrl, setExtractedTemplateImgUrl] = useState('');
	const [loading, setLoading] = useState(false); // Add a loading state
	const [selectedTemplateFileExtension, setSelectedTemplateFileExtension] =
		useState('');

	const removeImageAtIndex = (indexToRemove: number) => {
		const newSelectedImage = selectedTemplate.filter(
			(_, index) => index !== indexToRemove,
		);
		setSelectedTemplate(newSelectedImage);
		setExtractedTemplateImgUrl(''); // Clear the image URL when the template is removed
	};

	useEffect(() => {
		if (selectedTemplate.length > 0) {
			handleTemplateExtraction(selectedTemplate);
			setSelectedTemplateFileExtension(
				getFileExtension(selectedTemplate[0]?.name),
			);
		}
	}, [selectedTemplate]);

	useEffect(() => {
		console.log(
			'SelectedTemplateFileExtension is:',
			selectedTemplateFileExtension,
		);
	}, [selectedTemplateFileExtension]);

	const handleTemplateExtraction = async (pptxResource: Resource[]) => {
		try {
			setLoading(true); // Set loading state to true
			const resourceId = pptxResource[0].id;

			const templateResponse = await axios.post<TemplateResponse>(
				'/api/pptx/template',
				{
					resource_id: resourceId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const { images_url: imageUrl } = templateResponse.data.data;
			setExtractedTemplateImgUrl(imageUrl);

			// Create a new Resource object if selectedBackground is initially empty
			const newResource: Resource = {
				id: resourceId,
				name: `extractedImg_${resourceId}`,
				type: 'doc',
				thumbnail_url: imageUrl,
			};

			// Update selectedBackground
			if (setSelectedBackground) {
				setSelectedBackground((prevBackground) =>
					prevBackground.map((resource) =>
						resource.id === resourceId
							? { ...resource, thumbnail_url: imageUrl }
							: resource,
					).length === 0
						? [newResource]
						: prevBackground,
				);
			}
		} catch (error) {
			console.error('Error uploading file or fetching template:', error);
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	return (
		<div>
			<PaywallModal
				showModal={showPaywall}
				message='Upgrade for this 🌟premium feature!'
				setShowModal={setShowPaywall}
        trigger='design/pptx_template'
			/>
			{showQuestion && (
				<div className='gap-1 flex flex-col justify-start'>
					<Instruction boldenFont={true}>
						<div>
							Do you want to upload your own {type} as slides background?
						</div>
						{!isPaidUser && <PlusLabel />}
					</Instruction>

					<RadioButton
						name={type}
						options={[
							{ value: 'yes', text: 'Yes' },
							{ value: 'no', text: 'No' },
						]}
						selectedValue={selectedValue}
						setSelectedValue={(value) => {
							if (value === 'yes') {
								if (!isPaidUser) setShowPaywall(true);
								else setSelectedValue('yes');
							} else {
								setSelectedTemplate([]);
								setSelectedValue('no');
							}
						}}
						cols={buttonCols}
					/>
				</div>
			)}

			{selectedValue === 'yes' && (
				<div className='transition-opacity duration-300 ease-in-out gap-1 flex flex-row justify-start mt-2'>
					<div>
						<SmallBlueButton
							onClick={(e) => {
								e.preventDefault();
								setShowFileModal(true);
							}}
						>
							Upload your own {type}
						</SmallBlueButton>
					</div>
				</div>
			)}

			{selectedValue === 'yes' && (
				<div className='mt-[10px]'>
					<SelectedResourcesList
						selectedResources={selectedTemplate}
						removeResourceAtIndex={removeImageAtIndex}
					/>
					{loading ? (
						<div className='flex flex-row gap-4'>
							<Explanation>
								Extracting background image from your template...{' '}
								<SpinIcon></SpinIcon>
							</Explanation>
						</div>
					) : (
						extractedTemplateImgUrl && (
							<div className='mt-4'>
								<Image
									src={extractedTemplateImgUrl}
									alt='Extracted Template'
									width={200} // Set your desired width
									height={200} // Set your desired height
								/>
								{/* <ImageSelector
									type='background'
									selectedImage={selectedBackground}
									setSelectedImage={setSelectedBackground}
									showQuestion={false}
								/> */}
							</div>
						)
					)}
				</div>
			)}

			<FileUploadModal
				selectedResources={selectedTemplate}
				setSelectedResources={setSelectedTemplate}
				showModal={showFileModal}
				setShowModal={setShowFileModal}
				pageInvoked='theme'
				uploadSection='Template Extraction'
				fileNameExtension={selectedTemplateFileExtension}
			/>
		</div>
	);
};

export default PPTXTemplateSelector;
