import { USER_LOGIN } from "../../util/constants/settingSystem"
import { USLOGIN } from "../types/CyberBugsTypes"

let usLogin = {}

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))

}

const initialState = {
    userLogin : usLogin
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USLOGIN :{
            state.userLogin = action.userLogin
            return {...state}
        }


    default:
        return state
    }
}
