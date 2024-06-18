import React, { useEffect, useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { TbDragDrop2, TbRefresh } from 'react-icons/tb';
import { Rnd } from 'react-rnd';

export enum ElementType {
	TextEdit,
	ImageView,
}

interface DragElementProps {
	children: JSX.Element;
	type: ElementType;
	zindex: number;
}

export const DragElement = ({
	children: content,
	type,
	zindex,
}: DragElementProps) => {
	const [isDragDisable, setIsDragDisable] = useState<boolean>(true);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleDragStart = (e: any) => {
		if (isDragDisable) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const isVisible = useMemo(
		() => isOverHandler || !isDragDisable,
		[isOverHandler, isDragDisable],
	);

	const handlerCSS: React.CSSProperties = useMemo(
		() => ({
			background: '#545657',
			width: '20px',
			height: '20px',
			padding: '2px',
			position: 'absolute',
			left: '-20px',
			zIndex: '120',
			borderTopLeftRadius: '5px',
			borderBottomLeftRadius: '5px',
			visibility: `${isVisible ? 'visible' : 'hidden'}`,
		}),
		[isVisible],
	);

	const elementCSS: React.CSSProperties = useMemo(
		() => ({
			borderStyle: 'solid',
			borderColor: `${isVisible ? '#545657' : 'rgba(0, 0, 0, 0)'}`,
			borderRadius: '5px',
			borderWidth: '2px',
			borderTopLeftRadius: '0px',
			width: '100%',
			height: '100%',
		}),
		[isVisible],
	);

	const widthResizeCSS: React.CSSProperties = {
		width: '3px',
		height: '25px',
		borderRadius: '3px',
		backgroundColor: 'black',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
	};

	const heightResizeCSS: React.CSSProperties = {
		width: '25px',
		height: '3px',
		borderRadius: '3px',
		backgroundColor: 'black',
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
	};

	const dropHandler = () => {
		setIsDragDisable(true);
	};

	const handleOnDrag = (e: any, data: any) => {
		setPosition({ x: data.x, y: data.y });
	};

	useEffect(() => {
		document.addEventListener('mouseup', dropHandler);
	}, []);

	return (
		<Draggable
			onStart={handleDragStart}
			position={position}
			onDrag={handleOnDrag}
		>
			<div
				className={`DraggableElement ${type === ElementType.ImageView ? 'w-full h-full' : ''}`}
				onMouseEnter={() => {
					setIsOverHandler(true);
				}}
				onMouseLeave={() => {
					setIsOverHandler(false);
				}}
			>
				<div
					className={'ElementHandler'}
					style={{ ...handlerCSS, cursor: 'move' }}
					onMouseDown={(e) => {
						setIsDragDisable(false);
					}}
					onMouseUp={(e) => {
						setIsDragDisable(true);
					}}
				>
					<div>
						<TbDragDrop2 size={16} color={'white'} />
					</div>
				</div>
				<div
					className={'ResetHandler'}
					style={{ ...handlerCSS, top: '23px' }}
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
					onClick={() => {
						setPosition({ x: 0, y: 0 });
					}}
				>
					<div>
						<TbRefresh size={16} color={'white'} />
					</div>
				</div>
				<Rnd
					className='ResizableElement w-full h-full'
					size={{ width: 'max-content', height: 'max-content' }}
					style={{ position: 'relative' }}
					lockAspectRatio={false}
					disableDragging={true}
					resizeHandleStyles={{
						bottom: heightResizeCSS,
						right: widthResizeCSS,
					}}
					enableResizing={{
						top: false,
						bottom: true,
						left: false,
						right: true,
						topLeft: false,
						topRight: false,
						bottomLeft: false,
						bottomRight: false,
					}}
				>
					<div
						className={`ElementContent w-full h-full`}
						style={{ ...elementCSS, zIndex: zindex }}
					>
						{content}
					</div>
				</Rnd>
			</div>
		</Draggable>
	);
};
