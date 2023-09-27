
import React from 'react';
import { Helmet } from 'react-helmet';

class Hotjar extends React.Component {
    render() {
        return (
            <Helmet>
                <script>
                {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:3669030,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
                </script>
            </Helmet>
        );
    }
}

export default Hotjar;
