import { GET_STATUS_ALL } from "../types/CyberBugsTypes"

const initialState = {
    arrStatus : []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_STATUS_ALL : {
            return {...state, arrStatus : action.arrStatus}
        }



    default:
        return state
    }
}
