import { PUT_PROJECT_DETAIL } from "../types/CyberBugsTypes"

const initialState = {
    projectEdit:
    {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": '<p>ALO</p>',
        "categoryId": 2
    },
    projectDetail : {

    }

}

export default (state = initialState, action) => {
    switch (action.type) {
        case  'EDIT_PROJECT' : {
            return {...state,projectEdit : action.projectEditModel}
        }

        case PUT_PROJECT_DETAIL : {
            return {...state,projectDetail : action.projectDetail}
        }

        default:
            return state
    }
}
