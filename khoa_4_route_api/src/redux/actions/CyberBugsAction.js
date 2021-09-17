import {  ADD_USER_PROJECT_SAGA, CREATE_PROJECT_CATEGORY_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_PROJECT_CATEGORY, REMOVE_USER_FROM_PROJECT_SAGA, UPDATE_PROJECT, UPDATE_STATUS_TASK_SAGA, UP_DATE_PROJECT_SAGA, USER_SIGNIN_API } from "../types/CyberBugsTypes";
















export const add_user_project_action =(projectId, userId) =>({
    type : ADD_USER_PROJECT_SAGA,
    userProject : {
        "projectId": projectId,
        "userId": userId
    }
})

export const remove_user_from_project_action=(projectId,userId)=>({
    type : REMOVE_USER_FROM_PROJECT_SAGA,
    userProject : {
        "projectId": projectId,
        "userId": userId
    }
})

export const update_status_task_action = (taskId , statusId, projectId) =>({
    type : UPDATE_STATUS_TASK_SAGA,
    statusUpdate : {
        taskId : taskId,
        statusId : statusId   
    },
    projectId:projectId,
    taskId : taskId
})