import { CREATE_PROJECT_SAGA } from "../types/ProjectType";

export const create_project_action = (newProject) =>({
    type : CREATE_PROJECT_SAGA,
    newProject : newProject
})