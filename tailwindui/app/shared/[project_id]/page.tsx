import { Metadata } from 'next';
import SharePage from './sharePage';

type Props = {
    params: { project_id: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project_id = params.project_id;
    const host = process.env.NEXT_PUBLIC_HOST;
    const data = await fetch(`https://dev.drlambda.ai/api/get_shared_project_foldername?project_id=${project_id}`).then(response => response.json());
    const topic = data.topic;
    const description = data.description;

    const metadata: Metadata = {
        title: topic,
        description: description,
        openGraph: {
            images: ["https://drlambda.ai/images/logo_no_text.png"],
            title: topic,
            description: description,
            url: `https://drlambda.ai/shared/${project_id}`,
            siteName: "Drlambda",
            locale: "en_US",
            type: "website",
        },
    };

    return metadata
}


const Page: React.FC = () => {
    return (
        <div>
            <SharePage /> {/* Include your client-side component */}
        </div>
    );
};

export default Page;