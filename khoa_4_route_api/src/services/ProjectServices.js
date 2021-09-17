import { theoDoiSignIn } from "../redux/sagas/CyberBugs/UserCyberBugsSaga";
import { BaseServices } from "./BaseServices";

export class ProjectServices extends BaseServices{
    constructor(){
        super();
    }
    
  
    getTypeTask = () =>{
        return this.get(`TaskType/getAll`)
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