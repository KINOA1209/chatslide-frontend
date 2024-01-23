'use client';
import DrlambdaCartoonImage from '@/public/images/AIAssistant/DrLambdaCartoon.png';
import sendTextButtonImage from '@/public/images/AIAssistant/sendTextIcon.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const DrLambdaAIAssistantIcon: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div
			className='w-14 h-14 bg-neutral-50 rounded-[50%] shadow border border-black border-opacity-20 z-50 flex items-center justify-center'
			onClick={onClick}
		>
			<Image
				src={DrlambdaCartoonImage}
				alt={'DrLambdaAIAssistantImage'}
				className='w-[1.75rem] h-[2.15rem]'
			></Image>
		</div>
	);
};

interface AIAssistantChatWindowProps {
	onToggle: () => void;
}
export const AIAssistantChatWindow: React.FC<AIAssistantChatWindowProps> = ({
	onToggle,
}) => {
	// const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
	// const toggleChatWindow = () => {
	// 	setIsChatWindowOpen(!isChatWindowOpen);
	// };
	// fixed right-0 top-[5rem]
	return (
		<section
			className={`max-[640px]:fixed right-0 top-[5rem] h-[100vh] sm:flex sm:flex-col sm:items-center sm:justify-between z-50 shadow-md bg-white`}
			style={{
				boxShadow:
					'-4px 0 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			{/* title and exit button */}
			<div className='flex flex-row justify-between items-center px-[0.5rem] w-[20rem] h-[5rem] pb-2'>
				{/* drlambda.ai title */}
				<div className='flex flex-row items-center gap-4'>
					<Image
						src={DrlambdaCartoonImage}
						alt={'DrLambdaAIAssistantImage'}
						className='w-[1.75rem] h-[2.15rem]'
					></Image>
					<div className="text-neutral-900 text-sm font-semibold font-['Inter']">
						DrLambda.AI
					</div>
					{/* Round dot */}
					<div className='w-2 h-2 bg-[#0B84FF] rounded-full'></div>
				</div>

				{/* exit button */}
				<button
					style={{
						width: '1.25rem',
						height: '1.25rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						cursor: 'pointer',
					}}
					onClick={onToggle}
				>
					<AiOutlineClose color='#5168F6' />
				</button>
			</div>

			{/* chat history text */}
			<div className='h-full w-full border-t-2 border-gray-300'></div>
			{/* input area */}
			<div className='h-[5rem] w-full'>
				<div className='flex flex-row justify-between py-3 px-2 items-center'>
					{/* input area */}
					<input
						type='input'
						className='px-2 py-1 w-64 bg-zinc-100 rounded-3xl'
					/>

					<div className='w-7 h-7'>
						<Image
							src={sendTextButtonImage}
							alt={'sendText'}
							className='h-full'
						></Image>
					</div>
				</div>
			</div>
		</section>
	);
};
