import Axios from "axios"
import { call, delay, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects"
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API } from "../types/ToDoListTypes"
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from "../../util/constants/settingSystem"
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingConst"



function* getTaskApiAction(action) {
    // while(true){
    //     yield take('getTaskApiAction') //theo doi action => xem actin nao dispatch moi lam cac cong viec ben duoiyy
    //     console.log("abc")
    //     //call api dispatch len reducer...
    // }

    // console.log('getAPI', action)
   
    yield put({
        type: DISPLAY_LOADING
    })
    try {
     
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(1000)
        //sau khi lay thanh cong thi put(giong dispatch ben thunk)

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        }else{
            console.log('error')
        }
       
      
    }catch(err){
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
   


}

export function * theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)

}

function * addTaskApiAction (action){
    const {taskName} = action;
    yield put({
        type: DISPLAY_LOADING
    })
    try{
        const {data, status} = yield call(() =>{return toDoListService.addTaskApi(taskName)})
        yield delay(1000)
        if(status == STATUS_CODE.SUCCESS){
            yield put({
                type:GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
    yield put({
        type : HIDE_LOADING
    })

}

export function * theoDoiActionAddTaskApi(){
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}


function * checkTaskApiAction(action){
    const {taskName} = action;
    yield put({
        type : DISPLAY_LOADING
    })
    try{
        const {data, status} = yield call(() =>{return toDoListService.checkTaskApi(taskName)})
        yield delay(1000)
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
    yield put({
        type : HIDE_LOADING
    })
}

export function * theoDoiActionCheckTaskApi(){
    yield takeLatest(CHECK_TASK_API, checkTaskApiAction)
}

function * deleteTaskApiAction(action){
    const {taskName} = action;
    yield put({
        type : DISPLAY_LOADING
    })
    try{
        const{data, status} = yield call(() =>{return toDoListService.deleteTaskApi(taskName)});
        yield delay(1000)
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }catch(err){
        console.log(err)
    }
    yield put({
        type : HIDE_LOADING
    })
}

export function * theoDoiActionDeleteApi(){
    yield takeLatest(DELETE_TASK_API, deleteTaskApiAction)
}