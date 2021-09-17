
import { SET_PRIORITY } from "../types/PriorityType"

const initialState = {
    arrPriority : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_PRIORITY:
        return { ...state, arrPriority : action.arrPriority }

    default:
        return state
    }
}
