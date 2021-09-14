import { call, delay, fork, put, select, take, takeEvery, takeLatest } from "redux-saga/effects"
import { usersServices } from "../../../services/UsersServices";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { PROFILE_USER_LOGIN, USER_SIGNIN_API } from "../../types/UsersType";






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