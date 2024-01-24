export const NewStepIcon = () => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<circle cx='8' cy='8' r='7.5' fill='#E7E9EB' stroke='#A6B1BB' />
	</svg>
);

export const CurrentStepIcon = () => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<circle cx='8' cy='8' r='7' stroke='#039A00' strokeWidth='2' />
		<circle cx='8' cy='8' r='3.5' fill='#039A00' stroke='#039A00' />
	</svg>
);

export const FinishedStepIcon = () => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<circle cx='8' cy='8' r='8' fill='#039A00' />
		<path d='M3.5 8L6.5 11L12.5 5' stroke='#F4F4F4' strokeWidth='2' />
	</svg>
);

export const CurrentStepCircle = () => (
	<svg
		aria-hidden="true"
		className="w-5 h-5"
		viewBox="0 0 100 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="50"
			cy="50"
			r="35"
			stroke="white"
			strokeWidth="15"
			fill="none"
		/>
	</svg>
)

export const FinishedStepCircle = () => (
	<svg
        aria-hidden="true"
        className="w-3 h-3"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="50"
            cy="50"
            r="35"
            fill="white"
        />
    </svg>
)

export const ConnectedLine = () => (
    <svg
        aria-hidden="true"
        className="flex-grow h-1"
        viewBox="0 0 220 10" 
		preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line
            x1="0"
            y1="5"
            x2="250"
            y2="5"
            stroke="white"
            strokeWidth="7"
        />
    </svg>
);