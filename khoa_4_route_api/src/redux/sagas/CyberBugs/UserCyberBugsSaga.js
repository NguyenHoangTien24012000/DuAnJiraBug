
import { cyberbugsService } from "../../../services/CyberBugsServices"
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../../util/constants/settingSystem";

import { ADD_USER_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_USER, GET_USER_SAGA, REMOVE_USER_FROM_PROJECT_SAGA, USER_SIGNIN_API, USLOGIN } from "../../types/CyberBugsTypes"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { history } from "../../../util/history";
import { userServices } from "../../../services/UserServices";
import { notifiFuntion } from "../../../util/Notification/notifictionCyberBugs";





function* getUserSaga(action) {
    try{
        const {data,status} = yield call(() =>userServices.getUser(action.value))
        if(status === STATUS_CODE.SUCCESS){
        
            yield put({
                type : GET_USER,
                dataUser : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_SAGA,getUserSaga )
}



function* assignUserProjectSaga(action){
    try{
        const {data,status} = yield call(() => userServices.assignUserProject(action.userProject))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_LIST_PROJECT_SAGA
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}
export function* theoDoiAssignUserProject(){
    yield takeLatest(ADD_USER_PROJECT_SAGA, assignUserProjectSaga)
}

function* removeUserFromProjectSaga(action){
    console.log(action)
    try{
        const{data,status} = yield call(() =>userServices.removeUserFromProject(action.userProject))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_LIST_PROJECT_SAGA
            })
            notifiFuntion('success','Remove the user from the project successfuly !!','')
        }else{
            notifiFuntion('error','Remove the user from the project fail !!','')
        }
    }catch(err){
        console.log(err.response.data)
        notifiFuntion('error','Remove the user from the project fail !!','')
    }
}

export function* theoDoiRemoveUserFromProject(){
    yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA,removeUserFromProjectSaga)
}