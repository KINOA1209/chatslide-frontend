'use client';
import React, { useState } from 'react';

const MyResourcePageHeader: React.FC = ({}) => {
	return (
		<section>
			{/* top background container of my projects title text and  */}
			<div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-2 px-[5rem]'>
				{/* flex container controlling max width */}
				<div className='w-full max-w-7xl flex flex-wrap justify-center items-end'>
					{/* my project title text */}
          <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2 text-white text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
						My Resources
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyResourcePageHeader;
