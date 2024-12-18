import React, { FC } from 'react';

interface ExitTourButtonProps {
	imgSRC: string;
	onClick: () => void;
	isTourActive: boolean;
}
export const ExitTourButton: React.FC<ExitTourButtonProps> = ({
	onClick,
	imgSRC,
	isTourActive,
}) => {
	return (
		<>
			<button
				className={`${
					isTourActive ? 'left-[10%] bottom-[20%] fixed' : 'hidden'
				}`}
				style={{ zIndex: 1000 }}
				onClick={onClick}
			>
				<div className='flex flex-row items-center justify-center gap-[0.5rem]'>
					<div className='w-8 rounded-full border-2 border-white'>
						<img src={imgSRC} alt='Exit button' />
					</div>
					<div className='w-28 text-left text-white text-base font-medium leading-tight'>
						Exit tour
					</div>
				</div>
			</button>
		</>
	);
};

interface ButtonProps {
	onClick?: () => void;
	label: string;
	primary?: boolean;
	disabled?: boolean;
}

const PrimaryColorButton: FC<ButtonProps> = ({ onClick, label, disabled }) => {
	return (
		<button
			onClick={onClick}
			className={`w-24 h-10 px-2 py-0.5 ${
				disabled ? 'bg-[#919DAA]' : 'bg-[#5168f6]'
			} rounded justify-center items-center gap-1.5 inline-flex`}
			disabled={disabled}
		>
			<span className='text-center text-zinc-100 text-base font-medium leading-none tracking-wide'>
				{label}
			</span>
		</button>
	);
};

const SecondaryColorButton: FC<ButtonProps> = ({
	onClick,
	label,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			className='w-24 h-10 px-2 py-0.5 rounded border border-[#FFFFFF] justify-center items-center gap-1.5 inline-flex'
			disabled={disabled}
		>
			<span className='text-center text-[#5168f6] text-base font-medium leading-none tracking-wide'>
				{label}
			</span>
		</button>
	);
};

export { PrimaryColorButton, SecondaryColorButton };
