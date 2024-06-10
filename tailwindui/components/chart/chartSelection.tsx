import React, { useState } from 'react';
import chartSelectionConfigs from './chartSelectionConfigs';
import { ChartConfig } from './chartDataConfig';
import { ChartTypeRegistry } from 'chart.js';
import DynamicChart from './DynamicChart';

interface ChartSelectionProps {
	onSelect: (chartType: keyof ChartTypeRegistry) => void;
}

const ChartSelection: React.FC<ChartSelectionProps> = ({ onSelect }) => {
	return (
		<div className='w-full h-full overflow-y-auto p-[10px]'>
			<div className='w-full h-fit grid grid-cols-1 gap-1 md:gap-2'>
				{Object.entries(chartSelectionConfigs).map(([key, config], index) => {
					const chartType = key as keyof ChartTypeRegistry; // Type assertion here
					return (
						// chart entry: type and image
						<div
							key={index}
							onClick={() => onSelect(chartType)}
							className='cursor-pointer flex flex-col items-start hover:border-3 overflow-hidden gap-[16px]'
						>
							<div
								style={{
									color: '#000',
									textAlign: 'center',
									// fontFamily: 'Creato Display Medium',
									fontSize: '12px',
									fontStyle: 'normal',
									fontWeight: '700',
									lineHeight: '20px',
								}}
							>
								{config.displayName}
							</div>
							<div
								className='hover:outline-[#5168F6] hover:outline-2 aspect-square'
								style={{
									display: 'flex',
									width: '200px',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '16px',
									borderRadius: '16px',
									border: '1px solid #E7E9EB',
								}}
							>
								{/* <img className='max-w-full max-h-full' src={config.imgSrc} alt={config.displayName} /> */}
								{config.imgSrc}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ChartSelection;
