import { QuestionExplainIcon } from '@/app/(feature)/icons';
import React from 'react';

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className='text-neutral-800 text-xl font-bold py-1 text-center'>{children}</div>;
};

const BigTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className='text-neutral-800 text-2xl font-bold py-1'>{children}</div>;
};


const Instruction: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className='text-neutral-800 text-md py-1'>{children}</div>;
};

const Explanation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className='text-gray-500 text-sm'>{children}</div>;
};

const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <div className='text-red-500 text-sm'>{children}</div>;
};

const ExplanationPopup: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [showExplanationPopup, setShowExplanationPopup] = React.useState(false);

	return (
		<div className='relative inline-block'>
			<div
				className='cursor-pointer'
				onMouseEnter={() => setShowExplanationPopup(true)}
				onMouseLeave={() => setShowExplanationPopup(false)}
				onTouchStart={() => setShowExplanationPopup(true)}
				onTouchEnd={() => setShowExplanationPopup(false)}
			>
				<QuestionExplainIcon />
				{showExplanationPopup && (
					<div className='absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-md w-[15rem] h-[5rem] md:w-80 md:h-[4rem] flex justify-center items-center'>
						{children}
					</div>
				)}
			</div>
		</div>
	);
};

export { Title, BigTitle, Instruction, Explanation, ErrorMessage, ExplanationPopup };
