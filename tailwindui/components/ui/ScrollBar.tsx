import React, { useRef, useEffect } from "react";

export const ScrollBar: React.FC<{
	children: React.ReactNode;
	axial?: 'x' | 'y';
	currentElementRef?: React.MutableRefObject<HTMLElement | null>;
	index?: number;  // trigger rerender
}> = ({ 
	children, 
	axial = 'x',
	currentElementRef,
	index,
 }) => {
	// Determine overflow and flex direction based on the axial prop
	const overflowClass =
		axial === 'x'
			? 'overflow-x-auto overflow-y-hidden'
			: 'overflow-y-auto overflow-x-hidden';
	const flexDirClass = axial === 'x' ? 'flex-row' : 'flex-col';
	const containerRef = useRef<HTMLDivElement>(null);

	// auto scroll thumbnail to current slide
	useEffect(() => {
		if (!currentElementRef) return;
		
		if (containerRef.current && currentElementRef.current) {
			console.log('scrolling to current slide');

			const container = containerRef.current;
			const currentElement = currentElementRef.current;

			const containerRect = container.getBoundingClientRect();
			const currentElementRect = currentElement.getBoundingClientRect();

			if (axial === 'x') {
				// Horizontal scroll to center the current element
				const scrollLeft = currentElementRect.left + currentElementRect.width / 2 - (containerRect.left + containerRect.width / 2);
				container.scrollTo({
					left: container.scrollLeft + scrollLeft,
					behavior: 'smooth',
				});
			} else if (axial === 'y') {
				// Vertical scroll to center the current element
				const scrollTop = currentElementRect.top + currentElementRect.height / 2 - (containerRect.top + containerRect.height / 2);
				container.scrollTo({
					top: container.scrollTop + scrollTop,
					behavior: 'smooth',
				});
			}
		}
	}, [index]);

	return (
		<div
			ref={containerRef}
			className={`w-full h-full flex ${flexDirClass} ${overflowClass} scrollbar scrollbar-thin ${axial === 'x' ? 'scrollbar-thumb-gray-500' : 'scrollbar-thumb-gray-500'
				}`}
		>
			{children}
		</div>
	);
};
