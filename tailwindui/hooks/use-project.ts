import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Project from '@/models/Project';
import Resource from '@/models/Resource';
import ProjectService from '@/services/ProjectService';
import { useUser } from './use-user';

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
			const newProject = { ...currentProject };
			newProject[field] = value;
			return newProject as Project;
		});
	};

	const bulkUpdateProject = (dict: Project) => {
		console.log('-- bulkUpdateProject', dict);
		setProject((currentProject) => {
			// 'currentProject' is the most up-to-date state of 'project'
			return { ...currentProject, ...dict } as Project;
		});
	}

	const updateIsShared = (is_shared: boolean, is_public: boolean | undefined) => {
		if (!project) return;
		console.log('-- updateIsShared', is_shared, is_public);
		setIsShared(is_shared);
		if (is_public === undefined) {
			setProject({ ...project, is_shared: is_shared } as Project);
			ProjectService.SlideShareLink(token, project.id, is_shared);
		} else {
			setProject({ ...project, is_shared: is_shared, is_public: is_public } as Project);
			ProjectService.SlideShareLink(token, project.id, is_shared, is_public);
		}
	};

	const updateOutlines = (outlines: Outlines) => {
		// remove empty entries
		const outlinesCopy = [...outlines];
		for (let i = 0; i < outlinesCopy.length; i++) {
			outlinesCopy[i].content = outlinesCopy[i].content.filter((s) => {
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
		outlines,
		updateOutlines,
	};
};
