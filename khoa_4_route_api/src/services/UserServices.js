import { BaseServices } from "./BaseServices";

export class UserServices extends BaseServices{
    constructor(){
        super();
    }
    
    assignUserProject = (userProject) =>{
        return this.post(`Project/assignUserProject`, userProject)
    }
  
}


export const userServices = new UserServices();