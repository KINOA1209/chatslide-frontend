import ProjectService from '@/services/ProjectService';
import SharePage from './sharePage';

type Props = {
  params: { project_id: string };
};

export default async function Page({ params }: Props) {
  const project_id = params.project_id;

  const token = process.env.SELF_TOKEN as string;

  const project = await ProjectService.serverSideGetSharedProject(project_id, token);

  return (
    <div>
      <SharePage project={project} /> {/* The project is now passed as a prop */}
    </div>
  );
};