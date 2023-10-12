// import React from 'react'

const Footer = () => {
  return (
    <div className='nav-bar w-full flex justify-between items-center p-6 border-t-2 mt-4'>
      <div className='w-auto h-12 text-neutral-900 text-base font-normal capitalize leading-normal tracking-wide'>
        © drlambda.ai. All rights reserved. <br /> Created with 💙 from San
        Francisco.
      </div>
      <div className='footer-links flex gap-[5rem] justify-center'>
        <div className="w-auto text-center text-neutral-900 text-sm font-medium font-['Creato Display'] capitalize leading-10 tracking-wide">
          Company
        </div>
        <div className="w-auto text-center text-neutral-900 text-sm font-medium font-['Creato Display'] capitalize leading-10 tracking-wide">
          Career
        </div>
        <div className="w-auto text-center text-neutral-900 text-sm font-medium font-['Creato Display'] capitalize leading-10 tracking-wide">
          About Us
        </div>
        <div className="w-auto text-center text-neutral-900 text-sm font-medium font-['Creato Display'] capitalize leading-10 tracking-wide">
          Privacy Policy
        </div>
      </div>
      <div className='social-links flex gap-3 justify-center'>
        <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
          <img className='w-7 h-7' src='src/assets/imgs/instagram-icon.png' />
        </div>
        <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
          <img className='w-7 h-7' src='src/assets/imgs/twitter-icon.png' />
        </div>
        <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
          <img className='w-7 h-7' src='src/assets/imgs/linkedin-icon.png' />
        </div>
        <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
          <img className='w-7 h-7' src='src/assets/imgs/youtube-icon.png' />
        </div>
      </div>
    </div>
  )
}

export default Footer
