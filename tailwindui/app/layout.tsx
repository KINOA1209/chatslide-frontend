import './css/style.css';
import React from 'react';
import Script from 'next/script';
import { getBrand, getOrigin, isChatslide } from '@/utils/getHost';
import Abotify from '@/components/integrations/Abotify';

interface MetadataOptions {
	title?: string;
	description?: string;
	keywords?: string;
	name?: string;
}

export const generateMetadata = (options: MetadataOptions = {}): any => {
	const {
		title = `${getBrand()}: Create Professional Slides with AI`,
		description = 'Your AI assistant to create professional slides and posts. Convert your documents, webpages, videos, and tweets into professional slides and documents.',
		keywords = `${getBrand()}, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, goole_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium`,
		name = `${getBrand()}: AI Slides`,
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
			url: getOrigin(),
			type: 'website',
			images: [
				{
					url: `${getOrigin()}/images/ogimage_${getBrand()}.png`,
					width: 800,
					height: 440,
					alt: getBrand(),
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
			image: `${getOrigin()}/images/ogimage_${getBrand()}.png`,
		},
	};
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang='en'>
				<head>
					<link
						rel='icon'
						href={isChatslide() ? '/favicon_chatslide.ico' : '/favicon.ico'}
					/>

					<Script id='intercom-settings'>
						{`
				window.intercomSettings = {
						api_base: "https://api-iam.intercom.io",
						app_id: "m25tvbz7",
				};
			`}
					</Script>

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

					<Script id='mixpanel'>
						{`
(function (f, b) {
if (!b.__SV) {
	var e, g, i, h;
	window.mixpanel = b;
	b._i = [];
	b.init = function (e, f, c) {
		function g(a, d) {
			var b = d.split(".");
			2 == b.length && ((a = a[b[0]]), (d = b[1]));
			a[d] = function () {
				a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
			};
		}
		var a = b;
		"undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
		a.people = a.people || [];
		a.toString = function (a) {
			var d = "mixpanel";
			"mixpanel" !== c && (d += "." + c);
			a || (d += " (stub)");
			return d;
		};
		a.people.toString = function () {
			return a.toString(1) + ".people (stub)";
		};
		i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
		for (h = 0; h < i.length; h++) g(a, i[h]);
		var j = "set set_once union unset remove delete".split(" ");
		a.get_group = function () {
			function b(c) {
				d[c] = function () {
					call2_args = arguments;
					call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
					a.push([e, call2]);
				};
			}
			var d = {},
				e = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)),
				c;
			for (c = 0; c < j.length; c++) b(j[c]);
			return d;
		};
		b._i.push([e, f, c]);
	};
	b.__SV = 1.2;
	e = f.createElement("script");
	e.type = "text/javascript";
	e.async = !0;
	e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
	g = f.getElementsByTagName("script")[0];
	g.parentNode.insertBefore(e, g);
}
})(document, window.mixpanel || []);
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
				})()
			`}
					</Script>
				</head>
				<body
					className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
				>
					<div className='Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
						{children}
					</div>

					<Abotify />
				</body>
			</html>
		</>
	);
}
