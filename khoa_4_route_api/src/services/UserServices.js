import { BaseServices } from "./BaseServices";

export class UserServices extends BaseServices{
    constructor(){
        super();
    }
    
    assignUserProject = (userProject) =>{
        return this.post(`Project/assignUserProject`, userProject)
    }
    removeUserFromProject = (userProject) =>{
        return this.post(`Project/removeUserFromProject`,userProject)
    }
}


export const userServices = new UserServices();