import React from 'react';
import { Helmet } from 'react-helmet';

class GoogleAnalytics extends React.Component {
	render() {
		return (
			<Helmet>
				<script
					async
					src='https://www.googletagmanager.com/gtag/js?id=G-FW9YH27P0H'
				></script>
				<script>
					{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-FW9YH27P0H');
                `}
				</script>
			</Helmet>
		);
	}
}

export default GoogleAnalytics;
