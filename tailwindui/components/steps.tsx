import React from 'react';
import { useRouter } from 'next/navigation';
import CSS from 'csstype';

interface StepProps {
    id: number,
    current: boolean,
    finished: boolean,
    desc: string
};

const StepStyle: CSS.Properties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '5px',
    fontSize: '15px'
}


const OneStep: React.FC<StepProps> = ({ id, current, finished, desc }) => {
    if (current) {
        return (
            <div className='w-24 h-14 flex flex-col items-center'>
                <div className='bg-white border-blue-500 text-blue-500' style={StepStyle}>{id}</div>
                <span className='text-blue-500'>{desc}</span>
            </div>
        )
    } else if (finished) {
        return (
            <div className='w-24 h-14 flex flex-col items-center'>
                <div className='bg-blue-500 border-blue-500 text-white hover:bg-blue-700 hover:border-blue-700' style={StepStyle}>{id}</div>
                <span className='hover:text-blue-700'>{desc}</span>
            </div>
        )
    } else {
        return (
            <div className='w-24 h-14 flex flex-col items-center'>
                <div className='bg-gray-400 border-gray-400 text-white' style={StepStyle}>{id}</div>
                <span className='text-gray-400'>{desc}</span>
            </div>
        )
    }
}

interface NavProps {
    currentInd: number
};

const ProgressBox: React.FC<NavProps> = ({currentInd}) => {
    const steps = ['Topic', 'Outlines', 'Slides', 'Transcript', 'Audio', 'Video'];

    return (
        <div className="max-w-3xl mx-auto text-center">
            <div className='w-full'>
                <div className='relative flex '>
                    <div className='float-left' style={{ height: '16px', width: '48px' }}></div>
                    <div className='w-full border-b-4 border-blue-200' style={{ height: '16px' }}></div>
                    <div className='float-left' style={{ height: '16px', width: '48px' }}></div>
                </div>
                <div className='relative -top-4 w-full flex flex-row justify-between flex-nowrap pb-6'>
                    {steps.map((desc, index) => (
                        <OneStep
                        id={index + 1}
                        current={currentInd == index}
                        finished={currentInd > index}
                        desc={desc} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ProgressBox;