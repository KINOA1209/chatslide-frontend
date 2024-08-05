import { useSlides } from '@/hooks/use-slides';
import Position from '@/types/Position';
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import Draggable from 'react-draggable';
import { FaUndo } from 'react-icons/fa';
import { IoMove } from 'react-icons/io5';
import { LuTrash2, LuUndo2 } from 'react-icons/lu';
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
	}>({
		width: 'max-content',
		height: type === ElementType.ImageView ? 'max-content' : '',
	});

	const {
		isDragging: isAnyElementDragging,
		setIsDragging: setIsAnyElementDragging,
	} = useSlides();
	const [inited, setInited] = useState(false);

	useEffect(() => {
		let x: number, y: number;
		let width: number | string, height: number | string;
		if (
			positions?.[contentIndex]?.x === undefined ||
			positions?.[contentIndex]?.y === undefined
		) {
			x = defaultPos?.[contentIndex]?.x ?? 0;
			y = defaultPos?.[contentIndex]?.y ?? 0;
		} else {
			x = Number(positions[contentIndex].x);
			y = Number(positions[contentIndex].y);
		}
		if (
			!positions?.[contentIndex]?.width ||
			!positions?.[contentIndex]?.height
		) {
			width = defaultPos?.[contentIndex]?.width ?? 'max-content';
			height =
				type === ElementType.ImageView
					? defaultPos?.[contentIndex]?.height ?? 'max-content'
					: '';
		} else {
			width = Number(positions[contentIndex].width) + 'px';
			height =
				type === ElementType.ImageView
					? Number(positions[contentIndex].height) + 'px'
					: '';
		}
		setElementPos({ x, y });
		setElementSize({ width, height });
		setMoveHandlerPos(x, y);
		setResetHandlerPos(x, y);
		setInited(true);
	}, []);

	const [isHover, setIsHover] = useState<boolean>(false);
	const [isResizing, setIsResizing] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);
	const [isShiftPressed, setIsShiftPressed] = useState(false);

	const moveHandlerRef = useRef<HTMLDivElement>(null);
	const resetHandlerRef = useRef<HTMLDivElement>(null);

	const isVisible: boolean = useMemo(
		() => canEdit && (isHover || isResizing || isOverHandler || isDragging),
		[canEdit, isHover, isResizing, isOverHandler, isDragging],
	);

	const elementHandlerCSS: React.CSSProperties = useMemo(
		() => ({
			background: '#545657',
			width: '28px',
			height: '28px',
			padding: '4px',
			position: 'absolute',
			zIndex: '120',
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
			height: type === ElementType.ImageView ? '100%' : 'max-content',
			overflow: 'visible',
			cursor: type === ElementType.TextEdit ? 'move' : 'default',
		}),
		[isVisible],
	);

	const onEnterHandler = () => {
		console.log('isAnyElementDragging', isAnyElementDragging);
		if (isAnyElementDragging) return;
		setIsOverHandler(true);
	};

	const onLeaveHandler = () => {
		setIsOverHandler(false);
	};

	const setMoveHandlerPos = (x: number, y: number) => {
		if (moveHandlerRef.current) {
			if (x < -25 && y < -90) {
				moveHandlerRef.current.style.left = '';
				moveHandlerRef.current.style.right = '-28px';
				moveHandlerRef.current.style.bottom = '-28px';
			} else if (x < -25) {
				moveHandlerRef.current.style.left = '';
				moveHandlerRef.current.style.right = '-28px';
				moveHandlerRef.current.style.bottom = '';
			} else if (y < -90) {
				moveHandlerRef.current.style.left = '-28px';
				moveHandlerRef.current.style.right = '';
				moveHandlerRef.current.style.bottom = '-28px';
			} else {
				moveHandlerRef.current.style.left = '-28px';
				moveHandlerRef.current.style.right = '';
				moveHandlerRef.current.style.bottom = '';
			}
		}
	};

	const setResetHandlerPos = (x: number, y: number) => {
		if (resetHandlerRef.current) {
			if (x < -25 && y < -90) {
				resetHandlerRef.current.style.left = '';
				resetHandlerRef.current.style.right = '-28px';
				resetHandlerRef.current.style.top = '';
				resetHandlerRef.current.style.bottom = '30px';
			} else if (x < -25) {
				resetHandlerRef.current.style.left = '';
				resetHandlerRef.current.style.right = '-28px';
				resetHandlerRef.current.style.top = '30px';
				resetHandlerRef.current.style.bottom = '';
			} else if (y < -90) {
				resetHandlerRef.current.style.left = '-28px';
				resetHandlerRef.current.style.right = '';
				resetHandlerRef.current.style.top = '';
				resetHandlerRef.current.style.bottom = '30px';
			} else {
				resetHandlerRef.current.style.left = '-28px';
				resetHandlerRef.current.style.right = '';
				resetHandlerRef.current.style.top = '30px';
				resetHandlerRef.current.style.bottom = '';
			}
		}
	};

	const onHandleDragStop = (e: any, data: any) => {
		setIsAnyElementDragging(false);
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
		handleSlideEdit(
			updatedPosition,
			currentSlideIndex,
			positionType,
			contentIndex,
			false,
		);
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
		handleSlideEdit(
			updatedPosition,
			currentSlideIndex,
			positionType,
			contentIndex,
			false,
		);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Shift') {
				setIsShiftPressed(true);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'Shift') {
				setIsShiftPressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		// Clean up event listeners on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

  // if(!inited) return null;

	return (
		<Rnd
			className={'ResizableElement w-full'}
			style={{
				zIndex: `${hoveredIndex === elementIndex ? '200' : '100'}`,
			}}
			position={elementPos}
			size={elementSize}
			lockAspectRatio={isShiftPressed}
			onResizeStart={() => {
				setIsResizing(true);
			}}
			onResizeStop={onHandleResizeStop}
			onDragStart={() => {
				console.log('isAnyElementDragging', isAnyElementDragging);
				setIsAnyElementDragging(true);
				setIsDragging(true);
			}}
			onDragStop={onHandleDragStop}
			onMouseEnter={onEnterHandler}
			onMouseLeave={onLeaveHandler}
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
				top: type === ElementType.ImageView && canEdit,
				bottom: type === ElementType.ImageView && canEdit,
				left: canEdit,
				right: canEdit,
				topLeft: false,
				topRight: type === ElementType.ImageView && canEdit,
				bottomLeft: type === ElementType.ImageView && canEdit,
				bottomRight: type === ElementType.ImageView && canEdit,
			}}
			disableDragging={!canEdit}
			dragHandleClassName='drag-handler'
		>
			{/* handler icons  */}
			<div
				style={{ ...elementHandlerCSS, cursor: 'move' }}
				onMouseEnter={onEnterHandler}
				onMouseLeave={onLeaveHandler}
				className='drag-handler'
				ref={moveHandlerRef}
			>
				<IoMove size={20} color={'white'} />
			</div>
			<div
				style={{ ...elementHandlerCSS, cursor: 'pointer' }}
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
					handleSlideEdit(
						updatedPosition,
						currentSlideIndex,
						positionType,
						contentIndex,
						true,
					);
				}}
				ref={resetHandlerRef}
			>
				<LuUndo2 size={20} color={'white'} />
			</div>
			{/* icon to delete all text */}
			{/* <div 
        style={{ ...elementHandlerCSS, cursor: 'pointer' }}
        onMouseEnter={onEnterHandler}
        onMouseLeave={onLeaveHandler}
        onClick={() => {
          handleSlideEdit(
            positions.filter((_, index) => index !== contentIndex),
            currentSlideIndex,
            positionType,
            contentIndex,
            true,
          );
        }}
      >
        <LuTrash2 size={20} color={'white'} />
      </div> */}

			<div
				className={type === ElementType.TextEdit ? 'drag-handler' : ''}
				style={elementCSS}
				onMouseEnter={() => {
					if (isAnyElementDragging) return;
					setIsHover(true);
					onHover(elementIndex);
				}}
				onMouseLeave={() => {
					setTimeout(() => {
						setIsHover(false);
					}, 500);
				}}
			>
				{inited && children}
			</div>
		</Rnd>
	);
};
