
import { SET_TASK_TYPE } from "../types/TaskType"

const initialState = {
    typeTaskArr : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_TASK_TYPE:
        return { ...state, typeTaskArr : action.typeTaskArr }

    default:
        return state
    }
}
