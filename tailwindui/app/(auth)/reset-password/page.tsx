import ResetPassowrd from '@/app/(auth)/reset-password/ResetPassword'
import { generateMetadata } from '@/app/layout'

export const metadata = generateMetadata({
  title: 'Reset Password | DrLambda',
  description: 'DrLambda is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.',
});

export default function Page() {
  return (
    <ResetPassowrd />
  )
}