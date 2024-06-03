'use client';

import React, { useEffect, useState } from 'react';
import { ScenarioButton } from '@/components/button/ScenarioButton';
import CreateTeamModal from '@/components/dashboard/createTeamModal';
import JoinTeamModal from '@/components/dashboard/joinTeamModal';
import { FaPlus } from 'react-icons/fa';
import TeamService from '@/services/TeamService';
import { useUser } from '@/hooks/use-user';
import UserService from '@/services/UserService';
import { userInEU } from '@/utils/userLocation';

const Team = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
	const { token, email } = useUser();
	const [currency, setCurrency] = useState('$');

	useEffect(() => {
		userInEU().then((res) => {
			setCurrency(res ? '€' : '$');
		});
	}, []);

	const handleCreateTeam = async (teamName: string) => {
		try {
			const response = await TeamService.createTeam(teamName, token);
			console.log(`Team created: ${response.team_id}`);
			window.location.href = '/dashboard?mode=team';
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const handleJoinTeam = async (inviteCode: string) => {
		try {
			const response = await TeamService.joinTeam(inviteCode, token);
			console.log(`Joined team: ${response}`);
			window.location.href = '/dashboard?mode=team';
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const handlePurchaseSeat = async (plan: string, token: string) => {
		try {
			const url = await UserService.checkout(plan, email, currency, token);

			// Redirect to the checkout page
			window.open(url, '_blank');
		} catch (error) {
			console.error('An error occurred:', error);
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
					navigate={() => setShowCreateTeamModal(true)}
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
				<ScenarioButton
					scenario={{
						id: 'purchase-team-seat',
						title: 'Purchase a Team Seat',
						featured: true,
						imageSrc: '/images/scenario/financial_advising.webp',
						previewOnly: false,
						icon: <FaPlus />,
					}}
					navigate={() => handlePurchaseSeat('TEAM_ONE_SEAT', token)}
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
		</div>
	);
};

export default Team;
