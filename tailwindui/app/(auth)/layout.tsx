import Header from '@/components/ui/header';
import { generateMetadata } from '../layout';


const title = 'DrLambda: Create Professional Slides with AI'
const description = 'DrLambda is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.';

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
		</main>
	);
}
