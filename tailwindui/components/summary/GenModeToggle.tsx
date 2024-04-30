import { MdOutlineSpeakerNotes } from 'react-icons/md';
import Toggle from '../button/Toggle';
import { FiFilePlus } from 'react-icons/fi';

const GenModeToggle = ({
	generationMode,
	setGenerationMode,
}: {
	generationMode: 'from_topic' | 'from_files';
	setGenerationMode: (mode: 'from_topic' | 'from_files') => void;
}) => {
	return (
		<Toggle
			isLeft={generationMode === 'from_topic'}
			setIsLeft={(isLeft: boolean) =>
				setGenerationMode(isLeft ? 'from_topic' : 'from_files')
			}
			// leftText='From Topic'
			// rightText='From Files'
			leftElement={
				<div className='flex flex-row gap-2 items-center'>
					<MdOutlineSpeakerNotes />
					<div>Topic First</div>
				</div>
			}
			rightElement={
				<div className='flex flex-row gap-2 items-center'>
					<FiFilePlus />
					<div>Files First</div>
				</div>
			}
		/>
	);
};

export default GenModeToggle;
