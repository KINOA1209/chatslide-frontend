export const RightArrowIcon = () => (
    <svg
        width='11'
        height='8'
        viewBox='0 0 11 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M1.30469 3.32438C1.06099 3.32438 0.863437 3.52193 0.863438 3.76563C0.863438 4.00932 1.06099 4.20688 1.30469 4.20687L1.30469 3.32438ZM10.4417 4.07764C10.614 3.90532 10.614 3.62593 10.4417 3.45361L7.6336 0.645516C7.46128 0.473197 7.1819 0.473197 7.00958 0.645516C6.83726 0.817835 6.83726 1.09722 7.00958 1.26954L9.50567 3.76562L7.00958 6.26171C6.83726 6.43403 6.83726 6.71341 7.00958 6.88573C7.1819 7.05805 7.46128 7.05805 7.6336 6.88573L10.4417 4.07764ZM1.30469 4.20687L10.1297 4.20687L10.1297 3.32437L1.30469 3.32438L1.30469 4.20687Z'
            fill='#A6B1BB'
        />
    </svg>
)

export const AddSectionIcon = () => (
    <svg
        width='25'
        height='25'
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <rect
            x='0.609375'
            y='0.585938'
            width='23'
            height='23'
            rx='11.5'
            fill='#FCFCFC'
        />
        <path
            d='M8.29102 12.2441H15.9272'
            stroke='#363E4A'
            strokeWidth='1.2727'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M12.2686 8.26758L12.2686 15.9037'
            stroke='#363E4A'
            strokeWidth='1.2727'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <rect
            x='0.609375'
            y='0.585938'
            width='23'
            height='23'
            rx='11.5'
            stroke='#E7E9EB'
        />
    </svg>
)

export const AddTopicIcon = () => (
    <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <ellipse cx='13.9998' cy='14' rx='13.9998' ry='14' fill='#CAD0D3' />
        <path
            d='M8.75 14H19.2498'
            stroke='#363E4A'
            strokeWidth='1.3'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M14.002 8.75L14.002 19.25'
            stroke='#363E4A'
            strokeWidth='1.3'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

type DeleteIconProps = {
  shadow?: boolean;
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ shadow = false }) => (
    <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <ellipse cx='13.9998' cy='14' rx='13.9998' ry='14' fill={shadow ? '#CAD0D3' : ''}  />
        <g clipPath='url(#clip0_355_1476)'>
            <path
                d='M6.49805 9.625H21.4978M10.873 9.625V9C10.873 8.1712 11.2022 7.37634 11.7883 6.79029C12.3743 6.20424 13.1691 5.875 13.9979 5.875C14.8267 5.875 15.6216 6.20424 16.2076 6.79029C16.7937 7.37634 17.1229 8.1712 17.1229 9V9.625M12.123 12.125V19M15.8729 12.125V19M8.37302 9.625H19.6229V20.875C19.6229 21.2065 19.4912 21.5245 19.2567 21.7589C19.0223 21.9933 18.7044 22.125 18.3729 22.125H9.623C9.29149 22.125 8.97355 21.9933 8.73913 21.7589C8.50471 21.5245 8.37302 21.2065 8.37302 20.875V9.625Z'
                stroke='#363E4A'
                strokeWidth='1.3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </g>
        <defs>
            <clipPath id='clip0_355_1476'>
                <rect
                    width='17.4998'
                    height='17.5'
                    fill='white'
                    transform='translate(5.24805 5.25)'
                />
            </clipPath>
        </defs>
    </svg>
)

export const LeftChangeIcon = () => (
    <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M0.0663965 10.2041L17.0264 17.5241V14.6441L3.2264 8.92406L17.0264 3.20406V0.324061L0.0663965 7.64406V10.2041Z'
            fill='#9AAEF9'
        />
    </svg>
)
export const RightChangeIcon = () => (
    <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M17.9336 10.2041L0.973604 17.5241V14.6441L14.7736 8.92406L0.973604 3.20406V0.324061L17.9336 7.64406V10.2041Z'
            fill='#9AAEF9'
        />
    </svg>
)
export const LeftTurnArrowIcon = () => (
    <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M7.28571 6L3 10.2857L7.28571 14.5714'
            stroke='#363E4A'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M21.5714 18.8566V15.9994C21.5714 14.4839 20.9694 13.0305 19.8978 11.9588C18.8261 10.8872 17.3727 10.2852 15.8571 10.2852H3'
            stroke='#363E4A'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)
