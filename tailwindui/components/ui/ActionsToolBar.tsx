import React, { useEffect, useState } from 'react';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { GoQuestion } from 'react-icons/go';
import { StartATourGuidePromptWindow } from '@/components/user_onboarding/CustomComponents';
import ButtonWithExplanation from '../button/ButtonWithExplanation';

type ActionsToolBarProps = {
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	// Other props...
	startTour: () => void;
};

const ActionsToolBar: React.FC<ActionsToolBarProps> = ({
	undo,
	redo,
	canUndo,
	canRedo,
	startTour,
}) => {
	const [showTutorialPrompt, setShowTutorialPrompt] = useState(false);
	const handleStartTour = () => {
		setShowTutorialPrompt(true);
	};

	const handleCloseTutorialPrompt = () => {
		setShowTutorialPrompt(false);
	};

	const handleConfirmStartTour = () => {
		startTour();
		setShowTutorialPrompt(false);
	};
	return (
		<section className={`shadow-md bg-white rounded-md px-2 py-1`}>
			<div className='flex flex-row gap-4'>
				{/* user tutorial control */}
				<ButtonWithExplanation
					button={
						<button onClick={handleStartTour} style={{ color: '#2943E9' }}>
							<GoQuestion />
						</button>
					}
					explanation={'Guided user tutorial'}
				></ButtonWithExplanation>

				<div style={{ backgroundColor: '#ccc', width: '2px' }}></div>
				<ButtonWithExplanation
					button={
						<button
							onClick={undo}
							style={{ color: canUndo ? '#2943E9' : '#ccc' }}
							disabled={!canUndo}
						>
							<RiArrowGoBackFill />
						</button>
					}
					explanation={'Undo'}
				></ButtonWithExplanation>

				<div style={{ backgroundColor: '#ccc', width: '2px' }}></div>
				<ButtonWithExplanation
					button={
						<button
							onClick={redo}
							style={{ color: canRedo ? '#2943E9' : '#ccc' }}
							disabled={!canRedo}
						>
							<RiArrowGoForwardFill />
						</button>
					}
					explanation={'Redo'}
				></ButtonWithExplanation>

				{showTutorialPrompt && (
					<StartATourGuidePromptWindow
						onClose={handleCloseTutorialPrompt}
						onConfirm={handleConfirmStartTour}
					/>
				)}
			</div>
		</section>
	);
};

export default ActionsToolBar;

// useEffect(() => {
// 	const handleKeyDown = (event: KeyboardEvent) => {
// 		if (event.metaKey) {
// 			if (event.key === 'z' || event.key === 'Z') {
// 				// Undo with Command + Z
// 				undo();
// 			} else if (event.shiftKey && (event.key === 'z' || event.key === 'Z')) {
// 				// Redo with Command + Shift + Z
// 				redo();
// 			}
// 		}
// 	};

// 	document.addEventListener('keydown', handleKeyDown);

// 	return () => {
// 		document.removeEventListener('keydown', handleKeyDown);
// 	};
// }, [undo, redo]);
