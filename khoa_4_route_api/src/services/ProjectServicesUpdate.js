import { BaseServices } from "./BaseServices";

class ProjectServicesUpdate extends BaseServices {
    constructor(){
        super()
    }

    createProject = (newProject) =>{
        return this.post(`Project/createProject`,newProject)
    }

}

export const projectServiesUpdate = new ProjectServicesUpdate()