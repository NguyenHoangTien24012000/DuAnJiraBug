import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { projectServiesUpdate } from "../../../services/ProjectServicesUpdate";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notifiFuntion } from "../../../util/Notification/notifictionCyberBugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { ASSIGN_USER_TASK_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, REMOVE_USER_FROM_PROJECT, UP_DATE_PROJECT_SAGA } from "../../types/ProjectType";


function * createProjectSaga(action){
    yield put({
        type : DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const {data,status} = yield call(() => projectServiesUpdate.createProject(action.newProject))
        if(status === STATUS_CODE.SUCCESS){
            history.push('/projectmanagement')
        }

    } catch (error) {
        console.log("error",error)
    }
    yield put({
        type :HIDE_LOADING
    })

}



export function * theoDoiCreateProjectSaga(){
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}


function * getAllProjectSaga(action){
    yield put({
        type : DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const {data,status} = yield call(() => projectServiesUpdate.getAllProject())
        if(status === STATUS_CODE.SUCCESS){
            console.log("ok")
            yield put({
                type : GET_ALL_PROJECT,
                projectList : data.content
            })
        }
    } catch (error) {
        console.log("error",error.response.data)
    }
    yield put({
        type :HIDE_LOADING
    })

}



export function * theoDoiGetAllProjectSaga(){
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}


function* upDateProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING,
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => projectServiesUpdate.updateProject(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UP_DATE_PROJECT_SAGA, upDateProjectSaga)
}


function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000)
    try {
        const { data, status } = yield call(() => projectServiesUpdate.deleteProject(action.id))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
            notifiFuntion('success', 'Delete project successfuly !!', '')
        } else {
            notifiFuntion('error', 'Delete project fail !!', '')
        }
    } catch (err) {
        console.log(err.response.data)
        notifiFuntion('error', 'Delete project fail !!', '')
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}


function* assignUserTask(action) {
    console.log(action.user)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => projectServiesUpdate.assignUserTask(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
            notifiFuntion('success', 'Add user successfuly !!', '')
        }
    } catch (err) {
        console.log(err.response.data)
        notifiFuntion('error', 'Add user fail !!', '')
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiAssignUserTaskSaga() {
    yield takeLatest(ASSIGN_USER_TASK_SAGA, assignUserTask)
}


function* removeUserFromProject(action) {
    console.log(action.user)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => projectServiesUpdate.removeUserFromProject(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
            notifiFuntion('success', 'Remove user successfuly !!', '')
        }
    } catch (err) {
        console.log(err.response.data)
        notifiFuntion('error', 'Remove user fail !!', '')
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiRemoveUserFromProjectSaga() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT, removeUserFromProject)
}