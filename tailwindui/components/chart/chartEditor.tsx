import { DataGrid } from '@mui/x-data-grid';
import { RefObject, useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js';
import { Button } from '@mui/material';
import { AddSectionIcon, DeleteIcon, AddTopicIcon, AddSlideIcon } from '@/app/(feature)/icons';

interface ChartEditorProps {
    chartData: any;
    setChartData: (chartData: any) => void;
}

export const ChartEditor = ({ chartData, setChartData }: ChartEditorProps) => {
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
                    } else {
                        rows[id][(i + 1).toString()] = "0";
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
                newChartData.datasets[rowId].label = updatedRow[key];
            } else {
                const colId = parseInt(key);
                const value = parseFloat(updatedRow[key]);
                if (!isNaN(value)) {
                    newChartData.datasets[rowId].data[colId - 1] = parseFloat(updatedRow[key]);
                }
                else {
                    newChartData.datasets[rowId].data[colId - 1] = 0;
                }
            }
        }
        setChartData(newChartData);
        return updatedRow
    }

    function handleAddEntry() {
        let newChartData = { ...chartData };
        const newEntry = {
            backgroundColor: "rgb(209, 209, 224)",
            borderColor: "rgb(102, 102, 153)",
            label: "New Entry",
            data: new Array(chartData.labels.length).fill(0)
        };
        newChartData.datasets.push(newEntry);
        setChartData(newChartData);
    }

    return (
        <div className="w-full">
            <div className='w-full flex justify-between'>
                <h2 className="text-lg font-bold">Edit Data</h2>
                <div>
                    <Button variant="outlined" startIcon={<AddSectionIcon />} onClick={handleAddEntry}>
                        Add Entry
                    </Button>
                </div>
            </div>
            <div className="mt-4 w-full">
                <DataGrid autoHeight rows={editorData.rows} columns={editorData.columns} processRowUpdate={(updatedRow, originalRow) => updateChartData(updatedRow)} onProcessRowUpdateError={(error) => { console.error(error) }} />
            </div>
        </div>
    );



}