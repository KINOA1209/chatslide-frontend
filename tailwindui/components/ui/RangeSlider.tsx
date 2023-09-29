import React, { useState } from 'react';

interface RangeSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  label?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  step = 1,
  label
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleOnChange}
        className="slider-thumb appearance-none w-full h-2 bg-gray-200 cursor-pointer rounded-full outline-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #4F46E5 ${(value / max) * 100}%, #E5E7EB ${(value / max) * 100}%)`
        }}
      />
      <div className="text-right mt-2 text-gray-700">{value}</div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #4F46E5;
          cursor: pointer;
          transition: background 0.15s ease-in-out;
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #4F46E5;
          cursor: pointer;
          transition: background 0.15s ease-in-out;
        }

        input[type="range"]:focus::-webkit-slider-thumb {
          background: #3B3F71; // Darkened color for focus state
        }

        input[type="range"]:focus::-moz-range-thumb {
          background: #3B3F71; // Darkened color for focus state
        }

      `}</style>
    </div>
  );
}

export default RangeSlider;
