import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';
import { Transition } from '@headlessui/react';
import { Title, Explanation } from '@/components/ui/Text';
import { InputBox, NewInputBox } from './InputBox';

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
	hasInputArea?: boolean;
	inputValue?: string;
	setInputValue?: (value: string) => void;
	maxInputLength?: number;
	hasTextArea?: boolean;
	rows?: number;
  confirmText?: string;
  onCancel?: () => void;
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
	hasInputArea = false,
	inputValue,
	setInputValue,
	maxInputLength,
	hasTextArea = false,
	rows,
  confirmText = 'Confirm',
  onCancel = () => {},
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

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (setInputValue) {
			setInputValue(event.target.value);
		}
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
			if (
				e.key === 'ArrowUp' ||
				e.key === 'ArrowDown' ||
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight'
			) {
				e.stopPropagation();
			}
		};

		window.addEventListener('keydown', handleEsc);
		modalRef.current?.addEventListener('keydown', handleArrowKeys);
		return () => {
			window.removeEventListener('keydown', handleEsc);
			modalRef.current?.removeEventListener('keydown', handleArrowKeys);
		};
	}, []);

	return (
		<Transition
			className='h-[100vh] w-[100vw] z-40 bg-[#121212B2]/70 fixed top-0 left-0 flex flex-col items-center justify-center'
			show={showModal}
			onClick={() => {
				if (clickOutsideToClose) {
					setShowModal(false);
				}
			}}
			onMouseDown={(e) => {
				e.stopPropagation();
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
				className={`modal-dialog-box ${position} bg-white rounded-lg shadow max-w-full dpr:max-w-full max-h-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] overflow-y-scroll mx-2 p-2 sm:p-4`}
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
					<div
						className='modal-title-and-close-button relative flex flex-row'
						style={{ alignItems: 'center', justifyContent: 'space-between' }}
					>
						{title && (
							<div className='w-full felx flex-col items-center justify-center '>
								<Title center={false}>{title}</Title>
							</div>
						)}
						{canClose && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '6px',
									borderRadius: '32px',
									width: '36px',
									height: '36px',
									// border: '1px solid var(--Grey-02, #EBEFF2)',
								}}
							>
								<button
									id='close-modal'
									// className='absolute top-0 right-0 text-[24px] focus:outline-none'
									className='text-[24px] focus:outline-none'
									onClick={handleCloseModal}
								>
									<FaTimes className='text-gray-600 hover:text-gray-800' />
								</button>
							</div>
						)}
					</div>

					{description && <Explanation>{description}</Explanation>}

					{hasInputArea && setInputValue && (
						<InputBox>
							<input
								id='key'
								type='text'
								className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800'
								onChange={(e) => setInputValue(e.target.value)}
								value={inputValue}
								maxLength={maxInputLength}
							/>
						</InputBox>
					)}

					{hasTextArea && setInputValue && inputValue && rows && (
						<NewInputBox
							value={inputValue}
							onChange={setInputValue}
							maxLength={maxInputLength}
							textarea={hasTextArea}
							rows={rows}
						/>
					)}
					{/* Modal body */}
					{children}

					{onConfirm && (
						<div className='gap-x-2 flex flex-row justify-around'>
							{canClose && (
								<div className='mx-auto'>
									<InversedBigBlueButton
										id='modal-cancel'
										onClick={() => {
                      handleCloseModal();
                      onCancel();
                    }
                  }
									>
										Cancel
									</InversedBigBlueButton>
								</div>
							)}
							<BigBlueButton
								id='modal-confirm'
								isSubmitting={isSubmitting}
								onClick={onClick}
							>
								{confirmText}
							</BigBlueButton>
						</div>
					)}
				</div>
			</Transition>
		</Transition>
	);
};

export default Modal;
