import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga'
import * as CyberBugs from './CyberBugs/UserCyberBugsSaga'
import * as GetAllProjectCategory from './CyberBugs/ProjectCategorySaga';
import * as CreateProject from './CyberBugs/ProjectCyberBugsSaga';
export function * rootSaga(){

    // yield fork(getTaskApi); // ham non blocking bat dong bo chay khong can cho nhau
   yield all([
        //nghiep vu theo doi cac action saga 
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionCheckTaskApi(),
        ToDoListSaga.theoDoiActionDeleteApi(),
        CyberBugs.theoDoiSignIn(),
        GetAllProjectCategory.theoDoiGetAllProjectCateGory(),
        CreateProject.theoDoiCreateProjectCyberBugsSaga(),
        CreateProject.theoDoiGetListProjectCyberBugs(),
        CreateProject.theoDoiUpdateProjectCyberBugsSaga(),
        CreateProject.theoDoiDeleteProjectCyberBugsSaga(),
        CyberBugs.theoDoiGetUser(),
        CyberBugs.theoDoiAssignUserProject(),
        CyberBugs.theoDoiRemoveUserFromProject(),
        CreateProject.theoDoiGetProjectDetail(),
          CreateProject.theoDoiGetTypeTask(),
          CreateProject.theoDoiGetPriority(),
          CreateProject.theoDoiGetStatusAll(),
        CreateProject.theoDoiGetUserByProjectId(),
        CreateProject.theoDoiCreateTask(),
        CreateProject.theoDoiUpDateStatusTask(),
        CreateProject.theoDoiGetTaskDetail(),
      CreateProject.theoDoiHandelChangeTaskPostApi()
        

   ])


}