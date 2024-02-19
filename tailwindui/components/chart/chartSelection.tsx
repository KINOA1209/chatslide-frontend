import React, { useState } from 'react';
import chartSelectionConfigs from './chartSelectionConfigs';
import { ChartConfig } from './chartDataConfig';
import { ChartTypeRegistry } from "chart.js";
import DynamicChart from './DynamicChart';

interface ChartSelectionProps {
  onSelect: (chartType:keyof ChartTypeRegistry) => void
}

const ChartSelection: React.FC<ChartSelectionProps> = ({ 
    onSelect
}) => {
    return (
        <div className='w-full h-full overflow-y-auto p-1'>
            <div className='w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2'>
                {Object.entries(chartSelectionConfigs).map(([key, config], index) => {
                    const chartType = key as keyof ChartTypeRegistry; // Type assertion here
                    return (
                        <div
                            key={index}
                            onClick={() => onSelect(chartType)}
                            className='cursor-pointer w-full h-fit flex flex-col items-center hover:border-3 border-white rounded-md overflow-hidden'
                        >
                            <div className='w-full aspect-square flex justify-center items-center overflow-hidden hover:outline-[#5168F6] hover:outline-2'>
                                {/* <img className='max-w-full max-h-full' src={config.imgSrc} alt={config.displayName} /> */}
                                {config.imgSrc}
                            </div>
                            <div className='mt-2 text-center'>{config.displayName}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChartSelection;