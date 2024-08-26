import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectService from '@/services/ProjectService';
import Link from 'next/link';
import { JoinUsBanner } from '@/components/layout/JoinUsBanner';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';
import { getBrand } from '@/utils/getHost';
import Project from '@/models/Project';
import ProjectTableSSR from '@/components/dashboard/ProjectTableSSR';

export const metadata = {
	title: `Discover | ${getBrand()}`,
	description:
		'Discover publicly shared community projects. Start your own project.',
};

export default async function Discover() {
	const projects = await ProjectService.getProjects('', true, true, false) as Project[];
	// console.log('projects', projects);
	// const projects = mockProjectsData; // for test purposes only

	return (
		<section className='grow flex flex-col'>
			<JoinUsBanner />
			<ToastContainer />
			<div className='flex flex-row items-end w-full z-10 pt-4 px-4 sm:pt-8 sm:px-8'>
				{/* flex container controlling max width */}
				<div className='w-full flex flex-wrap items-center justify-between gap-2'>
					{/* my project title text */}
					{/* <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-black text-base font-bold leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div> */}
					<div
						className='text-[24px] font-bold leading-[32px] tracking-wide'
						style={{
							color: 'var(--colors-text-text-secondary-700, #344054)',
						}}
					>
						Discover Projects
					</div>

					{/* create new project button */}
					<div className=''>
						<DesignSystemButton
							id='start_new_project'
							size='lg'
							hierarchy='primary'
							isPaidFeature={false}
							buttonStatus='enabled'
						>
							<Link href='/type-choice'>Start Yours</Link>
						</DesignSystemButton>
					</div>
				</div>
			</div>

			{/* projects details area */}
			<div className='pb-[1rem] w-full px-4 pt-4 sm:px-8 sm:pt-8 flex flex-col grow overflow-auto'>
				{projects && projects.length > 0 ? (
					// <ProjectTable currentProjects={projects} isDiscover={true} />
					<ProjectTableSSR currentProjects={projects} isDiscover={true} />
				) : (
					<div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal leading-normal tracking-wide'>
						There are no community projects yet.
					</div>
				)}
			</div>
		</section>
	);
}
