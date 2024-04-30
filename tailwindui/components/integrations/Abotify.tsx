import Script from 'next/script';
import React from 'react';

export default function Abotify() {
	return <Script src='https://api.abotify.com/static/js/track.js'></Script>;
}

export function trackSignUpAbotify() {
	if (typeof window !== 'undefined') {
		// @ts-ignore
		window.abotify.track({
			name: 'signup',
			detail: 'User Signup',
		});
	}
}
