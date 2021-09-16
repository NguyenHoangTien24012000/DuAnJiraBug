import { BaseServices } from "./BaseServices";


class ProjectCategoryServices extends BaseServices {
    constructor(){
        super();
    }
    projectCategory = () =>{
        return this.get(`ProjectCategory`)
    }


}

export const projectCategoryServices = new ProjectCategoryServices()