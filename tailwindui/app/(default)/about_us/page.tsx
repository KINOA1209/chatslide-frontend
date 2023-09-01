import Header from '@/components/ui/header';

export const metadata = {
    title: "About Us - Dr. Lambda",
    description: "Learn more about Dr. Lambda.",
};

export default function AboutUs() {
    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <Header isLanding={false} refList={[]} />
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
                                <h3 className="h3 text-xl mb-2">Quanlai Li</h3>
                                <p className="text-base text-gray-600">
                                    Quanlai Li, CEO of Dr. Lambda, has significantly impacted AI-driven platforms at unicorns like Robinhood, Lyft, and Uber.
                                    Before his entrepreneurial journey, he excelled as a software engineer, notably pioneering data workflow solutions. He has a master's degree from UC Berkeley and bachelor's degree from Zhejiang University.
                                </p>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <img src="/images/laura.jpeg" alt="Laura Lin" className="w-48 h-48 mb-4 md:mb-0 md:mr-8 rounded-full" />
                            <div>
                                <h3 className="h3 text-xl mb-2">Laura Lin</h3>
                                <p className="text-base text-gray-600">
                                    Laura Y. Lin is a dedicated UX Researcher with a rich background in HCI and applied product research.
                                    With notable experiences at big techs like Google and Meta, Laura has focused on areas such as human-vehicle interaction and B2B Ads products.
                                    Laura was HCI Research Fellow at Stanford and earned a BA degree from Peking University.
                                </p>
                            </div>
                        </div>

                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🎓 Meet the Founding Team</h2>
                        </div>

                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <img src="/images/zhiyuan.jpeg" alt="Zhiyuan Wang" className="w-48 h-48 mb-4 md:mb-0 md:mr-8 rounded-full" />
                            <div>
                                <h3 className="h3 text-xl mb-2">Zhiyuan Wang</h3>
                                <p className="text-base text-gray-600">
                                    Zhiyuan Wang is a skilled software engineer with a penchant for innovation and optimization.
                                    As the Engineering Lead at Dr. Lambda, Zhiyuan is shaping the future of AI-enhanced educational content.
                                    With past experiences spanning Google's mobile data infrastructure and real-time data services at Bloomberg in New York, he's proven adept at crafting efficient systems.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <img src="/images/rex.jpeg" alt="Rex Chen" className="w-48 h-48 mb-4 md:mb-0 md:mr-8 rounded-full" />
                            <div>
                                <h3 className="h3 text-xl mb-2">Rex Chen</h3>
                                <p className="text-base text-gray-600">
                                    Rex Chen is a software engineer with a MS degree in ML and two BS degrees from UCSD.
                                    At Dr. Lambda, he played a vital role in developing and refining AI-driven products, working alongside a multifaceted team.
                                    Passionate about data science and continuous learning, Rex is committed to improving user experiences and tackling challenging technological issues.
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
