import Script from 'next/script';
import React from 'react';

export default function Rewardful() {
	return (
		<Script id='rewardful'>
			{`
	(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');

  (function() {
    var el = document.createElement('script');
    el.setAttribute('src', 'https://r.wdfl.co/rw.js');
    el.setAttribute('data-rewardful', '649c29');
    document.body.appendChild(el);
  })();
					`}
		</Script>
	)
}


export async function trackRewardfulConversion(email: string) {
	try {
		if (typeof window !== 'undefined' && typeof window.rewardful === 'function') {
			window.rewardful('convert', { email: email });
		}
	} catch (error) {
		console.error('Error tracking Rewardful conversion:', error);
	}
}

export async function getRewardfulReferralId() {
	try {
		if (typeof window !== 'undefined' && typeof window.rewardful === 'function') {
			console.log('Rewardful referral ID:', window.Rewardful.referral);
			return window.Rewardful.referral;
		} else {
			return '';
		}
	} catch (error) {
		console.error('Error getting Rewardful referral ID:', error);
		return '';
	}
}