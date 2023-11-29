import React, { useState } from "react";
import Modal from "./Modal";
import { DrlambdaLink } from "../button/DrlambdaButton";

export const UserStudy: React.FC = () => {
  const [show, setShow] = useState(true);
  return (
    show ? (
      <div
        className='fixed right-5 bottom-5 border boerder-2 inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg'>
          <div>
            <h3
              className='text-lg leading-6 font-bold text-gray-900'
              id='modal-headline'
            >
              Join our user study to earn 1000 ⭐️credits.
            </h3>
            <p className='text-sm text-gray-500 mt-2'>
              We want to learn more about what you think of DrLambda, and how you use DrLambda.
            </p>
            <div className="py-2 flex flex-col items-center">
              <DrlambdaLink link='https://calendar.app.google/2uGV3B6h9UdYBHPB8' text='Book a session' />
            </div>
          </div>

          <div className='flex justify-end gap-x-4'>
            <button
              className='px-4 py-2 font-bold text-blue-500 rounded focus:outline-none'
              onClick={e => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};
