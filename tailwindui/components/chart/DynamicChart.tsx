import React, {useRef} from 'react';
import { Chart as ChartJS, ChartType, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, ScatterController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ValueDataPoint, ScatterDataPoint } from './chartDataConfig';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, ScatterController);

interface DynamicChartProps {
  chartType: ChartType; // Use ChartType from Chart.js
  chartData: ValueDataPoint[] | ScatterDataPoint[];
}

const DynamicChart: React.FC<DynamicChartProps> = ({ 
    chartType,
    chartData,
}) => {
    const chartRef = useRef(null);
    const data = {
        datasets: [{
        data: chartType === 'scatter' ? 
            chartData as ScatterDataPoint[] : // Directly use data for scatter charts
            (chartData as ValueDataPoint[]).map(dp => dp.value), // Extract values for other chart types
        backgroundColor: chartData.map(dp => 'color' in dp ? dp.color : 'rgba(54, 162, 235, 0.5)'),
        borderColor: chartData.map(dp => 'color' in dp ? dp.color : 'rgba(54, 162, 235, 0.5)'),
        borderWidth: 1,
        }],
    };

    // Optionally add labels for non-scatter charts
    if (chartType !== 'scatter') {
        (data as any).labels = (chartData as ValueDataPoint[]).map(dp => dp.label);
    }

    // Define chart options
    const options = {
        devicePixelRatio: 1.5,
        plugins: {
        legend: { display: chartType !== 'pie' },
        },
    };
    return <Chart type={chartType} data={data} options={options} ref={chartRef}/>;
};

export default DynamicChart;