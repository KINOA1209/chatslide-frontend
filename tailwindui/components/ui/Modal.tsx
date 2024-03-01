import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';

interface ModalProps {
	children?: React.ReactNode;
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	position?: string;
	onConfirm?: () => void;
	title?: string;
	description?: string;
	clickOutsideToClose?: boolean;
	canClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	children,
	showModal,
	setShowModal,
	position,
	onConfirm,
	title,
	description,
	clickOutsideToClose = true,
	canClose = true,
}) => {
	const modalRef = React.useRef<HTMLDivElement>(null);
	const modalContentRef = React.useRef<HTMLDivElement>(null);

	const handleCloseModal = () => {
		console.log('handleCloseModal');
		if (!canClose) return;
		setShowModal(false);
	};

	const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!clickOutsideToClose) return;
		if (!canClose) return;
		if (modalContentRef.current?.contains(e.target as Node)) {
			return; // Click inside the modal content, do nothing
		}
		handleCloseModal(); // Click outside the modal content, close the modal
	};

	// press esc to close modal
	React.useEffect(() => {
		if (!canClose) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCloseModal();
			}
		};

		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);

	return (
		<>
			{showModal && (
				<div
					ref={modalRef}
					id='staticModal'
					data-modal-backdrop='static'
					tabIndex={-1}
					aria-hidden='true'
					className='fixed top-0 left-0 right-0 flex items-center justify-center w-scren h-screen z-50'
					onClick={handleOutsideClick}
				>
					{/* closable modal */}
					<div
						className='fixed inset-0 transition-opacity w-scree h-screen z-40'
						aria-hidden='true'
					>
						<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
					</div>
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>

					<div
						ref={modalContentRef}
						className={`z-50 ${position} bg-white rounded-lg shadow sm:max-w-[80%] max-h-[80%] overflow-y-auto p-2 sm:p-4`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button */}
						<div className='relative flex flex-col gap-y-4'>
							{canClose && (
								<button
									className='absolute top-0 right-0 text-2xl focus:outline-none'
									onClick={handleCloseModal}
								>
									<FaTimes className='text-gray-600 hover:text-gray-800' />
								</button>
							)}

							{title && (
								<h3
									className='text-lg leading-6 font-bold text-gray-900'
									id='modal-headline'
								>
									{title}
								</h3>
							)}

							{description && (
								<p className='text-sm text-gray-500'>{description}</p>
							)}

							{/* Modal body */}
							{children}

							{onConfirm && (
								<div className='flex gap-x-2 justify-end'>
									{canClose && (
										<InversedBigBlueButton onClick={handleCloseModal}>
											Cancel
										</InversedBigBlueButton>
									)}
									<BigBlueButton onClick={onConfirm}>Confirm</BigBlueButton>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
