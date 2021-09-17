import React from "react";
import { BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About.js/About";
import Header from "./components/Home/Header/Header";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHocModal from "./pages/DemoHocModal/DemoHocModal";
import Model from "./HOC/Modal/Model";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UseLoginTemplate } from "./templates/HomeTemplate/UseLoginTemplate";
import LoginCyberBug from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBug";
import { CyberBugsTemplate } from "./templates/HomeTemplate/CyberBugsTemplate";

import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from "./HOC/CyberBugsHOC/DrawerCyberBugs";
import IndexCyberBugs from "./pages/CyberBugs/IndexCyberBugs";
import DemoDrapDrop from "./pages/DemoDragDrop/DemoDrapDrop";
import SignUpCyberBugs from "./pages/CyberBugs/CyberBugsSignUp/SignUpCyberBugs";



function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch({
      type : "ADD_HISTORY",
      history
    })
    // console.log(history)
  },[])



  return (
    <>
 
    <Model />
    <LoadingComponent />
    <DrawerCyberBugs />
    <Switch>
    {/* <Route exact path='/home' render = {(propsRoute) =>{
      return <div>
           <Header />
           <Home {...propsRoute} />
      </div>
    }} /> */}
     <UseLoginTemplate exact path='/login' Component ={LoginCyberBug} />
  
     <CyberBugsTemplate exact path = '/cyberbugs' Component={IndexCyberBugs}/>
       <CyberBugsTemplate exact path = '/createproject' Component={CreateProject} />
      <CyberBugsTemplate exact path = '/projectmanagement' Component={ProjectManagement} />
      <CyberBugsTemplate exact path = '/projectdetail/:projectId' Component={IndexCyberBugs} />
     <CyberBugsTemplate exact path='/' Component = {ProjectManagement} />
     <CyberBugsTemplate path = "*" Component = {PageNotFound} /> 
    </Switch>
    
    </>

  );
}

export default App;
