import { ValueDataPoint, ScatterDataPoint } from "./chartDataConfig";
export const getChartData = (chartType: string) => {
    switch(chartType) {
        case 'pie':
            return [
                { label: 'Category 1', value: 10, color: '#ff6384' },
                { label: 'Category 2', value: 20, color: '#ff9f40' },
                { label: 'Category 3', value: 30, color: '#ffcd56' },
                { label: 'Category 4', value: 40, color: '#4bc0c0' },
                { label: 'Category 5', value: 50, color: '#36a2eb' },
        ] as ValueDataPoint[];

        case 'line':
            return [
                { label: 'Point 1', value: 70, color: '' },
                { label: 'Point 2', value: 20, color: '' },
                { label: 'Point 3', value: 100, color: '' },
                { label: 'Point 4', value: 40, color: '' },
        ] as ValueDataPoint[]

        case 'bar':
            return [
                { label: 'Category 1', value: 100, color: '#ff6384' },
                { label: 'Category 2', value: 40, color: '#ff9f40' },
                { label: 'Category 3', value: 70, color: '#ffcd56' },
        ] as ValueDataPoint[]

        default:
            return[
                { label: 'Category 1', value: 10, color: '#ff6384' },
                { label: 'Category 2', value: 20, color: '#ff9f40' },
                { label: 'Category 3', value: 30, color: '#ffcd56' },
                { label: 'Category 4', value: 40, color: '#4bc0c0' },
                { label: 'Category 5', value: 50, color: '#36a2eb' },
        ] as ValueDataPoint[];
      }
}

export const getOptions = (chartType: string) => {
    switch(chartType){
        case 'pie':
            return {
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                tooltips: {
                    enabled: false
               }
            }
        case 'line':
            return {
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                tooltips: {
                    enabled: false
               }
            }
        case 'bar':
            return {
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                tooltips: {
                    enabled: false
               }
            }
        default:
            return {
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                tooltips: {
                    enabled: false
               }
            }
    }
}
