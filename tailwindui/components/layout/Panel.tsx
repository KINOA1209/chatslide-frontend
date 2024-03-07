import React from "react";

export const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex flex-col py-2 gap-y-2 h-full items-center justify-center">
			{children}
		</div>
	);
}