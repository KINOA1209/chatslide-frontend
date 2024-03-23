
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const TextBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='py-1 px-2 my-1 mx-2 h-[36px] border border-gray-200 flex shrink rounded-lg text-center text-gray-600 whitespace-nowrap hover:border-[#2943E9] overflow-hidden'>
			{children}
		</div>
	)
}

export default function TextSlider({ children }: { children: React.ReactNode }) {
	const settings = {
		dots: false,
		arrows: false,
		draggable: true,
		infinite: true,
		pauseOnHover: true,
		pauseOnFocus: true,
		speed: 200, // Increase this for a slower transition animation (e.g., from 2000ms to 5000ms)
		slidesToShow: 3,
		// rows: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000, // Increase this to lengthen the time each slide is displayed (e.g., from 2000ms to 8000ms)
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},
		]
	};
	return (
		<Slider {...settings}>
			{children}
		</Slider>
	);
}
