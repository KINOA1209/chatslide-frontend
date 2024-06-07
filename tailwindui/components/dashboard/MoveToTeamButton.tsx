import React from 'react';
import { MdGroup } from 'react-icons/md';
import Modal from '../ui/Modal';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import { useUser } from '@/hooks/use-user';
import TeamService from '@/services/TeamService';
import Project from '@/models/Project';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MoveToTeamButton: React.FC<{
	project: Project;
	setCurrentProjects: React.Dispatch<React.SetStateAction<Project[]>>;
	teamId: string;
	showMoveToTeamModal: boolean;
	setShowMoveToTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
	setRefreshMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ project, setCurrentProjects, teamId, showMoveToTeamModal, setShowMoveToTeamModal, setRefreshMenu }) => {
	const { token } = useUser();

	const confirmMoveToTeam = async () => {
		try {
			const response = await TeamService.changeProjectType(project.id, 'to_team', token, teamId);

			if (response.status === 'success') {
				setCurrentProjects((prevProjects) =>
					prevProjects.map((p) =>
						p.id === project.id ? { ...p, team_id: teamId } : p
					)
				);
				setShowMoveToTeamModal(false);
				setRefreshMenu((prev) => !prev);
				toast.success('Project moved to team successfully!');
			} else {
				toast.error('Error moving project to team: ' + response.message);
				console.error('Error moving project to team:', response.message);
			}
		} catch (error: any) {
			toast.error('Network error: ' + error.message);
			console.error('Network error:', error);
		}
	};

	return (
		<>
			<Modal
				showModal={showMoveToTeamModal}
				setShowModal={setShowMoveToTeamModal}
				title="Move Project to Team"
				onConfirm={confirmMoveToTeam}
			>
				Are you sure you want to move this project to the team?
			</Modal>
			<ButtonWithExplanation
				button={
					<button onClick={() => setShowMoveToTeamModal(true)}>
						<MdGroup
							style={{
								color: 'var(--colors-text-text-secondary-700, #344054)',
								width: '16px',
								height: '16px',
							}}
						/>
					</button>
				}
				explanation={'Move to Team'}
			/>
		</>
	);
};
