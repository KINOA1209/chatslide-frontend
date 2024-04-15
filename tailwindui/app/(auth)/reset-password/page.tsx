import ResetPassowrd from '@/app/(auth)/reset-password/ResetPassword';
import { generateMetadata } from '@/app/layout';
import { getBrand } from '@/utils/getHost';

export const metadata = generateMetadata({
	title: `Reset Password | ${getBrand()}`,
	description:
		`${getBrand()} is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.`
});

export default function Page() {
	return <ResetPassowrd />;
}
