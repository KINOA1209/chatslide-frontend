export interface Group {
	values: number[]; // y-values if datapoints are in (x,y), otherwise []
	color: string;
	keys: number[]; // x-values if datapoints are in (x,y)
	legend: string;
}

export default interface Chart {
	type: string;
	title: string;
	groups: Group[];
	axis: {
		x: string;
		y: string;
	};
}
