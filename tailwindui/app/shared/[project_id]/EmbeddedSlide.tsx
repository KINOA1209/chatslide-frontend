import SlidesHTML from "@/components/slides/SlidesHTML"
import { useSlides } from "@/hooks/use-slides"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const EmbeddedSlide: React.FC<{
	initSlideIndex: number
}> = ({
	initSlideIndex
}) => {
		const [index, setIndex] = useState(initSlideIndex)
		const { slides } = useSlides();

		function changePage(delta: number) {
			if (index + delta >= 0 && index + delta < slides.length) {
				setIndex(index + delta)
			}
		}

		function canClick(delta: number) {
			return index + delta >= 0 && index + delta < slides.length
		}

		return (
			<main className='grow relative'>
				<SlidesHTML
					isViewing={true}
					embed={true}
					initSlideIndex={index}
				/>

				{/* left and right buttons */}
				<div className='absolute right-5 bottom-5 flex flex-row items-center gap-x-2'>
					<button className='flex items-center justify-center rounded-full w-8 h-8 bg-black bg-opacity-20 disabled:opacity-50'
						disabled={!canClick(-1)}
						onClick={() => changePage(-1)}
					>
						<FaChevronLeft />
					</button>
					<button className='flex items-center justify-center rounded-full w-8 h-8 bg-black bg-opacity-20 disabled:opacity-50'
						disabled={!canClick(1)}
						onClick={() => changePage(1)}
					>
						<FaChevronRight />
					</button>
				</div>
			</main>
		)
	}

export default EmbeddedSlide;