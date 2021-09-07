import {  ADD_USER_PROJECT_SAGA, CREATE_PROJECT_CATEGORY_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_SAGA, GET_USER_SAGA, REMOVE_USER_FROM_PROJECT_SAGA, UPDATE_PROJECT, UPDATE_STATUS_TASK_SAGA, UP_DATE_PROJECT_SAGA, USER_SIGNIN_API } from "../types/CyberBugsTypes";

export const signin_cyberbug_action = (userLogin) => ({
    type: USER_SIGNIN_API,
    userLogin,
    // history
})
export const get_project_action = () =>({
    type : GET_PROJECT_CATEGORY_SAGA
})


export const create_project_action = (newProject) =>({
    type : CREATE_PROJECT_CATEGORY_SAGA,
    newProject : newProject
})


export const get_list_project_action = () =>({
    type : GET_LIST_PROJECT_SAGA
})


export const update_project_action =(projectUpdate)=> ({
    type : UP_DATE_PROJECT_SAGA,
    projectUpdate : projectUpdate
})


export const delete_project_action = (id) =>({
    type : DELETE_PROJECT_SAGA,
    id : id
})

export const get_user_action = (value) =>({
    type : GET_USER_SAGA,
    value : value
})


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