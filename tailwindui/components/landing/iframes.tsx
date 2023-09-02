export default function IframeGallery() {

    return (
        <div className="py-12 md:py-20" data-aos="fade-right">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                    <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Testimonial</h3>
                </div>
            </div>
            <div className="mx-auto px-4 sm:px-6 w-full">
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6 flex flex-col items-center" data-aos="fade-right">
                    <div className="w-full max-w-[743px] h-[500px]" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex flex-row w-full h-full drop-shadow-md overflow-hidden border-2 border-blue-600 rounded-2xl">
                            <iframe className="h-full w-full grow" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7099576842361212929"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};