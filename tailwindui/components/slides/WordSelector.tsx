import { removeTags } from '@/hooks/use-slides';
import { remove } from 'lodash';
import { useState } from 'react';

type WordSelectorProps = {
	text: string;
	setQuery: (query: string) => void;
};

function textIsChineseJapaneseOrKorean(text: string): boolean {
	return text.match(/[\u3400-\u9FBF]/) !== null;
}

export const WordSelector: React.FC<WordSelectorProps> = ({
	text,
	setQuery,
}) => {
	if (!text) return null;
	// text = removeTags(text) as string;
	let words = text.split(' ');
	// dedup
	words = words.filter((word, index) => words.indexOf(word) === index);
	// remove lowercase words with less than 3 characters
	words = words.filter((word) => word.length > 3);
	// remove ',' and '.' from words
	words = words.map((word) => word.replace(/[,\.]/g, ''));

	if (textIsChineseJapaneseOrKorean(text)) words = text.split('');

	if (words.length == 0) return null;

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
					className={`cursor-pointer border border-1 mx-1 rounded border-gray-200 ${
						selectedWords.includes(word) ? 'bg-blue-500 text-white' : ''
					}`}
				>
					{word}
				</div>
			))}
		</div>
	);
};
