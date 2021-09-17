import { call, delay, fork, put, select, take, takeEvery, takeLatest } from "redux-saga/effects"
import { userServices } from "../../../services/UserServices";
import { usersServices } from "../../../services/UsersServices";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { GET_USER_SAGA, PROFILE_USER_LOGIN, SET_USER, USER_SIGNIN_API } from "../../types/UsersType";






function * signInSaga(action){
    // console.log(action)
    const {userLogin} = action;
    // console.log(userLogin)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000)
    try{
        const {data, status} = yield call(() => usersServices.signinCyberBugs(userLogin)) 
       if(status === STATUS_CODE.SUCCESS){
        localStorage.setItem(ACCESS_TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))
        // console.log(data)
        // action.history.push('/home')
        // let history = yield select(state => state.HistoryReduce.history)
        // console.log('history', history)
        yield put({
            type : PROFILE_USER_LOGIN,
            userLogin :data.content
        })
        history.push('/cyberbugs')
       }
        
    }catch(err){
        console.log(err.response.data)
        alert(err.response.data.message)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignIn(){
    yield takeLatest(USER_SIGNIN_API,signInSaga)
}




function* getUserSaga(action) {
    try{
        const {data,status} = yield call(() => usersServices.getUser(action.value))
        if(status === STATUS_CODE.SUCCESS){
        
            yield put({
                type : SET_USER,
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