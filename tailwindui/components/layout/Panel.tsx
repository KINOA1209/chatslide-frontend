import React from "react";

export const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex flex-col gap-y-2 h-full grow overflow-y-auto items-center justify-center">
			{children}
		</div>
	);
}