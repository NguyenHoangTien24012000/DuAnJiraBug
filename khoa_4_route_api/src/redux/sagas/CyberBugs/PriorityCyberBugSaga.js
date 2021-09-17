import { call, put, takeLatest } from "@redux-saga/core/effects"
import { priorityServices } from "../../../services/PriorityServices"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_PRIORITY_SAGA, SET_PRIORITY } from "../../types/PriorityType"

function* getPrioritySaga(action) {
    try {
        const { data, status } = yield call(() => priorityServices.getAllPriority())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_PRIORITY,
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