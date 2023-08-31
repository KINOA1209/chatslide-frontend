export default function IframeGallery() {

    return (
        <div className="py-12 md:py-20">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                    <h3 className="h3 mb-3">Testimonial</h3>
                </div>
            </div>
            <div className="relative w-full mx-auto px-4 sm:px-6 flex flex-rol flex-wrap md:flex-nowrap justify-center overflow-x-auto">

                <div className="flex flex-col w-[400px] md:min-w-[400px] mx-4 hover:drop-shadow-2xl">
                    <div className="h-[40px] w-full bg-blue-600 rounded-t-2xl"></div>
                    <div className="h-[500px] w-full rounded-b-2xl border border-t-0 border-gray-400 overflow-hidden">
                        <iframe className="h-full w-full" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7099576842361212929"></iframe>
                    </div>
                </div>

                <div className="flex flex-col w-[400px] md:min-w-[400px] mx-4 hover:drop-shadow-2xl">
                    <div className="h-[40px] w-full bg-blue-600 rounded-t-2xl"></div>
                    <div className="h-[500px] w-full rounded-b-2xl border border-t-0 border-gray-400 overflow-hidden">
                        <iframe className="h-full w-full" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7099576842361212929"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
};