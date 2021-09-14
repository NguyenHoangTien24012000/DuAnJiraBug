import { BaseServices } from "./BaseServices";


class UsersServices extends BaseServices {
    constructor(){
        super();
    }

    signinCyberBugs = (userLogin) =>{
        return this.post(`Users/signin`, userLogin)
    }
}


export const usersServices = new UsersServices()