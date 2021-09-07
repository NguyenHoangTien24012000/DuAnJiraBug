import { GET_TASK_TYPE } from "../types/CyberBugsTypes"

const initialState = {
    typeTaskArr : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case GET_TASK_TYPE:
        return { ...state, typeTaskArr : action.typeTaskArr }

    default:
        return state
    }
}
