import { GetServerSideProps, Metadata } from 'next';
import SharePage from './sharePage';
import ProjectService from '@/services/ProjectService';

type Props = {
	params: { project_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project_id = params.project_id;
	//const project = {topic: "drlambda", description: "drlambda"};
	let topic = "drlambda"
	let description = "drlambda"
  let author = "drlambda"
	let publicImageUrl = 'https://drlambda.ai/new_landing/imgs/ogimage.png';
	try {
    const project = await ProjectService.getSharedProjectDetails(project_id, true)
    // console.log(project)
    publicImageUrl = project.thumbnail_url || publicImageUrl
    topic = project.topic || "DrLambda"
    description = project.description || "Created using DrLambda"
    author = project.author || "DrLambda"
	} catch (error){
		console.error(`Error fetching project ${project_id} details:`, error);
	}
	const metadata: Metadata = {
		title: topic + ' | DrLambda',
		description: description,
    publisher: 'DrLambda',
    authors: [{ name: author }],
    keywords: ['DrLambda', 'presentation', 'slides', 'ai_agent'],
		openGraph: {
			title: topic,
			description: description,
			url: `https://drlambda.ai/shared/${project_id}`,
			siteName: 'Drlambda',
			locale: 'en_US',
			type: 'website',
			images: [publicImageUrl],
		},
		twitter: {
			site: '@drlambda_ai',
			card: 'summary_large_image',
			creator: '@drlambda_ai',
			title: 'DrLambda',
			description: description,
			images: [{
				url:publicImageUrl,
				width: 1200,
				height: 628,
			}],
		},
	};
	return metadata;
}

export default async function Page({ params }: Props) {
  const project_id = params.project_id;

  // const project = await ProjectService.getSharedProjectDetails(project_id, true);

  return (
    <div>
      <SharePage project_id={project_id} /> {/* The project is now passed as a prop */}
    </div>
  );
};