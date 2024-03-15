export function addIdToRedir(redirect: string, projectId?: string)  {
	const searchParams = new URLSearchParams(window.location.search);
	const idFromUrl = searchParams.get('id');
	const id = projectId || idFromUrl;

	if (id) {
		const url = new URL(redirect, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
		url.searchParams.set('id', id);
		redirect = url.toString().replace(url.origin, ''); // Remove origin for Next.js router compatibility
	}

	return redirect;
}