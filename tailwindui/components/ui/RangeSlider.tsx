import React, { useState } from 'react';
import PaywallModal from '../paywallModal';
import { Explanation } from './Text';

interface RangeSliderProps {
	onChange?: (value: number) => void;
	label?: string;
	value: number; // Accepting a single value
	choices: number[]; // Accepting a list of values
	locked?: boolean;
	minValue?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
	onChange,
	label,
	value,
	choices,
	locked,
	minValue
}) => {
	const [index, setIndex] = useState<number>(choices.indexOf(value));
	const MAX_VALUE = choices.length - 1;
	const minValueIndex = minValue ? choices.indexOf(minValue) : 0;
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('locked', locked);

		if (locked) {
			setShowPaymentModal(true);
			return;
		}
		const newIndex = e.target.valueAsNumber;
		if (newIndex < minValueIndex) 
			return;
		setIndex(newIndex);
		if (onChange) {
			onChange(choices[newIndex]);
		}
	};

	return (
		<div className='w-full h-[36px] flex flex-row items-center my-auto'>
			{label && (
				<label className='block text-gray-700 mb-2'>
					<b>
						{locked ? '🔒 ' : '⭐️ '}
						{label}
					</b>
					: {choices[index]}
				</label>
			)}
			<div className='w-full flex items-center space-x-4'>
				<input
					type='range'
					min={0}
					max={MAX_VALUE}
					value={index}
					step={1}
					onChange={handleOnChange}
					className='slider-thumb appearance-none w-full h-2 bg-gray-200 cursor-pointer rounded-full outline-none'
					style={{
						backgroundImage: `linear-gradient(90deg, #8B91FB, #E5E7EB ${(index / MAX_VALUE) * 100}%)`,
					}}
				/>

				<style jsx>{`
					input[type='range']::-webkit-slider-thumb {
						appearance: none;
						height: 16px;
						width: 16px;
						border-radius: 50%;
						background: #5168F6;
						cursor: pointer;
						transition: background 0.15s ease-in-out;
					}

					input[type='range']::-moz-range-thumb {
						height: 16px;
						width: 16px;
						border-radius: 50%;
						background: #5168F6;
						cursor: pointer;
						transition: background 0.15s ease-in-out;
					}

					input[type='range']:focus::-webkit-slider-thumb {
						background: #364099; // Darkened color for focus state
					}

					input[type='range']:focus::-moz-range-thumb {
						background: #364099; // Darkened color for focus state
					}
				`}</style>
			</div>
			{/* <Explanation>{value}</Explanation> */}
			<PaywallModal
				showModal={showPaymentModal}
				setShowModal={setShowPaymentModal}
				message='Upgrade to unlock more features. 🚀'
			/>
		</div>
	);
};

export default RangeSlider;
