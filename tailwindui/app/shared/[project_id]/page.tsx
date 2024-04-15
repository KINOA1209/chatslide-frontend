import { GetServerSideProps, Metadata } from 'next';
import SharePage from './sharePage';
import ProjectService from '@/services/ProjectService';
import Header from '@/components/layout/header';
import Card from '@/components/ui/Card';
import { Explanation, Instruction, Title } from '@/components/ui/Text';
import { JoinUsBanner } from '@/components/layout/JoinUsBanner';
import { getBrand, getOrigin } from '@/utils/getHost';

type Props = {
	params: { project_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project_id = params.project_id;
	let topic = getBrand();
	let description = getBrand();
	let author = getBrand();
	let publicImageUrl = `${getOrigin()}/images/ogimage_${getBrand()}.png`;
	let keywords = [getBrand(), 'presentation', 'slides', 'ai_agent'];
	try {
		const project = await ProjectService.getSharedProjectDetails(
			project_id,
			true,
		);
		// console.log(project)
		publicImageUrl = project.thumbnail_url || publicImageUrl;
		topic = project.topic || getBrand();
		description = project.description || `Created using ${getBrand()}`;
		author = project.author || getBrand();
		keywords = project.keywords || keywords;
	} catch (error) {
		console.error(`Error fetching project ${project_id} details:`, error);
	}
	const metadata: Metadata = {
		title: topic + ' | ' + getBrand(),
		description: description,
		publisher: getBrand(),
		authors: [{ name: author }],
		keywords: keywords,
		openGraph: {
			title: topic,
			description: description,
			url: `${getOrigin()}/shared/${project_id}`,
			siteName: getBrand(),
			locale: 'en_US',
			type: 'website',
			images: [publicImageUrl],
		},
		twitter: {
			site: '@drlambda_ai',
			card: 'summary_large_image',
			creator: '@drlambda_ai',
			title: getBrand(),
			description: description,
			images: [
				{
					url: publicImageUrl,
					width: 1200,
					height: 628,
				},
			],
		},
	};
	return metadata;
}

export default async function Page({ params }: Props) {
	const project_id = params.project_id;

	const project = await ProjectService.getSharedProjectDetails(project_id, true);

	return (
		<div className='flex flex-col w-screen'>
			<div className='flex'>
				<Header loginRequired={false} isLanding={false} />
			</div>
			<JoinUsBanner />
			<main className='w-full flex h-full flex-col overflow-y-scroll'>
				{project.description &&
					<div className='hidden sm:flex m-4'>
						<Card>
							<div className='flex flex-row items-end gap-x-4'>
								<Title>{project.topic}</Title>
								<Instruction>
									Created using {getBrand()}
								</Instruction>
							</div>
							<Explanation>{project.description}</Explanation>
						</Card>
					</div>}

				<div className='w-full h-[80vh] overflow-y-scroll'>
					<SharePage project_id={project_id} />
				</div>

			</main>
			{/* <WorkflowFooter /> */}
		</div>
	)
}
