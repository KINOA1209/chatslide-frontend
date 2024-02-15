import { ChartTypeRegistry } from "chart.js";

export interface BaseDataPoint {
    label: string;
}
  
//pie chart, bar chart, line chart
export interface ValueDataPoint extends BaseDataPoint {
    value: number;
}

// export interface MultiValueDataPoint extends BaseDataPoint {
//     values: number[];
// }

//scatter plot
export interface ScatterDataPoint {
    x: number;
    y: number;
}

export interface ChartConfig {
    displayName: string;
    imgSrc: string;
    chartType: keyof ChartTypeRegistry
    dataStructure: 'ValueDataPoint' | 'ScatterDataPoint'
}