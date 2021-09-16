import {  SET_PROJECT_CATEGORY } from "../types/ProjectCategoryType"

const initialState = {
    arrProjectCategory :[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT_CATEGORY :{
            state.arrProjectCategory = action.project
            return {...state}
        }
        

    default:
        return state
    }
}
