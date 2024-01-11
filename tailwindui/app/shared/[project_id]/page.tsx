import { Metadata } from 'next';
import SharePage from './sharePage';
import ProjectService from '@/services/ProjectService';
import AuthService from '@/services/AuthService';
type Props = {
	params: { project_id: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project_id = params.project_id;
	//const project = {topic: "drlambda", description: "drlambda"};
	let topic = "drlambda"
	let description = "drlambda"
	//const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
	//let publicImageUrl = await ProjectService.getSlideTwitterImg(project_id);
	//let publicImageUrl = ProjectService.getSharedProjectDetails(project_id)
	//console.log(publicImageUrl)
	// publicImageUrl = publicImageUrl || 'https://drlambda.ai/new_landing/imgs/ogimage.png';
	// default image URL
	let publicImageUrl = 'https://drlambda.ai/new_landing/imgs/ogimage.png';
	try {
    const project = await ProjectService.serverSideGetSharedProject(project_id)
    // console.log(project)
    publicImageUrl = project.thumbnail_url || publicImageUrl
    topic = project.topic || "DrLambda"
    description = project.description || "DrLambda"
	} catch (error){
		console.error(`Error fetching project ${project_id} details:`, error);
	}
	const metadata: Metadata = {
		title: topic,
		description: description,
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
const Page: React.FC = () => {
	return (
		<div>
			<SharePage /> {/* Include your client-side component */}
		</div>
	);
};
export default Page;