import './css/style.css'
import React from 'react';
import Script from "next/script";

export const metadata = {
  title: 'DrLambda',
  description: 'Your AI agent to create professional slides.',
  keywords: 'DrLambda, AI-powered, tool, create, professional, slides, documents, sources, pdf, docx, notion, presentation, knowledge',
  image: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
  name: 'DrLambda',
  openGraph: {
    title: 'DrLambda',
    description: 'Your AI agent to create professional slides.',
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
    title: 'DrLambda',
    description: 'Your AI agent to create professional slides.',
    image: 'https://drlambda.ai/new_landing/imgs/ogimage.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>

      <Script id="datadog-rum">
        {
          `(function(h,o,u,n,d) {
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
              env: 'prod',
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
    </html>
  )
}
