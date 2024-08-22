import Header from '@/components/layout/header';
import { generateMetadata } from '../metadata';
import { getBrand } from '@/utils/getHost';
import Footer from '@/components/layout/footer';

const title = `Sign Up | ${getBrand()}`;
const description = `${getBrand()} is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.`;

export const metadata = generateMetadata({ title, description });

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='grow'>
			<Header loginRequired={false} isLanding={false} isAuth={true} />
			{children}
      <Footer />
		</main>
	);
}
