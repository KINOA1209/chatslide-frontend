import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Card: React.FC<{
	children: React.ReactNode;
	id?: string;
	// canClose?: boolean;
}> = ({
	children,
	id,
	// canClose
}) => {
	// const [show, setShow] = useState(true);
	// if (!show) return null;

	return (
		<div
			className='w-full rounded-lg p-2 sm:p-4 border border-2 border-gray-200 flex flex-col justify-start gap-y-4 relative'
			id={id}
		>
			{/* {canClose && (
				<button
					className='absolute top-2 right-2 focus:outline-none'
					onClick={()=>setShow(false)}
				>
					<FaTimes className='text-gray-600 hover:text-gray-800' />
				</button>
			)} */}
			{children}
		</div>
	);
};

export default Card;
