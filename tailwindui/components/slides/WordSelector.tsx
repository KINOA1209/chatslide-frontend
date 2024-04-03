import { removeTags } from "@/hooks/use-slides";
import { remove } from "lodash";
import { useState } from "react";

type WordSelectorProps = {
	text: string;
	setQuery: (query: string) => void;
};

export const WordSelector: React.FC<WordSelectorProps> = ({ text, setQuery }) => {
	if (!text) return null;
	text = removeTags(text) as string;
	let words = text.split(' ');
	if (!text.includes(' ')) // split by character if there is no space
	  words = text.split('');
	const [selectedWords, setSelectedWords] = useState<string[]>([]);

	const toggleWordSelection = (word: string) => {
		const index = selectedWords.indexOf(word);
		let newSelectedWords = [...selectedWords];

		if (index >= 0) {
			// Word is already selected, remove it
			newSelectedWords.splice(index, 1);
		} else {
			// Word is not selected, add it
			newSelectedWords.push(word);
		}

		setSelectedWords(newSelectedWords);
		setQuery(newSelectedWords.join(' '));
	};

	return (
		<div className='flex flex-wrap gap-1 my-1'>
			{words.map((word, index) => (
				<div
					key={`word-${index}-${word}`}
					onClick={() => toggleWordSelection(word)}
					className={`cursor-pointer border border-1 mx-1 rounded border-gray-200 ${selectedWords.includes(word) ? 'bg-blue-500 text-white' : ''
						}`}
				>
					{word}
				</div>
			))}
		</div>
	);
};