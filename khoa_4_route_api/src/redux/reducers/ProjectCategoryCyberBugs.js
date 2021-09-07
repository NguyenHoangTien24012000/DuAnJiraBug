import { GET_PROJECT_CATEGORY } from "../types/CyberBugsTypes"

const initialState = {
    arrProjectCategory :[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT_CATEGORY :{
            state.arrProjectCategory = action.project
            return {...state}
        }
        

    default:
        return state
    }
}
