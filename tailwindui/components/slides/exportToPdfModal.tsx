import Link from 'next/link';
import React, { useState } from 'react';

const ExportToPDFModal = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<>
			{/* Modal toggle */}
			<button
				data-modal-target='staticModal'
				data-modal-toggle='staticModal'
				className='btn text-blue-600 bg-gray-100 hover:bg-gray-200 w-full border border-blue-600'
				type='button'
				onClick={toggleModal}
			>
				Save as PDF
			</button>

			{/* Main modal */}
			{modalVisible && (
				<div
					id='staticModal'
					data-modal-backdrop='static'
					tabIndex={-1}
					aria-hidden='true'
					className='fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full'
				>
					<div className='relative bg-white rounded-lg shadow dark:bg-gray-700 w-128'>
						{/* Modal header */}
						<div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
								To Continue
							</h3>
							<button
								type='button'
								className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
								data-modal-hide='staticModal'
								onClick={toggleModal}
							>
								<svg
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</button>
						</div>
						{/* Modal body */}
						<div className='p-6 space-y-6'>
							<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
								To download or continue to generate the transcript, please sign
								in.
							</p>
						</div>
						{/* Modal footer */}
						<div className='flex items-center justify-end p-4 bg-gray-100 dark:bg-gray-800 rounded-b'>
							<div className='space-x-2'>
								<Link
									href='/signin?next=slides'
									data-modal-hide='staticModal'
									type='button'
									className='text-gray-200 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									onClick={toggleModal}
								>
									Sign in
								</Link>
								<Link
									href='/signup?next=slides'
									data-modal-hide='staticModal'
									type='button'
									className='text-gray-200 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									onClick={toggleModal}
								>
									Sign up
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ExportToPDFModal;
