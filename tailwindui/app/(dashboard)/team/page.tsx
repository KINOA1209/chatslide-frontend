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
		<div className='container mx-auto p-4'>
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-semibold'>Welcome to Team Management</h1>
				<p className='text-gray-600'>
					Would you like to create a team or join an existing one?
				</p>
			</div>
			<div className='flex flex-col sm:flex-row justify-around items-center'>
				<ScenarioButton
					scenario={{
						id: 'create-team',
						title: 'Create a Team',
						featured: true,
						imageSrc: '/images/scenario/news_report.jpg',
						previewOnly: false,
						icon: <FaPlus />,
					}}
					navigate={() => (tier.includes('FREE')) ? setShowPaywallModal(true) : setShowCreateTeamModal(true)}
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

			{showCreateTeamModal && (
				<CreateTeamModal
					showModal={showCreateTeamModal}
					setShowModal={setShowCreateTeamModal}
					onConfirm={handleCreateTeam}
				/>
			)}

			{showJoinTeamModal && (
				<JoinTeamModal
					showModal={showJoinTeamModal}
					setShowModal={setShowJoinTeamModal}
					onConfirm={handleJoinTeam}
				/>
			)}

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
