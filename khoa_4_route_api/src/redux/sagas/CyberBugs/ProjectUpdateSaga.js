import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { projectServiesUpdate } from "../../../services/ProjectServicesUpdate";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { CREATE_PROJECT_SAGA } from "../../types/ProjectType";


function * createProjectSaga(action){
    yield put({
        type : DISPLAY_LOADING
    })
    yield delay(1000)
    try {
        const {data,status} = yield call(() => projectServiesUpdate.createProject(action.newProject))
        if(status === STATUS_CODE.SUCCESS){
            alert("ok")
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