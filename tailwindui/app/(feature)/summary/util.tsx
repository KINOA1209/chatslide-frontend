
export const formatName = (name: string, isUrl: boolean = false, maxLength: number) => {
	// remove file extension
	if (!isUrl)
		name = name.replace(/\.[^/.]+$/, '');

	if (name.length > maxLength) {
		return name.slice(0, maxLength - 3) + '...';
	}
	return name;
}
