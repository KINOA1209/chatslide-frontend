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
