import { useEffect } from 'react';

const useJSScript = (html: string) => {
	useEffect(() => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const scriptTags = doc.querySelectorAll('script');

		scriptTags.forEach((scriptTag) => {
			const src = scriptTag.getAttribute('src');
			if (src) {
				const script = document.createElement('script');
				script.src = src;
				script.async = true;
				document.body.appendChild(script);
			}
		});

		return () => {
			scriptTags.forEach((scriptTag) => {
				const src = scriptTag.getAttribute('src');
				if (src) {
					const script = document.querySelector(`script[src="${src}"]`);
					if (script) {
						document.body.removeChild(script);
					}
				}
			});
		};
	}, [html]);
};

export default useJSScript;
