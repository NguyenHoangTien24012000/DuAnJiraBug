import { call, put, takeLatest } from "@redux-saga/core/effects"
import { taskTypeServices } from "../../../services/TaskTypeServices"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_TASK_TYPE_SAGA, SET_TASK_TYPE } from "../../types/TaskType"

function* getTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => taskTypeServices.getTaskType())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_TASK_TYPE,
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