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
					<div className='w-28 text-left text-white text-base font-medium font-creato-medium leading-tight'>
						Exit tour
					</div>
				</div>
			</button>
		</>
	);
};
