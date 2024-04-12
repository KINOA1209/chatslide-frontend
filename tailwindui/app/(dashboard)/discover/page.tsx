import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectTable from '../ProjectTable';
import DrlambdaButton from '@/components/button/DrlambdaButton';
import ProjectService from '@/services/ProjectService';
import Link from 'next/link';
import { JoinUsBanner } from '@/components/layout/JoinUsBanner';
import Project from '@/models/Project';
import { useUser } from '@/hooks/use-user';
import SessionStorage from '@/utils/SessionStorage';
import UserService from '@/services/UserService';
import router, { useRouter } from 'next/navigation';
import { mockProjectsData } from './mockProjectsData';
import DesignSystemButton from '@/components/ui/design_systems/ButtonsOrdinary';

export const metadata = {
	title: 'Discover - DrLambda',
	description:
		'Discover community projects on DrLambda. Start your own project.',
};

export default async function Discover() {
	// const { token, userStatus, updateCreditsAndTier } = useUser();
	// const [rendered, setRendered] = useState<boolean>(false);
	// const [projects, setProjects] = useState<Project[]>([]);
	// const [showSurvey, setShowSurvey] = useState(false);
	// const currentProjects = projects;
	// const fetchProjects = async () => {
	// 	try {
	// 		ProjectService.getProjects(token).then((projects) => {
	// 			console.log('projects', projects);
	// 			setProjects(projects);
	// 			setRendered(true);
	// 		});
	// 	} catch (error: any) {
	// 		console.error(error);
	// 	}
	// };

	// const init = async () => {
	// 	if (!token) return; // sidebar will show a modal to ask user to login

	// 	const promo = SessionStorage.getItem('promo');
	// 	if (promo) {
	// 		const { status, message } = await UserService.applyPromoCode(
	// 			promo,
	// 			token,
	// 		);
	// 		console.log(status, message);
	// 		if (status == 200) {
	// 			toast.success('Your code is successfully applied!', {
	// 				position: 'top-center',
	// 				autoClose: 2000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				theme: 'light',
	// 			});
	// 			SessionStorage.removeItem('promo');
	// 			updateCreditsAndTier();
	// 		}
	// 	}

	// 	fetchProjects();
	// 	const surveyFinished = await UserService.checkSurveyFinished(token);
	// 	if (!surveyFinished) {
	// 		setShowSurvey(true);
	// 	} else if (rendered && projects.length === 0) {
	// 		router.push('/type-choice');
	// 	}
	// };
	// const projects = await ProjectService.getProjects('', true, true);
	const projects = mockProjectsData;
	// const projects = await ProjectService.getProjects('', false, false); // for test purposes only

	return (
		<section className='grow flex flex-col'>
			<ToastContainer />
			{/* top background container of my projects title text and button */}
			{/* <div className='flex items-end w-full z-10 pt-[4rem] bg-Blue border-b-1 px-[5rem]'>
			 */}
			{/* <div className='grow flex flex-col'>
				<div className='w-full max-w-7xl flex flex-wrap items-end justify-center'>
					<div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-white text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
						Discover Projects
					</div>

					<div className='absolute right-5 pb-1'>
						<DrlambdaButton isPaidFeature={false} id='start_your_project'>
							<Link href='/scenario-choice'>Start Yours</Link>
						</DrlambdaButton>
					</div>
				</div>
			</div> */}
			<div className='flex flex-row items-end w-full z-10 pt-[2rem] px-[2rem]'>
				{/* flex container controlling max width */}
				<div className='w-full max-w-7xl flex flex-wrap items-center justify-between'>
					{/* my project title text */}
					{/* <div className='absolute left-10 md:left-1/2 transform md:-translate-x-1/2  text-black text-base font-bold font-creato-medium leading-10 tracking-wide border-white border-b-2'>
							My Projects
						</div> */}
					<div className='text-black text-[24px] font-bold font-creato-medium leading-10 tracking-wide'>
						Discover Projects
					</div>

					{/* create new project button */}
					<div className=''>
						{/* <DrlambdaButton
								isPaidFeature={false}
								onClick={handleStartNewProject}
								id='start_new_project'
							>
								Start
							</DrlambdaButton> */}
						<DesignSystemButton
							id='start_new_project'
							size='lg'
							hierarchy='primary'
							isPaidFeature={false}
							buttonStatus='enabled'
							// iconRight={AIIcon}
							// text='Start Yours'
							// onClick={handleStartNewProject}
						>
							<Link href='/scenario-choice'>Start Yours</Link>
						</DesignSystemButton>
					</div>
				</div>
			</div>
			<JoinUsBanner />

			{/* projects details area */}
			<div className='pb-[1rem] w-full px-8 pt-8 flex flex-col grow overflow-auto'>
				{projects && projects.length > 0 ? (
					<ProjectTable currentProjects={projects} isDiscover={true} />
				) : (
					<div className='flex items-center mt-[1rem] md:mt-[6rem] justify-center text-gray-600 text-[14px] md:text-[20px] font-normal font-creato-medium leading-normal tracking-wide'>
						There are no community projects yet.
					</div>
				)}
			</div>
		</section>
	);
}
