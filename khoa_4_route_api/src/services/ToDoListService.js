import Axios from "axios";
import { DOMAIN } from "../util/constants/settingSystem";

export class ToDolistService {

    getTaskApi = () =>{
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }
    addTaskApi = (taskName) =>{
        return Axios({
            url : `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName : taskName
            }
        })
    }
    checkTaskApi =(taskName) =>{
        return Axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }
    deleteTaskApi = (taskName) =>{
        return Axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }
}

export const toDoListService = new ToDolistService();