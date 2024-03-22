import { DropDown } from "@/components/button/DrlambdaButton";
import { ExplanationPopup, Instruction } from "@/components/ui/Text";
import LANGUAGES from "./languageData";

const LanguageSelector: React.FC<{
	language?: string;
	setLanguage: (language: string) => void;
	text?: string;
	showExplanation?: boolean;
}> = (
	{
		language = 'English',
		setLanguage,
		text = 'Language',
		showExplanation = false
	}
) => {
		return (
			<div className='flex flex-col'>
				<div className='flex flex-row gap-1 items-center'>
					<Instruction>{text}</Instruction>
					{showExplanation &&
						<ExplanationPopup>
							Specify the intended language of your projects.
						</ExplanationPopup>}
				</div>
				<DropDown
					onChange={(e) => setLanguage(e.target.value)}
					style='input'
					width='80%'
					value={language}
				>
					{LANGUAGES.map((lang) => (
						<option key={lang.englishName} value={lang.englishName}>{lang.displayName}</option>
					))}
				</DropDown>
			</div>
		)
	};

export default LanguageSelector;