import { DataGrid } from '@mui/x-data-grid';
import { RefObject, useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js';

interface ChartEditorProps {
    chartData: any;
    setChartData: (chartData: any) => void;
    chartRef: RefObject<ChartJS>;
}

export const ChartEditor = ({ chartData, setChartData, chartRef }: ChartEditorProps) => {
    const [editorData, setEditorData] = useState<{ rows: { [key: string]: any }[], columns: any[] }>({ rows: [], columns: [] });
    useEffect(() => {
        var rows: { [key: string]: any }[] = [];
        var columns = [];
        if (chartData) {
            columns = chartData.labels.map((label: any, i: number) => {
                return { field: (i + 1).toString(), headerName: label, editable: true };
            });
            columns.unshift({ field: "0", headerName: "Category", editable: true });
            rows = chartData.datasets.map((dataset: any, i: number) => {
                return { id: i, "0": dataset.label, editable: true };
            });
            for (let id = 0; id < chartData.datasets.length; id++) {
                const data = chartData.datasets[id];
                data.data.forEach((value: any, i: number) => {
                    if (value) {
                        rows[id][(i + 1).toString()] = value.toString();
                    }
                });
            }
        }
        setEditorData({ rows, columns })
    }, [chartData]);

    function updateChartData(updatedRow: { [key: string]: any; }): { [key: string]: any; } {
        var newChartData = { ...chartData }
        const rowId = updatedRow.id;
        //  loop each property in the updated row
        for (const key in updatedRow) {
            if (key === "id" || key === "editable") continue;
            if (key === "0") {
                if (chartRef.current) {
                    chartRef.current.data.datasets[rowId].label = updatedRow[key];
                    chartRef.current.update();
                }
                newChartData.datasets[rowId].label = updatedRow[key];
            } else {
                const colId = parseInt(key);
                newChartData.datasets[rowId].data[colId - 1] = parseFloat(updatedRow[key]);
            }
        }
        setChartData(newChartData);
        return updatedRow
    }

    return (
        <div className="w-full">
            <h2 className="text-lg font-bold">Edit Data</h2>
            <div className="mt-4 w-full">
                <DataGrid autoHeight rows={editorData.rows} columns={editorData.columns} processRowUpdate={(updatedRow, originalRow) => updateChartData(updatedRow)} onProcessRowUpdateError={(error) => { console.log(error) }} />
            </div>
        </div>
    );



}