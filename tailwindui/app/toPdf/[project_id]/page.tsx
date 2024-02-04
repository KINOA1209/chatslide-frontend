import ProjectService from '@/services/ProjectService';
import SharePage from './sharePage';

type Props = {
  params: { project_id: string };
};

export default async function Page({ params }: Props) {
  const project_id = params.project_id;
  // const token = process.env.SELF_TOKEN as string; //todo: get token from query

  // const project = await ProjectService.getProjectDetails(token, project_id, true);

  return (
    <div>
      <SharePage project_id={project_id} /> {/* The project is now passed as a prop */}
    </div>
  );
};