export const RightTurnArrowIcon = () => (
    <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M13.9286 5L17.5 8.57143L13.9286 12.1429'
            stroke='#F4F4F4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M2.02381 15.7151V13.3342C2.02381 12.0712 2.52551 10.86 3.41854 9.96699C4.31157 9.07396 5.52278 8.57227 6.78571 8.57227H17.5'
            stroke='#F4F4F4'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)
export const QuestionExplainIcon = () => (
    <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <circle cx='6' cy='6' r='6' fill='#525C6A' />
        <path
            d='M5.90919 9.563C5.53119 9.563 5.31519 9.329 5.31519 9.032C5.31519 8.735 5.53119 8.501 5.90919 8.501C6.28719 8.501 6.49419 8.735 6.49419 9.032C6.49419 9.329 6.28719 9.563 5.90919 9.563ZM6.30519 7.646H5.50419V7.358C5.50419 5.72 7.13319 5.9 7.13319 4.802C7.13319 4.172 6.64719 3.776 5.99919 3.776C5.25219 3.776 4.86519 4.226 4.78419 5.036H3.86619C3.86619 3.758 4.63119 3.002 5.99919 3.002C7.33119 3.002 8.13219 3.758 8.13219 4.802C8.13219 6.242 6.30519 6.188 6.30519 7.358V7.646Z'
            fill='#F4F4F4'
        />
    </svg>
)
export const DownloadIcon = () => (
    <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M2.66602 11.3327V12.666C2.66602 13.0196 2.80649 13.3588 3.05654 13.6088C3.30659 13.8589 3.64573 13.9993 3.99935 13.9993H11.9993C12.353 13.9993 12.6921 13.8589 12.9422 13.6088C13.1922 13.3588 13.3327 13.0196 13.3327 12.666V11.3327M4.66602 7.33268L7.99935 10.666M7.99935 10.666L11.3327 7.33268M7.99935 10.666V2.66602'
            stroke='#121212'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)
export const ScriptsIcon = () => (
    <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M6.875 6.25H8.75M6.875 11.875H13.125M6.875 14.375H10.625'
            stroke='#1D222A'
            strokeWidth='1.25'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M15.625 16.3462C15.625 16.4895 15.5688 16.625 15.4719 16.7235C15.3752 16.8216 15.2462 16.875 15.1136 16.875H4.88636C4.75385 16.875 4.6248 16.8216 4.52814 16.7235C4.43116 16.625 4.375 16.4895 4.375 16.3462V3.65385C4.375 3.51053 4.43116 3.37498 4.52814 3.27651C4.6248 3.17836 4.75385 3.125 4.88636 3.125H10.5682H12.5395C12.725 3.125 12.9009 3.20739 13.0197 3.34988L13.4998 2.94977L13.0197 3.34988L15.1904 5.95478C15.4712 6.29174 15.625 6.71649 15.625 7.15512V16.3462Z'
            stroke='#1D222A'
            strokeWidth='1.25'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M11.875 3.75L11.875 6.25C11.875 6.59518 12.1548 6.875 12.5 6.875H15'
            stroke='#1D222A'
            strokeWidth='1.25'
            strokeLinecap='round'
        />
    </svg>
)

export const PresentationModeIcon = () => (
    <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <g clipPath='url(#clip0_1298_28340)'>
            <path
                d='M26.9724 5.25586L5.02952 5.25586C4.52457 5.25586 4.11523 5.6652 4.11523 6.17015L4.11523 20.7987C4.11523 21.3037 4.52457 21.713 5.02952 21.713L26.9724 21.713C27.4773 21.713 27.8867 21.3037 27.8867 20.7987L27.8867 6.17015C27.8867 5.6652 27.4773 5.25586 26.9724 5.25586Z'
                stroke='#5168F6'
                strokeWidth='2.24'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M14.1728 21.7138L12.3442 26.2853M17.8299 21.7138L19.6585 26.2853M10.5156 26.2853H21.4871M11.4299 14.3996L15.0871 17.1424L21.4871 9.82813'
                stroke='#5168F6'
                strokeWidth='2.24'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </g>
        <defs>
            <clipPath id='clip0_1298_28340'>
                <rect width='32' height='32' fill='white' />
            </clipPath>
        </defs>
    </svg>
)

