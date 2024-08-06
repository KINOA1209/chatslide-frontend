import React from 'react';
import Image from 'next/image';
import { Explanation } from './Text';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

export interface RadioButtonOption {
	img?: any;
	value: string;
	icon?: JSX.Element;
	text: string;
	explanation?: string;
}

interface RadioButtonProps {
	name: string;
	options: RadioButtonOption[] | string[];
	selectedValue: string;
	setSelectedValue: (value: string) => void;
	cols?: number;
}

const CustomRadio = styled(Radio)({
	'&.Mui-checked': {
		color: '#5168F6',
	},
});

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'.MuiFormControlLabel-label': {
		fontSize: '14px', // Adjust font size as needed
		fontWeight: 'normal', // Adjust font weight as needed
		// fontFamily: 'Creato Display Medium',
	},
}));

const RadioButton: React.FC<RadioButtonProps> = ({
	name,
	options,
	selectedValue,
	setSelectedValue,
	cols = 4,
}) => {
	// return (
	// 	<div className={`grid grid-cols-1 md:grid-cols-${cols} gap-x-3`}>
	// 		{options.map(({ img, value, text, icon, explanation }) => (
	// 			<div
	// 				key={value}
	// 				className={`rounded-lg`}
	// 				onClick={() => setSelectedValue(value)}
	// 			>
	// 				<label>
	// 					{img && (
	// 						<div className='h-[100px]'>
	// 							<Image src={img} alt={text} height={100} />
	// 						</div>
	// 					)}
	// 					<div className='flex flex-row items-center gap-x-2'>
	// 						<input
	// 							type='radio'
	// 							name={name}
	// 							value={value}
	// 							checked={selectedValue === value}
	// 							onChange={() => setSelectedValue(value)}
	// 						/>
	// 						<span className='flex flex-row justify-center items-center gap-1'>
	// 							{icon}
	// 							<div className='flex flex-col'>
	// 								{text}
	// 								<Explanation>{explanation}</Explanation>
	// 							</div>
	// 						</span>
	// 					</div>
	// 				</label>
	// 			</div>
	// 		))}
	// 	</div>
	// );

	const formattedOptions = options.map((option) => {
		if (typeof option === 'string') {
			return {
				value: option,
				text: option,
			};
		}
		return option;
	});

	return (
		<FormControl component='fieldset' id={'radio_button-' + name}>
			<RadioGroup
				aria-label={name}
				name={name}
				value={selectedValue}
				onChange={(event) => setSelectedValue(event.target.value)}
				className={`grid grid-cols-1 md:grid-cols-${cols} gap-x-3`}
			>
				{formattedOptions.map(({ img, value, text, icon, explanation }) => (
					<CustomFormControlLabel
						key={value}
						value={value}
						control={<CustomRadio />}
						label={
							<div className='flex flex-row items-center gap-x-2'>
								{img && (
									<div className='h-[100px]'>
										<Image src={img} alt={text} height={100} />
									</div>
								)}
								<span className='flex flex-row justify-center items-center gap-0'>
									{icon}
									<div className='flex flex-col'>
										{text}
										<Explanation>{explanation}</Explanation>
									</div>
								</span>
							</div>
						}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioButton;
