import React from 'react';

interface ToggleProps {
	isLeft: boolean;
	setIsLeft: (value: boolean) => void;
	leftText?: string;
	rightText?: string;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({
	isLeft,
	setIsLeft,
	leftText,
	rightText,
	leftElement,
	rightElement,
}) => {
	return (
		<div className='toggle flex justify-center items-center'>
			<div className='flex items-center rounded-md border bg-gray-200 px-0.5 py-0.5 my-1'>
				<div
					className={`cursor-pointer min-w-[130px] h-[36px] px-2 py-1 flex justify-center items-center rounded-md ${isLeft ? 'bg-white text-[#5168F6]' : ''}`}
					onClick={() => setIsLeft(true)}
				>
					<div
						className={`flex flex-row gap-2 font-bold break-words items-center justify-center
										   ${isLeft ? 'text-[#5168F6]' : 'text-[#707C8A]'}
										  `}
					>
						{ leftText || leftElement }
					</div>
				</div>
				<div
					className={`cursor-pointer min-w-[130px] h-[36px] px-2 py-1 flex justify-center items-center rounded-md ${!isLeft ? 'bg-white text-[#5168F6]' : ''}`}
					onClick={() => setIsLeft(false)}
				>
					<div
						className={`flex flex-row gap-2 font-bold break-words items-center justify-center
								           ${!isLeft ? 'text-[#5168F6]' : 'text-[#707C8A]'}
										  `}
					>
						{ rightText || rightElement }
					</div>
				</div>
			</div>
			</div>
	);
};

export default Toggle;
