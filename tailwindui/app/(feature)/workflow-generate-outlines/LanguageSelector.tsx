import { DropDown } from "@/components/button/DrlambdaButton";
import { ExplanationPopup, Instruction } from "@/components/ui/Text";

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
					<option key='English' value='English'>
						🇺🇸 English (United States)
					</option>
					<option key='British English' value='British English'>
						🇬🇧 English (British)
					</option>
					<option key='Spanish' value='Spanish'>
						🌎 Español (Latinoamérica)
					</option>
					<option key='Continental Spanish' value='Continental Spanish'>
						🇪🇸 Español (España)
					</option>
					<option key='Chinese' value='Chinese'>
						🇨🇳 中文 (简体)
					</option>
					<option key='Traditional Chinese' value='Traditional Chinese'>
						🇹🇼 中文 (繁體)
					</option>
					<option key='French' value='French'>
						🇫🇷 Français
					</option>
					<option key='Russian' value='Russian'>
						🇷🇺 Русский
					</option>
					<option key='Ukrainian' value='Ukrainian'>
						🇺🇦 Українська
					</option>
					<option key='German' value='German'>
						🇩🇪 Deutsch
					</option>
					<option
						key='Brazilian Portuguese'
						value='Brazilian Portuguese'
					>
						🇧🇷 Português (Brasil)
					</option>
					<option
						key='Italian'
						value='Italian'
					>
						🇮🇹 Italiano
					</option>
					<option key='Portuguese' value='Portuguese'>
						🇵🇹 Português
					</option>
					<option key='Hindi' value='Hindi'>
						🇮🇳 हिन्दी
					</option>
					<option key='Japanese' value='Japanese'>
						🇯🇵 日本語
					</option>
					<option key='Korean' value='Korean'>
						🇰🇷 한국어
					</option>
					<option key='Arabic' value='Arabic'>
						🇸🇦 العربية
					</option>
					<option key='Hebrew' value='Hebrew'>
						🇮🇱 עברית
					</option>
					<option key='Dutch' value='Dutch'>
						🇳🇱 Nederlands
					</option>
					<option key='Croatian' value='Croatian'>
						🇭🇷 Hrvatski
					</option>
				</DropDown>
			</div>
		)
	};

export default LanguageSelector;