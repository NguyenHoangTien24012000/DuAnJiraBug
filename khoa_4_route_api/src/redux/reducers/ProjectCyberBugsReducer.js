import {  GET_LIST_PROJECT } from "../types/CyberBugsTypes"

const initialState = {
    project : [],
  
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_PROJECT:{
            state.project = action.projectList
            return {...state}
        }
    default:
        return state
    }
}
