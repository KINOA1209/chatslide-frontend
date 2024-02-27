import React from 'react';
import Image from 'next/image';

export interface RadioButtonOption {
  img?: any;
  value: string;
  icon?: JSX.Element;
  text: string;
}

interface RadioButtonProps {
  name: string;
  options: RadioButtonOption[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, options, selectedValue, setSelectedValue }) => {
  return (
    <div className='grid grid-cols-3 gap-x-4'>
      {options.map(({ img, value, text, icon }) => (

        <div key={value} className={`rounded-lg py-2`} onClick={() => setSelectedValue(value)}>
          <label>
            {img &&
              <div>
                <Image src={img} alt={text} />
              </div>
            }
            <div className='flex flex-row items-center gap-x-2'>
              <input
                type='radio'
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={() => setSelectedValue(value)}
              />
              <span className='flex flex-row justify-center items-center gap-1'>
                {icon}
                {text}
              </span>
            </div>
          </label>
        </div>))}
    </div>
  );
}

export default RadioButton;
