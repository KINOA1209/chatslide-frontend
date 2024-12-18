import { ChartConfig } from './chartDataConfig';
import DynamicChart from './DynamicChart';
import { getChartData } from './chartPreviewFakeData';

const chartSelectionConfigs: Record<string, ChartConfig> = {
	pie: {
		displayName: 'Pie',
		imgSrc: (
			<DynamicChart
				chartType='pie'
				chartData={getChartData('pie')}
				isPreview={true}
			/>
		),
		chartType: 'pie',
		dataStructure: 'ValueDataPoint',
	},
	line: {
		displayName: 'Single Line',
		imgSrc: (
			<DynamicChart
				chartType='line'
				chartData={getChartData('line')}
				isPreview={true}
			/>
		),
		chartType: 'line',
		dataStructure: 'ValueDataPoint',
	},
	bar: {
		displayName: 'Bar',
		imgSrc: (
			<DynamicChart
				chartType='bar'
				chartData={getChartData('bar')}
				isPreview={true}
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
