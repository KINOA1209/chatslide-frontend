import {
  FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaTiktok,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';
import { BlackLogo, ColorLogo } from './logo';

const socialMediaBlock = (
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
					<FaInstagram />
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
				<div className='w-8 h-8 fill-current flex items-center justify-center'>
					<FaLinkedin />
				</div>
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
				<div className='w-8 h-8 fill-current flex items-center justify-center'>
          𝕏
				</div>
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
				<div className='w-8 h-8 fill-current flex items-center justify-center'>
					<FaYoutube />
				</div>
			</a>
		</li>
		{/* tiktok */}
		<li className='ml-4'>
			<a
				href='https://www.tiktok.com/@drlambda_ai'
				target='_blank'
				className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
				aria-label='Facebook'
			>
				<div className='w-8 h-8 fill-current flex items-center justify-center'>
					<FaTiktok />
				</div>
			</a>
		</li>
    {/* facebook */}
    <li className='ml-4'>
      <a
        href='https://www.facebook.com/profile.php?id=61556624723234'
        target='_blank'
        className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
        aria-label='Facebook'
      >
        <div className='w-8 h-8 fill-current flex items-center justify-center'>
          <FaFacebook />
        </div>
      </a>
    </li>
	</ul>

);

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

					<div className=''>
						<h6 className='text-gray-800 font-medium mb-2'>Product</h6>
						<ul className='text-sm'>
							<li className='mb-2'>
								<a
									href='/privacy'
									className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
								>
									Privacy Policy
								</a>
							</li>
							<li className='mb-2'>
								<a
									href='/terms'
									className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
								>
									Terms and Services
								</a>
							</li>
						</ul>
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
							<li className='mb-2'>
								<a
									href='/affiliate'
									className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
								>
									Affliate Program
								</a>
							</li>
							<li className='mb-2'>
								<a
									href='/about_us'
									className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
								>
									About us
								</a>
							</li>

							{/* <li className="mb-2">
                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Pricing</a>
              </li> */}
						</ul>
					</div>
				</div>

				{/* Bottom area */}
				<div className='md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200'>
					{/* Social as */}
					{socialMediaBlock}

					{/* Copyrights note */}
					<div className='text-sm text-gray-600 mr-4 text-center md:text-left'>
						&copy; drlambda.ai. All rights reserved.
						<br></br>
						Created with 💙 from San Francisco.
					</div>
				</div>
			</div>
		</footer>
	);
}

export function WorkflowFooter() {
	return (
		<footer>
			<div className='w-full border-t border-gray-200 bg-[#F4F4F4]'>
				{/* Bottom area */}
				<div className='max-w-6xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-2 py-4 md:py-8'>
					{/* Social as */}
					{socialMediaBlock}

					{/* Copyrights note */}
					<div className='flex flex-col justify-center md:justify-start text-sm text-gray-600 mb-2 md:mb-0'>
						<span>&copy; drlambda.ai. All rights reserved.</span>
						<span>
							Some images designed by{' '}
							<a href='https://www.freepik.com'>Freepik</a>.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
