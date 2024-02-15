import { ChartConfig } from "./chartDataConfig"

const chartSelectionConfigs: Record<string, ChartConfig> = {
  pie: {
    displayName: 'Pie Chart',
    imgSrc:"/images/slides/business.png",
    chartType: 'pie',
    dataStructure: 'ValueDataPoint',
  },
  line:{
    displayName: 'Line Chart',
    imgSrc:"/images/slides/business.png",
    chartType: 'line',
    dataStructure: 'ValueDataPoint',
  },
  bar: {
    displayName: 'Bar Chart',
    imgSrc: "/images/slides/business.png",
    chartType: 'bar',
    dataStructure: 'ValueDataPoint'
  },
  scatter: {
    displayName: 'Scatter Plot',
    imgSrc: "/images/slides/business.png",
    chartType: 'scatter',
    dataStructure: 'ScatterDataPoint'
  },
};

export default chartSelectionConfigs;