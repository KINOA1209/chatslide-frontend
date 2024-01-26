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

export const SurveyBackIcons = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path d="M17.2612 8.56036C17.2612 8.23415 17.1316 7.92128 16.901 7.69061C16.6703 7.45994 16.3574 7.33035 16.0312 7.33035H4.16121L9.39119 2.10036C9.62193 1.86962 9.75154 1.55668 9.75154 1.23036C9.75154 0.904049 9.62193 0.591105 9.39119 0.360367C9.16045 0.129628 8.8475 0 8.52119 0C8.19488 0 7.88193 0.129628 7.6512 0.360367L0.361219 7.65036C0.240379 7.77013 0.145934 7.91386 0.0839358 8.0723C0.0219376 8.23074 -0.00628919 8.40038 0.00117216 8.57036C-0.00331505 8.7355 0.0263839 8.89979 0.0883304 9.05293C0.150277 9.20608 0.243183 9.34478 0.361219 9.46036L7.6512 16.7504C7.76545 16.8646 7.90109 16.9552 8.05037 17.0171C8.19964 17.0789 8.35962 17.1107 8.52119 17.1107C8.68277 17.1107 8.84274 17.0789 8.99202 17.0171C9.14129 16.9552 9.27694 16.8646 9.39119 16.7504C9.50544 16.6361 9.59608 16.5005 9.65791 16.3512C9.71974 16.2019 9.75154 16.0419 9.75154 15.8804C9.75154 15.7188 9.71974 15.5588 9.65791 15.4095C9.59608 15.2602 9.50544 15.1246 9.39119 15.0104L4.16121 9.78036H16.0312C16.3557 9.78038 16.667 9.65216 16.8974 9.42365C17.1278 9.19513 17.2585 8.88484 17.2612 8.56036Z" fill="#2943E9"/>
	</svg>
)