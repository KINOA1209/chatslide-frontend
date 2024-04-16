function getHost() {
	if (typeof window === 'undefined') {
		// console.log('getHost: window is undefined', process.env.HOST);
		return process.env.HOST || 'chatslide.ai';
	}
	// console.log('getHost: window.location.host', window.location.host);
	return window.location.host || 'chatslide.ai';
}

function getOrigin() {
	const host = getHost();
	if (host.includes('localhost')) {
		return 'http://' + host;
	}
	return 'https://' + host;
}

function getBrand(lowercase = false) {
	if (lowercase) {
		return isChatslide() ? 'chatslide' : 'drlambda';
	}
	return isChatslide() ? 'ChatSlide' : 'DrLambda';
}

function getLogoUrl(color = true) {
	if (color) {
		return isChatslide()
			? '/images/logo_color_chatslide.png'
			: '/images/logo_color_drlambda.png';
	}
	
	return isChatslide()
		? '/images/logo_color_chatslide.png'
		: '/images/logo_bw_drlambda.svg';
}

function isChatslide() {
	return !getHost().includes('drlambda.ai');
}

export { getHost, getOrigin, getBrand, getLogoUrl, isChatslide };