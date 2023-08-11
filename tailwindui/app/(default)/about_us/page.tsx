export const metadata = {
    title: "About Us - Dr. Lambda",
    description: "Learn more about Dr. Lambda.",
};

export default function AboutUs() {
    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h1">About Dr. Lambda</h1>
                    </div>
                    {/* Founders Section */}
                    <div className="max-w-3xl mx-auto pb-4">
                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🎓 Meet The Founders</h2>
                        </div>

                        {/* Founder 1 */}
                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <img src="/images/quanlai.jpeg" alt="Quanlai Li" className="w-48 h-48 mb-4 md:mb-0 md:mr-8 rounded-full" />
                            <div>
                                <h3 className="h3 text-xl mb-2">Founder: Quanlai Li</h3>
                                <p className="text-base text-gray-600">
                                Quanlai is an accomplished technologist with an extensive background in data and software engineering. 
                                As the current CEO of Dr. Lambda, he is pioneering AI-driven tools to revolutionize educational content creation. 
                                Previously, he served as the Founder & Tech Lead of Team Workflow at Robinhood, where he implemented intelligent workflow infrastructures. 
                                Quanlai's engineering journey also includes pivotal roles at Lyft and Uber in San Francisco, where he focused on data solutions and workflow management platforms, respectively.
                                He holds a bachelor's degree in Computer Science from Zhejiang University, and a master's degree in the same field from the University of California, Berkeley.
                                </p>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <img src="/images/zhiyuan.jpeg" alt="Zhiyuan Wang" className="w-48 h-48 mb-4 md:mb-0 md:mr-8 rounded-full" />
                            <div>
                                <h3 className="h3 text-xl mb-2">Founding Team: Zhiyuan Wang</h3>
                                <p className="text-base text-gray-600">
                                Zhiyuan Wang is a skilled software engineer with a penchant for innovation and optimization. 
                                As the Co-founder & Engineering Lead at Dr. Lambda, Zhiyuan is shaping the future of AI-enhanced educational content. 
                                With past experiences spanning Google's mobile data infrastructure and real-time data services at Bloomberg in New York, he's proven adept at crafting efficient systems. 
                                Zhiyuan holds a Master's in Computer Science from the University of Southern California and a Bachelor's in Information Engineering from Zhejiang University, where he was recognized as an outstanding graduate.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Page sections */}
                    <div className="max-w-3xl mx-auto pb-4">
                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🚀 Dr. Lambda: Remixing Knowledge for Tomorrow</h2>
                        </div>
                        <div className="pb-4">
                            <p className="text-base text-gray-600">
                            Founded in 2022 in Delaware, United States, Dr. Lambda emerged from a vision to redefine how knowledge is consumed and presented. 
                            We believe in the power of remixing content, transforming traditional formats into dynamic, personalized learning experiences.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto pb-4">
                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🤝 Collaborations That Count</h2>
                        </div>
                        <div className="pb-4">
                            <p className="text-base text-gray-600">
                            We're proud to join hands with renowned researchers from Stanford and Harvard, pushing the boundaries of educational technology. 
                            Our partnerships with leading content distributors, like TikTok, further fuel our mission to connect diverse knowledge sources.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="pt-16">
                            <p className="text-base text-gray-600">
                                Thank you for choosing Dr. Lambda, where innovation meets excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
