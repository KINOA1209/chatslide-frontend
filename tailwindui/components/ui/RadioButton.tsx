import React from 'react';
import Image from 'next/image';
import { Explanation } from './Text';

export interface RadioButtonOption {
	img?: any;
	value: string;
	icon?: JSX.Element;
	text: string;
  explanation?: string
}

interface RadioButtonProps {
	name: string;
	options: RadioButtonOption[];
	selectedValue: string;
	setSelectedValue: (value: string) => void;
	cols?: number;
}

const RadioButton: React.FC<RadioButtonProps> = ({
	name,
	options,
	selectedValue,
	setSelectedValue,
	cols = 4,
}) => {
	return (
		<div className={`grid grid-cols-1 md:grid-cols-${cols} gap-x-3`}>
			{options.map(({ img, value, text, icon, explanation }) => (
				<div
					key={value}
					className={`rounded-lg`}
					onClick={() => setSelectedValue(value)}
				>
					<label>
						{img && (
							<div className='h-[100px]'>
								<Image src={img} alt={text} height={100} />
							</div>
						)}
						<div className='flex flex-row items-center gap-x-2'>
							<input
								type='radio'
								name={name}
								value={value}
								checked={selectedValue === value}
								onChange={() => setSelectedValue(value)}
							/>
							<span className='flex flex-row justify-center items-center gap-1'>
								{icon}
								<div className='flex flex-col'>
									{text}
									<Explanation>{explanation}</Explanation>
								</div>
							</span>
						</div>
					</label>
				</div>
			))}
		</div>
	);
};

export default RadioButton;
