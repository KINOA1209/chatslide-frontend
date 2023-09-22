'use client'

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import demoThumbnail from '@/public/images/demo.jpg'

export default function SampleVideos() {
  return (
    <section className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32" aria-hidden="true">
        <svg width="1760" height="518" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div>

          {/* Items */}
          <div className="rounded-2xl overflow-hidden drop-shadow-xl">
            <LiteYouTubeEmbed
              aspectHeight={9}
              aspectWidth={16}
              id="hyFhbvX5vFI"
              title="Create Slides from PDF Using DrLambda"
              thumbnail={demoThumbnail.src}
            />

          </div>
        </div>
      </div>
    </section>
  )
}