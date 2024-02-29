import React, { useEffect, useState } from 'react';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { GoQuestion } from 'react-icons/go';
import { StartATourGuidePromptWindow } from '@/components/user_onboarding/CustomComponents';
import ButtonWithExplanation from '../button/ButtonWithExplanation';

type ActionsToolBarProps = {
	undo?: () => void;
	redo?: () => void;
	canUndo?: boolean;
	canRedo?: boolean;
	// Other props...
	startTour: () => void;
	onlyShowTutorial: boolean;
};

const ActionsToolBar: React.FC<ActionsToolBarProps> = ({
	undo,
	redo,
	canUndo,
	canRedo,
	startTour,
	onlyShowTutorial,
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
	return onlyShowTutorial ? (
		<section
			className={`shadow-md bg-white rounded-[0.5rem] px-4 py-2 border-2 border-[#C6C6C6]`}
		>
			<div className='flex flex-row gap-4'>
				{/* user tutorial control */}
				<ButtonWithExplanation
					button={
						<button
							onClick={handleStartTour}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<GoQuestion
								style={{
									strokeWidth: '1',
									flex: '1',
									width: '1.5rem',
									height: '1.5rem',
									fontWeight: 'bold',
									color: '#2943E9',
								}}
							/>
						</button>
					}
					explanation={'Guided user tutorial'}
				></ButtonWithExplanation>

				{showTutorialPrompt && (
					<StartATourGuidePromptWindow
						onClose={handleCloseTutorialPrompt}
						onConfirm={handleConfirmStartTour}
					/>
				)}
			</div>
		</section>
	) : (
		<section
			className={`shadow-md bg-white rounded-[0.5rem] px-4 py-2 border-2 border-[#C6C6C6]`}
		>
			<div className='flex flex-row gap-4'>
				{/* user tutorial control */}
				<ButtonWithExplanation
					button={
						<button
							onClick={handleStartTour}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<GoQuestion
								style={{
									strokeWidth: '1',
									flex: '1',
									width: '1.5rem',
									height: '1.5rem',
									fontWeight: 'bold',
									color: '#2943E9',
								}}
							/>
						</button>
					}
					explanation={'Guided user tutorial'}
				></ButtonWithExplanation>

				<div style={{ backgroundColor: '#C6C6C6', width: '2px' }}></div>
				<ButtonWithExplanation
					button={
						<button
							onClick={undo}
							style={{ color: canUndo ? '#2943E9' : '#C6C6C6' }}
							disabled={!canUndo}
						>
							<RiArrowGoBackFill
								style={{
									strokeWidth: '1',
									flex: '1',
									width: '1.5rem',
									height: '1.5rem',
									fontWeight: 'bold',
								}}
							/>
						</button>
					}
					explanation={'Undo'}
				></ButtonWithExplanation>

				<div style={{ backgroundColor: '#C6C6C6', width: '2px' }}></div>
				<ButtonWithExplanation
					button={
						<button
							onClick={redo}
							style={{ color: canRedo ? '#2943E9' : '#C6C6C6' }}
							disabled={!canRedo}
						>
							<RiArrowGoForwardFill
								style={{
									strokeWidth: '1',
									flex: '1',
									width: '1.5rem',
									height: '1.5rem',
									fontWeight: 'bold',
								}}
							/>
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
