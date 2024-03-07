import { ReactNode } from 'react';

const ToolBar: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className='bg-white rounded-md px-1 sm:px-4 py-2 border-2 border-gray-200 flex flex-row gap-1 sm:gap-4 items-center'>
			{children}
		</div>
	);
};

export { ToolBar };
