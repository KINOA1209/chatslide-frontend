import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { BigTitle } from '@/components/ui/Text';
import { getBrand } from '@/utils/getHost';

export const metadata = {
	title: `Career | ${getBrand()}`,
	description:
		'Join to work with us at DrLambda (ChatSlide). Explore our remote-first open positions in engineering, design, product, and growth. Apply now!',
};

export default function Career() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<Header loginRequired={false} isLanding={false} />
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
						<BigTitle center>Careers at DrLambda (ChatSlide)</BigTitle>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<strong>How to Apply:</strong>
						<br />
						Share your resume, portfolio, and a cover letter detailing your
						journey and interest in the role. Send your applications to{' '}
						<a href='mailto:contact@drlambda.ai'>contact@drlambda.ai</a>.
						<br />
						<br />
						{/* <div className='pb-8' id='design'>
							<h2 className='h3 text-2xl'>🧑🏻‍🎨 Design</h2>
						</div> */}
						{/* <div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								<h3 className='h3 text-xl mb-2'>UX Design Intern</h3>
								<p className='text-base text-gray-600'>
									Seeking a driven UX enthusiast passionate about innovative
									design and education? We invite you to reshape the educational
									landscape as a UX Design Intern.
									<br />
									<br />
									<strong>Role Insight:</strong>
									<br />
									Engage with our designers to craft user-centric designs
									amplifying our students' learning experience. This role is
									ideal for design aficionados with expertise in industrial,
									product, or UX design, eager to dive into a transformative
									space.
									<br />
									<br />
									<strong>Key Tasks:</strong>
									<br />
									- Partner with our designers to craft intuitive UIs for our
									AI-driven platforms.
									<br />
									- Design, prototype, and iterate on user flows and interfaces
									using tools like Figma.
									<br />
									- Spearhead user research, harnessing insights to refine
									designs.
									<br />
									- Collaborate with diverse teams to harmonize design with
									product development.
									<br />
									- Pitch groundbreaking ideas enhancing our user experience.
									<br />
									<br />
									<strong>What You Bring:</strong>
									<br />
									- Degree in industrial design, product design, UX, or similar.
									<br />
									- 1+ year of design-centric professional experience.
									<br />
									- Robust portfolio demonstrating your design prowess and
									methodologies.
									<br />
									- Mastery of design tools, especially Figma.
									<br />
									- Outstanding communication, teamwork, and a penchant for
									education tech.
									<br />
									- Meticulous problem-solving abilities.
									<br />
								</p>
							</div>
						</div> */}
					</div>
					{/* <div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>🧑🏽‍💻 Engineering</h2>
						</div>
						<div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								<h3 className='h3 text-xl mb-2'>Frontend Developer Intern</h3>
								<p className='text-base text-gray-600'>
									Are you a dynamic Frontend Developer, eager to craft web
									applications that stand out? We invite you to join our vibrant
									team and enhance the digital experiences we offer.
									<br />
									<br />
									<strong>Role Insight:</strong>
									<br />
									Collaborate with our design and backend teams to produce
									top-notch web applications. This role is perfect for
									developers proficient in React, Zustand, and modern web
									technologies looking to make a significant impact.
									<br />
									<br />
									<strong>Key Tasks:</strong>
									<br />
									- Develop and maintain user-centric features using React.js.
									<br />
									- Build reusable components for future deployment.
									<br />
									- Translate high-fidelity designs into impeccable code.
									<br />
									- Optimize applications for diverse devices and browsers.
									<br />
									- Stay updated with cutting-edge web technologies.
									<br />
									<br />
									<strong>What You Bring:</strong>
									<br />
									- 1+ year of experience in frontend development.
									<br />
									- Strong proficiency in JavaScript, React.js, and context
									manager like Zustand.
									<br />
									- Knowledge of RESTful APIs and modern authentication
									mechanisms.
									<br />
									- Expertise in HTML5, Tailwindcss, and responsive design.
									<br />
									- The knack to interpret business needs into technical
									solutions.
									<br />
									<br />
									<strong>Preferred Expertise:</strong>
									<br />
									- A degree in Computer Science or a related field.
									<br />
									- Familiarity with CSS pre-processors like SASS.
									<br />
									- Hands-on experience with Git, project management tool like
									Jira.
									<br />
								</p>
								<br />
								<h3 className='h3 text-xl mb-2' id='backend'>
									Backend Developer Intern
								</h3>
								<p className='text-base text-gray-600'>
									Are you an aspiring Backend Developer, passionate about
									building robust backend systems? We are on the lookout for a
									dedicated and talented intern to join our dynamic team. Dive
									into the world of backend development and help us enhance our
									server-side logic and database architectures.
									<br />
									<br />
									<strong>Role Insight:</strong>
									<br />
									As a Backend Developer Intern, you will work closely with our
									seasoned engineers, contributing to the design and
									implementation of server-side logic. This role is ideal for
									individuals skilled in Python, SQLAlchemy, Flask, and AWS EC2,
									who are eager to apply their knowledge in a practical setting.
									<br />
									<br />
									<strong>Key Tasks:</strong>
									<br />
									- Develop and maintain backend functionalities using Python
									and Flask.
									<br />
									- Work with SQLAlchemy for database management and
									integration.
									<br />
									- Implement and manage server-side APIs.
									<br />
									- Collaborate with frontend developers to integrate
									user-facing elements with server-side logic.
									<br />
									- Optimize applications for maximum speed and scalability.
									<br />
									- Deploy and manage applications on AWS EC2.
									<br />
									- Contribute to all phases of the development lifecycle.
									<br />
									<br />
									<strong>What You Bring:</strong>
									<br />
									- 1+ year of experience in backend development.
									<br />
									- Proficiency in Python and familiarity with Flask framework.
									<br />
									- Understanding of SQLAlchemy or similar ORM frameworks.
									<br />
									- Basic knowledge of Linux and AWS EC2 environments.
									<br />
									- Ability to write clean, maintainable, and efficient code.
									<br />
									- Good understanding of server-side templating languages and
									server-side CSS preprocessors.
									<br />
									- Familiarity with version control tools like Git.
									<br />
									<br />
									<strong>Preferred Expertise:</strong>
									<br />
									- Currently pursuing a degree in Computer Science,
									Engineering, or a related field.
									<br />
									- Eagerness to learn new technologies and frameworks.
									<br />
									- Strong problem-solving skills and willingness to take on
									challenging tasks.
									<br />
									- Excellent communication and teamwork skills.
									<br />
									<br />
								</p>
								<h3 className='h3 text-xl mb-2'>Data Scientist Intern</h3>
								<p className='text-base text-gray-600'>
									Are you a passionate Data Scientist eager to delve into data
									and derive meaningful insights? Join our dynamic team and
									contribute to data-driven decision-making processes.
									<br />
									<br />
									<strong>Role Insight:</strong>
									<br />
									Collaborate with cross-functional teams to analyze and
									interpret complex data sets. This role is ideal for
									individuals proficient in Python, SQL, and machine learning
									frameworks who want to make a significant impact through data.
									<br />
									<br />
									<strong>Key Tasks:</strong>
									<br />
									- Collect, clean, and preprocess data from various sources.
									<br />
									- Develop and implement data models and algorithms to solve
									business problems.
									<br />
									- Perform exploratory data analysis and generate reports.
									<br />
									- Visualize data insights using tools like Matplotlib,
									Seaborn, or Tableau.
									<br />
									- Collaborate with engineering and product teams to integrate
									data-driven features.
									<br />
									- Stay updated with the latest trends and technologies in data
									science.
									<br />
									<br />
									<strong>What You Bring:</strong>
									<br />
									- 1+ year of experience in data analysis or data science.
									<br />
									- Proficiency in Python and libraries such as Pandas, NumPy,
									and Scikit-learn.
									<br />
									- Experience with SQL for database querying and manipulation.
									<br />
									- Knowledge of machine learning algorithms and their
									applications.
									<br />
									- Strong analytical and problem-solving skills.
									<br />
									- Ability to communicate complex data insights to
									non-technical stakeholders.
									<br />
									<br />
									<strong>Preferred Expertise:</strong>
									<br />
									- Currently pursuing a degree in Data Science, Computer
									Science, Statistics, or a related field.
									<br />
									- Familiarity with big data technologies such as Hadoop or
									Spark.
									<br />
									- Experience with data visualization tools like Tableau or
									Power BI.
									<br />
									- Hands-on experience with version control systems like Git.
									<br />
									- Strong attention to detail and ability to work in a
									fast-paced environment.
									<br />
								</p>
							</div>
						</div>
					</div> */}
					<div className='max-w-3xl mx-auto pb-4'>
						<div></div>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>
								🚀 Join Our Revolution in Document Creation
							</h2>
						</div>
						<div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								<h3 className='h3 text-xl mb-2'>
									Data-Driven Growth & Marketing Data Strategist Intern
								</h3>
								<p className='text-base text-gray-600'>
									At DrLambda, we are transforming the future of document
									creation by turning static content into dynamic digital
									workspaces. Using cutting-edge AI tools, we’ve developed a
									powerful external second brain designed to enhance
									productivity and efficiency across various industries.
									<br />
									<br />
									<strong>
										Introducing One of Our Flagship Products - ChatSlide.ai:
									</strong>
									<br />
									Experience a revolution in content creation with ChatSlide.ai,
									now accessible in over 200 countries. Whether you start with
									an image 🖼️, a PDF 📄, or any weblink 🔗, ChatSlide.ai
									seamlessly transforms it into engaging content, including
									slides, videos, and social media posts. 🚀 Boost your
									productivity instantly and streamline your knowledge-sharing
									workflow!
									<br />
									<br />
									We are on a mission to build the digital workspace that
									converts your documents into anything you need, enabling you
									to share knowledge with ease and creativity.
									<br />
									<br />
									<strong>Website:</strong>{' '}
									<a
										href='https://chatslide.ai'
										target='_blank'
										rel='noopener noreferrer'
									>
										https://drlambda.ai
									</a>
									<br />
									<br />
									<strong>Role Overview:</strong>
									<br />
									We are on the lookout for a dynamic and driven Data-Driven
									Growth & Marketing Operations Intern to become a key player in
									our team. In this role, you will:
									<br />
									<br />-{' '}
									<strong>
										Supercharge Content Marketing Conversion:
									</strong>{' '}
									Design and execute innovative strategies to significantly
									boost our content marketing conversion rates. You'll have the
									opportunity to craft and share captivating brand stories that
									resonate across multiple platforms, helping to build our
									brand's global presence.
									<br />
									<br />- <strong>Leverage Data for User Insights:</strong> Dive
									deep into our rich data sets to uncover user personas and
									behavior patterns. Your analysis will be crucial in providing
									actionable insights that drive our growth strategy and enhance
									user engagement.
									<br />
									<br />- <strong>Create Impactful Case Studies:</strong> Take
									the lead in optimizing and crafting compelling product case
									studies that not only highlight our product’s capabilities but
									also demonstrate the real-world impact and value we bring to
									our clients. Your work will play a pivotal role in showcasing
									the transformative power of our AI-driven tools.
									<br />
									<br />- <strong>Analyze Historical Data Trends:</strong>{' '}
									Examine and interpret historical data to identify trends and
									patterns that inform our marketing and product strategies,
									ensuring we stay ahead of the curve and meet our users'
									evolving needs.
									<br />
									<br />- <strong>
										Identify User Personas and Behaviors:
									</strong>{' '}
									Use data-driven methods to gain deep insights into user
									personas and behaviors, allowing us to tailor our products and
									marketing efforts to better align with user expectations and
									drive sustained growth.
									<br />
									<br />
									<strong>What Will Make You Stand Out:</strong>
									<br />
									- If you have previous experience in content operations within
									a SaaS company, you’re already ahead of the game.
									<br />
									- A strong passion for knowledge and information management
									will set you apart and greatly enhance your chances of being
									the perfect fit for our team.
									<br />
									<br />
									If you’re passionate about AI, digital marketing, and data
									analysis, and eager to make a tangible impact on a rapidly
									growing company, contact{' '}
									<a href='mailto:sophie@drlambda.ai'>sophie@drlambda.ai</a>—we
									want to hear from you!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}
