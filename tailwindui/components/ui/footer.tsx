import { BlackLogo, ColorLogo } from './logo'
import { useEffect, useRef } from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        {/* Top area: Blocks */}
        <div className='flex flex-row py-8 md:py-12 border-t border-gray-200 justify-around'>
          {/* 1st block */}
          <div className='flex flex-col items-center justify-center'>
            <div className='flex justify-center mb-2'>
              <ColorLogo />
            </div>
            <div className='flex justify-center mb-2 text-sm text-gray-600'>
              DrLambda
              {/* <a
                href="/terms"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Terms
              </a> */}
            </div>
          </div>

          {/* 4th block */}
          <div className=''>
            <h6 className='text-gray-800 font-medium mb-2'>Company</h6>
            <ul className='text-sm'>
              <li className='mb-2'>
                <a
                  href='/career'
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                >
                  Career
                </a>
              </li>
              {/* <li className="mb-2">
                <a href="/about_us" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About us</a>
              </li> */}
              {/* <li className="mb-2">
                <a href="/terms" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Terms and Services</a>
              </li> */}
              {/* <li className="mb-2">
                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Pricing</a>
              </li> */}
              <li className='mb-2'>
                <a
                  href='/privacy'
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest news and articles to your inbox every month.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm"
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-blue-600 mx-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                  Success message
                  <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p>
                </div>
              </div>
            </form>
          </div> */}
        </div>

        {/* Bottom area */}
        <div className='md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200'>
          {/* Social as */}
          <ul className='flex mb-4 md:order-1 md:ml-4 md:mb-0 justify-center'>
            {/* Instagram */}
            <li>
              <a
                href='https://www.instagram.com/drlambda_ai/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Instagram'
              >
                <div className='w-8 h-8 fill-current flex items-center justify-center'>
                  <svg
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path
                        fillRule='nonzero'
                        d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
                      />
                    </g>
                  </svg>
                </div>
              </a>
            </li>
            {/* Linkedin */}
            <li className='ml-4'>
              <a
                href='https://www.linkedin.com/company/drlambda/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Linkedin'
              >
                <svg
                  className='w-8 h-8 fill-current pb-1'
                  fill='#000000'
                  width='800px'
                  height='800px'
                  viewBox='-3.5 0 19 19'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3.335 6.498a1.152 1.152 0 0 1-1.248 1.148h-.015a1.15 1.15 0 1 1 .03-2.295 1.147 1.147 0 0 1 1.233 1.147zM.982 8.553h2.206v6.637H.982zm10.165 2.83v3.807H8.941v-3.55c0-.893-.319-1.502-1.12-1.502a1.21 1.21 0 0 0-1.13.807 1.516 1.516 0 0 0-.073.538v3.708H4.41s.03-6.017 0-6.639h2.21v.94l-.016.023h.015V9.49a2.19 2.19 0 0 1 1.989-1.095c1.451 0 2.54.949 2.54 2.988z' />
                </svg>
              </a>
            </li>
            {/* twitter */}
            <li className='ml-4'>
              <a
                href='https://twitter.com/drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Twitter'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z' />
                </svg>
              </a>
            </li>
            {/* youtube */}
            <li className='ml-4'>
              <a
                href='https://www.youtube.com/@drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Facebook'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M29.5,11.3c-0.32-1.54-1.54-2.75-3.08-3.08C20.75,7.2,16,7.2,16,7.2s-4.75,0-10.42,1.02c-1.54,0.33-2.75,1.54-3.08,3.08 C2.2,14.25,2.2,16,2.2,16s0,1.75,0.3,3.7c0.33,1.54,1.54,2.75,3.08,3.08C11.25,23.8,16,23.8,16,23.8s4.75,0,10.42-1.02 c1.54-0.33,2.75-1.54,3.08-3.08c0.3-1.95,0.3-3.7,0.3-3.7S29.8,12.85,29.5,11.3z M13.5,18.15V11.85L21.35,16L13.5,18.15z' />
                </svg>
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className='text-sm text-gray-600 mr-4 text-center md:text-left'>
            &copy; drlambda.ai. All rights reserved.
            <br></br>
            Created with 💙 from San Francisco.
          </div>
        </div>
      </div>
    </footer>
  )
}

