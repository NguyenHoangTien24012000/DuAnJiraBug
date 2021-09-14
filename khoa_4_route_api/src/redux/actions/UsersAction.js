import { USER_SIGNIN_API } from "../types/UsersType";

export const signin_cyberbug_action = (userLogin) => ({
    type: USER_SIGNIN_API,
    userLogin,
    // history
})