import { Metadata } from 'next';
import SharePage from './sharePage';

type Props = {
    params: { project_id: string }
}

type GenerateMetadataResult = {
    metadata: Metadata;
    foldername: string;
};

export async function generateMetadata({ params }: Props): Promise<GenerateMetadataResult> {
    const project_id = params.project_id;
    const data = await fetch(`http://localhost/api/get_shared_project_foldername?project_id=${project_id}`).then(response => response.json());
    const topic = data.topic;
    const description = data.description;
    const foldername = data.foldername;

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

    return {
        metadata,
        foldername,
    }
}


const Page: React.FC = () => {
    return (
        <div>
            <SharePage /> {/* Include your client-side component */}
        </div>
    );
};

export default Page;