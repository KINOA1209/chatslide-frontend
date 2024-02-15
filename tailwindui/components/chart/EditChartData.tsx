import React, { useState } from 'react';
import { ChartConfig, ValueDataPoint, ScatterDataPoint } from './chartDataConfig';
import chartSelectionConfigs from './chartSelectionConfigs';
import { ChartTypeRegistry } from "chart.js";

interface EditChartDataProps {
  chartType: keyof ChartTypeRegistry;
  chartData: ValueDataPoint[] | ScatterDataPoint[];
  setChartData: (data: ValueDataPoint[] | ScatterDataPoint[]) => void;
  onBack: () => void;
}

const EditChartData: React.FC<EditChartDataProps> = ({ 
    chartType, 
    chartData, 
    setChartData, 
    onBack 
}) => {
    const handleAddDataPoint = () => {
        if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
          const newDataPoint = { x: 0, y: 0 } as ScatterDataPoint;
          setChartData([...chartData as ScatterDataPoint[], newDataPoint]);
        } else {
          const newDataPoint = { label: '', value: 0 } as ValueDataPoint;
          setChartData([...chartData as ValueDataPoint[], newDataPoint]);
        }
    };
  
    const handleDataChange = (index: number, field: string, value: string | number) => {
        if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
            const updatedChartData = (chartData as ScatterDataPoint[]).map((dataPoint, idx) => {
            if (idx === index) {
                return { ...dataPoint, [field]: value };
            }
            return dataPoint;
            });
            setChartData(updatedChartData);
        } else {
            const updatedChartData = (chartData as ValueDataPoint[]).map((dataPoint, idx) => {
            if (idx === index) {
                return { ...dataPoint, [field]: value };
            }
            return dataPoint;
            });
            setChartData(updatedChartData);
        }
    };
  
    const handleRemoveDataPoint = (index: number) => {
        if (chartSelectionConfigs[chartType].dataStructure === 'ScatterDataPoint') {
            // Assert the filtered array as ScatterDataPoint[] if the chart is of scatter type
            const updatedChartData = (chartData as ScatterDataPoint[]).filter((_, idx) => idx !== index);
            setChartData(updatedChartData as ScatterDataPoint[]);
        } else {
            // Assert the filtered array as ValueDataPoint[] if the chart is not of scatter type
            const updatedChartData = (chartData as ValueDataPoint[]).filter((_, idx) => idx !== index);
            setChartData(updatedChartData as ValueDataPoint[]);
        }
    };
  
    const renderDataFields = () => chartData.map((dataPoint, index) => (
      <div key={index}>
        {'x' in dataPoint ? (
          // ScatterDataPoint fields
          <>
            <input type="number" value={dataPoint.x} onChange={e => handleDataChange(index, 'x', Number(e.target.value))} />
            <input type="number" value={dataPoint.y} onChange={e => handleDataChange(index, 'y', Number(e.target.value))} />
          </>
        ) : (
          // ValueDataPoint fields
          <>
            <input type="text" value={dataPoint.label} onChange={e => handleDataChange(index, 'label', e.target.value)} />
            <input type="number" value={dataPoint.value} onChange={e => handleDataChange(index, 'value', Number(e.target.value))} />
          </>
        )}
        <button onClick={() => handleRemoveDataPoint(index)}>Remove</button>
      </div>
    ));
  
    return (
      <div>
        <button onClick={onBack}>Back</button>
        {renderDataFields()}
        <button onClick={handleAddDataPoint}>Add Data Point</button>
      </div>
    );
  };
  
  export default EditChartData;