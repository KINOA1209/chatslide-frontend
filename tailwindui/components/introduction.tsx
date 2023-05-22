import Image from 'next/image'
import logo from '@/public/images/Lambda_L-01.4.png'
import background from '@/public/images/11062b_dbd82904e3e447898acbf7c3632ee55b~mv2.jpg'

export default function Introduction() {
  return (
    <section className="relative">

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none -z-1" aria-hidden="true">
            <Image
              className="max-w-none mx-auto rounded"
              src={background}
              layout="fixed"
              objectFit="fill"
              alt="Features bg"
            />
        </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Introduction content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Dr. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Lambda</span></h1>
              <p className="text-2xl text-black-600 mb-8 font-bold" data-aos="zoom-y-out" data-aos-delay="150">AI copilot for educators</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="/workflow-intro">Start free trial</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#more">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}