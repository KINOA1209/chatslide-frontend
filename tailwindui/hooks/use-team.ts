import { createBearStore } from '@/utils/create-bear-store';
import { Team } from '@/models/Team';

const useTeamBear = createBearStore<Team | undefined>()('team', undefined, true, false);

export const useTeam = () => {
	const { team, setTeam } = useTeamBear();

  function initTeam(t: Team) {
    console.log('-- initTeam', t);
    setTeam(t);
  }

	return {
		team,
		setTeam,
		initTeam,
	};
};
