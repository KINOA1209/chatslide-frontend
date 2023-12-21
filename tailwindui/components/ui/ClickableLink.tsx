import React from 'react';
import { FinishedStepIcon } from '../icons';
import { InputBox } from './InputBox';
import { GrayLabel } from './GrayLabel';
import { FaClipboard } from 'react-icons/fa';

interface ClickableLinkProps {
	link: string;
}

const ClickableLink: React.FC<ClickableLinkProps> = ({ link }) => {
	const [showTick, setShowTick] = React.useState(false);

	const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		navigator.clipboard.writeText(link);
		setShowTick(true);
	};

	return (
		<InputBox onClick={handleOnMouseDown}>
			<FaClipboard className='text-gray-600' />
			<input
				id='search_keyword'
				type='text'
				className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
				readOnly
				value={link}
			/>
			{showTick ? <FinishedStepIcon /> : <GrayLabel>Copy</GrayLabel>}
		</InputBox>
	);
};

export default ClickableLink;
