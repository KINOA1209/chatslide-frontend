import ImagesPosition from '@/models/ImagesPosition';

export const initializeImageData = (
    images_position: Array<ImagesPosition | {}>,
    refs: React.RefObject<HTMLElement>[],
  ): ImagesPosition[] => {
    const positions = images_position || [{}, {}, {}];
    return positions.map((pos, index) => {
        if (Object.keys(pos).length !== 0) {
            // If position data is available, use it directly
            return pos as ImagesPosition;
        }
        else {
            return {};
        }
    });
};

//handle autosave
export const onMouseLeave = (
    slideIdx: number,
    imagesDimensions: (ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[],
    hasInteracted: boolean,
    setHasInteracted: React.Dispatch<React.SetStateAction<boolean>>,
    setShowImgButton: React.Dispatch<React.SetStateAction<boolean>>,
    handleSlideEdit:Function,
) => () => {
    if (hasInteracted) {
        handleSlideEdit([imagesDimensions], slideIdx, ['images_position'])
        setHasInteracted(false);
    }
    setShowImgButton(false);
};

//handle function when drag start
export const onDragStart =
	(
		setIsDraggingOrResizing: React.Dispatch<React.SetStateAction<boolean>>,
		startPos: Array<{ x: number; y: number }>,
		setStartPos: React.Dispatch<
			React.SetStateAction<Array<{ x: number; y: number }>>
		>,
		setHasInteracted: React.Dispatch<React.SetStateAction<boolean>>,
	) =>
	(imgIdx: number) =>
	(e: any, position: { x: number; y: number }) => {
		e.preventDefault();
		const newStartPos = [...startPos];
		newStartPos[imgIdx] = { x: position.x, y: position.y };
		setIsDraggingOrResizing(false);
		setHasInteracted(true);
		setStartPos(newStartPos);
	};

//handle function when drag end
export const onDragStop =
	(
		imagesDimensions: (
			| ImagesPosition
			| { x?: number; y?: number; height?: number; width?: number }
		)[],
		setImagesDimensions: React.Dispatch<
			React.SetStateAction<
				(
					| ImagesPosition
					| { x?: number; y?: number; height?: number; width?: number }
				)[]
			>
		>,
		startPos: Array<{ x: number; y: number }>,
		setIsDraggingOrResizing: React.Dispatch<React.SetStateAction<boolean>>,
	) =>
	(imgIdx: number) =>
	(e: any, position: { x: number; y: number }) => {
		const adjustedX = position.x;
		const adjustedY = position.y;
		const curr_startPos = startPos[imgIdx];
		const distance = Math.sqrt(
			Math.pow(adjustedX - curr_startPos.x, 2) +
				Math.pow(adjustedY - curr_startPos.y, 2),
		);
		if (distance > 5) {
			const updatedDimensions = [...imagesDimensions];
			updatedDimensions[imgIdx] = {
				...updatedDimensions[imgIdx],
				x: adjustedX,
				y: adjustedY,
			};
			setImagesDimensions(updatedDimensions);
			setIsDraggingOrResizing(true);
			setTimeout(() => setIsDraggingOrResizing(false), 100);
		}
	};

//handle function when resize start
export const onResizeStart =
	(
		setIsDraggingOrResizing: React.Dispatch<React.SetStateAction<boolean>>,
		setHasInteracted: React.Dispatch<React.SetStateAction<boolean>>,
	) =>
	() => {
		setIsDraggingOrResizing(true);
		setHasInteracted(true);
	};

//handle function when resize stop
export const onResizeStop =
	(
		imagesDimensions: (
			| ImagesPosition
			| { x?: number; y?: number; height?: number; width?: number }
		)[],
		setImagesDimensions: React.Dispatch<
			React.SetStateAction<
				(
					| ImagesPosition
					| { x?: number; y?: number; height?: number; width?: number }
				)[]
			>
		>,
		setIsDraggingOrResizing: React.Dispatch<React.SetStateAction<boolean>>,
	) =>
	(imgIdx: number) =>
	(
		e: any,
		direction: any,
		ref: HTMLElement,
		delta: any,
		position: { x: number; y: number },
	) => {
		const updatedDimensions = [...imagesDimensions];
		updatedDimensions[imgIdx] = {
			...updatedDimensions[imgIdx],
			width: parseInt(ref.style.width, 10),
			height: parseInt(ref.style.height, 10),
			x: position.x,
			y: position.y,
		};
		setImagesDimensions(updatedDimensions);
		setIsDraggingOrResizing(false);
	};
