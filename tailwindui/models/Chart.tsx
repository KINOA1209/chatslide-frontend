export default interface Chart {
  chartData: {
    type: string;
    title: string;
    groups: {
      values: number[];
      color: string;
      keys: number[];
      legend: string;
    }[];
    axis: {
      x: string;
      y: string;
    };
  };
}
