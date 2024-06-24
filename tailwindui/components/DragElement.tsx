import Position from '@/types/Position';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { TbDragDrop2, TbRefresh } from 'react-icons/tb';
import { Rnd } from 'react-rnd';

export enum ElementType {
	TextEdit,
	ImageView,
}

interface DragElementProps {
	children: JSX.Element | JSX.Element[];
	type: ElementType;
	zindex: number;
	canEdit: boolean;
	positions: Position[];
	contentIndex: number;
	handleSlideEdit: Function;
	currentSlideIndex: number;
	positionType: string;
}

export const DragElement = ({
	children: content,
	type,
	zindex,
	canEdit,
	positions,
	contentIndex,
	handleSlideEdit,
	currentSlideIndex,
	positionType,
}: DragElementProps) => {
	const [isDragDisable, setIsDragDisable] = useState<boolean>(true);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);
	const [isResize, setIsResize] = useState<boolean>(false);
	const [position, setPosition] = useState({
		x: positions[contentIndex].x ? Number(positions[contentIndex].x) : 0,
		y: positions[contentIndex].y ? Number(positions[contentIndex].y) : 0,
	});
	const [size, setSize] = useState({
		width: positions[contentIndex].width
			? positions[contentIndex].width === -1
				? 'max-content'
				: Number(positions[contentIndex].width) + 'px'
			: 'max-content',
		height: positions[contentIndex].height
			? positions[contentIndex].height === -1
				? 'max-content'
				: Number(positions[contentIndex].height) + 'px'
			: 'max-content',
	});

	const handleDragStart = (e: any) => {
		if (isDragDisable) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const handleDragStop = () => {
		const updatedPosition: Position[] = positions.map((pos, index) =>
			index === contentIndex
				? { x: position.x, y: position.y, width: pos.width, height: pos.height }
				: pos,
		);
		handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
		setIsDragDisable(true);
	};

	const isVisible = useMemo(
		() => (isOverHandler || !isDragDisable || isResize) && canEdit,
		[isOverHandler, isDragDisable, isResize],
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

	const resizeHandlerCSS: React.CSSProperties = useMemo(
		() => ({
			width: '10px',
			height: '10px',
			backgroundColor: '#E5F4F7',
			border: '1px solid gray',
			zIndex: 20,
			position: 'absolute',
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

	const dropHandler = () => {
		setIsDragDisable(true);
	};

	const handleOnDrag = (e: any, data: any) => {
		setPosition({ x: data.x, y: data.y });
	};

	const handleOnResize = (
		e: any,
		direction: any,
		ref: any,
		delta: any,
		pos: any,
	) => {
		setIsResize(true);
		setSize({ width: ref.style.width, height: ref.style.height });
	};

	const handleOnResizeStop = () => {
		setIsResize(false);

		const updatedPosition: Position[] = positions.map((pos, index) =>
			index === contentIndex
				? {
						x: pos.x,
						y: pos.y,
						width: parseInt(size.width),
						height: parseInt(size.height),
					}
				: pos,
		);
		handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
	};

	useEffect(() => {
		document.addEventListener('mouseup', dropHandler);
		return () => document.removeEventListener('mouseup', dropHandler);
	}, []);

	return (
		<>
			<Draggable
				onStart={handleDragStart}
				position={position}
				onDrag={handleOnDrag}
				onStop={handleDragStop}
				disabled={!canEdit}
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
							setSize({ width: 'max-content', height: 'max-content' });
							const updatedPosition: Position[] = positions.map((pos, index) =>
								index === contentIndex
									? { x: 0, y: 0, width: -1, height: -1 }
									: pos,
							);
							handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
						}}
					>
						<div>
							<TbRefresh size={16} color={'white'} />
						</div>
					</div>
					<Rnd
						className='ResizableElement w-full h-full'
						size={size}
						style={{ position: 'relative' }}
						lockAspectRatio={false}
						disableDragging={true}
						onResize={handleOnResize}
						onResizeStop={handleOnResizeStop}
						resizeHandleStyles={
							isVisible
								? {
										topRight: { ...resizeHandlerCSS, borderRadius: '50%' },
										bottomLeft: { ...resizeHandlerCSS, borderRadius: '50%' },
										bottomRight: { ...resizeHandlerCSS, borderRadius: '50%' },
										left: {
											...resizeHandlerCSS,
											top: '50%',
											transform: 'translateY(-50%)',
											left: '-10px',
										},
										right: {
											...resizeHandlerCSS,
											top: '50%',
											transform: 'translateY(-50%)',
											right: '-10px',
										},
										top: {
											...resizeHandlerCSS,
											left: '50%',
											transform: 'translateX(-50%)',
											top: '-10px',
										},
										bottom: {
											...resizeHandlerCSS,
											left: '50%',
											transform: 'translateX(-50%)',
											bottom: '-10px',
										},
									}
								: {}
						}
						enableResizing={{
							top: true,
							bottom: true,
							left: true,
							right: true,
							topLeft: false,
							topRight: true,
							bottomLeft: true,
							bottomRight: true,
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
		</>
	);
};
