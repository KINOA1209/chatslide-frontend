import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';
import { Transition } from '@headlessui/react';
import { Title, Explanation } from '@/components/ui/Text';

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
	width?: string;
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
	width,
}) => {
	const modalRef = React.useRef<HTMLDivElement>(null);
	const modalContentRef = React.useRef<HTMLDivElement>(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleCloseModal = () => {
		// console.log('handleCloseModal');
		if (!canClose) return;
		else if (!clickOutsideToClose) return;
		else {
			setShowModal(false);
		}
	};

	const onClick = async () => {
		if (!onConfirm) return;
		setIsSubmitting(true);
		console.log('onConfirm');
		await onConfirm();
		console.log('onConfirm resolved');
		setIsSubmitting(false);
		setShowModal(false);
	};

	// press esc to close modal
	React.useEffect(() => {
		if (!canClose) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCloseModal();
				e.stopPropagation();
			}
		};

		const handleArrowKeys = (e: KeyboardEvent) => {
			if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				e.stopPropagation();
			}
		}

		window.addEventListener('keydown', handleEsc);
		modalRef.current?.addEventListener('keydown', handleArrowKeys);
		return () => {
			window.removeEventListener('keydown', handleEsc);
			modalRef.current?.removeEventListener('keydown', handleArrowKeys);
		};
	}, []);

	return (
		<Transition
			className='h-[100vh] w-[100vw] z-40 bg-slate-200/80 fixed top-0 left-0 flex flex-col items-center justify-center'
			show={showModal}
			onClick={() => {
				if (clickOutsideToClose) {
					setShowModal(false);
				}
			}}
			enter='transition ease duration-300 transform'
			enterFrom='opacity-0 translate-y-12'
			enterTo='opacity-100 translate-y-0'
			leave='transition ease duration-300 transform'
			leaveFrom='opacity-100 translate-y-0'
			leaveTo='opacity-0 translate-y-12'
			ref={modalRef}
		>
			{/* ${position} bg-white rounded-lg shadow max-w-full sm:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] max-h-[90%] overflow-y-hidden mx-2 p-2 sm:p-4 */}
			<Transition
				className={`${position} bg-white rounded-lg shadow max-w-[60%] max-h-full md:max-w-[80%] xl:max-w-[50%] overflow-y-hidden mx-2 p-2 sm:p-4`}
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
				style={{ width: width ? width : 'auto' }}
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
						<div className='w-full felx flex-col items-center justify-center'>
							<Title>{title}</Title>
						</div>
					)}

					{description && <Explanation>{description}</Explanation>}

					{/* Modal body */}
					{children}

					{onConfirm && (
						<div className='grid grid-cols-2 gap-x-2 justify-end'>
							{canClose && (
								<InversedBigBlueButton onClick={handleCloseModal}>
									Cancel
								</InversedBigBlueButton>
							)}
							<BigBlueButton isSubmitting={isSubmitting} onClick={onClick}>
								Confirm
							</BigBlueButton>
						</div>
					)}
				</div>
			</Transition>
		</Transition>
	);
};

export default Modal;
