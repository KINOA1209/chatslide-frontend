import { isChatslide } from '@/utils/getHost';
import {
	FaLaptop,
	FaBook,
	FaFilm,
	FaMoneyBillWave,
	FaComments,
	FaHospital,
	FaBolt,
	FaShoppingCart,
	FaChartLine,
	FaPray,
	FaStore,
	FaRedditAlien,
	FaUserFriends,
	FaEnvelope,
	FaFacebook,
	FaTiktok,
	FaTwitter,
	FaInstagram,
	FaTelegram,
	FaGraduationCap,
	FaChalkboardTeacher,
	FaBusinessTime,
	FaMicroscope,
	FaMicrophone,
	FaFileAlt,
	FaBookOpen,
  FaGoogle,
  FaProductHunt,
} from 'react-icons/fa';

type SurveySectionConfig = {
	question: string;
	itemsArr: string[];
};

const surveyObject: Record<string, SurveySectionConfig> = {
	industry: {
		question: 'What industry do you work for?',
		itemsArr: [
			'Tech',
			'Education',
			'Media',
			'Finance',
			'Consulting',
			'Healthcare',
			'Energy / Environment',
			'Commerce',
			'Marketing',
			'Religion',
			'Other',
		],
	},

	referral: {
		question: 'Where did you find us?',
		itemsArr: [
			'Google',
			'Reddit',
			isChatslide() ? 'DealMirror' : 'AppSumo',
      'Blog',
			'ProductHunt',
			'Friend',
			'Newsletter',
			'Facebook',
			'TikTok',
			'X (Twitter)',
			'Instagram',
			'Telegram',
			'Other',
		],
	},

	purpose: {
		question: "What's the purpose of your output?",
		itemsArr: [
			'Teaching',
			'Learning',
			'Coaching',
			'Business',
			'Marketing',
			'Research',
			'Conference',
			'Proposal',
			'Storytelling',
			'Preaching',
			'Other',
		],
	},
};

function itemToIcon(item: string) {
	const iconMap: { [key: string]: React.ElementType } = {
		Tech: FaLaptop,
		Education: FaGraduationCap,
		Media: FaFilm,
		Finance: FaMoneyBillWave,
		Consulting: FaComments,
		Healthcare: FaHospital,
		'Energy / Environment': FaBolt,
		Commerce: FaShoppingCart,
		Marketing: FaChartLine,
		Religion: FaPray,
		Other: FaComments,
		Google: FaGoogle,
		AppSumo: FaStore,
    DealMirror: FaStore,
		Reddit: FaRedditAlien,
		ProductHunt: FaProductHunt,
		Friend: FaUserFriends,
		Newsletter: FaEnvelope,
		Facebook: FaFacebook,
		TikTok: FaTiktok,
		'X (Twitter)': FaTwitter,
		Instagram: FaInstagram,
		Telegram: FaTelegram,
		Teaching: FaChalkboardTeacher,
		Learning: FaBook,
		Coaching: FaBusinessTime,
		Business: FaMoneyBillWave,
		Research: FaMicroscope,
		Conference: FaMicrophone,
		Proposal: FaFileAlt,
		Storytelling: FaBookOpen,
		Preaching: FaPray,
	};

	const IconComponent = iconMap[item] || FaComments;

	return <IconComponent className='text-gray-600'/>;
}

export default surveyObject;

export { itemToIcon };
