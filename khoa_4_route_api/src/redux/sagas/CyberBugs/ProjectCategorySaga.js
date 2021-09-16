import { call ,put, takeLatest } from "redux-saga/effects";
import { projectCategoryServices } from "../../../services/ProjectCategoryServices";
import {  STATUS_CODE } from "../../../util/constants/settingSystem";
import {  GET_PROJECT_CATEGORY_SAGA, SET_PROJECT_CATEGORY } from "../../types/ProjectCategoryType";



function* getAllProjectCateGorySaga (action) {
    try{
        const {data, status} = yield call(projectCategoryServices.projectCategory)
        
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : SET_PROJECT_CATEGORY,
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


