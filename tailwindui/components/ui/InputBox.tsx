import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { stopArrowKeyPropagation  } from '@/utils/editing';

type InputBoxProps = {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
	isSubmitting?: boolean;
	isPaidUser?: boolean;
	isPaidFeature?: boolean;
};

export const InputBox: React.FC<InputBoxProps> = ({ children, onClick }) => {

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		ref.current?.addEventListener('keydown', stopArrowKeyPropagation);
		return () => {
			ref.current?.removeEventListener('keydown', stopArrowKeyPropagation);
		};
	}, []);

	return (
		<div
			className='h-[36px] sm:h-[36px] w-full flex flex-row flex-nowrap items-center justify-center border border-2 border-gray-200 bg-gray-100 px-3 py-2.5 gap-x-2 cursor-text rounded-lg overflow-visible'
			onClick={onClick}
			ref={ref}
		>
			{children}
		</div>
	);
};
