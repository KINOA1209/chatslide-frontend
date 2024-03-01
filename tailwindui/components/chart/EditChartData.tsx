import React, { useState, useRef, useEffect } from 'react';
import {
	ChartConfig,
	ValueDataPoint,
	ScatterDataPoint,
} from './chartDataConfig';
import chartSelectionConfigs from './chartSelectionConfigs';
import { ChartTypeRegistry } from 'chart.js';
import * as d3 from 'd3';
import { ChromePicker, ColorResult } from 'react-color';

interface EditChartDataProps {
	chartType: keyof ChartTypeRegistry;
	chartData: ValueDataPoint[] | ScatterDataPoint[];
	setChartData: (data: ValueDataPoint[] | ScatterDataPoint[]) => void;
	onBack: () => void;
	imgModuleRef: React.RefObject<HTMLDivElement>;
	titleRef: React.RefObject<HTMLDivElement>;
	typeRef: React.RefObject<HTMLDivElement>;
	doneButtonRef: React.RefObject<HTMLDivElement>;
}

const EditChartData: React.FC<EditChartDataProps> = ({
	chartType,
	chartData,
	setChartData,
	onBack,
	imgModuleRef,
	titleRef,
	typeRef,
	doneButtonRef,
}) => {
	const colorPalette = d3.schemeCategory10;
	const [activeColorPicker, setActiveColorPicker] = useState<number | null>(
		null,
	);
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const topButtonRef = useRef<HTMLDivElement | null>(null);
	const renderDataRef = useRef<HTMLDivElement | null>(null);
	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node)
			) {
				if (activeColorPicker !== null) {
					// Check if the click is on the ChromePicker itself
					const colorpicker = document.querySelector('.chrome-picker');
					if (colorpicker && !colorpicker.contains(event.target as Node)) {
						setActiveColorPicker(null);
					}
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [activeColorPicker]);

	// dynamically calculate the max-height of data points
	useEffect(() => {
		const calculateMaxHeight = () => {
			if (
				imgModuleRef.current &&
				topButtonRef.current &&
				titleRef.current &&
				typeRef.current &&
				doneButtonRef.current
			) {
				const imgModuleHeight = imgModuleRef.current.clientHeight;
				const titleHeight = titleRef.current.clientHeight;
				const typeHeight = typeRef.current.clientHeight;
				const doneButtonHeight = doneButtonRef.current.clientHeight;
				const topButtonHeight = topButtonRef.current.clientHeight * 3.0;

				const availableHeight =
					imgModuleHeight -
					(titleHeight + typeHeight + doneButtonHeight + topButtonHeight);

				//console.log(`Available height: ${availableHeight}`);
				setMaxContentHeight(availableHeight > 0 ? availableHeight : 200);
			}
		};
		calculateMaxHeight();
		window.addEventListener('resize', calculateMaxHeight);

		return () => {
			window.removeEventListener('resize', calculateMaxHeight);
		};
	}, []);

	const handleAddDataPoint = () => {
		if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
			const newDataPoint = { x: 0, y: 0 } as ScatterDataPoint;
			setChartData([...(chartData as ScatterDataPoint[]), newDataPoint]);
		} else {
			const newDataPoint = {
				label: '',
				value: 0,
				color: colorPalette[chartData.length % colorPalette.length],
			} as ValueDataPoint;
			setChartData([...(chartData as ValueDataPoint[]), newDataPoint]);
		}
	};

	const handleDataChange = (
		index: number,
		field: string,
		value: string | number,
	) => {
		if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
			const updatedChartData = (chartData as ScatterDataPoint[]).map(
				(dataPoint, idx) => {
					if (idx === index) {
						return { ...dataPoint, [field]: value };
					}
					return dataPoint;
				},
			);
			setChartData(updatedChartData);
		} else {
			const updatedChartData = (chartData as ValueDataPoint[]).map(
				(dataPoint, idx) => {
					if (idx === index) {
						return { ...dataPoint, [field]: value };
					}
					return dataPoint;
				},
			);
			setChartData(updatedChartData);
		}
	};

	const handleRemoveDataPoint = (index: number) => {
		if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
			// Assert the filtered array as ScatterDataPoint[] if the chart is of scatter type
			const updatedChartData = (chartData as ScatterDataPoint[]).filter(
				(_, idx) => idx !== index,
			);
			setChartData(updatedChartData as ScatterDataPoint[]);
		} else {
			// Assert the filtered array as ValueDataPoint[] if the chart is not of scatter type
			const updatedChartData = (chartData as ValueDataPoint[]).filter(
				(_, idx) => idx !== index,
			);
			setChartData(updatedChartData as ValueDataPoint[]);
		}
	};

	const renderDataFields = () =>
		chartData.map((dataPoint, index) => {
			return (
				<div key={index} className='flex flex-row items-center gap-2 mt-2'>
					{'x' in dataPoint ? (
						// ScatterDataPoint fields
						<>
							<input
								type='number'
								value={dataPoint.x}
								onChange={(e) =>
									handleDataChange(index, 'x', Number(e.target.value))
								}
							/>
							<input
								type='number'
								value={dataPoint.y}
								onChange={(e) =>
									handleDataChange(index, 'y', Number(e.target.value))
								}
							/>
						</>
					) : (
						// ValueDataPoint fields
						<>
							<input
								type='text'
								value={dataPoint.label}
								onChange={(e) =>
									handleDataChange(index, 'label', e.target.value)
								}
							/>
							<input
								type='number'
								value={dataPoint.value}
								onChange={(e) =>
									handleDataChange(index, 'value', Number(e.target.value))
								}
							/>
							{chartType !== 'line' && (
								<div className='relative' ref={pickerRef}>
									<div
										className='w-6 h-6 border border-gray-300 cursor-pointer'
										style={{ backgroundColor: dataPoint.color }}
										onClick={() =>
											setActiveColorPicker(
												index === activeColorPicker ? null : index,
											)
										}
									/>
									{activeColorPicker === index && (
										<div className='absolute left-full top-0 ml-2 z-50'>
											<ChromePicker
												color={dataPoint.color}
												onChange={(color) => {
													handleDataChange(index, 'color', color.hex);
												}}
											/>
										</div>
									)}
								</div>
							)}
						</>
					)}
					<button
						className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
						onClick={() => handleRemoveDataPoint(index)}
					>
						Remove
					</button>
				</div>
			);
		});

	return (
		<div>
			<div className='flex flex-row gap-3' ref={topButtonRef}>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-4'
					onClick={onBack}
				>
					Back
				</button>
				<button
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mb-4'
					onClick={handleAddDataPoint}
				>
					Add Data Point
				</button>
			</div>
			<div
				className='overflow-auto'
				style={{
					maxHeight:
						maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
					minHeight:
						maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
				}}
				ref={renderDataRef}
			>
				{renderDataFields()}
			</div>
		</div>
	);
};

export default EditChartData;
