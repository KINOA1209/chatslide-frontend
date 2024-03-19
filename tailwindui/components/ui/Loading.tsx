const Loading: React.FC<{
	children?: React.ReactNode;
	text?: string;
}> = ({ children, text }) => {
	return (
		<div className='w-full h-full flex flex-row items-center justify-center overflow-auto'>
			<div className='text-center text-lg text-gray-600'>
				{children ? children : text ? text : 'Loading...⏳'}
			</div>
		</div>
	);
};

const Blank = Loading;

export { Blank, Loading };
