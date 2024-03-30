import React from "react";

export const stopArrowKeyPropagation = (event: KeyboardEvent) => {
	if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Escape') {
		event.stopPropagation();
	}
}
