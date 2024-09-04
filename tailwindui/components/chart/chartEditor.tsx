import { DataGrid, GridActionsCellItem, GridColDef, GridColumnMenu, GridColumnMenuItemProps, GridColumnMenuProps, GridRenderCellParams, GridRowId, useGridApiRef } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { AddSectionIcon, DeleteIcon } from '@/app/(feature)/icons';
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import MiniColorPicker from '../utils/miniColorPicker';
import { SmallTitle } from '../ui/Text';

interface ChartEditorProps {
    chartData: any;
    setChartData: (chartData: any) => void;
}

export const ChartEditor = ({ chartData, setChartData }: ChartEditorProps) => {
    const [editorData, setEditorData] = useState<{ rows: { [key: string]: any }[], columns: any[] }>({ rows: [], columns: [] });
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const apiRef = useGridApiRef();
    const [columnToEdit, setColumnToEdit] = useState<{ field: string, headerName: string } | null>(null);

    function handleUpdateColor(color: string, params: GridRenderCellParams<any>) {
        let newChartData = { ...chartData };
        if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
            newChartData.datasets[params.row.id][params.field] = color;
        } else {
            newChartData.datasets[0][params.field][params.row.id] = color;
        }
        newChartData.datasets = [...newChartData.datasets];
        setChartData(newChartData);
    }

    useEffect(() => {
        var rows: { [key: string]: any }[] = [];
        var columns: GridColDef[] = [];
        if (chartData) {
            if (!['pie', 'doughnut'].includes(chartData.chartType)) {
                columns = chartData.labels.map((label: any, i: number) => {
                    return { field: i.toString(), headerName: label, editable: true };
                });
                columns.unshift({ field: "cat", headerName: "Category", editable: true });
                columns.push({
                    field: "backgroundColor", headerName: "Fill Color", editable: false,
                    renderCell: (params: GridRenderCellParams<any>) => {
                        return <div className='w-full h-full flex justify-center items-center' >
                            <MiniColorPicker color={params.value} setColor={(color) => { handleUpdateColor(color, params) }} />
                        </div >
                    }
                });
                columns.push({
                    field: "borderColor", headerName: "Border Color", editable: false,
                    renderCell: (params: GridRenderCellParams<any>) => {
                        return <div className='w-full h-full flex justify-center items-center' >
                            <MiniColorPicker color={params.value} setColor={(color) => { handleUpdateColor(color, params) }} />
                        </div >
                    }
                });
                rows = chartData.datasets.map((dataset: any, i: number) => {
                    return { id: i, "cat": dataset.label, editable: true };
                });
                for (let id = 0; id < chartData.datasets.length; id++) {
                    const data = chartData.datasets[id];
                    data.data.forEach((value: any, i: number) => {
                        if (value) {
                            rows[id][i.toString()] = value.toString();
                        } else {
                            rows[id][i.toString()] = "0";
                        }
                    });
                    rows[id]['backgroundColor'] = data.backgroundColor;
                    rows[id]['borderColor'] = data.borderColor;
                }
            } else {
                columns = [{ field: "cat", headerName: "Category", editable: true }, { field: "val", headerName: "Value", editable: true }];

                columns.push({
                    field: "backgroundColor", headerName: "Fill Color", editable: false,
                    renderCell: (params: GridRenderCellParams<any>) => {
                        return <div className='w-full h-full flex justify-center items-center' >
                            <MiniColorPicker color={params.value} setColor={(color) => { handleUpdateColor(color, params) }} />
                        </div >
                    }
                });
                columns.push({
                    field: "borderColor", headerName: "Border Color", editable: false,
                    renderCell: (params: GridRenderCellParams<any>) => {
                        return <div className='w-full h-full flex justify-center items-center' >
                            <MiniColorPicker color={params.value} setColor={(color) => { handleUpdateColor(color, params) }} />
                        </div >
                    }
                });
                rows = chartData.labels.map((label: any, i: number) => {
                    return { id: i, "cat": label, "val": chartData.datasets[0].data[i] };
                });
                for (let id = 0; id < chartData.datasets[0].data.length; id++) {
                    const backgroundColor = chartData.datasets[0].backgroundColor;
                    const borderColor = chartData.datasets[0].borderColor;
                    rows[id]['backgroundColor'] = backgroundColor[id];
                    rows[id]['borderColor'] = borderColor[id];
                }
            }
            // add delete action column
            columns.push({
                field: "act", headerName: "Action", type: "actions", getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            key="delete"
                            icon={<DeleteIcon />}
                            label="Delete"
                            showInMenu={false}
                            onClick={() => handleDeleteRow(id)}
                        />,
                    ];
                }
            });
        }
        setEditorData({ rows, columns })
    }, [chartData]);

    function updateChartData(updatedRow: { [key: string]: any; }): { [key: string]: any; } {
        var newChartData = { ...chartData }
        const rowId = updatedRow.id;
        if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
            //  loop each property in the updated row
            for (const key in updatedRow) {
                if (key === "id" || key === "editable") continue;
                if (key === "cat") {
                    newChartData.datasets[rowId].label = updatedRow[key];
                } else {
                    const colId = parseInt(key);
                    const value = parseFloat(updatedRow[key]);
                    if (!isNaN(value)) {
                        newChartData.datasets[rowId].data[colId] = value;
                    }
                    else {
                        newChartData.datasets[rowId].data[colId] = 0;
                    }
                }
            }
        } else {
            const value = parseFloat(updatedRow['val']);
            if (!isNaN(value)) {
                newChartData.datasets[0].data[rowId] = value;
            }
            else {
                newChartData.datasets[0].data[rowId] = 0;
            }
            newChartData.labels[rowId] = updatedRow['cat'];
        }
        setChartData(newChartData);
        return updatedRow
    }

    function handleAddRow() {
        let newChartData = { ...chartData };
        if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
            const newEntry = {
                backgroundColor: "rgb(209, 209, 224)",
                borderColor: "rgb(102, 102, 153)",
                borderWidth: "2",
                label: "New Entry",
                data: new Array(chartData.labels.length).fill(0)
            };
            newChartData.datasets.push(newEntry);
        } else {
            newChartData.datasets[0].data.push(0);
            newChartData.datasets[0].backgroundColor.push("rgba(209, 209, 224, 1)");
            newChartData.datasets[0].borderColor.push("rgba(0, 0, 0, 0)");
            newChartData.labels.push("New Entry");
        }
        setChartData(newChartData);
    }

    function handleAddColumn() {
        if (chartData.chartType === 'pie' || chartData.chartType === 'doughnut') {
            console.error("Cannot add column in pie or doughnut chart");
            return;
        }
        let newChartData = { ...chartData };
        if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
            newChartData.datasets.forEach((dataset: any) => {
                dataset.data.push(0);
            });
            newChartData.labels.push("New Column");
        } else {
            console.error("Cannot add column in pie or doughnut chart");
        }
        setChartData(newChartData);
    }

    function handleUpdateColumn(field: string, headerName: string) {
        if (apiRef.current !== null) {
            setAnchorEl(apiRef.current.getColumnHeaderElement(field))
            setColumnToEdit({
                field: field,
                headerName: headerName
            });
        }
    }

    function finishUpdateColumn() {
        if (columnToEdit && columnToEdit.headerName !== "" && !isNaN(parseInt(columnToEdit.field))) {
            const colId = parseInt(columnToEdit.field);
            let newChartData = { ...chartData };
            if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
                newChartData.labels[colId] = columnToEdit.headerName;
            } else {
                console.error("Cannot modify column in pie or doughnut chart");
            }
            setChartData(newChartData);
        }
        setAnchorEl(null);
        setColumnToEdit(null);
    }

    function handleDeleteColumn(field: string, headerName: string) {
        if (chartData.chartType === 'pie' || chartData.chartType === 'doughnut') {
            console.error("Cannot delete column in pie or doughnut chart");
            return;
        }
        const colId = parseInt(field);
        let newChartData = { ...chartData };
        if (!isNaN(colId)) {
            if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
                newChartData.datasets.forEach((dataset: any) => {
                    dataset.data.splice(colId, 1);
                });
                newChartData.labels.splice(colId, 1);
            } else {
                console.error("Cannot delete column in pie or doughnut chart");
            }
        }
        setChartData(newChartData);
    }

    function handleDeleteRow(id: GridRowId) {
        const rowID: number = typeof id === 'number' ? id : parseInt(id);
        if (isNaN(rowID)) {
            console.error("Invalid Row ID");
        }
        let newChartData = { ...chartData };
        if (!['pie', 'doughnut'].includes(newChartData.chartType)) {
            newChartData.datasets.splice(rowID, 1);
        } else {
            newChartData.datasets[0].data.splice(rowID, 1);
            newChartData.datasets[0].backgroundColor.splice(rowID, 1);
            newChartData.datasets[0].borderColor.splice(rowID, 1);
            newChartData.labels.splice(rowID, 1);
        }
        setChartData(newChartData);
    }

    function CustomUserItem(props: GridColumnMenuItemProps) {
        const { menuItemIcon, menuItemHandler, menuItemValue } = props;
        return (
            <MenuItem onClick={menuItemHandler}>
                <ListItemIcon>
                    {menuItemIcon}
                </ListItemIcon>
                <ListItemText>{menuItemValue}</ListItemText>
            </MenuItem>
        );
    }


    function CustomColumnMenu(props: GridColumnMenuProps) {
        const { onClick, colDef, id, labelledby } = props;
        const showMenuItem = (!['pie', 'doughnut'].includes(chartData.chartType)) && colDef.field !== "cat" && colDef.field !== "backgroundColor" && colDef.field !== "borderColor";
        return (
            <GridColumnMenu
                {...props}
                slots={{
                    ...(showMenuItem) && { columnMenuUpdateItem: CustomUserItem },
                    ...(showMenuItem) && { columnMenuDeleteItem: CustomUserItem },
                }}
                slotProps={{
                    columnMenuUpdateItem: {
                        menuItemIcon: <DeleteIcon />,
                        menuItemValue: 'Edit Column Title',
                        menuItemHandler: () => { handleUpdateColumn(colDef.field, colDef.headerName || "") },
                    },
                    columnMenuDeleteItem: {
                        menuItemIcon: <DeleteIcon />,
                        menuItemValue: 'Delete Column "' + colDef.headerName + '"',
                        menuItemHandler: () => { handleDeleteColumn(colDef.field, colDef.headerName || "") },
                    },
                }}
            />
        );
    }

    function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const newChartData = { ...chartData };
        newChartData.title = e.target.value;
        setChartData(newChartData);
    }

    function handleChangeXAxis(e: ChangeEvent<HTMLInputElement>) {
        const newChartData = { ...chartData };
        newChartData.options.xTitle = e.target.value;
        setChartData(newChartData);
    }

    function handleChangeYAxis(e: ChangeEvent<HTMLInputElement>) {
        const newChartData = { ...chartData };
        newChartData.options.yTitle = e.target.value;
        setChartData(newChartData);
    }

    return (
			<div className='w-full'>
				<Popover
					id='columnTitleInput'
					open={anchorEl !== null}
					anchorEl={anchorEl}
					onClose={finishUpdateColumn}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
				>
					<div className='flex flex-col gap-2 m-2'>
						<Typography sx={{ p: 2 }}>Enter new column name</Typography>
						<TextField
							value={columnToEdit?.headerName || ''}
							onChange={(e) =>
								setColumnToEdit({
									field: columnToEdit?.field || '',
									headerName: e.target.value,
								})
							}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === 'Tab') {
									e.preventDefault();
									finishUpdateColumn();
								}
							}}
						/>
					</div>
				</Popover>
				<div className='w-full flex justify-start'>
					<SmallTitle>Edit Data</SmallTitle>
				</div>
				<div className='w-full flex flex-col lg:flex-row justify-between gap-4 items-center mt-4'>
					<div className='grid grid-cols-4 gap-2 shrink'>
						<TextField
							className='col-span-2'
							id='title'
							label='Title'
							size='small'
							value={chartData.title}
							onChange={handleChangeTitle}
						/>
						<TextField
							id='x-axis'
							label='X-axis'
							size='small'
							value={chartData.options.xTitle}
							onChange={handleChangeXAxis}
						/>
						<TextField
							id='y-axis'
							label='Y-axis'
							size='small'
							value={chartData.options.yTitle}
							onChange={handleChangeYAxis}
						/>
					</div>
					<div className='flex gap-2 w-[287px] shrink-0 justify-end'>
						<Button
							variant='outlined'
							startIcon={<AddSectionIcon />}
							onClick={handleAddRow}
							className='w-fit h-fit whitespace-nowrap'
						>
							Add Row
						</Button>
						{chartData.chartType !== 'pie' &&
							chartData.chartType !== 'doughnut' && (
								<Button
									variant='outlined'
									startIcon={<AddSectionIcon />}
									onClick={handleAddColumn}
									className='w-fit h-fit whitespace-nowrap'
								>
									Add Column
								</Button>
							)}
					</div>
				</div>
				<div className='mt-4 w-full'>
					<DataGrid
						autoHeight
						disableColumnSorting
						rows={editorData.rows}
						columns={editorData.columns}
						processRowUpdate={(updatedRow, originalRow) =>
							updateChartData(updatedRow)
						}
						onProcessRowUpdateError={(error) => {
							console.error(error);
						}}
						slots={{ columnMenu: CustomColumnMenu }}
						apiRef={apiRef}
					/>
				</div>
			</div>
		);



}