import { GET_TASK_API } from "../types/ToDoListTypes"
import Axios from "axios"
export const getTaskListApi = () => {

    return async dispatch =>{
        try{
            let{data, status,...res} = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            if(status === 200){
                dispatch({
                    type:GET_TASK_API,
                    taskList:data
                })
            }
        }catch(err){
            console.log(err.response.data)
        }
    }

    // return dispatch =>{
    //     let promise = Axios({
    //         url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: 'GET'
    //     })
    //     promise.then(result=>{ 
    //         console.log(result.data)
    //         dispatch({
    //             type:GET_TASK_API,
    //             taskList : result.data
    //         })
    //     })
    //     promise.catch(err=>{
    //         console.log(err.response.data)
    //     })
    // }
}

export const addTaskApi = (taskName) =>{
    return dispatch =>{
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName:taskName }
        })
        promise.then(result=>{
            dispatch(getTaskListApi())
        })
        promise.catch(err =>{
            alert(err.response.data)
        })
    }
}
