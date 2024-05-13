import Folder from '@/models/Folder';
import Project from '@/models/Project';

export function groupProjectsByFolder(
	projects: Project[],
	empty_folders: string[],
	groupBy: 'project_group_id' | 'project_group_name' = 'project_group_name',
): Folder[] {
	const folderMap: { [key: string]: Project[] } = projects.reduce(
		(acc: { [key: string]: Project[] }, project: Project) => {
			let key = project[groupBy] || 'drlambda-default';

			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(project);

			return acc;
		},
		{},
	);

	// Include empty folders in the map
	Array.from(empty_folders).forEach((folderName) => {
		if (!folderMap[folderName]) {
			folderMap[folderName] = [];
		}
	});

	// Sort the folder names and create an array of Folder objects
	const sortedFolders: Folder[] = Object.keys(folderMap)
		.sort()
		.map((key) => ({
			folderName: key,
			projects: folderMap[key],
		}));

	return sortedFolders;
}
