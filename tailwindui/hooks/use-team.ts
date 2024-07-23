import { createBearStore } from '@/utils/create-bear-store';
import { Team } from '@/models/Team';
import TeamService from '@/services/TeamService';
import { useUser } from './use-user';
import { useEffect } from 'react';

const useTeamBear = createBearStore<Team | undefined>()(
	'team',
	undefined,
	true,
	false,
);

const useTeamIdBear = createBearStore<string>()('teamId', '', true, false);

export enum TeamStatus {
	NotInited,
	Initing,
	Inited,
	Failed,
}

let teamStatus: TeamStatus = TeamStatus.NotInited;

export const useTeam = () => {
	const { team, setTeam } = useTeamBear();
	const { teamId, setTeamId } = useTeamIdBear();
	const { token } = useUser();

	async function initTeam() {
		if (teamStatus === TeamStatus.Inited || teamStatus === TeamStatus.Initing)
			return;
    // if (teamId && team) {
    //   teamStatus = TeamStatus.Inited;
    //   return;
    // }
      
		teamStatus = TeamStatus.Initing;

		console.log('-- initTeam');
		try {
      console.log('-- getting user teams')
			const data = (await TeamService.getUserTeams(token)).all_teams;
      if (data.length === 0) {
        console.log('No teams found');
        teamStatus = TeamStatus.Inited;
        return;
      }
			setTeamId(data[0]);
			if (teamId) {
        console.log('-- getting team details', teamId);
				const teamData = await TeamService.getTeamDetails(teamId, token);
				setTeam(teamData);
			}
			teamStatus = TeamStatus.Inited;
		} catch (e) {
			console.error(e);
			teamStatus = TeamStatus.Failed;
		}
	}

	useEffect(() => {
		void initTeam();
	}, []);

  function updateInvitationCode(isFree: boolean, code: string) {
    if(isFree) {
      const newTeam = {
				...team,
				invitation_code_free: code
			};
      setTeam(newTeam as Team);
    } else {
      const newTeam = {
        ...team,
        invitation_code: code
      };
      setTeam(newTeam as Team);
    }
  }

  async function removeMember(memberId: string, token: string) {
		if (!team) return;

		const newTeam = {
			...team,
			members: team.members.filter((member) => member.id !== memberId),
		};

		setTeam(newTeam as Team);

		await TeamService.removeMember(teamId, memberId, token);
	}

  // async function changeMemberRole(token: string, memberId: string, role: string) {
  //   if (!team) return;

  //   const newTeam = {
  //     ...team,
  //     members: team.members.map(member => {
  //       if (member.id === memberId) {
  //         return {
  //           ...member,
  //           role
  //         }
  //       }
  //       return member;
  //     })
  //   }

  //   setTeam(newTeam as Team);

  //   await TeamService.changeMemberRole(teamId, memberId, role, token);
  // }

	return {
		team,
		teamId,
		initTeam,
		updateInvitationCode,
    removeMember,
	};
};
