'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Slide } from '@/components/slides/SlidesHTML';
import Footer, { WorkflowFooter } from '@/components/ui/footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '@/components/ui/header';
import dynamic from 'next/dynamic'


const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), { ssr: false })


const SharePage: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const project_id = pathname?.split('/').pop();
    const [loading, setLoading] = useState(true);

    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);

    useEffect(() => {
        // Assume fetchSlideHtml is a function to get slide_html from your project table
        const fetchFoldername = async () => {
            sessionStorage.removeItem('foldername');
            fetch(`/api/get_shared_project_foldername?project_id=${project_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === "success" && data.foldername) {
                        const foldername = data.foldername;
                        sessionStorage.setItem('foldername', foldername);
                        // console.log(`foldername: ${foldername}`);

                        const slides = data.slides;
                        sessionStorage.setItem('presentation_slides', slides);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.log("There was a problem with the fetch operation:", error.message);
                    toast.error("The shared project is not found.");
                    setLoading(false);
                });
        }

        if (project_id) {
            fetchFoldername();
        }
    }, [project_id]);

    return (

        <main className="grow">
            <Header loginRequired={false} isLanding={false}/>
            <ToastContainer />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div>
                        <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} isViewing={true} />
                    </div>
                </div>
            )}

            <WorkflowFooter />
        </main>

    );
}

export default SharePage;
