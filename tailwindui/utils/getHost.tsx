function getHost() {
	if (typeof window === 'undefined') {
		return process.env.HOST;
	}
	return window.location.host;
}

function isChatlide() {
	return getHost() === 'chatlide.ai';
}