import Script from 'next/script';
import React from 'react';

class DataDog extends React.Component {
	render() {
		return (
			<Script id='datadog-rum'>
				{`(function(h,o,u,n,d) {
            h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
            d=o.createElement(u);d.async=1;d.src=n
            n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
          })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
            window.DD_RUM.onReady(function() {
            window.DD_RUM.init({
              clientToken: 'pubdf732668a5fce7c34ceca49fce22608b',
              applicationId: 'd713204e-96f9-4150-bf28-c09c3ffb1740',
              site: 'datadoghq.com',
              service: 'drlambda-frontend',
              env: ${process.env.TIER ? `'${process.env.TIER}'` : `'local'`},
              // Specify a version number to identify the deployed version of your application in Datadog
              // version: '1.0.0',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 20,
              trackUserInteractions: true,
              trackResources: true,
              trackLongTasks: true,
              defaultPrivacyLevel: 'mask-user-input',
            });
          })
      `}
			</Script>
		);
	}
}

export default DataDog;



