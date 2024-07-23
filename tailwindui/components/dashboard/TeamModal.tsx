import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaClone, FaTrash } from 'react-icons/fa';
import { BigBlueButton } from '../button/DrlambdaButton';
import { ErrorMessage, Explanation, Instruction, SmallTitle } from '../ui/Text';
import TeamService from '@/services/TeamService';
import UserService from '@/services/UserService';
import { useUser } from '@/hooks/use-user';
import { toast } from 'react-toastify';
import { userInEU } from '@/utils/userLocation';
import { useTeam } from '@/hooks/use-team';
import { LuTrash2 } from 'react-icons/lu';

interface TeamModalProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	teamId: string;
}

const TeamModal: React.FC<TeamModalProps> = ({
	showModal,
	setShowModal,
	teamId,
}) => {
	// const [newMemberEmail, setNewMemberEmail] = useState<string>('');
	// const [inviteCode, setInviteCode] = useState<string>('');
	// const [maxMembers, setMaxMembers] = useState<number>(0);
	// const [freeMembers, setFreeMembers] = useState<number>(0);
	// const [inviteCodeFree, setInviteCodeFree] = useState<string>('');
	const [isOwner, setIsOwner] = useState<boolean>(false);
	const { token, email, username } = useUser();
	const [currency, setCurrency] = useState('$');

	const { team, updateInvitationCode, removeMember } = useTeam();

	useEffect(() => {
		userInEU().then((res) => {
			setCurrency(res ? '€' : '$');
		});
	}, []);

	useEffect(() => {
		if (!team) return;
		console.log('tea');
		setIsOwner(
			team.owner.username === username || team.owner.username === email,
		);
	}, [team]);

	// useEffect(() => {
	// 	if (showModal && teamId) {
	// 		fetchTeamMembers();
	// 		fetchTeamDetails();
	// 	}
	// }, [showModal, teamId]);

	// const fetchTeamMembers = async () => {
	// 	try {
	// 		const data = await TeamService.getTeamMembers(teamId, token);
	// 		console.log('team members:', data);
	// 		const membersList: TeamMember[] = [
	// 			{
	// 				id: data.owner.id,
	// 				name: data.owner.username,
	// 				email: data.owner.email,
	// 				role: 'Owner',
	// 			},
	// 			...data.admins.map((admin: any) => ({
	// 				id: admin.id,
	// 				name: admin.username,
	// 				email: admin.email,
	// 				role: 'Admin',
	// 			})),
	// 			...data.members.map((member: any) => ({
	// 				id: member.id,
	// 				name: member.username,
	// 				email: member.email,
	// 				member_type: member.member_type,
	// 				role: 'Member',
	// 			})),
	// 		];
	// 		console.log('membersList:', membersList);
	// 		setMembers(membersList);
	// 		setIsOwner(
	// 			data.owner.username === username || data.owner.username === email,
	// 		);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const fetchTeamDetails = async () => {
	// 	try {
	// 		const data = await TeamService.getTeamDetails(teamId, token);
	// 		initTeam(data as Team);
	// 		setMaxMembers(data.max_members);
	// 		setFreeMembers(data.free_members);
	// 		setInviteCode(data.invitation_code);
	// 		setInviteCodeFree(data.invitation_code_free);
	// 	} catch (err) {
	// 		console.error('Error fetching team details:', err);
	// 	}
	// };

	// const handleRoleChange = (index: number, role: string) => {
	// 	if (role === 'Remove') {
	// 		handleRemoveMember(index);
	// 	} else {
	// 		const updatedMembers = members.map((member, i) =>
	// 			i === index ? { ...member, role } : member,
	// 		);
	// 		setMembers(updatedMembers);
	// 	}
	// };

	const handleRemoveMember = async (index: number) => {
		try {
			const memberId = team?.members[index]?.id;
			if (!memberId) return;
			removeMember(memberId, token);
		} catch (err) {
			console.error('Error removing member:', err);
		}
	};

	const generateInviteCode = async (isFree: boolean) => {
		try {
			const inviteCode = await TeamService.generateInviteCode(
				teamId,
				false,
				isFree,
				token,
			);
			updateInvitationCode(isFree, inviteCode);
		} catch (err) {
			console.error(err);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				toast.success('Invite code copied to clipboard!');
			},
			(err) => {
				console.error('Failed to copy: ', err);
			},
		);
	};

	const handlePurchaseSeat = async (plan: string, token: string) => {
		try {
			const url = await UserService.checkout(
				plan,
				email,
				currency,
				token,
				'team', // trigger
			);
			window.open(url, '_blank');
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	const paidMembersCount = (team?.members || []).filter(
		(member) => member.tier !== 'free',
	).length;
	const freeMembersCount = (team?.members || []).filter(
		(member) => member.tier === 'free',
	).length;

	return (
		<div className='team-management'>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title={isOwner ? 'Manage Team' : 'Team List'}
				description='Manage your team members and their roles.'
				width='600px'
				hasInputArea={false}
			>
				<div>
					{team && isOwner && (
						<>
							<div className='mb-4'>
								<SmallTitle>Invite Codes</SmallTitle>
								<Instruction>
									Share these codes with your team members, ask them to register
									an account, and enter the appropriate code to join your team.
									They will upgrade to the appropriate tier upon joining the
									team.
								</Instruction>

								<div className='flex flex-col gap-y-2'>
									<div>
										<span className='text-gray-800'>Free Tier:</span>
										{team?.free_members <= freeMembersCount ? (
											<ErrorMessage>
												You have reached the maximum number of{' '}
												{team.free_members} free member(s) allowed for your
												team.
											</ErrorMessage>
										) : team.invitation_code_free ? (
											<>
												<span className='ml-2 font-bold text-blue-600'>
													{team.invitation_code_free}
												</span>
												<button
													onClick={() =>
														copyToClipboard(team.invitation_code_free)
													}
													className='ml-2 text-blue-600 hover:text-blue-800'
												>
													<FaClone />
												</button>
											</>
										) : (
											<BigBlueButton onClick={() => generateInviteCode(true)}>
												Generate Code
											</BigBlueButton>
										)}
									</div>

									<div>
										<span className='text-gray-800'>Pro Tier:</span>
										{team.max_members <= paidMembersCount ? (
											<ErrorMessage>
												You have reached the maximum number of{' '}
												{team.max_members} member(s) allowed for your team.
												Please purchase a seat.
											</ErrorMessage>
										) : team.invitation_code ? (
											<>
												<span className='ml-2 font-bold text-blue-600'>
													{team.invitation_code}
												</span>
												<button
													onClick={() => copyToClipboard(team.invitation_code)}
													className='ml-2 text-blue-600 hover:text-blue-800'
												>
													<FaClone />
												</button>
											</>
										) : (
											<BigBlueButton onClick={() => generateInviteCode(false)}>
												Generate Code
											</BigBlueButton>
										)}
									</div>
								</div>
							</div>
							<div className='mb-4'>
								<SmallTitle>Purchase Lifetime Seats at Pro Tier</SmallTitle>
								<div className='mt-2'>
									<BigBlueButton
										width='16rem'
										onClick={() => handlePurchaseSeat('TEAM_ONE_SEAT', token)}
									>
										Purchase a Seat (60% off)
									</BigBlueButton>
								</div>
								<div className='mt-2'>
									<p>
										Currently you have {team.max_members} seat(s), and you have{' '}
										{paidMembersCount} paid member(s). Purchase new seat to
										increase the limit.
									</p>
									<p className='text-green-600'>
										New user will join as PRO Lifetime tier. The tier is
										originally priced at $278. You can add a team member with
										PRO tier at $99, this is 65% off.
									</p>
								</div>
							</div>
						</>
					)}
					<div className='mb-4'>
						<SmallTitle>Owner</SmallTitle>
						<div className='flex flex-col items-center mb-2'>
							<div className='flex justify-between w-full'>
								<div>
									<p>
										{team?.owner?.username}{' '}
										{team?.owner?.email == email && '(You)'}
									</p>
									<p className='text-gray-500 text-sm'>{team?.owner?.email}</p>
								</div>
							</div>
						</div>
					</div>

					<div className='mb-4'>
						<SmallTitle>Members</SmallTitle>
						{team?.members?.length === 0 && (
							<Explanation>
								No members found. Please invite members to your team.
							</Explanation>
						)}

						{team?.members.map((member, index) => (
							<div key={index} className='flex flex-col items-center mb-2'>
								<div className='flex justify-between w-full'>
									<div>
										<p>
											{member.username} {member.email == email && '(You)'}
										</p>
										<p className='text-gray-500 text-sm'>{member.email}</p>
									</div>
									{isOwner && member.role !== 'owner' && (
										// delete button
										<LuTrash2
											className='cursor-pointer'
											onClick={() => handleRemoveMember(index)}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default TeamModal;
