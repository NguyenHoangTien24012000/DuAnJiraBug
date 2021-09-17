import { BaseServices } from "./BaseServices";

class PriorityServices extends BaseServices{
    constructor(){
        super()
    }
    getAllPriority = () =>{
        return this.get(`Priority/getAll`)
    }
}

export const priorityServices = new PriorityServices()