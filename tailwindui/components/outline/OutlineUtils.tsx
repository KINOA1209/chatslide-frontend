export const convertOutlineToPlainText = (outlines: Outlines): string => {
	return outlines
		.map((outline, index) => {
			const titleWithIndex = `${index + 1}. ${outline.title}`;
			const contentWithIndent = outline.content
				.map((line) => `\t${line}`)
				.join('\n');

			return `${titleWithIndex}\n${contentWithIndent}`;
		})
		.join('\n\n');
}

export const convertPlainTextToOutlines = async (
	token: string,
	text: string,
	language: string,
	model_name: string,
) => {
	try {
		const response = await fetch('/api/text_to_outline', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				text: text,
				language: language,
				model_name: model_name,
			})
		})
		if (!response.ok) {
			throw new Error(`Error, status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching outlines:', error);
		throw error;
	}
}