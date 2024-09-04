
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import 'aos/dist/aos.css';
import { Title } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { Panel } from '@/components/layout/Panel';
import { PricingComparison } from '@/app/(default)/landing/Pricing';
import Footer, { ThinFooter, WorkflowFooter } from '@/components/layout/footer';
import { getBrand } from '@/utils/getHost';
import { PaidToast } from './PaidToast';
import '@/public/css/pricing.css';

export const metadata = {
	title: `Pricing | ${getBrand()}`,
	description: 'Check pricing and manage subscription',
};

const Subscription = () => {
	return (
		<div className='w-full'>
			<Card>
				{/* <div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Subscription
				</div> */}
				<Title>Find tailored plans for you</Title>

				<PricingComparison small={true} trigger='pricing' />

				<Title>
					Looking to redeem your code? Click{' '}
					<Link className='text-[#4A3AFF]' href='/account'>
						here
					</Link>
					!
				</Title>
			</Card>
		</div>
	);
};

export default function SubscriptionAndUserResearch() {
	return (
		<div className='flex flex-col items-center mx-auto w-full'>
			<PaidToast />
			<Panel>
				<PricingComparison small={true} trigger='pricing' />
			</Panel>
			<ThinFooter />
		</div>
	);
}
