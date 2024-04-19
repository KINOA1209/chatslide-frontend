import { Column } from '@/components/layout/Column';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { BigTitle, Instruction, Title } from '@/components/ui/Text';
import { getBrand } from '@/utils/getHost';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { MdOutlineShare } from 'react-icons/md';

export const metadata = {
	title: `How to use the embed feature | ${getBrand()}`,
	description: `How to use the embed feature at ${getBrand()}.`,
};

export default function Terms() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<Header loginRequired={false} isLanding={false} />
			<Column>
				<Title>How to use the embed feature </Title>
				<Instruction>
					<div className='flex flex-col'><span>Embedding allows you to put the slides you created at {getBrand()} on your own website. You can follow these steps to do it:</span>
						<ul>
							<li>1. Create a slide deck using {getBrand()}.</li>
							<li className='flex flex-row items-center gap-x-1'><span>2. Find the HTML code to embed by clicking share button </span><MdOutlineShare /><span>on your dashboard page or slide page.</span></li>
							<li >3. Paste the HTML code on your own website to embed the slide. You can learn more in &nbsp;
								<a className='text-blue-600' href='https://www.youtube.com/watch?v=aRGdDy18qfY&ab_channel=BroCode'>this video</a>.
								</li>
							<li className='flex flex-row items-center gap-x-1'>
								<span>4. Use the buttons </span> <FaChevronCircleLeft />  <FaChevronCircleRight /> <span>on the lower right to navigate pages.</span></li>
						</ul>
					</div>
				</Instruction>
				<iframe src="https://drlambda.ai/embed/understanding-internal-family-system-in-bus-qfouUU?page=1" width="960px" height="540px"></iframe>
				{/* <iframe src="http://localhost/embed/analyzing-the-latest-lenovo-earnings-report-FyrVGx?page=1" width="960px" height="540px"></iframe> */}
			</Column>
			<Footer />
		</section>
	);
}
