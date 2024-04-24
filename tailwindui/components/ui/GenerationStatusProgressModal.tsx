import Modal from './Modal';
import React, { FC, useEffect, useState } from 'react';
import FillOutFormImg from '@/public/images/user_onboarding/FillOutForms.png';
import BookASessionImg from '@/public/images/user_onboarding/BookASession.png';
import { getBrand } from '@/utils/getHost';
import { Explanation, Instruction, Title } from './Text';


interface GenerationStatusProgressModalProps {
  onClick: () => void;
  prompts: [string, number][]; // Array of prompt text and waiting time pairs
}

export const GenerationStatusProgressModal: FC<
  GenerationStatusProgressModalProps
> = ({ onClick, prompts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [stepsCompleted, setStepsCompleted] = useState(false); // Flag to track whether steps are completed
  const [canClose, setCanClose] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const targetPercentage = 99;
    let currentPercentage = 0;

    if (prompts[currentIndex] && !stepsCompleted) {
      const interval = setInterval(() => {
        // Increment the progress until it reaches the target percentage
        if (currentPercentage < targetPercentage) {
          currentPercentage++;
          setPercentage(currentPercentage);
        } else {
          clearInterval(interval); // Stop the interval when target percentage is reached
          if (currentIndex < prompts.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next prompt
            setPercentage(0); // Reset percentage for the next prompt
          } else {
            setStepsCompleted(true); // Set flag to true when all steps are completed
            setCanClose(true); // Enable the close button when all steps are completed
          }
        }
      }, (prompts[currentIndex][1] || 1) * 10); // Adjust the interval duration based on waitingTime

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [currentIndex, prompts]);

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      // position='fixed max-w-[50rem] h-auto'
      clickOutsideToClose={canClose}
      canClose={canClose}
    >
      {/* Generation status prompt area */}
      <section
        id='generationStatus'
        className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
      >
        <div className='w-full flex flex-row items-center justify-between'>
          {/* status prompt text */}
          <div className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
            {canClose ?
              '💪 Still working on your job...' :
              prompts[currentIndex] && prompts[currentIndex][0]}
          </div>

          {/* progress status number percentage */}
          <div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
            <span className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
        {/* progress bar */}
        <div className='w-full bg-[#F4F4F4] relative'>
          <div
            className='absolute top-0 left-0 h-[0.375rem] bg-[#5168F6]'
            style={{ width: `${percentage}%` }}
          />
        </div>
      </section>
      {/* explaining text for filling out form */}
      <hr className='border-t-[1px] border-[#E0E0E0]' />
      <section
        id='userResearch'
        className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
      >
        <Title center>
          Earn free credits⭐ by joining our user study
        </Title>
        <Explanation>
          We want to learn more about what you think of {getBrand()}, and how you
          use {getBrand()}.
        </Explanation>
        <div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
          {/* book a session */}
          <a
            href='https://calendar.app.google/2uGV3B6h9UdYBHPB8'
            target='_blank'
            className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
            role='menuitem'
          >
            <div
              className='w-80 relative flex flex-row justify-evenly items-center transition duration-300 ease-in-out hover:shadow-lg'
              style={{
                borderRadius: '0.4375rem',
                border: '1px solid var(--Blue-Blue_200, #B4C5FA)',
                background: '#FFF',
                boxShadow: '0px 12px 28.8px 0px rgba(74, 153, 246, 0.25)',
              }}
            >
              <div className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem]'>
                <img
                  src={BookASessionImg.src}
                  alt='Book a session'
                  className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem] object-contain'
                />
              </div>

              <div className='text-center'>
                <Instruction>
                  Book a session <br></br>+1000⭐
                  <br />
                </Instruction>
                <Explanation>
                  (~30 mins){' '}
                </Explanation>
              </div>
            </div>
          </a>

          {/* fill out a form */}
          <a
            href='https://forms.gle/kncWqBjU4n5xps1w8'
            target='_blank'
            className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
            role='menuitem'
          >
            {' '}
            <div
              className='w-80 relative flex flex-row justify-evenly items-center transition duration-300 ease-in-out hover:shadow-lg'
              style={{
                borderRadius: '0.4375rem',
                border: '1px solid var(--Blue-Blue_200, #B4C5FA)',
                background: '#FFF',
                boxShadow: '0px 12px 28.8px 0px rgba(74, 153, 246, 0.25)',
              }}
            >
              <div className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem]'>
                <img
                  src={FillOutFormImg.src}
                  alt='Book a session'
                  className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem] object-contain'
                />
              </div>

              <div className='text-center'>
                <Instruction>
                  Fill out form <br></br>+100⭐
                  <br />
                </Instruction>
                <Explanation>
                  (5-10 mins){' '}
                </Explanation>
              </div>
            </div>
          </a>
        </div>
      </section>
    </Modal>
  );
};
