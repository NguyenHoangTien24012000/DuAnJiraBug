import { ASSIGN_USER_TASK_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, REMOVE_USER_FROM_PROJECT, UP_DATE_PROJECT_SAGA } from "../types/ProjectType";

export const create_project_action = (newProject) =>({
    type : CREATE_PROJECT_SAGA,
    newProject : newProject
})


export const get_all_project_action = () =>({
    type : GET_ALL_PROJECT_SAGA
})


export const update_project_action =(projectUpdate)=> ({
    type : UP_DATE_PROJECT_SAGA,
    projectUpdate : projectUpdate
})

export const delete_project_action = (id) =>({
    type : DELETE_PROJECT_SAGA,
    id : id
})


export const assign_user_task_action = (user) =>({
    type : ASSIGN_USER_TASK_SAGA,
    user : user 

})
export const remove_user_from_project_action = (user) =>({
    type : REMOVE_USER_FROM_PROJECT,
    user : user
})


