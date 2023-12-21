import { Metadata } from 'next';
import SharePage from './sharePage';

type Props = {
	params: { project_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project_id = params.project_id;
	let host = process.env.NEXT_PUBLIC_HOST; // this is server side, so we can't use window.location
	if (host === undefined) {
		host = 'drlambda.ai';
	}
	const data = await fetch(
		`https://${host}/api/get_shared_project_foldername?project_id=${project_id}`,
	).then((response) => response.json());
	const topic = data.topic;
	const description = data.description;

	const metadata: Metadata = {
		title: topic,
		description: description,
		openGraph: {
			images: ['https://drlambda.ai/new_landing/imgs/ogimage.png'],
			title: topic,
			description: description,
			url: `https://drlambda.ai/shared/${project_id}`,
			siteName: 'Drlambda',
			locale: 'en_US',
			type: 'website',
		},
		twitter: {
			site: '@drlambda_ai',
			card: 'summary_large_image',
			creator: '@drlambda_ai',
			title: 'DrLambda',
			description: description,
			images: ['https://drlambda.ai/new_landing/imgs/ogimage.png'], // todo: use one from slides
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
