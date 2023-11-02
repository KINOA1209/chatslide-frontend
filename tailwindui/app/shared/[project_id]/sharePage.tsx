'use client'


import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Slide } from '@/components/slides/NewSlidesHTML';
import Footer, { WorkflowFooter } from '@/components/ui/footer';
import Head from 'next/head';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '@/components/ui/header';
import mixpanel from 'mixpanel-browser';
import dynamic from 'next/dynamic'


const SlidesHTML = dynamic(() => import('@/components/slides/NewSlidesHTML'), { ssr: false })


const SharePage: React.FC = () => {

    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);

    const project_id = usePathname().split('/').pop();
    const [foldername, setFoldername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Assume fetchSlideHtml is a function to get slide_html from your project table
        const fetchFoldername = async () => {
            sessionStorage.removeItem('foldername');
            mixpanel.track('Shared Project Viewed', {
                'Project ID': project_id,
            });
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
        foldername ? <></> : 
        <main className="grow">
            <Header loginRequired={false} isLanding={false} refList={[]} />
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} isViewing={true}/>
                </div>
            </div>
            <WorkflowFooter />
        </main>
    );
}

export default SharePage;