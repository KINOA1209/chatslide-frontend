import { getBrand, getLogoUrl } from "@/utils/getHost";

export function Logo() {
	return (
		<a href="/landing" className='block' aria-label='Cruip'>
			<img src={getLogoUrl()} alt={getBrand()} className='w-16 h-16' />
		</a>
	);
}

export function Home() {
	return (
		<a href="/landing" className='block' aria-label='Cruip'>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-[1.5rem] h-[1.5rem]'
			>
				<path
					d='M1.33325 5.33336L7.82125 2.08936C7.87674 2.06166 7.9379 2.04724 7.99992 2.04724C8.06193 2.04724 8.1231 2.06166 8.17858 2.08936L14.6666 5.33336M13.3333 7.33336V12.6667C13.3333 13.0203 13.1928 13.3595 12.9427 13.6095C12.6927 13.8596 12.3535 14 11.9999 14H3.99992C3.6463 14 3.30716 13.8596 3.05711 13.6095C2.80706 13.3595 2.66659 13.0203 2.66659 12.6667V7.33336'
					stroke='white'
					strokeWidth='1.25'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</a>
	);
}
