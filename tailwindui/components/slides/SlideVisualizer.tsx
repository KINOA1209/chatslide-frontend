import React, { useState, useEffect, useRef } from 'react';
import TranscriptForm from '@/components/forms/transcriptForm';
import Timer from '@/components/ui/Timer';
import { SlideElement, Slide } from '@/components/SlidesHTML';
import dynamic from 'next/dynamic'
import SaveToPdfHtml from './SaveToPdfHtml';


const SlidesHTML = dynamic(() => import('@/components/SlidesHTML'), { ssr: false });

const SlideVisualizer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalSlides, setFinalSlides] = useState<Slide[]>([]);
    const [exportMode, setExportMode] = useState(false);

    return (
        <div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <SlidesHTML finalSlides={finalSlides} setFinalSlides={setFinalSlides} exportMode={exportMode} setExportMode={setExportMode}/>

                {/* Form */}
                <TranscriptForm
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    finalSlides={finalSlides}
                />

                {/* Timer */}
                <Timer expectedSeconds={60} isSubmitting={isSubmitting} />

                <SaveToPdfHtml exportMode setExportMode={setExportMode} />
            </div>

        </div>
    );
};

export default SlideVisualizer;