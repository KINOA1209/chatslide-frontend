import React, { useState } from 'react';

interface RangeSliderProps {
  onChange?: (value: number) => void;
  label?: string;
  values: string[]; // Accepting a list of values
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onChange, label, values }) => {
  const [index, setIndex] = useState<number>(0); // Index will range based on values length
  const MIN_VALUE = 0;
  const MAX_VALUE = values.length - 1;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = e.target.valueAsNumber;
    setIndex(newIndex);
    if (onChange) {
      onChange(newIndex);
    }
  };

  return (
    <div className="w-full mb-6">
      {label && <label className="block text-gray-700 mb-2"><b>{label}</b>: {values[index]}</label>}
      <div className="flex items-center space-x-4">
      <input 
        type="range"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={index}
        step={1}
        onChange={handleOnChange}
        className="slider-thumb appearance-none w-full h-2 bg-gray-200 cursor-pointer rounded-full outline-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #3AC7B1 ${((index) / (MAX_VALUE)) * 100}%, #E5E7EB ${(index) / (MAX_VALUE) * 100}%)`
        }}
      />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #049A8F;
          cursor: pointer;
          transition: background 0.15s ease-in-out;
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #049A8F;
          cursor: pointer;
          transition: background 0.15s ease-in-out;
        }

        input[type="range"]:focus::-webkit-slider-thumb {
          background: #014E56; // Darkened color for focus state
        }

        input[type="range"]:focus::-moz-range-thumb {
          background: #014E56; // Darkened color for focus state
        }

      `}</style>
      </div>
    </div>
  );
}

export default RangeSlider;
