import Modal from './Modal';

interface StatusProgressBarProps {
	onConfirm: () => void;
	onClose: () => void;
}

export const StatusProgressBar: React.FC<StatusProgressBarProps> = ({
	onConfirm,
	onClose,
}) => {
	return (
		<Modal
			showModal={true}
			setShowModal={onClose}
			position='fixed max-w-lg h-auto'
		>
			{/* <img
				src={StartATourImg.src}
				alt='Start Tour Guide'
				style={{ maxWidth: '12rem', alignSelf: 'center' }}
			/> */}

			<TutorialStepContent
				action={'Welcome to the Guided Tutorial! 🌟'}
				explanation={
					'Would you like to start a guided tutorial to help you navigate through the features of this page?'
				}
			></TutorialStepContent>

			<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
				<SecondaryColorButton
					label={'Not Now'}
					onClick={onClose}
				></SecondaryColorButton>

				<PrimaryColorButton
					label={'Sure'}
					onClick={onConfirm}
				></PrimaryColorButton>
			</div>
		</Modal>
	);
};
