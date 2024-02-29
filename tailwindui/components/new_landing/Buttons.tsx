import Link from "next/link"


export const DiscordButton: React.FC = () => {
  return (
    <Link href='https://discord.gg/B6PRtqsT'>
      <div className='bg-white rounded-xl border border-indigo-500 flex items-center w-[250px] h-[54px]'>
        <img
          className='w-8 h-6 ml-4'
          src='new_landing/imgs/discord-icon.png'
          alt='Discord icon'
        />

        <div className='ml-4 flex flex-col h-[54px] py-[5px]'>
          <div className='w-auto text-indigo-500 h-5 text-xs font-extrabold font-creato-medium tracking-tight'>
            DISCORD
          </div>
          <div className='w-auto text-indigo-500 h-6 text-sm font-bold font-creato-medium tracking-tight'>
            Join our community
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ProductHuntButton: React.FC = () => {
  return (
    <a
      href='https://www.producthunt.com/posts/drlambda-social?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-drlambda&#0045;social'
      target='_blank'
    >
      <img
        src='https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=427030&theme=light&period=weekly&topic_id=44'
        alt='DrLambda&#0045;Social - AI&#0032;content&#0032;generator&#0032;for&#0032;social&#0032;media | Product Hunt'
        width='250'
        height='54'
      />
    </a>
  )
}