import { useEffect } from 'react';

const useJSScript = (html: string) => {
	useEffect(() => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const scriptTags = doc.querySelectorAll('script');

		scriptTags.forEach((scriptTag) => {
			const src = scriptTag.getAttribute('src');
			const isAsync = scriptTag.hasAttribute('async');
			if (src || isAsync) {
				// Check if src or async attribute is present
				const script = document.createElement('script');
				if (src) script.src = src;
				if (isAsync) script.async = true;
				document.body.appendChild(script);
			}
		});

		return () => {
			scriptTags.forEach((scriptTag) => {
				const src = scriptTag.getAttribute('src');
				const isAsync = scriptTag.hasAttribute('async');
				if (src || isAsync) {
					// Check if src or async attribute is present
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
