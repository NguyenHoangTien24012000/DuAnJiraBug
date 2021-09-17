import { BaseServices } from "./BaseServices";

class TaskTypeServices extends BaseServices {
    constructor(){
        super()
    }

    getTaskType = () =>{
        return this.get(`TaskType/getAll`)
    }

}

export const taskTypeServices = new TaskTypeServices()