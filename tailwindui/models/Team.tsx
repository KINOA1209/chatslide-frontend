export type TeamMember = {
  id: string,
  username: string,
  email: string,
}

export type Team = {
	id: string;
	name: string;
  owner: TeamMember;
  admins: TeamMember[];
  members: TeamMember[];
  max_members: number;
}
