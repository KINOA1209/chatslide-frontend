import { useRouter, useSearchParams } from 'next/navigation';


export async function redirWithId(redirect: string, project_id?: string) {
	const router = useRouter();
	const searchParams = useSearchParams();
	// add get id param from path, and add it to the redir url if it doesn't exist
	const id = project_id || searchParams.get('id');
	if (id) {
		const redirectUrl = new URL(redirect, window.location.origin);
		redirectUrl.searchParams.set('id', id);
		redirect = redirectUrl.toString();
	}
	router.push(redirect);
}
