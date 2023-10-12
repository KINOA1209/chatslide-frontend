// import ContentCreationImg from '../assets/svgs/content-creation.svg?react'
import ContentCreationImg from '@/public/new_landing/imgs/content-creation.png'
// import LectureDesignImg from '../assets/svgs/lecture-design.svg?react'
import LectureDesignImg from '@/public/new_landing/imgs/lecture-design.png'
// import ResearchSynthesizingImg from '../assets/svgs/research-synthesizing.svg?react'
import ResearchSynthesizingImg from '@/public/new_landing/imgs/research-synthesizing.png'
// import SelfLearningImg from '../assets/svgs/self-learning.svg?react'
import SelfLearningImg from '@/public/new_landing/imgs/self-learning.png'
const FeatureCards = () => {
  return (
    <>
      <div className='mb-[30rem] grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-4'>
        <div className='w-[35rem] bg-gray-200 rounded-3xl flex flex-col px-8 py-6'>
          <div className='w-[27rem] h-[3.75rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-bold leading-10 tracking-wide'>
            Content Creation
          </div>
          <div className='w-[31rem] h-[5.5rem] pt-4 text-gray-700 text-2xl font-normal font-creato-regular leading-10 tracking-wide'>
            Evolve your narrative. Tools tailored for visionary storytelling.
            From inspiration to impression.
          </div>
          <div className='w-full py-[4rem] rounded-md self-center'>
            <img
              src='/new_landing/imgs/content-creation.png'
              alt='Content Creation'
              className='object-contain w-full h-full'
            />
          </div>
          <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-10 gap-6'>
            <img
              className='w-14 h-14 rounded-full border'
              src='new_landing/imgs/person1.png'
            />
            <div className='w-[30rem] h-20 text-slate-500 text-xl font-normal font-creato-regular leading-7 tracking-wide'>
              “It turns vast information into concise, captivating narratives
              effortlessly.”
            </div>
          </div>
        </div>
        <div className='w-[35rem] bg-gray-200 rounded-3xl flex flex-col px-8 py-6'>
          <div className='w-[27rem] h-[3.75rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-bold leading-10 tracking-wide'>
            Research Synthesizing
          </div>
          <div className='w-[31rem] h-[5.5rem] pt-4 text-gray-700 text-2xl font-normal font-creato-regular leading-10 tracking-wide'>
            Collate, create, and conquer your studies into academic gems.
          </div>
          <div className='w-full py-[4rem] rounded-md self-center'>
            {/* <ContentCreationImg  /> */}
            <img
              src='/new_landing/imgs/research-synthesizing.png'
              alt='Research Synthesizing'
              className='object-contain w-full h-full'
            />
          </div>
          <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-10 gap-6'>
            <img
              className='w-14 h-14 rounded-full border'
              src='new_landing/imgs/person2.png'
            />
            <div className='w-[30rem] h-20 text-slate-500 text-xl font-normal font-creato-regular leading-7 tracking-wide'>
              "Dr.Lambda drafts my 100-page report beautifully. Saves so much
              time!"
            </div>
          </div>
        </div>
        <div className='w-[35rem] bg-gray-200 rounded-3xl flex flex-col px-8 py-6'>
          <div className='w-[27rem] h-[3.75rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-bold leading-10 tracking-wide'>
            Self Learning
          </div>
          <div className='w-[31rem] h-[5.5rem] pt-4 text-gray-700 text-2xl font-normal font-creato-regular leading-10 tracking-wide'>
            Nurture your passion into digestible knowledge. Curiosity is all you
            need to start.
          </div>
          <div className='w-full pt-[4rem] pb-[9rem] rounded-md self-center'>
            {/* <ContentCreationImg  /> */}
            <img
              src='/new_landing/imgs/self-learning.png'
              alt='Self Learning Image'
              className='object-contain w-full h-full'
            />
          </div>
          <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-10 gap-6'>
            <img
              className='w-14 h-14 rounded-full border'
              src='new_landing/imgs/person3.png'
            />
            <div className='w-[30rem] h-20 text-slate-500 text-xl font-normal font-creato-regular leading-7 tracking-wide'>
              “I use it to turn Youtube videos into a my personal pocket book!
              It’s pure magic!"
            </div>
          </div>
        </div>
        <div className='w-[35rem] bg-gray-200 rounded-3xl flex flex-col px-8 py-6'>
          <div className='w-[27rem] h-[3.75rem] opacity-95 text-neutral-800 text-3xl font-bold font-creato-bold leading-10 tracking-wide'>
            Lecture Design
          </div>
          <div className='w-[31rem] h-[5.5rem] pt-4 text-gray-700 text-2xl font-normal font-creato-regular leading-10 tracking-wide'>
            Illuminate minds with brilliant materials. Engage with every slide,
            script and session.
          </div>
          <div className='w-full py-[4rem] rounded-md self-center'>
            {/* <ContentCreationImg  /> */}
            <img
              src='/new_landing/imgs/lecture-design.png'
              alt='Lecture Design Image'
              className='object-contain w-full h-full'
            />
          </div>
          <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-10 gap-6'>
            <img
              className='w-14 h-14 rounded-full border'
              src='new_landing/imgs/person4.png'
            />
            <div className='w-[30rem] h-20 text-slate-500 text-xl font-normal font-creato-regular leading-7 tracking-wide'>
              "Dr.Lambda helps me prepare math lecture decks with more engaging
              strategies and depth.”
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeatureCards
