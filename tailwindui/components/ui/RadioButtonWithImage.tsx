import React from 'react';
import Image from 'next/image';

export interface ImageOption {
  img: any;
  value: string;
  alt: string;
}

interface RadioButtonWithImageProps {
  options: ImageOption[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const RadioButtonWithImage: React.FC<RadioButtonWithImageProps> = ({ options, selectedValue, setSelectedValue }) => {

  return (
    <div className='grid grid-cols-3 gap-x-4 mt-3'>
      {options.map(({ img, value, alt }) => (

        <div key={value} className={`rounded-lg py-2`}>
          <label>
            <div onClick={() => setSelectedValue(value)}>
              <Image src={img} alt={alt} />
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <input
                type='radio'
                name='theme'
                value={value}
                checked={selectedValue === value}
                onChange={() => setSelectedValue(value)}
              />
              <span dangerouslySetInnerHTML={{ __html: alt }}></span>
            </div>
          </label>
        </div>))}
    </div>
  );
}

export default RadioButtonWithImage;
