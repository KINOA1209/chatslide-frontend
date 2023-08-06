export const metadata = {
  title: 'Home - Dr. Lambda',
  description: 'Remix your knowledge',
}

import Introduction from '@/components/introduction'
import Features from '@/components/features'
import SampleVideos from '@/components/samplevideos'
import Newsletter from '@/components/newsletter'

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
