import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Project from '@/models/Project';
import Resource from '@/models/Resource';
import Slide from '@/models/Slide';


const useProjectBear = createBearStore<Project | null>()('project', null, true);
const useResourcesBear = createBearStore<Resource[]>()('resources', [], true);
const useSelectedResourcesBear = createBearStore<Resource[]>()('selectedResources', [], true);
const useVideoJobIdBear = createBearStore<string>()('videoJobId', '', true);
const useIsGpt35Bear = createBearStore<boolean>()('isGpt35', true, true);

export enum ProjectStatus {
  NotInited,
  Initing,
  Inited,
}

let projectStatus: ProjectStatus = ProjectStatus.NotInited;

export const useProject = () => {
  const { project, setProject } = useProjectBear();
  const { resources, setResources } = useResourcesBear();
  const { selectedResources, setSelectedResources } = useSelectedResourcesBear();
  const { videoJobId, setVideoJobId } = useVideoJobIdBear();
  const { isGpt35, setIsGpt35 } = useIsGpt35Bear();

  const init = async () => {
    if (projectStatus !== ProjectStatus.NotInited) return;
    projectStatus = ProjectStatus.Initing;
  };

  useEffect(() => {
    void init();
  }, []);

  const initProject = async (project: Project) => {
    setProject(project);
    projectStatus = ProjectStatus.Inited;
  }

  const updateProject = <K extends keyof Project>(field: K, value: Project[K]) => {
    const newProject = { ...project };
    newProject[field] = value;
    setProject(newProject as Project);
  };

  return {
    project, initProject, updateProject, resources, setResources, selectedResources, setSelectedResources,
    videoJobId, setVideoJobId,
    isGpt35, setIsGpt35,
  };
};
