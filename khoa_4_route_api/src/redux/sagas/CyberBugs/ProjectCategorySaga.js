import { call ,put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsServices";
import {  STATUS_CODE } from "../../../util/constants/settingSystem";
import {  GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_SAGA } from "../../types/CyberBugsTypes";



function* getAllProjectCateGorySaga (action) {
    
    try{
        const {data, status} = yield call(cyberbugsService.getAllProjectCategory)
        // console.log(data.content)
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_PROJECT_CATEGORY,
                project : data.content
            })
        }
      
    }catch(err){
        console.log(err.response.data)
    }
}

export function* theoDoiGetAllProjectCateGory() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA,getAllProjectCateGorySaga)
}


