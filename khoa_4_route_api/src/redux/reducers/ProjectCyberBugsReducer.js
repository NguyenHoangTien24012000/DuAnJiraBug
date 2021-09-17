import {  GET_LIST_PROJECT } from "../types/CyberBugsTypes"
import { GET_ALL_PROJECT } from "../types/ProjectType"

const initialState = {
    project : [],
  
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT:{
            state.project = action.projectList
            return {...state}
        }
    default:
        return state
    }
}
