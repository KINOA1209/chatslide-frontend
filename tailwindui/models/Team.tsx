export type TeamMember = {
  id: string,
  username: string,
  email: string,
  role: 'member' | 'admin' | 'owner',
  tier: string,
}

export type Team = {
	id: string;
	name: string;
	owner: TeamMember;
	admins: TeamMember[];
	members: TeamMember[];
	max_members: number;
	free_members: number;
	invitation_code: string;
	invitation_code_free: string;
};
