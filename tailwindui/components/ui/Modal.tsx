import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';
import { Transition } from '@headlessui/react';

interface ModalProps {
	children?: React.ReactNode;
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	position?: string;
	onConfirm?: () => Promise<void> | void;
	onConfirmAsync?: () => Promise<void>;
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
	const [isSubmitting, setIsSubmitting] = React.useState(false);

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

	const onClick = async () => {
		if (!onConfirm) return;
		setIsSubmitting(true);
		console.log('onConfirm');
		await onConfirm();
		console.log('onConfirm resolved');
		setIsSubmitting(false);
		setShowModal(false);
	}

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
		<Transition
			className='h-[100vh] w-[100vw] z-40 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
			show={showModal}
			onClick={() => setShowModal(false)}
			enter='transition ease duration-300 transform'
			enterFrom='opacity-0 translate-y-12'
			enterTo='opacity-100 translate-y-0'
			leave='transition ease duration-300 transform'
			leaveFrom='opacity-100 translate-y-0'
			leaveTo='opacity-0 translate-y-12'
			ref={modalRef}
		>
			<div className='grow md:grow-0'></div>
			<Transition
				className={`${position} bg-white rounded-lg shadow sm:max-w-[80%] lg:max-w-[50%] max-h-[90%] overflow-y-auto p-2 sm:p-4`}
				show={showModal}
				enter='transition ease duration-500 transform delay-300'
				enterFrom='opacity-0 translate-y-12'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease duration-300 transform'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-12'
				onClick={(e) => {
					e.stopPropagation();
				}}
				ref={modalContentRef}
			>
				<div className='relative flex flex-col gap-y-4'>
					{/* Close button */}
					{canClose && (
						<button
							className='absolute top-0 right-0 text-xl focus:outline-none'
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
							<BigBlueButton
								isSubmitting={isSubmitting}
								onClick={onClick}
							>
								Confirm
							</BigBlueButton>
						</div>
					)}
				</div>
			</Transition>
		</Transition >
	);
};

export default Modal;
