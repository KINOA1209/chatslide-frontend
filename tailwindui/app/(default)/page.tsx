import Image from 'next/image'
import MyProjectsImg from '@/public/new_landing/imgs/my-projects-mask.png'
import GenerationPreviewImg from '@/public/new_landing/imgs/GenerationPreview.png'

import Footer from '../../components/ui/footer'
import FeatureCards from '../../components/new_landing/FeatureCards'
import Header from '@/components/ui/header'
import PricingSection from '@/components/new_landing/PricingPlans'
import LandingButton from '@/components/new_landing/LandingButton'
import BlackFridayBanner from '@/components/new_landing/HolidayBanner'
import HeroText from '@/components/landing/HeroText'
import Testimonails from '@/components/landing/testimonials'


const fileTypes = [
  'pdf-file-icon',
  'word-file-icon',
  'slack-file-icon',
  'dropbox-file-icon',
  'ppt-file-icon',
  'google-drive-icon',
  'notion-icon',
  'youtube-square-icon',
  'txt-icon',
]


// fields can be overwritten by child pages, usually title and description
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

function App() {

  return (
    <>
      <Header loginRequired={false} isLanding={true} />

      <BlackFridayBanner />

      {/* background container */}
      <div className='background w-full relative bg-zinc-100'>
        {/* Section: Transform Knowledge */}
        <div id='features' className='relative intro-section flex flex-col justify-center items-center gap-2 md:gap-4'>
          <div className='w-[90%] font-creato-medium pt-16'>
            <HeroText />
          </div>


          <a href="https://www.producthunt.com/posts/drlambda-social?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-drlambda&#0045;social" className="fixed bottom-5 right-5 z-40" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=427030&theme=light&period=weekly&topic_id=44" alt="DrLambda&#0045;Social - AI&#0032;content&#0032;generator&#0032;for&#0032;social&#0032;media | Product Hunt"  width="250" height="54" /></a>

          <div className='mt-6 w-50% text-center text-neutral-900 text-l md:text-2xl leading-10 tracking-wide font-creato-medium'>
            Get a 🤖 robo-assistant for pro slides and posts. 
            <br />
            No more copy-pasting or reformatting hassles! 👍
          </div>

          <div className="py-6">
            <LandingButton />
          </div>

          <div className='transition-transform duration-150 transform w-full h-[56vw] lg:w-[70rem] lg:h-[39.3rem] mx-auto max-w-7xl'>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Op2nCrGosnA?autoplay=1&mute=1&loop=1&rel=0"
              title="DrLambda - One-click presentation AI tool through multiple sources"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
          {/* <GenerationPreview /> */}
        </div>

        <div id="scenarios" className='pt-[3rem] flex flex-col justify-center items-center'>
          <div className='w-[90%] text-center text-neutral-900 text-3xl lg:text-5xl font-creato-medium leading-[4rem] lg:leading-[7.5rem]'>
            Professional slides for all scenarios
          </div>
          <div className='w-[90%] text-center text-md lg:text-xl'>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              From{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-regular leading-loose tracking-wide'>
              multi-source synthesis
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              to{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              topic-driven content generation
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              ,
              achieve{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              precision
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              in every narrative with DrLambda.
            </span>
          </div>

          {/* grid cards for features */}
          <FeatureCards />
        </div>

        <div id="use-cases" className='pt-[3rem] relative flex flex-col justify-center items-center'>
          <div className='w-[90%] h-full text-center text-neutral-900 text-3xl lg:text-5xl font-creato-medium leading-[4rem] lg:leading-[7.5rem]'>
            Extract information from any source
          </div>
          <div className='w-[90%] text-center text-md lg:text-xl  '>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              Curate
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              ,{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              organize
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              , and{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              access
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              your insights and information, all in one{' '}
            </span>
            <span className='text-neutral-800 font-bold font-creato-bold leading-loose tracking-wide'>
              centralized hub
            </span>
            <span className='text-neutral-800 font-normal font-creato-regular leading-loose tracking-wide'>
              {' '}
              for continuous learning.
            </span>
          </div>
          {/* my projects */}
          {/* <div className='mt-[6.25rem] w-[90%] h-auto bg-white rounded-3xl flex flex-col justify-center items-center px-12 py-10 gap-6'> */}
          {/* <div className='w-[28rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-medium leading-10 tracking-wider'>
              My Projects
            </div> */}
          {/* <MyProjectExample />
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-neutral-50'></div> */}

          <div className='mt-[6.25rem] w-[90%] lg:w-[70rem] lg:h-[25rem] max-w-7xl  bg-white rounded-3xl flex flex-col justify-center items-center px-6 py-4 lg:px-12 lg:py-10 gap-6'>
            <Image
              src={MyProjectsImg}
              alt='my project'
              className='object-contain lg:w-full lg:h-auto'
            />
            {/* <MyProjectsImg className='object-contain w-full h-full' /> */}
          </div>
          {/* </div> */}
          {/* file type icons list */}

          <div className='absolute top-[95%] lg:top-[93%] icons-list flex justify-evenly items-center gap-6 z-10'>
            {fileTypes.map((fileType, index) => (
              // Each icon container
              <div
                key={index}
                className='transition-transform duration-150 transform w-[4rem] h-[4rem] lg:w-[8rem] lg:h-[8rem] bg-white rounded-full border border-gray-200 flex justify-center items-center shadow-2xl'
              >
                <img
                  className={
                    fileType === 'slack-file-icon'
                      ? `w-[4rem] h-[4rem] lg:w-[7rem] lg:h-[7rem]`
                      : `w-[2rem] h-[2rem] lg:w-[4rem] lg:h-[4rem]`
                  }
                  src={`/new_landing/imgs/${fileType}.png`} // Make sure the image path is correct
                  alt={fileType} // Add alt text for accessibility
                />
              </div>
            ))}
          </div>
        </div>

        <div id="testimonials" className='pt-[8rem] relative flex flex-col justify-center items-center'>
          <div className='w-[90%] h-full text-center text-neutral-900 text-3xl lg:text-5xl font-creato-medium leading-[4rem] lg:leading-[7.5rem]'>
            Wall of love 💙
            <Testimonails />
          </div>
        </div>

        <div id='pricing' className='pt-[1rem]'>
          <PricingSection />
        </div>

        {/* discord icon */}
        {/* <Link href='https://discord.gg/CKVdZDAuu3'>
            <div className='mt-[3rem] mb-[5rem] w-[13rem] lg:w-[20rem] bg-white rounded-2xl border border-indigo-500 flex items-center'>
              <img
                className='w-8 h-6 ml-4'
                src='new_landing/imgs/discord-icon.png'
              />

              <div className='ml-4 flex flex-col'>
                <div className='w-auto lg:w-[7rem] h-5 pt-1 text-indigo-500 text-xs font-extrabold font-creato-medium leading-loose tracking-tight lg:tracking-[0.01388rem]'>
                  DISCORD
                </div>
                <div className='w-auto lg:w-[13rem] h-8 pb-10 text-indigo-500 text-sm lg:text-xl font-bold font-creato-medium leading-10 tracking-tight lg:tracking-[0.02425rem]'>
                  Join our community
                </div>
              </div>
            </div>
          </Link> */}

        <Footer />
      </div>
    </>
  )
}

export default App
