import { ChartConfig, ValueDataPoint, ScatterDataPoint } from "./chartDataConfig";
import chartSelectionConfigs from "./chartSelectionConfigs";
import { ChartTypeRegistry } from "chart.js";
import Chart from "@/models/Chart";

interface Group {
  values: number[];
  color: string;
  keys: number[];
  legend: string;
}

export function convertToChartData(chartType: keyof ChartTypeRegistry, dataPoints: ValueDataPoint[] | ScatterDataPoint[]): Chart {
  const config = chartSelectionConfigs[chartType];
  let groups: Group[] = [];
  const chartData = {
    type: config.chartType,
    title: '',
    groups: groups,
    axis: {
      x: "",
      y: ""
    }
  };
  if (config.dataStructure === 'ValueDataPoint') {
    chartData.groups = (dataPoints as ValueDataPoint[]).map(dataPoint => ({
      values: [dataPoint.value],// Assuming keys are the same as values for pie/bar/line charts
      color: dataPoint.color,
      keys: [], 
      legend: dataPoint.label
    }));
  } else if (config.dataStructure === 'ScatterDataPoint') {
    const scatterGroup: Group = {
      values: [],
      color: "", // Assign a default or specific color
      keys: [],
      legend: "Scatter Data" // Assign a legend for scatter data
    };

    (dataPoints as ScatterDataPoint[]).forEach(dataPoint => {
      scatterGroup.values.push(dataPoint.y);
      scatterGroup.keys.push(dataPoint.x);
    });

    chartData.groups.push(scatterGroup);
  }
  return chartData;
}

export const convertFromChartData = (chartData: Chart) => { 
  const config = chartSelectionConfigs[chartData.type];
  if (!config) {
      //console.error(`Unsupported chart type: ${chartData.type}`);
      return { chartType: null, chartData: [] };
  }
  let parsedChartData: ValueDataPoint[] | ScatterDataPoint[] = [];

  if (config.dataStructure === 'ValueDataPoint') {
    parsedChartData = chartData.groups.map(group => ({
      label: group.legend,
      value: group.values[0], // Assuming each group has a single value for non-scatter charts
      color: group.color,
    })) as ValueDataPoint[];
  } else if (config.dataStructure === 'ScatterDataPoint') {
    parsedChartData = chartData.groups.flatMap(group => 
      group.values.map((value, index) => ({
        x: group.keys[index],
        y: value,
      }))
    ) as ScatterDataPoint[];
  }

  return { chartType: chartData.type as keyof ChartTypeRegistry, chartData: parsedChartData };
};