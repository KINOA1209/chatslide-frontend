import Position from '@/types/Position';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { MdDragIndicator, MdRefresh } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import { Rnd } from 'react-rnd';

export enum ElementType {
	TextEdit,
	ImageView,
}

interface DragElementProps {
	children: JSX.Element | JSX.Element[] | undefined;
	type: ElementType;
	canEdit: boolean;
	scale?: number;
	positions: Position[];
	contentIndex: number;
	handleSlideEdit: Function;
	currentSlideIndex: number;
	positionType: string;
	defaultPos: Position[];
	elementIndex: number;
	onHover: (index: number) => void;
	hoveredIndex: number;
}

export const DragElement = ({
	children,
	type,
	canEdit,
	scale,
	positions,
	contentIndex,
	handleSlideEdit,
	currentSlideIndex,
	positionType,
	defaultPos,
	elementIndex,
	onHover,
	hoveredIndex,
}: DragElementProps) => {
	const [elementPos, setElementPos] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [elementSize, setElementSize] = useState<{
		width: number | string;
		height: number | string;
	}>({ width: 'max-content', height: 'max-content' });

	useEffect(() => {
		setElementPos(() => {
			if (
				positions?.[contentIndex]?.x === undefined ||
				positions?.[contentIndex]?.y === undefined
			)
				return {
					x: defaultPos[contentIndex].x ?? 0,
					y: defaultPos[contentIndex].y ?? 0,
				};
			else
				return {
					x: Number(positions[contentIndex].x),
					y: Number(positions[contentIndex].y),
				};
		});
		setElementSize(() => {
			if (
				!positions?.[contentIndex]?.width ||
				!positions?.[contentIndex]?.height
			)
				return {
					width: defaultPos[contentIndex].width ?? 'max-content',
					height: defaultPos[contentIndex].height ?? 'max-content',
				};
			return {
				width: Number(positions[contentIndex].width) + 'px',
				height: Number(positions[contentIndex].height) + 'px',
			};
		});
	}, []);

	const [isHover, setIsHover] = useState<boolean>(false);
	const [isResizing, setIsResizing] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);

	const isVisible: boolean = useMemo(
		() => canEdit && (isHover || isResizing || isOverHandler || isDragging),
		[canEdit, isHover, isResizing, isOverHandler, isDragging],
	);

	const elementHandlerCSS: React.CSSProperties = useMemo(
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
			zIndex: '120',
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

	const onEnterHandler = () => {
		setIsOverHandler(true);
	};

	const onLeaveHandler = () => {
		setIsOverHandler(false);
	};

	const onHandleDragStop = (e: any, data: any) => {
		setIsDragging(false);
		setElementPos({ x: data.x, y: data.y });
		const updatedPosition: Position[] = positions.map((position, index) =>
			index === contentIndex
				? {
						x: data.x,
						y: data.y,
						width: position.width,
						height: position.height,
					}
				: position,
		);
		handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
	};

	const onHandleResizeStop = (
		e: any,
		direction: any,
		ref: any,
		delta: any,
		pos: any,
	) => {
		setIsResizing(false);
		setElementSize({ width: ref.style.width, height: ref.style.height });
		setElementPos({ x: pos.x, y: pos.y });

		const updatedPosition: Position[] = positions.map((position, index) =>
			index === contentIndex
				? {
						x: pos.x / (scale ?? 1),
						y: pos.y / (scale ?? 1),
						width: parseInt(ref.style.width),
						height: parseInt(ref.style.height),
					}
				: position,
		);
		handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
	};

	return (
		<Rnd
			className={'ResizableElement w-full h-full'}
			style={{
				zIndex: `${hoveredIndex === elementIndex ? '200' : '100'}`,
			}}
			position={elementPos}
			size={elementSize}
			lockAspectRatio={false}
			onResizeStart={() => {
				setIsResizing(true);
			}}
			onResizeStop={onHandleResizeStop}
			onDragStart={() => {
				setIsDragging(true);
			}}
			onDragStop={onHandleDragStop}
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
				top: canEdit,
				bottom: canEdit,
				left: canEdit,
				right: canEdit,
				topLeft: false,
				topRight: canEdit,
				bottomLeft: canEdit,
				bottomRight: canEdit,
			}}
			disableDragging={!canEdit}
			dragHandleClassName='drag-handler'
		>
			<div
				style={{ ...elementHandlerCSS, cursor: 'move' }}
				onMouseEnter={onEnterHandler}
				onMouseLeave={onLeaveHandler}
				className='drag-handler'
			>
				<MdDragIndicator size={16} color={'white'} />
			</div>
			<div
				style={{ ...elementHandlerCSS, top: '23px' }}
				onMouseEnter={onEnterHandler}
				onMouseLeave={onLeaveHandler}
				onClick={() => {
					setElementPos({
						x: Number(defaultPos[contentIndex].x),
						y: Number(defaultPos[contentIndex].y),
					});
					setElementSize({
						width: Number(defaultPos[contentIndex].width),
						height: Number(defaultPos[contentIndex].height),
					});
					const updatedPosition: Position[] = positions.map(
						(position, index) =>
							index === contentIndex ? defaultPos[contentIndex] : position,
					);
					handleSlideEdit(updatedPosition, currentSlideIndex, positionType);
				}}
			>
				<MdRefresh size={16} color={'white'} />
			</div>
			<div
				style={elementCSS}
				onMouseEnter={() => {
					setIsHover(true);
					onHover(elementIndex);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
			>
				{children}
			</div>
		</Rnd>
	);
};
