import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Project from '@/models/Project';
import Resource from '@/models/Resource';
import ProjectService from '@/services/ProjectService';
import { useUser } from './use-user';
import { produce } from 'immer';

const useProjectBear = createBearStore<Project | null>()('project', null, true);
const useResourcesBear = createBearStore<Resource[]>()('resources', [], true);
const useSelectedResourcesBear = createBearStore<Resource[]>()(
	'selectedResources',
	[],
	true,
);
const useIsGpt35Bear = createBearStore<boolean>()('isGpt35', true, true);
const useIsShared = createBearStore<boolean>()('isShared', false, true);
const useOutlinesBear = createBearStore<Outlines>()('outlines', [], true);
const useVideoIsShared = createBearStore<boolean>()(
	'videoIsShared',
	false,
	true,
);

export enum ProjectStatus {
	NotInited,
	Initing,
	Inited,
}

let projectStatus: ProjectStatus = ProjectStatus.NotInited;

export const useProject = () => {
	const { project, setProject } = useProjectBear();
	const { resources, setResources } = useResourcesBear();
	const { selectedResources, setSelectedResources } =
		useSelectedResourcesBear();
	const { isGpt35, setIsGpt35 } = useIsGpt35Bear();
	const { isShared, setIsShared } = useIsShared();
	const { videoIsShared, setVideoIsShared } = useVideoIsShared();
	const { token } = useUser();
	const { outlines, setOutlines } = useOutlinesBear();

	const init = async () => {
		if (projectStatus !== ProjectStatus.NotInited) return;
		console.log('-- useProject init');
		projectStatus = ProjectStatus.Inited;
	};

	useEffect(() => {
		void init();
	}, []);

	const initProject = async (project: Project) => {
		console.log('-- initProject', project);
		// console.log('inited Project', project);
		setProject(project);
		if (project.outlines)
			setOutlines(Object.values(JSON.parse(project.outlines)) || []);
		projectStatus = ProjectStatus.Inited;
		setIsShared(project.is_shared || false);
	};

	const clearProject = () => {
		console.log('-- clearing project');
		setProject(null);
		setResources([]);
		setSelectedResources([]);
		setIsGpt35(true);
		setIsShared(false);
		setOutlines([]);
	};

	const updateProject = <K extends keyof Project>(
		field: K,
		value: Project[K],
	) => {
		console.log('-- updateProject', field, value);
		setProject((currentProject) => {
			// 'currentProject' is the most up-to-date state of 'project'
			if (!currentProject) return null;
			const newProject = { ...currentProject, [field]: value };
			return newProject;
		});
	};

	const bulkUpdateProject = (dict: Partial<Project>) => {
		console.log('-- bulkUpdateProject', dict);
		setProject((currentProject) =>
			produce(currentProject, (draft) => {
				if (draft) {
					Object.assign(draft, dict);
				}
			})
		);
	};

	const updateIsShared = (
		is_shared: boolean,
		video_is_shared: boolean,
		is_public: boolean | undefined,
	) => {
		if (!project) return;
		console.log('-- updateIsShared', is_shared, is_public);
		setIsShared(is_shared);
		setVideoIsShared(video_is_shared);
		if (is_public === undefined) {
			setProject({ ...project, is_shared: is_shared } as Project);
			ProjectService.SlideShareLink(
				token,
				project.id,
				is_shared,
				video_is_shared,
			);
		} else {
			setProject({
				...project,
				is_shared: is_shared,
				is_public: is_public,
			} as Project);
			ProjectService.SlideShareLink(
				token,
				project.id,
				is_shared,
				video_is_shared,
				is_public,
			);
		}
	};

	const updateOutlines = (outlines: Outlines) => {
		// remove empty entries
		const outlinesCopy = [...outlines];
		for (let i = 0; i < outlinesCopy.length; i++) {
			outlinesCopy[i].content = outlinesCopy[i].content?.filter((s) => {
				return s.length > 0;
			});
		}

		setOutlines(outlinesCopy);
		// updateProject('outlines', outlinesCopy);
		// todo: save outlines
	};

	return {
		project,
		projectStatus,
		initProject,
		updateProject,
		bulkUpdateProject,
		clearProject,
		resources,
		setResources,
		selectedResources,
		setSelectedResources,
		isGpt35,
		setIsGpt35,
		isShared,
		updateIsShared,
		videoIsShared,
		outlines,
		updateOutlines,
	};
};
