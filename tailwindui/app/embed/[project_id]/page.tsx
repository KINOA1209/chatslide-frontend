import ProjectService from '@/services/ProjectService';
import SharePage from '../../shared/[project_id]/sharePage';

type Props = {
	params: { project_id: string };
};

export default async function Page({ params }: Props) {
	const project_id = params.project_id;
	// const token = process.env.SELF_TOKEN as string; //todo: get token from query

	const project = await ProjectService.getSharedProjectDetails(
		project_id,
		true,
	);

	return (
		<div>
			<SharePage project={project} embed={true} />{' '}
			{/* The project is now passed as a prop */}
		</div>
	);
}
