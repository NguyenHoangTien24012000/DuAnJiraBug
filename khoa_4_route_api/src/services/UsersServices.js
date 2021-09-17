import { BaseServices } from "./BaseServices";


class UsersServices extends BaseServices {
    constructor(){
        super();
    }

    signinCyberBugs = (userLogin) =>{
        return this.post(`Users/signin`, userLogin)
    }
    getUser = (value) =>{
        return this.get(`Users/getUser?keyword=${value}`)
    }
}


export const usersServices = new UsersServices()