export const ChangeLayoutIcon = () => (
    <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <g clipPath='url(#clip0_1298_28336)'>
            <path
                d='M4.32117 26.8296L4.32117 5.16806C4.32117 4.69904 4.70138 4.31883 5.1704 4.31883L26.8319 4.31883C27.301 4.31883 27.6812 4.69904 27.6812 5.16806L27.6812 26.8296C27.6812 27.2986 27.301 27.6788 26.8319 27.6788L5.1704 27.6788C4.70139 27.6788 4.32117 27.2986 4.32117 26.8296Z'
                stroke='#5168F6'
                strokeWidth='2.24'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M10.4004 27.1992L10.4004 4.79922M10.4004 11.0761L27.2004 11.0755'
                stroke='#5168F6'
                strokeWidth='2.24'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </g>
        <defs>
            <clipPath id='clip0_1298_28336'>
                <rect width='32' height='32' fill='white' />
            </clipPath>
        </defs>
    </svg>
)

export const AddSlideIcon = () => (
    <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5 16.25L27.5 16.25'
            stroke='#5168F6'
            strokeWidth='2.5'
            strokeLinecap='round'
        />
        <path
            d='M16.25 5L16.25 27.5'
            stroke='#5168F6'
            strokeWidth='2.5'
            strokeLinecap='round'
        />
        <defs>
            <clipPath id='clip0_1298_28336'>
                <rect width='32' height='32' fill='white' />
            </clipPath>
        </defs>
    </svg>
)

export const DeleteSlideIcon = () => (
    <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5 9.53846H27M11.4167 9.53846V8.61538C11.4167 7.39131 11.8996 6.21737 12.7591 5.35181C13.6186 4.48626 14.7844 4 16 4C17.2156 4 18.3814 4.48626 19.2409 5.35181C20.1004 6.21737 20.5833 7.39131 20.5833 8.61538V9.53846M13.25 13.2308V23.3846M18.75 13.2308V23.3846M7.75 9.53846H24.25V26.1538C24.25 26.6435 24.0568 27.1131 23.713 27.4593C23.3692 27.8055 22.9029 28 22.4167 28H9.58333C9.0971 28 8.63079 27.8055 8.28697 27.4593C7.94315 27.1131 7.75 26.6435 7.75 26.1538V9.53846Z'
            stroke='#5168F6'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

export const SpinIcon = () => (
    <svg aria-hidden="true" className="w-6 h-6 text-gray-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
)

export const ThemeIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none"
    >
        <path d="M16 19.332C18.1217 19.332 20.1566 18.4892 21.6569 16.9889C23.1571 15.4886 24 13.4538 24 11.332C24 9.2103 23.1571 7.17547 21.6569 5.67518C20.1566 4.17489 18.1217 3.33203 16 3.33203C13.8783 3.33203 11.8434 4.17489 10.3431 5.67518C8.84286 7.17547 8 9.2103 8 11.332C8 13.4538 8.84286 15.4886 10.3431 16.9889C11.8434 18.4892 13.8783 19.332 16 19.332Z" stroke="#5168F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21.3359 28.6641C22.3865 28.6641 23.4268 28.4571 24.3974 28.0551C25.368 27.6531 26.2499 27.0638 26.9928 26.3209C27.7357 25.578 28.3249 24.6961 28.727 23.7255C29.129 22.7549 29.3359 21.7146 29.3359 20.6641C29.3359 19.6135 29.129 18.5732 28.727 17.6026C28.3249 16.632 27.7357 15.7501 26.9928 15.0072C26.2499 14.2643 25.368 13.6751 24.3974 13.273C23.4268 12.871 22.3865 12.6641 21.3359 12.6641C19.2142 12.6641 17.1794 13.5069 15.6791 15.0072C14.1788 16.5075 13.3359 18.5423 13.3359 20.6641C13.3359 22.7858 14.1788 24.8206 15.6791 26.3209C17.1794 27.8212 19.2142 28.6641 21.3359 28.6641Z" stroke="#5168F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.668 28.6641C11.7185 28.6641 12.7588 28.4571 13.7294 28.0551C14.7 27.6531 15.582 27.0638 16.3248 26.3209C17.0677 25.578 17.657 24.6961 18.059 23.7255C18.461 22.7549 18.668 21.7146 18.668 20.6641C18.668 19.6135 18.461 18.5732 18.059 17.6026C17.657 16.632 17.0677 15.7501 16.3248 15.0072C15.582 14.2643 14.7 13.6751 13.7294 13.273C12.7588 12.871 11.7185 12.6641 10.668 12.6641C8.54624 12.6641 6.51141 13.5069 5.01111 15.0072C3.51082 16.5075 2.66797 18.5423 2.66797 20.6641C2.66797 22.7858 3.51082 24.8206 5.01111 26.3209C6.51141 27.8212 8.54624 28.6641 10.668 28.6641Z" stroke="#5168F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)