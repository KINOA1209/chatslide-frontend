import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { stopArrowKeyPropagation } from '@/utils/editing';
import { WarningMessage } from './Text';

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
			className='h-[36px] sm:h-[36px] w-full flex flex-row flex-nowrap items-center justify-center border border-2 border-gray-200 px-3 py-2.5 gap-x-2 cursor-text rounded-lg overflow-visible'
			onClick={onClick}
			ref={ref}
		>
			{children}
		</div>
	);
};

export const NewInputBox: React.FC<{
	value: string;
	onChange: (value: string) => void;
	autoSelect?: boolean;
	maxLength: number | undefined;
	placeholder?: string;
	icon?: ReactNode;
	textarea?: boolean;
	rows?: number; // number of columns for textarea
	id?: string;
	width?: string;
	textStyle?: React.CSSProperties;
}> = ({
	value,
	onChange,
	autoSelect = false,
	maxLength,
	placeholder = 'Type here',
	icon,
	textarea = false,
	rows,
	id,
	width,
	textStyle,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	if (maxLength === undefined) {
		maxLength = textarea ? 2000 : 100;
	}

	useEffect(() => {
		ref.current?.addEventListener('keydown', stopArrowKeyPropagation);
		return () => {
			ref.current?.removeEventListener('keydown', stopArrowKeyPropagation);
		};
	}, []);

	return (
		<div className={'flex flex-col' + (width ? ` w-[${width}]` : '')}>
			<div
				className={
					'flex flex-col flex-nowrap items-center justify-center border border-2 border-gray-200 px-3 py-2.5 gap-x-2 cursor-text rounded-lg overflow-visible ' +
					(textarea ? 'h-[200px]' : 'h-[36px]')
				}
				ref={ref}
				id={id}
			>
				{icon}
				{!textarea ? (
					<input
						id='key'
						type='text'
						className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800'
						onChange={(e) => {
							onChange(e.target.value);
						}}
						onClick={(e) => {
							autoSelect && (e.target as HTMLInputElement)?.select();
						}}
						value={value}
						maxLength={maxLength}
						placeholder={placeholder}
						style={textStyle}
					/>
				) : (
					<textarea
						className='w-full h-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800'
						onChange={(e) => {
							onChange(e.target.value);
						}}
						onClick={(e) => {
							autoSelect && (e.target as HTMLInputElement)?.select();
						}}
						value={value}
						maxLength={maxLength}
						placeholder={placeholder}
						rows={rows}
						style={textStyle}
					/>
				)}
			</div>
			{/* when maxlength is reached, show a warning */}
			{value.length >= maxLength && (
				<WarningMessage>
					Max length of {maxLength} characters reached
				</WarningMessage>
			)}
		</div>
	);
};
