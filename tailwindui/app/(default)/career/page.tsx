import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export const metadata = {
	title: 'Career - DrLambda',
	description:
		'Join to work with us at DrLambda. Explore our remote-first open positions in engineering, design, product, and growth. Apply now!',
};

export default function Career() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<Header loginRequired={false} isLanding={false} />
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
						<h1 className='h1'>Careers at DrLambda</h1>
					</div>

					<div className='max-w-3xl mx-auto pb-4'>
						<strong>How to Apply:</strong>
						<br />
						Share your resume, portfolio, and a cover letter detailing your
						journey and interest in the role. Send your applications to{' '}
						<a href='mailto:contact@drlambda.ai'>contact@drlambda.ai</a>.
						<br />
						<br />
						<div className='pb-8' id='design'>
							<h2 className='h3 text-2xl'>🧑🏻‍🎨 Design</h2>
						</div>
						<div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								<h3 className='h3 text-xl mb-2'>UX Design Intern</h3>
								<p className='text-base text-gray-600'>
									Seeking a driven UX enthusiast passionate about innovative
									design and education? DrLambda invites you to reshape the
									educational landscape as a UX Design Intern.
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
						</div>
					</div>
					<div className='max-w-3xl mx-auto pb-4'>
						<div className='pb-8'>
							<h2 className='h3 text-2xl'>🧑🏽‍💻 Engineering</h2>
						</div>
						<div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								{/* <h3 className='h3 text-xl mb-2'>Frontend Developer</h3>
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
                  - Strong proficiency in JavaScript, React.js, and context manager like Zustand.
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
                  - Hands-on experience with Git, project management tool like Jira.
                  <br />
                </p> */}
								{/* <br /> */}
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
								<h3 className='h3 text-xl mb-2' id='infra'>
									Infrastructure Engineer
								</h3>
								<p className='text-base text-gray-600'>
									Are you an adept Infrastructure Engineer with a passion for
									developing and maintaining scalable, high-availability
									systems? We're seeking a proactive individual to join our
									forward-thinking team, driving the evolution of our
									infrastructure to support our growing needs.
									<br />
									<br />
									<strong>Role Insight:</strong>
									<br />
									Engage in the design and implementation of robust
									infrastructure solutions, focusing on cloud services,
									microservices architecture, and distributed systems. This role
									is suited for engineers skilled in AWS, Lambda, Amplify,
									Vercel, and who are excited about optimizing infrastructure
									for performance and reliability.
									<br />
									<br />
									<strong>Key Tasks:</strong>
									<br />
									- Architect and deploy cloud solutions using AWS, including
									services like Lambda and Amplify.
									<br />
									- Lead the transition to a microservice architecture, ensuring
									seamless integration and deployment.
									<br />
									- Implement and manage CDN solutions to improve content
									delivery speed and efficiency.
									<br />
									- Design and maintain distributed systems, encompassing
									databases, S3 storage, and more, for optimal scalability and
									availability.
									<br />
									- Ensure infrastructure security and compliance with best
									practices.
									<br />
									- Automate infrastructure provisioning and deployment
									processes.
									<br />
									<br />
									<strong>What You Bring:</strong>
									<br />
									- Profound knowledge in AWS cloud services and infrastructure
									as code tools.
									<br />
									- Experience in setting up and managing microservice
									architectures.
									<br />
									- Understanding of distributed systems, including database
									management, file storage (S3), and networking.
									<br />
									- Ability to design, implement, and manage CDN strategies for
									global content distribution.
									<br />
									- Familiarity with containerization and orchestration tools
									(e.g., Docker, Kubernetes).
									<br />
									<br />
									<strong>Preferred Expertise:</strong>
									<br />
									- A degree in Computer Science, Engineering, or a relevant
									field.
									<br />
									- Certifications in AWS or other cloud technologies.
									<br />
									- Experience with infrastructure monitoring and logging tools.
									<br />
									- Proficiency in automation and scripting languages.
									<br />
								</p>
							</div>
						</div>
					</div>
					{/* <div className='max-w-3xl mx-auto pb-4'>
            <div>

            </div>
            <div className='pb-8'>
              <h2 className='h3 text-2xl'>📊 Data Science</h2>
            </div>
            <div className='flex flex-col md:flex-row items-center pb-8'>
              <div>
                <h3 className='h3 text-xl mb-2'>Data Scientist</h3>
                <p className='text-base text-gray-600'>
                  Are you a detail-oriented Data Scientist with a knack for turning data into insights? We're looking for a skilled individual to join our team and drive data-informed decisions. This role is an excellent opportunity for someone who thrives in extracting meaningful insights from complex datasets and has a passion for data visualization and analytics.
                  <br /><br />
                  <strong>Role Insight:</strong><br />
                  As our Data Scientist, you will play a critical role in analyzing large datasets, creating dynamic dashboards, and providing actionable insights to guide our strategic decisions. Your expertise in SQL, Google Analytics, Retool, and dashboard creation will be pivotal in enhancing our data-driven approach.
                  <br /><br />
                  <strong>Key Tasks:</strong><br />
                  - Develop and maintain databases, ensuring data integrity and efficiency using SQL and Python.<br />
                  - Analyze web traffic and user engagement metrics using Google Analytics.<br />
                  - Design, build and deploy interactive dashboards and reports using Retool and other visualization tools.<br />
                  - Perform advanced data analysis to uncover trends, patterns, and insights.<br />
                  - Collaborate with cross-functional teams to understand their data needs and deliver comprehensive analytics solutions.<br />
                  - Stay updated with the latest trends and best practices in data science and analytics.<br /><br />
                  <strong>What You Bring:</strong><br />
                  - Proficiency in SQL and experience in database management.<br />
                  - Strong understanding of Google Analytics for web data analysis.<br />
                  - Experience in using Retool or similar tools for creating interactive dashboards.<br />
                  - Solid background in data analytics, statistics, and data visualization.<br />
                  - Ability to translate complex datasets into understandable and actionable insights.<br />
                  - Familiarity with data processing, data modeling, and data mining techniques.<br /><br />
                  <strong>Preferred Expertise:</strong><br />
                  - A degree in Data Science, Statistics, Computer Science, or a related field.<br />
                  - Experience with machine learning algorithms and predictive modeling.<br />
                  - Proficiency in programming languages such as Python or R.<br />
                  - Excellent problem-solving skills and attention to detail.<br />
                  - Strong communication and presentation skills.<br /><br />
                </p>
              </div>
            </div>
          </div> */}
				</div>
			</div>
			<Footer />
		</section>
	);
}
