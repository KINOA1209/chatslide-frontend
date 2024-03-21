import React from "react";

export const Column: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="w-full sm:w-2/3 md:w-2/3 mx-auto py-4 gap-y-2">
			{children}
		</div>
	);
}