import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectTable from '../ProjectTable';
import DrlambdaButton, {
} from '@/components/button/DrlambdaButton';
import ProjectService from '@/services/ProjectService';
import Link from 'next/link';

export const metadata = {
	title: 'Discover - DrLambda',
	description: 'Discover community projects on DrLambda. Start your own project.',
};

export default async function Discover() {

	const projects = await ProjectService.getProjects('', true, true);

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			<div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-2 px-[5rem]'>
				{/* flex container controlling max width */}
				<div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
					{/* my project title text */}
					<div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-white text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
						Discover Projects
					</div>

					{/* create new project button */}
					<div className='absolute right-5 pb-1'>
						<DrlambdaButton
							isPaidFeature={false}
						>
							<Link href='/workflow-scenario-choice'>Start Yours</Link>
						</DrlambdaButton>
					</div>
				</div>
			</div>

			{/* projects details area */}
			<div
				className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'
			>
				{projects && projects.length > 0 ? (
					<ProjectTable
						currentProjects={projects}
						isDiscover={true}
					/>
				) : (
					<div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
						There are no community projects yet.
					</div>
				)}
			</div>
		</section>
	);
}
