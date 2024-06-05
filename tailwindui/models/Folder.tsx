import Project from "./Project";

export default interface Folder {
    folderName: string;
    folderId: string;
    projects: Project[];
}