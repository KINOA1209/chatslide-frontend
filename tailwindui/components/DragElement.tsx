import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";


export enum ElementType {
	TextEdit,
	ImageView,
}

interface DragElementProps {
	children: JSX.Element;
    position: any;
    setPosition: React.Dispatch<React.SetStateAction<{
		x: number;
		y: number;
	}>>;
	setMoved: React.Dispatch<React.SetStateAction<boolean>>;
	type: ElementType;
	zindex: number;
}

export const DragElement = ({
	children: content,
    position,
    setPosition,
	setMoved,
	type,
	zindex,
}: DragElementProps) => {
	const isDragDisable = useRef(true);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);

	const handleDragStart = (e: any) => {
		if (isDragDisable.current) {
			e.preventDefault();
			e.stopPropagation();
		}
		setMoved(true);
	};

	const isVisible = useMemo(
		() => isOverHandler || !isDragDisable.current,
		[isOverHandler, isDragDisable],
	);

	const handlerCSS: React.CSSProperties = useMemo(
		() => ({
			background: 'rgba(0, 0, 0, 0.25)',
			width: '20px',
			height: '30px',
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
			borderColor: `${isVisible ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0)'}`,
			borderRadius: '5px',
			borderWidth: '2px',
		}),
		[isVisible],
	);

	const dropHandler = () => {
		isDragDisable.current = true;
	};

	const handleOnDrag = (e: any, data: any) => {
		setPosition({x: data.x, y: data.y});
	}

	useEffect(() => {
		document.addEventListener('mouseup', dropHandler);
	}, []);

	return (
		<Draggable onStart={handleDragStart} position={position} onDrag={handleOnDrag}>
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
					style={handlerCSS}
					onMouseDown={(e) => {
						isDragDisable.current = false;
					}}
					onMouseUp={(e) => {
						isDragDisable.current = true;
					}}
				>
					<div>
						<svg
							className='svg-small'
							fill='var(--theme-caption-color)'
							viewBox='0 0 12 16'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M9 5.99988C9 6.55216 9.44772 6.99988 10 6.99988C10.5523 6.99988 11 6.55216 11 5.99988C11 5.44759 10.5523 4.99988 10 4.99988C9.44772 4.99988 9 5.44759 9 5.99988Z'></path>
							<path d='M9 9.99988C9 10.5522 9.44772 10.9999 10 10.9999C10.5523 10.9999 11 10.5522 11 9.99988C11 9.44759 10.5523 8.99988 10 8.99988C9.44772 8.99988 9 9.44759 9 9.99988Z'></path>
							<path d='M10 14.9999C9.44772 14.9999 9 14.5522 9 13.9999C9 13.4476 9.44772 12.9999 10 12.9999C10.5523 12.9999 11 13.4476 11 13.9999C11 14.5522 10.5523 14.9999 10 14.9999Z'></path>
							<path d='M9 2C9 2.55228 9.44772 3 10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2Z'></path>
							<path d='M5 5.99988C5 6.55216 5.44772 6.99988 6 6.99988C6.55229 6.99988 7 6.55216 7 5.99988C7 5.44759 6.55229 4.99988 6 4.99988C5.44772 4.99988 5 5.44759 5 5.99988Z'></path>
							<path d='M5 9.99988C5 10.5522 5.44772 10.9999 6 10.9999C6.55228 10.9999 7 10.5522 7 9.99988C7 9.44759 6.55229 8.99988 6 8.99988C5.44772 8.99988 5 9.44759 5 9.99988Z'></path>
							<path d='M6 14.9999C5.44772 14.9999 5 14.5522 5 13.9999C5 13.4476 5.44772 12.9999 6 12.9999C6.55228 12.9999 7 13.4476 7 13.9999C7 14.5522 6.55228 14.9999 6 14.9999Z'></path>
							<path d='M5 2C5 2.55228 5.44772 3 6 3C6.55229 3 7 2.55228 7 2C7 1.44772 6.55229 1 6 1C5.44772 1 5 1.44772 5 2Z'></path>
						</svg>
					</div>
				</div>
				<div
					className={`ElementContent w-full h-full`}
					style={{ ...elementCSS, zIndex: zindex }}
				>
					{content}
				</div>
			</div>
		</Draggable>
	);
};