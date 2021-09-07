import { GET_USER, GET_USER_BY_PROJECT_ID } from "../types/CyberBugsTypes"

const initialState = {
    dataUser : [],
    dataUserProject : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case GET_USER:
        return { ...state, dataUser : action.dataUser}
    case GET_USER_BY_PROJECT_ID :
        return {...state, dataUserProject : action.dataUserProject}
    default:
        return state
    }
}
