import VideoThumb from '@/public/images/hero-image.png'
import ModalVideo from '@/components/modal-video'

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Sample videos</h2>
          </div>

          {/* Items */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <ModalVideo
                thumb={VideoThumb}
                thumbWidth={768}
                thumbHeight={432}
                thumbAlt="Modal video thumbnail"
                video="/videos/video.mp4"
                videoWidth={1920}
                videoHeight={1080} />
          </div>
        </div>
      </div>
    </section>
  )
}