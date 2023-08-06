export const metadata = {
  title: 'Home - Dr. Lambda',
  description: 'Remix your knowledge',
}

import Introduction from '@/components/landing/introduction'
import Features from '@/components/landing/features'
import SampleVideos from '@/components/landing/samplevideos'
import Newsletter from '@/components/landing/newsletter'

export default function Home() {
  return (
    <>
      <Introduction />
      <Features />
      <SampleVideos />
      <Newsletter />
    </>
  )
}
