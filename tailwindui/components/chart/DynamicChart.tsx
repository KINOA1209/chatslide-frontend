import React, { useRef } from 'react';
import {
	Chart as ChartJS,
	ChartType,
	PieController,
	BarController,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	ScatterController,
	ChartEvent,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ValueDataPoint, ScatterDataPoint } from './chartDataConfig';

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	ScatterController,
	PieController,
	BarController,
	LineController,
);

interface DynamicChartProps {
	chartType: ChartType; // Use ChartType from Chart.js
	chartData: ValueDataPoint[] | ScatterDataPoint[];
	isPreview: boolean;
}

const DynamicChart: React.FC<DynamicChartProps> = ({
	chartType,
	chartData,
	isPreview,
}) => {
	const chartRef = useRef(null);

	function handleHover(evt: ChartEvent, item: any, legend: { chart: ChartJS }) {
		const dataset = legend.chart.data.datasets[0];
		if (dataset.backgroundColor && Array.isArray(dataset.backgroundColor)) {
			Array.from(dataset.backgroundColor).forEach(
				(color: string, index: number, colors: string[]) => {
					colors[index] =
						index === item.index || color.endsWith('4D') ? color : color + '4D';
				},
			);
			legend.chart.update();
		}
	}

	function handleLeave(evt: ChartEvent, item: any, legend: { chart: ChartJS }) {
		const dataset = legend.chart.data.datasets[0];
		if (dataset.backgroundColor && Array.isArray(dataset.backgroundColor)) {
			dataset.backgroundColor.forEach(
				(color: string, index: number, colors: string[]) => {
					colors[index] = color.length === 9 ? color.slice(0, -2) : color;
				},
			);
			legend.chart.update();
		}
	}

	const data = {
		datasets: [
			{
				data:
					chartType === 'scatter'
						? (chartData as ScatterDataPoint[]) // Directly use data for scatter charts
						: (chartData as ValueDataPoint[]).map((dp) => dp.value), // Extract values for other chart types
				backgroundColor: chartData.map((dp) =>
					'color' in dp ? dp.color : 'rgba(54, 162, 235, 0.5)',
				),
				borderColor:
					chartType === 'line' ? 'rgba(54, 162, 235, 0.5)' : '#FFFFFF',
				borderWidth: 1,
			},
		],
	};
	//console.log(data)
	// Optionally add labels for non-scatter charts
	if (chartType !== 'scatter') {
		(data as any).labels = (chartData as ValueDataPoint[]).map(
			(dp) => dp.label,
		);
	}

	// Define chart options
	let options = {};
	if (!isPreview) {
		options = {
			devicePixelRatio: 1.5,
			animation: {
				duration: false,
			},
			plugins: {
				legend: {
					display: chartType !== 'bar' && chartType !== 'line',
					onHover: handleHover,
					onLeave: handleLeave,
				},
			},
		};
	} else {
		options = {
			animation: {
				duration: false,
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					enabled: false,
				},
			},
			hover: {
				mode: null,
				intersect: false,
			},
		};
	}

	return (
		<Chart type={chartType} data={data} options={options} ref={chartRef} />
	);
};

export default DynamicChart;
