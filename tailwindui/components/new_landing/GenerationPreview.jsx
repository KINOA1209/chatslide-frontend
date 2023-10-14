import { DownloadIcon } from '@/components/new_landing/Icons'

const GenerationPreview = () => {
  return (
    <>
      <div className='w-[85%] mx-auto max-w-7xl relative bg-indigo-500 rounded-3xl hidden lg:block'>
        <div className='flex flex-col gap-[1.5rem] justify-center items-center px-[3.5rem] py-[3rem]'>
          <div className='self-center lg:self-end w-auto h-9 px-3.5 py-1 bg-zinc-100 rounded-lg justify-center items-center gap-3 inline-flex'>
            <div className='text-center text-gray-700 text-sm lg:text-base font-medium font-creato-medium leading-relaxed tracking-wide'>
              Export to PDF
            </div>
            <div className='w-4 h-4 relative'>
              <DownloadIcon />
            </div>
          </div>
          {/* grid two columns */}
          <div className='grid grid-cols-3 gap-4 h-[30rem] '>
            <div className='col-span-3 lg:col-span-2 bg-zinc-100 rounded-lg px-6 py-4 h-[15rem] lg:h-[30rem] overflow-auto'>
              <div className='flex flex-col '>
                <div className='flex justify-between items-center'>
                  <div className='w-96 text-blue-700 text-base font-bold font-creato-bold leading-snug tracking-wide'>
                    03 - Ideal Growing Conditions
                  </div>
                  <div className='origin-top-left rotate-180 w-16 h-2 relative'>
                    <div className='w-2 h-2 left-0 top-0 absolute origin-top-left rotate-180 bg-gray-200 rounded-full' />
                    <div className='w-2 h-2 left-[-11.32px] top-0 absolute origin-top-left rotate-180 bg-blue-700 rounded-full' />
                    <div className='w-2 h-2 left-[-22.65px] top-0 absolute origin-top-left rotate-180 bg-gray-200 rounded-full' />
                    <div className='w-2 h-2 left-[-33.97px] top-0 absolute origin-top-left rotate-180 bg-gray-200 rounded-full' />
                    <div className='w-2 h-2 left-[-45.30px] top-0 absolute origin-top-left rotate-180 bg-gray-200 rounded-full' />
                    <div className='w-2 h-2 left-[-56.62px] top-0 absolute origin-top-left rotate-180 bg-gray-200 rounded-full' />
                  </div>
                </div>
                <div className='text-lg font-normal font-creato-medium leading-loose tracking-wide'>
                  Temperature, Humidity & Lighting
                </div>
                <div className='grid grid-cols-2 gap-4 border-t-2 py-2'>
                  {/* Temperature humidity text */}
                  <div className='w-full rounded inline-flex'>
                    <div>
                      <span className='text-gray-700 text-sm font-bold font-creato-bold leading-tight tracking-tight'>
                        Temperature & Humidity Level <br />
                      </span>
                      {/* humidity list items */}
                      <ul className='list-disc px-6 w-[90%] text-left'>
                        <li>
                          <span className="text-gray-700 text-sm font-normal font-['Creato Display'] leading-tight tracking-tight">
                            Anthuriums thrive in temperatures between{' '}
                          </span>
                          <span className="text-neutral-800 text-sm font-medium font-['Creato Display'] leading-tight tracking-tight">
                            70-90°F (21-32°C)
                          </span>
                          <span className="text-gray-700 text-sm font-normal font-['Creato Display'] leading-tight tracking-tight">
                            . They prefer warm and humid environments, so it's
                            important to maintain a consistent temperature
                            within this range.
                            <br />
                          </span>
                        </li>
                        <span className="text-gray-700 text-sm font-normal font-['Creato Display'] leading-tight tracking-tight">
                          <br />
                        </span>
                        <li>
                          <span className="text-gray-700 text-sm font-normal font-['Creato Display'] leading-tight tracking-tight">
                            To provide the ideal humidity levels, you can place
                            a tray filled with water near the Anthuriums or use
                            a humidifier. Aim for humidity levels around{' '}
                          </span>
                          <span className="text-neutral-800 text-sm font-medium font-['Creato Display'] leading-tight tracking-tight">
                            60-80%
                          </span>
                          <span className="text-gray-700 text-sm font-normal font-['Creato Display'] leading-tight tracking-tight">
                            {' '}
                            to mimic their natural tropical habitat.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <img
                      className='rounded object-cover w-[22rem] h-[22rem]'
                      src='/new_landing/imgs/flowerimage.png'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-3 lg:col-span-1 bg-zinc-100 rounded-lg px-6 py-4 overflow-scroll'>
              <div className="w-16 h-8 text-neutral-900 text-xs font-bold font-['Creato Display'] leading-normal tracking-tight">
                Script
              </div>
              <div className='flex flex-col border-t-2'>
                <div className='p-2 rounded-md flex-col justify-start items-end gap-2 inline-flex'>
                  <div className='w-full text-gray-700 text-xs font-normal font-creato-regular leading-4 tracking-[0.01256rem]'>
                    “ Welcome to 'Tropical Plants 101.' From the luscious
                    rainforests to the coastal shores of the tropics, today,
                    we're diving deep into the world of tropical plants."
                  </div>
                </div>
                <div className='w-full p-2 bg-indigo-100 rounded-md flex-col justify-start items-end gap-2 inline-flex'>
                  <div className='w-full leading-4'>
                    <span className='text-blue-700 text-xs font-medium font-creato-regular tracking-[0.01256rem]'>
                      “ But first, what exactly are tropical plants? By
                      definition, tropical plants hail from the world's tropical
                      regions, areas that experience warm temperatures
                      year-round. These regions are typically located between
                      the Tropic of Cancer and the Tropic of Capricorn. Being
                      adapted to such climates, these plants thrive in high
                      humidity, warm temperatures, and often flourish under the
                      canopy of larger trees, protected from direct sunlight.
                      You might wonder, why bring the tropics to your living
                      room? Well, tropical plants don't just elevate the
                      aesthetics of your space; they come with a plethora of
                      benefits. <br />
                    </span>
                    <span className='text-blue-700 text-xs font-medium font-creato-regular leading-4 tracking-[0.01256rem]'>
                      "Firstly, they act as natural air purifiers, filtering out
                      pollutants and releasing fresh oxygen."
                      <br />
                      "Secondly, their presence has been linked to reduced
                      stress levels, improved mood, and increased productivity."
                      <br />
                      "Lastly, their vibrant greenery and unique designs can
                      transform any room into a verdant paradise, a visual treat
                      to the eyes."
                    </span>
                  </div>
                </div>
              </div>
              <div className='w-full h-52 p-2 rounded-md flex-col justify-start items-end gap-2 inline-flex'>
                <div className="w-full text-gray-700 text-xs font-normal font-['Creato Display'] tracking-[0.01256rem] leading-4">
                  “ Tropical plants also have some amazing health benefits. They
                  purify the air by removing toxins and releasing oxygen,
                  creating a healthier indoor environment for you and your loved
                  ones. Plus, they can boost your mood and reduce stress levels.
                  Who wouldn't want that?
                  <br />
                  <br />
                  Now, let's talk about the purpose of this tutorial. Our goal
                  here is to equip you with the knowledge and skills to
                  successfully raise tropical plants. We want to empower you to
                  create a thriving tropical paradise in your own home, where
                  these plants can flourish and bring joy to your life.
                  <br />
                  <br />
                  So, get ready to embark on this tropical plant journey with
                  us. Let's dive into the fascinating world of tropical plants
                  and discover how to create the perfect environment for their
                  growth. “
                </div>
              </div>
            </div>
          </div>
          <div className='w-[6rem] h-8 px-5 py-1 bg-indigo-400 rounded-full justify-center items-center gap-2.5 inline-flex'>
            <div className='text-center'>
              <span className='text-zinc-100 text-sm font-bold font-creato-regular leading-snug tracking-wide'>
                6{' '}
              </span>
              <span className='text-zinc-100 text-sm font-normal font-creato-regular leading-snug tracking-wide'>
                of
              </span>
              <span className='text-zinc-100 text-sm font-bold font-creato-regular leading-snug tracking-wide'>
                {' '}
                24
              </span>
            </div>
          </div>
        </div>
        {/* add grey color gradient */}
        <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-neutral-50'></div>
      </div>
    </>
  )
}

export default GenerationPreview
