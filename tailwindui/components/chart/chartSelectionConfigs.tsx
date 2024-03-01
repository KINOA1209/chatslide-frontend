import { ChartConfig } from './chartDataConfig';
import DynamicChart from './DynamicChart';
import { getChartData } from './chartPreviewFakeData';

const chartSelectionConfigs: Record<string, ChartConfig> = {
	pie: {
		displayName: 'Pie Chart',
		imgSrc: (
			<DynamicChart
				chartType='pie'
				chartData={getChartData('pie')}
				isPrview={true}
			/>
		),
		chartType: 'pie',
		dataStructure: 'ValueDataPoint',
	},
	line: {
		displayName: 'Single Line Chart',
		imgSrc: (
			<DynamicChart
				chartType='line'
				chartData={getChartData('line')}
				isPrview={true}
			/>
		),
		chartType: 'line',
		dataStructure: 'ValueDataPoint',
	},
	bar: {
		displayName: 'Bar Chart',
		imgSrc: (
			<DynamicChart
				chartType='bar'
				chartData={getChartData('bar')}
				isPrview={true}
			/>
		),
		chartType: 'bar',
		dataStructure: 'ValueDataPoint',
	},
	// scatter: {
	//   displayName: 'Scatter Plot',
	//   imgSrc: "/images/slides/business.png",
	//   chartType: 'scatter',
	//   dataStructure: 'ScatterDataPoint'
	// },
};

export default chartSelectionConfigs;
