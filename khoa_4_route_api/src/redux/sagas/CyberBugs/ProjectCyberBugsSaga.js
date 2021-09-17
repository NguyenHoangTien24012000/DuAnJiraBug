import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_PROJECT_CATEGORY_SAGA, CREATE_TASK_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PRIORITY, GET_PRIORITY_SAGA, GET_PROJECT_DETAIL_SAGA, GET_STATUS_ALL, GET_STATUS_ALL_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_TYPE, GET_TASK_TYPE_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, HANDLE_CHANGE_TASK_POST_API_SAGA, REMOVE_USER_TASK, TASK_DETAIL_MODAIL, TASK_DETAIL_MODAIL_SAGA, UPDATE_PROJECT, UPDATE_STATUS_TASK_SAGA, UP_DATE_PROJECT_SAGA } from "../../types/CyberBugsTypes";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { history } from "../../../util/history";
import { projectServices } from "../../../services/ProjectServices";
import { notifiFuntion } from "../../../util/Notification/notifictionCyberBugs";
import { userServices } from "../../../services/UserServices";
import { PUT_PROJECT_DETAIL } from "../../types/ProjectEditType";





function* createProjectCyberBugsSaga(action) {
    // console.log(action.newProject)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000);
    try {
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject))
        if (status === STATUS_CODE.SUCCESS) {
            history.push('/projectmanagement');
        }
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateProjectCyberBugsSaga() {
    yield takeLatest(CREATE_PROJECT_CATEGORY_SAGA, createProjectCyberBugsSaga)
}

function* getListProjectCyberBugsSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000)
    try {
        const { data, status } = yield call(cyberbugsService.getListProjectCyberBugs)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
            yield put({
                type: GET_USER_BY_PROJECT_ID_SAGA,
                idProject: data.content[0].id
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetListProjectCyberBugs() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectCyberBugsSaga)
}







function* getProjectDetailCyberBugsSaga(action) {

    // yield put({
    //     type: DISPLAY_LOADING
    // })
    yield delay(1000)
    try {
        const { data, status } = yield call(() => projectServices.getProjectDetail(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PUT_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch (err) {
        console.log("err")
        history.push('/projectmanagement')
    }
    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailCyberBugsSaga)
}



function* getTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => projectServices.getTypeTask())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_TYPE,
                typeTaskArr: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetTypeTask() {
    yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeSaga)
}




function* getPrioritySaga(action) {
    try {
        const { data, status } = yield call(() => projectServices.getPriority())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PRIORITY,
                arrPriority: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetPriority() {
    yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga)
}


function* getStatusAllSaga(action) {
    try {
        const { data, status } = yield call(() => projectServices.getStatusAll())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_STATUS_ALL,
                arrStatus: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetStatusAll() {
    yield takeLatest(GET_STATUS_ALL_SAGA, getStatusAllSaga)
}







function* createTaskSaga(action) {
    // console.log(action.valueTask)
    try {
        const { data, status } = yield call(() => projectServices.postCreateTask(action.valueTask))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: "CLOSE_DRAWER"
            })
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.valueTask.projectId
            })
            notifiFuntion('success', 'Create Task Done!!', '')
        }
    } catch (err) {
        console.log(err.response.data)
        notifiFuntion('error', 'Create Task False!!', '')
    }
}

export function* theoDoiCreateTask() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}

function* getTaskDetailSaga(action) {

    try {
        const { data, status } = yield call(() => projectServices.getTaskDetail(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: TASK_DETAIL_MODAIL,
                taskDetailModel: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetTaskDetail() {
    yield takeLatest(TASK_DETAIL_MODAIL_SAGA, getTaskDetailSaga)
}

function* upDateStatusTaskSaga(action) {
    console.log(action)
    try {
        const { data, status } = yield call(() => projectServices.putUpdateStatusTask(action.statusUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.projectId
            })
            yield put({
                type: TASK_DETAIL_MODAIL_SAGA,
                taskId: action.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUpDateStatusTask() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, upDateStatusTaskSaga)
}
function* getUserByProjectIdSaga(action) {
    console.log('task project',action)
    try {
        const { data, status } = yield call(() => projectServices.getUserByProjectId(action.idProject))
        if (status === STATUS_CODE.SUCCESS) {
            // console.log(data.content)
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                dataUserProject: data.content
            })
        }
    } catch (err) {
        console.log(err)
        console.log("err")
    }
}

export function* theoDoiGetUserByProjectId() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}




function* handelChangeTaskPostApi(action){
    console.log('abc',action)
    switch (action.actionType){
        case CHANGE_TASK_MODAL : {
            const {value,name} =action;
            yield put({
                type : CHANGE_TASK_MODAL,
                name :name,
                value : value
            })    
        }break;
        case CHANGE_ASSIGNESS :{
            yield put({
                type :CHANGE_ASSIGNESS,
                assignessUpdate: action.assignessUpdate
            })
        }break;
        case REMOVE_USER_TASK:{
            yield put({
                type : REMOVE_USER_TASK,
                idUser : action.idUser
            })
        }break;
     
    }
    let { taskDetailModel } = yield select(state => state.TaskDetailReducer)
    const listUserAsign = taskDetailModel.assigness?.map((item,index)=>{
        return item.id;
    })
    const taskUpdateDetail = {...taskDetailModel, listUserAsign}
    try {
        const {data,status} = yield call(() => projectServices.upDateTask(taskUpdateDetail))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateDetail.projectId
            })
            yield put({
                type: TASK_DETAIL_MODAIL_SAGA,
                taskId: taskUpdateDetail.taskId
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }

}

export function* theoDoiHandelChangeTaskPostApi(){
    yield takeLatest(HANDLE_CHANGE_TASK_POST_API_SAGA,handelChangeTaskPostApi)
}





