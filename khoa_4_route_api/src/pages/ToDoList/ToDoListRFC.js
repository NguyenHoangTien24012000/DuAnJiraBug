import React from 'react'
import { useState,useEffect } from 'react';
import Axios from 'axios';
export default function ToDoListRFC() {

    let [state,setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        error: {
            taskName: ''
        }
    })

    const handleChange = (e) =>{
        let {name, value} = e.target;
        let newValues = {...state.values}
        newValues={...newValues, [name] : value}
        let newError = {...state.error}
        let regexString =  /^[a-z A-Z]+$/;
        if(!regexString.test(value) || value.trim() ===''){
            newError[name] = name + ' invalid !!!'
        }else{
            newError[name] = ''
        }
        console.log(name, value)
        setState({
            ...state,
            values : newValues,
            error:newError
        })

    }
   
    const getTaskList=()=>{
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then(result=>{
            console.log(result.data)
            setState({
                ...state,
                taskList : result.data
            })
        })
        promise.catch(err=>{
            console.log(err.response.data)
        })
    }

    useEffect(() =>{
        getTaskList();
        return () =>{

        }
    },[])

    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => { delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => { checkTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskToDoDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => { delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type ="button" onClick ={()=>{
                        rejectTask(item.taskName)
                    }}>
                        <div>
                            <i className="fa fa-undo" />
                            
                        </div>

                    </button>
                </div>
            </li>
        })
    }
    const delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            alert(result.data);
            getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);

        })
    }
    const checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
    const rejectTask = (taskName) =>{
        let promise = Axios({
            url :`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method : 'PUT'
        })
        promise.then(result=>{
            alert(result.data)
            getTaskList()
        })
        promise.catch(err=>{
            alert(err.response.data)
        })
    }

    const addTask =(e) =>{
        e.preventDefault()
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        })
        promise.then(result=>{
            getTaskList()
        })
        promise.catch(err =>{
            alert(err.response.data)
        })
    }

    return (
        <div className="card">
            {/* <button className="btn btn-success" onClick={getTaskList}>GetListTask</button> */}
            <div className="card__header">
                <img src="./bg.png" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit ={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input name="taskName" id="newTask" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" onClick ={addTask} >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <p className="text text-danger">{state.error.taskName}</p>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                          {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                           {renderTaskToDoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
