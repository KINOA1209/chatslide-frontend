function getHost() {
	if (typeof window === 'undefined') {
		return process.env.HOST || 'chatslide.ai';
	}
	return window.location.host || 'chatlide.ai';
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
		return isChatslide() ? 'chatlide' : 'drlambda';
	}
	return isChatslide() ? 'Chatlide' : 'DrLambda';
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
	return getHost() === 'chatlide.ai';
}

export { getHost, getOrigin, getBrand, getLogoUrl, isChatslide };