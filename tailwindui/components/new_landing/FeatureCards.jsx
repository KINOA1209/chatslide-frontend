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
            <div className='grid grid-cols-1 lg:grid-cols-4 grid-rows-1 gap-4 mt-4'>
                <div className='w-auto lg:w-[20rem] bg-gray-200 rounded-3xl flex flex-col px-4 py-4 mx-1'>
                    <div className='w-auto lg:w-[15rem] opacity-95 text-neutral-800 text-xl lg:text-2xl font-bold font-creato-bold leading-8 tracking-wide'>
                        Content Creation
                    </div>
                    <div className='w-auto lg:w-[18rem] pt-2 text-gray-700 text-md lg:text-xl font-normal font-creato-regular leading-8 tracking-wide'>
                        Evolve your narrative. Tools tailored for visionary storytelling.
                        From inspiration to impression.
                    </div>
                    <div className='w-auto py-2 rounded-md self-center'>
                        <img
                            src='/new_landing/imgs/content-creation.png'
                            alt='Content Creation'
                            className='object-contain w-full h-[15rem]'
                        />
                    </div>
                    <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-4 gap-4'>
                        <img
                            className='w-10 h-10 lg:w-12 lg:h-12 rounded-full border'
                            src='new_landing/imgs/person1.png'
                        />
                        <div className='w-auto text-slate-500 text-xs lg:text-lg font-normal font-creato-regular leading-6 tracking-wide'>
                            “It turns vast information into concise, captivating narratives
                            effortlessly.”
                        </div>
                    </div>
                </div>
                <div className='w-auto lg:w-[20rem] bg-gray-200 rounded-3xl flex flex-col px-4 py-4 mx-1'>
                    <div className='w-auto lg:w-[15rem] opacity-95 text-neutral-800 text-xl lg:text-2xl font-bold font-creato-bold leading-8 tracking-wide'>
                        Research Synthesizing
                    </div>
                    <div className='w-auto lg:w-[18rem] pt-2 text-gray-700 text-md lg:text-xl font-normal font-creato-regular leading-8 tracking-wide'>
                        Collate, create, and conquer your studies into academic gems.
                    </div>
                    <div className='w-full py-2 rounded-md self-center'>
                        <img
                            src='/new_landing/imgs/research-synthesizing.png'
                            alt='Research Synthesizing'
                            className='object-contain w-full h-[15rem]'
                        />
                    </div>
                    <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-4 gap-4'>
                        <img
                            className='w-10 h-10 lg:w-12 lg:h-12 rounded-full border'
                            src='new_landing/imgs/person2.png'
                        />
                        <div className='w-auto text-slate-500 text-xs lg:text-lg font-normal font-creato-regular leading-6 tracking-wide'>
                            "DrLambda drafts my 50-page report beautifully. Saves so much time!"
                        </div>
                    </div>
                </div>
                <div className='w-auto lg:w-[20rem] bg-gray-200 rounded-3xl flex flex-col px-4 py-4 mx-1'>
                    <div className='w-auto lg:w-[15rem] opacity-95 text-neutral-800 text-xl lg:text-2xl font-bold font-creato-bold leading-8 tracking-wide'>
                        Self Learning
                    </div>
                    <div className='w-auto lg:w-[18rem] pt-2 text-gray-700 text-md lg:text-xl font-normal font-creato-regular leading-8 tracking-wide'>
                        Nurture your passion into digestible knowledge. Curiosity is all you
                        need to start.
                    </div>
                    <div className='w-full pt-2 pb-4 rounded-md self-center'>
                        <img
                            src='/new_landing/imgs/self-learning.png'
                            alt='Self Learning Image'
                            className='object-contain w-full h-[15rem]'
                        />
                    </div>
                    <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-4 gap-4'>
                        <img
                            className='w-10 h-10 lg:w-12 lg:h-12 rounded-full border'
                            src='new_landing/imgs/person3.png'
                        />
                        <div className='w-auto text-slate-500 text-xs lg:text-lg font-normal font-creato-regular leading-6 tracking-wide'>
                            “I use it to turn Youtube videos into a my personal pocket book!
                            It’s pure magic!"
                        </div>
                    </div>
                </div>
                <div className='w-auto lg:w-[20rem] bg-gray-200 rounded-3xl flex flex-col px-4 py-4 mx-1'>
                    <div className='w-auto lg:w-[15rem] opacity-95 text-neutral-800 text-xl lg:text-2xl font-bold font-creato-bold leading-8 tracking-wide'>
                        Lecture Design
                    </div>
                    <div className='w-auto lg:w-[18rem] pt-2 text-gray-700 text-md lg:text-xl font-normal font-creato-regular leading-8 tracking-wide'>
                        Illuminate minds with brilliant materials. Engage with every slide,
                        script and session.
                    </div>
                    <div className='w-full py-2 rounded-md self-center'>
                        <img
                            src='/new_landing/imgs/lecture-design.png'
                            alt='Lecture Design Image'
                            className='object-contain w-full h-[15rem]'
                        />
                    </div>
                    <div className='flex items-stretch justify-between border-t-2 border-gray-300 pt-4 gap-4'>
                        <img
                            className='w-10 h-10 lg:w-12 lg:h-12 rounded-full border'
                            src='new_landing/imgs/person4.png'
                        />
                        <div className='w-auto text-slate-500 text-xs lg:text-lg font-normal font-creato-regular leading-6 tracking-wide'>
                            "DrLambda helps me prepare math lecture decks with more engaging
                            strategies and depth.”
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FeatureCards
