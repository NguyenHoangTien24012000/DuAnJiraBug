import { theoDoiSignIn } from "../redux/sagas/CyberBugs/UserCyberBugsSaga";
import { BaseServices } from "./BaseServices";

export class ProjectServices extends BaseServices{
    constructor(){
        super();
    }
    deleteProject = (id) =>{
        return this.delete(`Project/deleteProject?projectId=${id}`)
    }
    getProjectDetail = (projectId) =>{
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
    getTypeTask = () =>{
        return this.get(`TaskType/getAll`)
    }
    getPriority = () =>{
        return this.get(`Priority/getAll`)
    }
    getStatusAll = () =>{
        return this.get(`Status/getAll`)
    }
    getUserByProjectId = (idProject) =>{
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
    postCreateTask=(dataUserProject) =>{
        return this.post(`Project/createTask`, dataUserProject)
    } 
    putUpdateStatusTask = (statusUpdate)=>{
        return this.put(`Project/updateStatus`,statusUpdate)
    }
    getTaskDetail = (taskId) =>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    upDateTask = (taskUpdate) =>{
        return this.post(`Project/updateTask`,taskUpdate)
    }
}



export const projectServices = new ProjectServices();