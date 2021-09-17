
import { SET_STATUS_ALL } from "../types/StatusType"

const initialState = {
    arrStatus : []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_STATUS_ALL : {
            return {...state, arrStatus : action.arrStatus}
        }



    default:
        return state
    }
}
