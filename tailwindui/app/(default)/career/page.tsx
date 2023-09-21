import Header from '@/components/ui/header';

export const metadata = {
    title: "Career - DrLambda",
    description: "Join to work with us at DrLambda.",
};

export default function Career() {
    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <Header loginRequired={false} isLanding={false} refList={[]} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h1">Careers at DrLambda</h1>
                    </div>
                    <div className="max-w-3xl mx-auto pb-4">
                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🧑🏻‍🎨 Design</h2>
                        </div>

                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <div>
                                <h3 className="h3 text-xl mb-2">UX Design Intern</h3>
                                <p className="text-base text-gray-600">
                                    Seeking a driven UX enthusiast passionate about innovative design and education? DrLambda invites you to reshape the educational landscape as a UX Design Intern.<br /><br />

                                    <strong>Role Insight:</strong><br />
                                    Engage with our designers to craft user-centric designs amplifying our students' learning experience. This role is ideal for design aficionados with expertise in industrial, product, or UX design, eager to dive into a transformative space.<br /><br />

                                    <strong>Key Tasks:</strong><br />
                                    - Partner with our designers to craft intuitive UIs for our AI-driven platforms.<br />
                                    - Design, prototype, and iterate on user flows and interfaces using tools like Figma.<br />
                                    - Spearhead user research, harnessing insights to refine designs.<br />
                                    - Collaborate with diverse teams to harmonize design with product development.<br />
                                    - Pitch groundbreaking ideas enhancing our user experience.<br /><br />

                                    <strong>What You Bring:</strong><br />
                                    - Degree in industrial design, product design, UX, or similar.<br />
                                    - 1+ year of design-centric professional experience.<br />
                                    - Robust portfolio demonstrating your design prowess and methodologies.<br />
                                    - Mastery of design tools, especially Figma.<br />
                                    - Outstanding communication, teamwork, and a penchant for education tech.<br />
                                    - Meticulous problem-solving abilities.<br /><br />

                                    <strong>Our Promise:</strong><br />
                                    - A vibrant workspace fostering creativity.<br />
                                    - Collaborate with AI and education veterans.<br />
                                    - Directly impact global learners with your designs.<br />
                                    - Access to the latest in edtech and design.<br />
                                    - Competitive pay with avenues for growth at DrLambda.<br /><br />

                                    Eager to redefine education with your design finesse? Apply now for the UX Design Internship at DrLambda!<br /><br />

                                    <strong>How to Apply:</strong><br />
                                    Share your resume, portfolio, and a cover letter detailing your journey and interest in the role. Send your applications to <a href="mailto:contact@drlambda.ai">contact@drlambda.ai</a>.<br /><br />

                                    Note: DrLambda champions diversity and inclusivity. We welcome all applicants.
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="max-w-3xl mx-auto pb-4">
                        <div className="pb-8">
                            <h2 className="h3 text-2xl">🧑🏽‍💻 Engineering</h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-center pb-8">
                            <div>
                                <h3 className="h3 text-xl mb-2">Frontend Developer</h3>
                                <p className="text-base text-gray-600">
                                    Are you a dynamic Frontend Developer, eager to craft web applications that stand out? We invite you to join our vibrant team and enhance the digital experiences we offer.<br /><br />

                                    <strong>Role Insight:</strong><br />
                                    Collaborate with our design and backend teams to produce top-notch web applications. This role is perfect for developers proficient in React, Redux, and modern web technologies looking to make a significant impact.<br /><br />

                                    <strong>Key Tasks:</strong><br />
                                    - Develop and maintain user-centric features using React.js.<br />
                                    - Build reusable components for future deployment.<br />
                                    - Translate high-fidelity designs into impeccable code.<br />
                                    - Optimize applications for diverse devices and browsers.<br />
                                    - Stay updated with cutting-edge web technologies.<br /><br />

                                    <strong>What You Bring:</strong><br />
                                    - Strong proficiency in JavaScript, React.js, and Redux.<br />
                                    - Knowledge of RESTful APIs and modern authentication mechanisms.<br />
                                    - Expertise in HTML5, CSS3, and responsive design.<br />
                                    - Experience with front-end development tools, such as Babel, Webpack, and NPM.<br />
                                    - The knack to interpret business needs into technical solutions.<br /><br />

                                    <strong>Preferred Expertise:</strong><br />
                                    - A degree in Computer Science or a related field.<br />
                                    - Familiarity with CSS pre-processors like LESS and SASS.<br />
                                    - Hands-on experience with Git or similar versioning tools.<br /><br />

                                    <strong>Our Promise:</strong><br />
                                    - A stimulating environment nurturing innovation.<br />
                                    - Collaborate with seasoned professionals in the tech domain.<br />
                                    - A chance to shape the future of our web applications.<br />
                                    - Access to continuous learning and professional growth.<br />
                                    - Competitive compensation and benefits.<br /><br />

                                    Ready to elevate our web experiences with your coding artistry? Apply now for the Frontend Developer position!<br /><br />

                                    <strong>How to Apply:</strong><br />
                                    Kindly forward your resume, portfolio, and a cover letter elucidating your passion and fit for the role. Direct your applications to <a href="mailto:contact@drlambda.ai">contact@drlambda.ai</a>.<br /><br />

                                    Note: We are an equal opportunity employer, ardently championing diversity and inclusivity. All talented developers are encouraged to apply.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
