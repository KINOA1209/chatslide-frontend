'use client';

import React, { useEffect, useState } from 'react';
import { ScenarioButton } from '@/components/button/ScenarioButton';
import CreateTeamModal from '@/components/dashboard/createTeamModal';
import JoinTeamModal from '@/components/dashboard/joinTeamModal';
import { FaPlus } from 'react-icons/fa';
import TeamService from '@/services/TeamService';
import { useUser } from '@/hooks/use-user';
import PaywallModal from '@/components/paywallModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackButton } from '@/components/button/DrlambdaButton';
import { Column } from '@/components/layout/Column';
import { Title } from '@/components/ui/Text';

const Team = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
	const { token, tier } = useUser();
	const [showPaywallModal, setShowPaywallModal] = useState(false);

	const handleCreateTeam = async (teamName: string) => {
		try {
			const response = await TeamService.createTeam(teamName, token);
			window.location.href = '/dashboard?mode=team';
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	const handleJoinTeam = async (inviteCode: string) => {
		try {
			const response = await TeamService.joinTeam(inviteCode, token);
			window.location.href = '/dashboard?mode=team';
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<div className='flex flex-col flex-grow justify-center items-center relative'>
			<Column width='100vw'>
				{/* title */}
				<Title>Welcome to team management</Title>
				{/* <div className='w-[80vh] h-8 text-center text-gray-600 text-base font-normal leading-normal tracking-tight'>
          {scenarios.description}
        </div> */}
				{/* three types of scenarios */}
				<div
					className='flex flex-wrap flex-row gap-x-8 gap-y-6 md:gap-6 w-full mx-auto justify-center mt-[2rem]'
					id='choice_container'
				>
					<ScenarioButton
						scenario={{
							id: 'create-team',
							title: 'Create a Team',
							featured: true,
							imageSrc: '/images/scenario/news_report.jpg',
							previewOnly: false,
							icon: <FaPlus />,
						}}
						navigate={() =>
							tier.includes('FREE')
								? setShowPaywallModal(true)
								: setShowCreateTeamModal(true)
						}
					/>
					<ScenarioButton
						scenario={{
							id: 'join-team',
							title: 'Join a Team',
							featured: true,
							imageSrc: '/images/scenario/policy_training.jpg',
							previewOnly: false,
							icon: <FaPlus />,
						}}
						navigate={() => setShowJoinTeamModal(true)}
					/>
				</div>
			</Column>

			<CreateTeamModal
				showModal={showCreateTeamModal}
				setShowModal={setShowCreateTeamModal}
				onConfirm={handleCreateTeam}
			/>

			<JoinTeamModal
				showModal={showJoinTeamModal}
				setShowModal={setShowJoinTeamModal}
				onConfirm={handleJoinTeam}
			/>

			<PaywallModal
				showModal={showPaywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to get an early access to Beta features. 🚀'
			/>
			<ToastContainer />
		</div>
	);
};

export default Team;