export function WorkflowFooter() {
  return (
    <footer>
      <div className='w-full border-t border-gray-200 bg-[#F4F4F4]'>
        {/* Bottom area */}
        <div className='max-w-6xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-2 py-4 md:py-8'>
          {/* Social as */}
          <ul className='flex justify-center md:justify-end md:order-1 mb-2 md:mb-0'>
            <li>
              <a
                href='https://www.instagram.com/drlambda_ai/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Instagram'
              >
                <div className='w-8 h-8 fill-current flex items-center justify-center'>
                  <svg
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path
                        fillRule='nonzero'
                        d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
                      />
                    </g>
                  </svg>
                </div>
              </a>
            </li>
            {/* Linkedin */}
            <li className='ml-4'>
              <a
                href='https://www.linkedin.com/company/drlambda/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Linkedin'
              >
                <svg
                  className='w-8 h-8 fill-current pb-1'
                  fill='#000000'
                  width='800px'
                  height='800px'
                  viewBox='-3.5 0 19 19'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3.335 6.498a1.152 1.152 0 0 1-1.248 1.148h-.015a1.15 1.15 0 1 1 .03-2.295 1.147 1.147 0 0 1 1.233 1.147zM.982 8.553h2.206v6.637H.982zm10.165 2.83v3.807H8.941v-3.55c0-.893-.319-1.502-1.12-1.502a1.21 1.21 0 0 0-1.13.807 1.516 1.516 0 0 0-.073.538v3.708H4.41s.03-6.017 0-6.639h2.21v.94l-.016.023h.015V9.49a2.19 2.19 0 0 1 1.989-1.095c1.451 0 2.54.949 2.54 2.988z' />
                </svg>
              </a>
            </li>
            {/* twitter */}
            <li className='ml-4'>
              <a
                href='https://twitter.com/drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Twitter'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z' />
                </svg>
              </a>
            </li>
            {/* youtube */}
            <li className='ml-4'>
              <a
                href='https://www.youtube.com/@drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Facebook'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M29.5,11.3c-0.32-1.54-1.54-2.75-3.08-3.08C20.75,7.2,16,7.2,16,7.2s-4.75,0-10.42,1.02c-1.54,0.33-2.75,1.54-3.08,3.08 C2.2,14.25,2.2,16,2.2,16s0,1.75,0.3,3.7c0.33,1.54,1.54,2.75,3.08,3.08C11.25,23.8,16,23.8,16,23.8s4.75,0,10.42-1.02 c1.54-0.33,2.75-1.54,3.08-3.08c0.3-1.95,0.3-3.7,0.3-3.7S29.8,12.85,29.5,11.3z M13.5,18.15V11.85L21.35,16L13.5,18.15z' />
                </svg>
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className='flex justify-center md:justify-start text-sm text-gray-600 mb-2 md:mb-0'>
            &copy; drlambda.ai. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export function NewWorkflowFooter() {
  return (
    <footer>
      <div className='w-full border-t border-[#F4F4F4]'>
        {/* Bottom area */}
        <div className='max-w-6xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-2 py-4 md:py-8'>
          {/* Social as */}
          <ul className='flex justify-center md:justify-end md:order-1 mb-2 md:mb-0'>
            <li>
              <a
                href='https://www.instagram.com/drlambda_ai/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Instagram'
              >
                <div className='w-8 h-8 fill-current flex items-center justify-center'>
                  <svg
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path
                        fillRule='nonzero'
                        d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
                      />
                    </g>
                  </svg>
                </div>
              </a>
            </li>
            {/* Linkedin */}
            <li className='ml-4'>
              <a
                href='https://www.linkedin.com/company/drlambda/'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Linkedin'
              >
                <svg
                  className='w-8 h-8 fill-current pb-1'
                  fill='#000000'
                  width='800px'
                  height='800px'
                  viewBox='-3.5 0 19 19'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3.335 6.498a1.152 1.152 0 0 1-1.248 1.148h-.015a1.15 1.15 0 1 1 .03-2.295 1.147 1.147 0 0 1 1.233 1.147zM.982 8.553h2.206v6.637H.982zm10.165 2.83v3.807H8.941v-3.55c0-.893-.319-1.502-1.12-1.502a1.21 1.21 0 0 0-1.13.807 1.516 1.516 0 0 0-.073.538v3.708H4.41s.03-6.017 0-6.639h2.21v.94l-.016.023h.015V9.49a2.19 2.19 0 0 1 1.989-1.095c1.451 0 2.54.949 2.54 2.988z' />
                </svg>
              </a>
            </li>
            {/* twitter */}
            <li className='ml-4'>
              <a
                href='https://twitter.com/drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Twitter'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z' />
                </svg>
              </a>
            </li>
            {/* youtube */}
            <li className='ml-4'>
              <a
                href='https://www.youtube.com/@drlambda_ai'
                target='_blank'
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Facebook'
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M29.5,11.3c-0.32-1.54-1.54-2.75-3.08-3.08C20.75,7.2,16,7.2,16,7.2s-4.75,0-10.42,1.02c-1.54,0.33-2.75,1.54-3.08,3.08 C2.2,14.25,2.2,16,2.2,16s0,1.75,0.3,3.7c0.33,1.54,1.54,2.75,3.08,3.08C11.25,23.8,16,23.8,16,23.8s4.75,0,10.42-1.02 c1.54-0.33,2.75-1.54,3.08-3.08c0.3-1.95,0.3-3.7,0.3-3.7S29.8,12.85,29.5,11.3z M13.5,18.15V11.85L21.35,16L13.5,18.15z' />
                </svg>
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className='flex justify-center md:justify-start text-sm text-gray-600 mb-2 md:mb-0'>
            &copy; drlambda.ai. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
