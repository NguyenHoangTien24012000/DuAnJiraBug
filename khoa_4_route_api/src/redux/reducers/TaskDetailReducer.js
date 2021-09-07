import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, REMOVE_USER_TASK, TASK_DETAIL_MODAIL, TASK_DETAIL_MODAIL_SAGA } from "../types/CyberBugsTypes" 

const initialState = {
    taskDetailModel: {

    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case TASK_DETAIL_MODAIL :{
            return {...state, taskDetailModel : action.taskDetailModel}
        }
        case CHANGE_TASK_MODAL :{
            const {name, value} = action
            return {...state, taskDetailModel : {...state.taskDetailModel,[name] : value}}
        }
        case CHANGE_ASSIGNESS : {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness, action.assignessUpdate]
            console.log("ass", state.taskDetailModel.assigness)
            return {...state}}
            case REMOVE_USER_TASK :{
                const assignessUpDate =     state.taskDetailModel.assigness.filter(mem => mem.id !== action.idUser)
                state.taskDetailModel.assigness = assignessUpDate
                return {...state}
            }
        default:
            return state
    }
}
