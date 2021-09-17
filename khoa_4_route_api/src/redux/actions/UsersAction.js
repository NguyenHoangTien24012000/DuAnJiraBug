import { GET_USER_SAGA, USER_SIGNIN_API } from "../types/UsersType";

export const signin_cyberbug_action = (userLogin) => ({
    type: USER_SIGNIN_API,
    userLogin,
    // history
})


export const get_user_action = (value) =>({
    type : GET_USER_SAGA,
    value : value
})