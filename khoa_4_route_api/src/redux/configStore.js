import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk'
import ToDoListReducer from './reducers/ToDoListReducer';
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';
import HistoryReduce from './reducers/HistoryReduce';
import UserCyberBugReducer from './reducers/UserCyberBugReducer';
import ProjectCategoryCyberBugs from './reducers/ProjectCategoryCyberBugs';
import ProjectCyberBugsReducer from './reducers/ProjectCyberBugsReducer';
import DrawerCyberBugsReducer from './reducers/DrawerCyberBugsReducer';
import ProjectEditReducer from './reducers/ProjectEditReducer';
import GetUserCyberBugsReducer from './reducers/GetUserCyberBugsReducer';
import TypeProjectCyberBugs from './reducers/TypeProjectCyberBugs';
import GetArrPriority from './reducers/GetArrPriority';
import GetStausAllReducer from './reducers/GetStausAllReducer';
import TaskDetailReducer from './reducers/TaskDetailReducer';
//middeware saga

import createMiddewareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';

const middleWareSaga = createMiddewareSaga();


const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReduce,
    UserCyberBugReducer,
    ProjectCategoryCyberBugs,
    ProjectCyberBugsReducer,
    DrawerCyberBugsReducer,
    ProjectEditReducer,
    GetUserCyberBugsReducer,
    TypeProjectCyberBugs,
    GetArrPriority,
    GetStausAllReducer,
    TaskDetailReducer
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk, middleWareSaga));

middleWareSaga.run(rootSaga)


export default store;