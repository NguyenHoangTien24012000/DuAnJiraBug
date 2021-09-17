import { BaseServices } from "./BaseServices";

class ProjectServicesUpdate extends BaseServices {
    constructor(){
        super()
    }

    createProject = (newProject) =>{
        return this.post(`Project/createProjectAuthorize`,newProject)
    }
    getAllProject = () =>{
        return this.get(`Project/getAllProject`)
    }
    updateProject = (projectUpdate) =>{
        return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
    }
    deleteProject = (idProject) =>{
        return this.delete(`Project/deleteProject?projectId=${idProject}`)
    }
    assignUserTask = (user) =>{
        return this.post(`Project/assignUserProject`,user)
    }
    removeUserFromProject = (user) =>{
        return this.post(`Project/removeUserFromProject`,user)
    }
    getProjectDetail = (projectId) =>{
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
}

export const projectServiesUpdate = new ProjectServicesUpdate()