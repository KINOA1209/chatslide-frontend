import './css/style.css';
import React from 'react';
import Script from 'next/script';

interface MetadataOptions {
	title?: string;
	description?: string;
	keywords?: string;
	name?: string;
}

export const generateMetadata = (options: MetadataOptions = {}): any => {
	const {
		title = 'DrLambda: Create Professional Slides with AI',
		description = 'Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.',
		keywords = 'DrLambda, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, goole_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium',
		name = 'DrLambda: AI Slides',
	} = options;

	return {
		title,
		description,
		keywords,
		name,
		metadataBase: {
			title,
			description,
			keywords,
			name,
		},
		openGraph: {
			title,
			description,
			url: 'https://drlambda.ai',
			type: 'website',
			images: [
				{
					url: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
					width: 800,
					height: 440,
					alt: 'DrLambda',
				},
			],
		},
		twitter: {
			handle: '@drlambda_ai',
			site: '@drlambda_ai',
			card: 'summary_large_image',
			creator: '@drlambda_ai',
			title,
			description,
			image: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
		},
	};
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/favicon.ico' />

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

				<Script id='stey'>
					{`(function () {
    'use strict';

    var ErrorType;
    (function (ErrorType) {
        ErrorType["log"] = "log";
        ErrorType["event"] = "event";
    })(ErrorType || (ErrorType = {}));

    var USER_CACHE_KEY = 'stey_ai_pre_user';
    var PRE_LEVELS = ['error', 'log', 'warn', 'info'];

    function sdkInit(SdkUrl, apiKey) {
        window.__UV__INVOKE = [];
        window.__UV__LOGS = [];
        window.__UV__ORIGIN_LOGS = [];
        window.addEventListener('error', function (e) {
            pushError(e, ErrorType.event, 'error');
        });
        var _loop_1 = function (i) {
            var level = PRE_LEVELS[i];
            var originalFn = console[level];
            window.__UV__ORIGIN_LOGS.push(originalFn);
            console[level] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                originalFn.apply(this, args);
                pushError(new Error(), ErrorType.log, level, args);
            };
        };
        for (var i = 0; i < PRE_LEVELS.length; i++) {
            _loop_1(i);
        }
        function pushError(err, type, level, args) {
            var _a;
            if (((_a = window.__UV__LOGS) === null || _a === void 0 ? void 0 : _a.length) > 100)
                return;
            window.__UV__LOGS.push({
                error: err,
                level: level,
                args: args,
                type: type,
            });
        }
        function pushPreMethod(addItem) {
            var hasMethod = false;
            window.__UV__INVOKE.some(function (item, index) {
                if (item.method === addItem.method) {
                    window.__UV__INVOKE[index] = addItem;
                    hasMethod = true;
                    return true;
                }
            });
            if (!hasMethod) {
                window.__UV__INVOKE.push(addItem);
            }
        }
        function initMethods() {
            window.steyAIRecord = window.userview = {
                initialize: function (projectKey, options) {
                    var _a;
                    if (options && ((_a = options.userInfo) === null || _a === void 0 ? void 0 : _a.uid)) {
                        setUser(options.userInfo);
                    }
                    pushPreMethod({
                        method: 'initialize',
                        args: [projectKey, options],
                    });
                },
                identify: function (userInfo) {
                    if (userInfo && userInfo.uid) {
                        setUser(userInfo);
                        pushPreMethod({
                            method: 'identify',
                            args: [userInfo],
                        });
                    }
                    else {
                        console.warn('identify need a uid', userInfo);
                    }
                },
            };
        }
        function setUser(userInfo) {
            try {
                window.localStorage.setItem(USER_CACHE_KEY + apiKey, JSON.stringify(userInfo));
            }
            catch (error) {
                console.warn('userInfo set failed', error);
            }
        }
        function createLoadSdk(url, apiKey) {
            var scriptDom = document.createElement('script');
            scriptDom.type = 'text/javascript';
            scriptDom.src = url;
            document.head.appendChild(scriptDom);
        }
        initMethods();
        return function start(isDefaultInit, options) {
            createLoadSdk(SdkUrl);
            if (isDefaultInit) {
                window.steyAIRecord.initialize(apiKey, options);
            }
        };
    }
    var addSdk = sdkInit('https://static.stey.ai/sdk/web/latest/index.js', '309714ed7b6044c8b79651f6e87247a0');
    addSdk(true);

})();
;(function () {
  const s =
    window.sessionStorage &&
    window.sessionStorage.getItem("__UV__SELECT_MODE__");
  if (/__UV__SELECT_MODE__=1/.test(location.href) || s) {
    var a = document.createElement("script");
    a.src =
      "https://static.stey.ai/libs/1.0.0/DomSelector.umd.min.js?" + Date.now();
    document.head.appendChild(a);
  }
})()`}
				</Script>
			</head>
			<body
				className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
			>
				<div className='Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
					{children}
				</div>
			</body>


		</html>
	);
}
