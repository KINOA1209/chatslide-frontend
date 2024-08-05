import React from 'react';

export const Panel: React.FC<{ children: React.ReactNode, allowOverflow?: boolean }> = ({
	children,
  allowOverflow = false
}) => {
	return (
		<div className={'flex flex-col py-2 gap-y-2 h-full items-center justify-start' + (allowOverflow ? '' : ' overflow-y-auto')}>
			{children}
		</div>
	);
};
