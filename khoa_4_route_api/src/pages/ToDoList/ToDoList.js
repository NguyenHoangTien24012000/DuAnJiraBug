import React, { Component } from 'react'
import Axios from 'axios'
import style from './ToDoList.css'
export default class ToDoList extends Component {
    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        error: {
            taskName: ''
        }
    }
    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data);
            this.setState({
                taskList: result.data
            })
        });
        promise.catch((err) => {
            console.log(err.response.data)
        })
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => { this.delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => { this.checkTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => { this.delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type ="button" onClick ={()=>{
                        this.rejectTask(item.taskName)
                    }}>
                        <div>
                            <i className="fa fa-undo" />
                            
                        </div>

                    </button>
                </div>
            </li>
        })
    }
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            alert(result.data);
            this.getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);

        })
    }
    checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
    rejectTask = (taskName) =>{
        let promise = Axios({
            url :`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method : 'PUT'
        })
        promise.then(result=>{
            alert(result.data)
            this.getTaskList()
        })
        promise.catch(err=>{
            alert(err.response.data)
        })
    }

    handleChange = (e) => {
        let { value, name } = e.target
        console.log(value, name)
        let newValues = { ...this.state.values }
        newValues = { ...newValues, [name]: value }
        let regexString = /^[a-z A-Z]+$/;
        let newErrors = { ...this.state.error }
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + " invalid !!"
        } else {
            newErrors[name] = ''
        }
        this.setState({
            ...this.state,
            values: newValues,
            error: newErrors
        })
    }

    componentDidMount() {
        this.getTaskList()
    }
    addTask = (e) => {
        e.preventDefault()
        console.log(this.state.values.taskName)
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button className="btn btn-success" onClick ={()=>{this.getTaskList()}}  >GetTaskList</button> */}
                <div className="card">
                    <div className="card__header">
                        <img src='./bg.png' />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                <button id="addItem" onClick={
                                    this.addTask
                                }>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className="text text-danger">{this.state.error.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}

