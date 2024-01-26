import React, { useEffect } from 'react';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';

type ActionsToolBarProps = {
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	// Other props...
};

const ActionsToolBar: React.FC<ActionsToolBarProps> = ({
	undo,
	redo,
	canUndo,
	canRedo,
}) => {
	return (
		<section
			className={`fixed right-[30rem] top-[10rem] shadow-md bg-white rounded-md px-2 py-1`}
		>
			<div className='flex flex-row gap-4'>
				<button
					onClick={undo}
					style={{ color: canUndo ? '#2943E9' : '#ccc' }}
					disabled={!canUndo}
				>
					<RiArrowGoBackFill />
				</button>
				<div style={{ backgroundColor: '#ccc', width: '2px' }}></div>
				<button
					onClick={redo}
					style={{ color: canRedo ? '#2943E9' : '#ccc' }}
					disabled={!canRedo}
				>
					<RiArrowGoForwardFill />
				</button>
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
