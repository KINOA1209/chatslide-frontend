export const metadata = {
  title: 'Home - Dr. Lambda',
  description: 'AI copilot for educators',
}

import Introduction from '@/components/introduction'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import SampleVideos from '@/components/samplevideos'
import Newsletter from '@/components/newsletter'

export default function Home() {
  return (
    <>
      <Introduction />
      <Features />
      <FeaturesBlocks />
      <SampleVideos />
      <Newsletter />
    </>
  )
}
