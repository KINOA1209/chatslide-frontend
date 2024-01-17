export default interface Chart {
  type: string;
  data: Record<string, number>;
  options: any;
  title: string;
}
