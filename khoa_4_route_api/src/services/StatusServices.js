import { BaseServices } from "./BaseServices";

class StatusServices extends BaseServices {
    constructor(){
        super()
    }
    getStatusAll = () =>{
        return this.get(`Status/getAll`)
    }

}

export const statusServices = new StatusServices()