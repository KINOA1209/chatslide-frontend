import React, { useEffect, useState } from 'react';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { GoQuestion } from 'react-icons/go';
import { StartATourGuidePromptWindow } from '@/components/user_onboarding/CustomComponents';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { ToolBar } from './ToolBar';

type ActionsToolBarProps = {
	undo?: () => void;
	redo?: () => void;
	canUndo?: boolean;
	canRedo?: boolean;
	// Other props...
	startTour: () => void;
	onlyShowTutorial: boolean;
	isViewing?: boolean;
	children?: React.ReactNode;
};

const ActionsToolBar: React.FC<ActionsToolBarProps> = ({
	undo,
	redo,
	canUndo,
	canRedo,
	startTour,
	onlyShowTutorial,
	isViewing = false,
	children
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
		<ToolBar>
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
				explanation={'User tutorial'}
			/>

			{showTutorialPrompt && (
				<StartATourGuidePromptWindow
					onClose={handleCloseTutorialPrompt}
					onConfirm={handleConfirmStartTour}
				/>
			)}
		</ToolBar>
	) : (
		<ToolBar>
			{/* user tutorial control */}
			{!isViewing &&
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
					explanation={'User tutorial'}
				/>}

			{!isViewing && <>
				<div className='h-8 w-0.5 bg-gray-200'></div>

				<ButtonWithExplanation
					button={
						<button
							onClick={undo}
							style={{
								color: canUndo ? '#2943E9' : '#C6C6C6',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
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
				/>

				<ButtonWithExplanation
					button={
						<button
							onClick={redo}
							style={{
								color: canRedo ? '#2943E9' : '#C6C6C6',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
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
				/>
			</>}

			{children}

			{showTutorialPrompt && (
				<StartATourGuidePromptWindow
					onClose={handleCloseTutorialPrompt}
					onConfirm={handleConfirmStartTour}
				/>
			)}
		</ToolBar>
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
