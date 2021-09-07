import { GET_PRIORITY } from "../types/CyberBugsTypes"

const initialState = {
    arrPriority : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case GET_PRIORITY:
        return { ...state, arrPriority : action.arrPriority }

    default:
        return state
    }
}
