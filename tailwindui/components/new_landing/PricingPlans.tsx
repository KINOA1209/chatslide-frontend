'use client'

import { StarterIcon, PlusIcon, ProIcon, EnterpriseIcon } from './Icons'
import { pricingPlansMonthlyData } from './data/pricingPlansData'
import { pricingPlansYearlyData } from './data/pricingPlansData'
import { useState } from 'react'

interface PricingCardProps {
    pricingPlansData: any;
  }
  
  const PricingCards: React.FC<PricingCardProps> = ({ pricingPlansData }) => {
    return (
        <div className='pricing-options grid grid-cols-1 lg:grid-cols-4 gap-6 mx-auto max-w-7xl'>
            {pricingPlansData.map((plan: any) => (
                <div
                    key={plan.title}
                    className={`transition-transform duration-150 transform hover:-translate-y-2 w-80 p-6 rounded-md border flex-col inline-flex justify-start items-start gap-6  ${plan.title === 'Starter'
                            ? 'bg-indigo-50 border-violet-200'
                            : plan.title === 'Plus'
                                ? 'bg-gradient-to-b from-blue-400 to-fuchsia-500 rounded-md border border-indigo-300'
                                : plan.title === '* Pro'
                                    ? 'bg-gradient-to-b from-violet-500 to-fuchsia-500'
                                    : plan.title === 'ENTERPRISE'
                                        ? 'bg-neutral-50 border-gray-200'
                                        : '' // Add more conditions for other styles
                        }`}
                >
                    <div
                        className={`w-[163px] text-sm font-bold font-creato-medium uppercase leading-normal tracking-widest ${plan.title === 'Starter'
                                ? 'text-indigo-400'
                                : plan.title === 'Plus'
                                    ? 'text-neutral-50'
                                    : plan.title === '* Pro'
                                        ? 'text-neutral-50'
                                        : plan.title === 'ENTERPRISE'
                                            ? 'text-neutral-800'
                                            : '' // Add more conditions for other styles
                            }`}
                    >
                        {plan.title}
                    </div>
                    {/* <div className='text-xl font-semibold'>{plan.title}</div> */}
                    {/* <div className='text-2xl font-bold'>{plan.price}</div>
            <div className='text-gray-600'>{plan.frequency}</div> */}
                    <div className='w-[264px] h-[108px] py-3 flex-col justify-center items-start inline-flex'>
                        <div
                            className={`w-[264px] text-[40px] font-creato-bold leading-[48px] tracking-wide ${plan.title === 'Starter'
                                    ? 'text-blue-700'
                                    : plan.title === '* Pro' || plan.title === 'Plus'
                                        ? 'text-neutral-50'
                                        : plan.title === 'ENTERPRISE'
                                            ? 'text-gray-400'
                                            : '' // Add more conditions for other styles
                                }`}
                        >
                            {plan.price}
                        </div>
                        {plan.frequency !== undefined && plan.frequency !== '' ? ( // Check if plan has a non-empty frequency
                            <div className='w-[264px] text-indigo-50 text-sm font-normal font-creato-normal leading-9 tracking-wide'>
                                {plan.frequency}
                            </div>
                        ) : (
                            <div className='w-[264px] text-indigo-50 text-sm font-normal font-creato-normal leading-9 tracking-wide'>
                                <span className='invisible'>
                                    {plan.title === 'ENTERPRISE' ? '' : '/month'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div
                        className={`w-[264px] h-[204px] py-2 flex-col justify-start items-start inline-flex ${plan.title !== 'ENTERPRISE' ? 'border-t-2' : ''
                            }`}
                    >
                        {plan.features.map((feature: any, index: number) => (
                            <div
                                key={index}
                                className='w-[259.26px] py-1.5 justify-start items-start inline-flex'
                            >
                                <div className='w-[20.74px] h-[20.74px] relative'>
                                    <div className='w-[20.74px] h-[20.74px] left-0 top-0 absolute'>
                                        {' '}
                                        {/* <div
                      className={`${
                        plan.title === 'ENTERPRISE'
                          ? 'w-[5.19px] h-[5.19px] left-[7.78px] top-[7.78px] absolute'
                          : ''
                      }`}
                    > */}
                                        {plan.title === 'Starter' && <StarterIcon />}{' '}
                                        {/* Render the appropriate icon based on plan */}
                                        {plan.title === '* Pro' && <ProIcon />}
                                        {plan.title === 'Plus' && <PlusIcon />}
                                        {plan.title === 'ENTERPRISE' && <EnterpriseIcon />}
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div
                                    className={`w-[238.52px] text-sm font-creato-regular leading-snug tracking-[0.0175rem] ${plan.title === 'Starter'
                                            ? 'text-blue-700'
                                            : plan.title === 'Plus' || plan.title === '* Pro'
                                                ? 'text-zinc-100'
                                                : plan.title === 'ENTERPRISE'
                                                    ? 'text-gray-700'
                                                    : '' // Add more conditions for other styles
                                        }`}
                                >
                                    {feature}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className={`w-[260px] h-10 px-[15.56px] py-[5.19px]  rounded-[8.90px] justify-center items-center gap-[11.13px] inline-flex ${plan.title === '* Pro'
                                ? 'bg-gradient-to-r from-fuchsia-600 to-fuchsia-600'
                                : plan.title === 'Starter' || plan.title === 'ENTERPRISE'
                                    ? 'bg-indigo-500'
                                    : plan.title === 'Plus'
                                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600'
                                        : '' // Add more conditions for other styles
                            }`}
                    >
                        <a href={plan.link} target="_blank">
                            <div className='w-[228px] text-center text-zinc-100 text-base font-medium font-creato-medium leading-normal tracking-tight'>
                                {plan.cta}
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

const PricingSection = () => {

    const [pricingPlansData, setPricingPlansData] = useState(
        pricingPlansMonthlyData
    )

    const [isYearlyData, setIsYearlyData] = useState(false)

    const handleMonthlyClick = () => {
        setIsYearlyData(false)
        setPricingPlansData(pricingPlansMonthlyData)
    }

    const handleYearlyClick = () => {
        setIsYearlyData(true)
        setPricingPlansData(pricingPlansYearlyData)
    }

    return (
        <div className='mt-[10rem] mb-[6rem] flex flex-col justify-center items-center'>
            <div className='w-[90%] text-center text-neutral-900 text-4xl lg:text-6xl font-creato-medium leading-[4rem] lg:leading-[7.5rem]'>
                Pricing
            </div>
            <div className='w-[90%] mx-auto max-w-7xl mb-[3rem] flex justify-center lg:justify-end items-center'>
                <div className='billing-options flex justify-center items-center rounded-xl bg-Grey-100'>
                    <div
                        className='billing-option text-[0.7rem] lg:text-base px-2 py-2 cursor-pointer'
                        onClick={handleMonthlyClick}
                    >
                        <span
                            className={`rounded-md ${isYearlyData ? '' : 'bg-Grey-50'
                                } px-[1rem] py-[0.1rem] font-medium`}
                        >
                            Monthly billing
                        </span>
                    </div>
                    <div
                        className='billing-option text-[0.7rem] lg:text-base px-2 py-2 cursor-pointer'
                        onClick={handleYearlyClick}
                    >
                        <span
                            className={`rounded-md px-[1rem] py-[0.1rem] text-Grey-600 ${isYearlyData ? 'bg-Grey-50' : ''
                                } font-normal `}
                        >
                            Yearly Billing (save 17%)
                        </span>
                    </div>
                </div>
            </div>
            <PricingCards pricingPlansData={pricingPlansData}/>
        </div>
    )
}

export default PricingSection
