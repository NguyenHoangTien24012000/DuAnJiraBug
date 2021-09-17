import { call, put, takeLatest } from "@redux-saga/core/effects"
import { statusServices } from "../../../services/StatusServices"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_STATUS_ALL_SAGA, SET_STATUS_ALL } from "../../types/StatusType"

function* getStatusAllSaga(action) {
    try {
        const { data, status } = yield call(() => statusServices.getStatusAll())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_STATUS_ALL,
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