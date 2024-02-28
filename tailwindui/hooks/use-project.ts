import { useEffect, useMemo, useRef, useState } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Project from '@/models/Project';
import Resource from '@/models/Resource';
import Slide from '@/models/Slide';
import ProjectService from '@/services/ProjectService';
import { useUser } from './use-user';
import SessionStorage from '@/components/utils/SessionStorage';


const useProjectBear = createBearStore<Project | null>()('project', null, true);
const useResourcesBear = createBearStore<Resource[]>()('resources', [], true);
const useSelectedResourcesBear = createBearStore<Resource[]>()('selectedResources', [], true);
const useVideoJobIdBear = createBearStore<string>()('videoJobId', '', true);
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
  const { selectedResources, setSelectedResources } = useSelectedResourcesBear();
  const { videoJobId, setVideoJobId } = useVideoJobIdBear();
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
  }

  const updateProject = <K extends keyof Project>(field: K, value: Project[K]) => {
    console.log('-- updateProject', field, value);

    const newProject = { ...project };
    newProject[field] = value;
    setProject(newProject as Project);
  };

  const updateIsShared = (value: boolean) => {
    setIsShared(value);
    setProject({ ...project, is_shared: value } as Project);
    ProjectService.SlideShareLink(token, project?.id || '', value);
  }

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
  }

  return {
    project, initProject, updateProject, resources, setResources, selectedResources, setSelectedResources,
    videoJobId, setVideoJobId,
    isGpt35, setIsGpt35,
    isShared, updateIsShared,
    outlines, updateOutlines,
  };
};
