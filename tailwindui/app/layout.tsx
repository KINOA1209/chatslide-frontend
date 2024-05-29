import './css/style.css';
import React from 'react';
import Script from 'next/script';
import { getBrand, getOrigin, isChatslide, isLocal } from '@/utils/getHost';

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
		keywords = `${getBrand()}, AI-powered, documents_to_slides, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge, google_slides, powerpoint, keynote, canva, figma, design, content, marketing, social_media, twitter, linkedin, facebook, instagram, youtube, tiktok, pinterest, slideshare, medium`,
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
					url: `${getOrigin()}/images/ogimage_${getBrand(true)}.png`,
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
			image: `${getOrigin()}/images/ogimage_${getBrand(true)}.png`,
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

					{!isLocal() && (
						<>
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

							<Script id='ms_clarity'>
								{`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mje9x5g3v5");
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
						</>
					)}
				</head>
				<body
					className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
				>
					<div className='Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
						{children}
					</div>
				</body>
			</html>
		</>
	);
}
