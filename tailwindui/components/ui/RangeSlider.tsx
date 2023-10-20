import React, { useState } from 'react'
import PaywallModal from '../forms/paywallModal'

interface RangeSliderProps {
  onChange?: (value: number) => void
  label?: string
  values: string[] // Accepting a list of values
  locked?: boolean
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  onChange,
  label,
  values,
  locked,
}) => {
  const [index, setIndex] = useState<number>(0) // Index will range based on values length
  const MIN_VALUE = 0
  const MAX_VALUE = values.length - 1
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('locked', locked)

    if (locked) {
      setShowPaymentModal(true)
      return
    }
    const newIndex = e.target.valueAsNumber
    setIndex(newIndex)
    if (onChange) {
      onChange(newIndex)
    }
  }

  return (
    <div className='w-full mb-6'>
      {label && (
        <label className='block text-gray-700 mb-2'>
          <b>
            {locked ? '🔒 ' : '⭐️ '}
            {label}
          </b>
          : {values[index]}
        </label>
      )}
      <div className='flex items-center space-x-4'>
        <input
          type='range'
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={index}
          step={1}
          onChange={handleOnChange}
          className='slider-thumb appearance-none w-full h-2 bg-gray-200 cursor-pointer rounded-full outline-none'
          style={{
            backgroundImage: `linear-gradient(90deg, #3AC7B1 ${
              (index / MAX_VALUE) * 100
            }%, #E5E7EB ${(index / MAX_VALUE) * 100}%)`,
          }}
        />

        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #049a8f;
            cursor: pointer;
            transition: background 0.15s ease-in-out;
          }

          input[type='range']::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #049a8f;
            cursor: pointer;
            transition: background 0.15s ease-in-out;
          }

          input[type='range']:focus::-webkit-slider-thumb {
            background: #014e56; // Darkened color for focus state
          }

          input[type='range']:focus::-moz-range-thumb {
            background: #014e56; // Darkened color for focus state
          }
        `}</style>
      </div>
      {showPaymentModal && (
        <PaywallModal
          setShowModal={setShowPaymentModal}
          message='Upgrade to unlock more features. 🚀'
        />
      )}
    </div>
  )
}

export default RangeSlider
