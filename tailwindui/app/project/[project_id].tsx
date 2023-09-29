// pages/project/[project_id].tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SlidesHTML, { Slide } from '../../components/SlidesHTML';

const ProjectPage: React.FC = () => {
    const router = useRouter();
    const { project_id } = router.query;
    
    const [slideHtml, setSlideHtml] = useState<string>("");
    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);

    useEffect(() => {
        // Assume fetchSlideHtml is a function to get slide_html from your project table
        const fetchSlideHtml = async () => {
            try {
                const response = await fetch(`/api/getSlideHtml?projectId=${project_id}`);
                const data = await response.json();
                setSlideHtml(data.slideHtml);
            } catch (error) {
                console.error("Failed to fetch slide HTML:", error);
            }
        };

        if (project_id) {
            fetchSlideHtml();
        }
    }, [project_id]);

    return (
        <div>
            <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} />
        </div>
    );
}

export default ProjectPage;
