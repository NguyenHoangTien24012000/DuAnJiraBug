import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from "react-html-parser";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_USER_BY_PROJECT_ID_SAGA, HANDLE_CHANGE_TASK_POST_API_SAGA, REMOVE_USER_TASK, TASK_DETAIL_MODAIL } from '../../../redux/types/CyberBugsTypes';
import { update_status_task_action } from '../../../redux/actions/CyberBugsAction';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { get_task_type_action } from '../../../redux/actions/TaskTypeAction';
import { status_all_action } from '../../../redux/actions/StatusAction';
import { get_priority_action } from '../../../redux/actions/PriorityAction';
const { Option } = Select;
export default function ModalCyberBugs(props) {
    const { taskDetailModel } = useSelector(state => state.TaskDetailReducer)
    const { arrStatus } = useSelector(state => state.GetStausAllReducer)
    const { arrPriority } = useSelector(state => state.GetArrPriority)
    const { typeTaskArr } = useSelector(state => state.TypeProjectCyberBugs)
    const [contentDescription, setContentDescription] = useState(taskDetailModel.description)
    const { dataUserProject } = useSelector(state => state.GetUserCyberBugsReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(status_all_action())
        dispatch(get_priority_action())
        dispatch(get_task_type_action)

    }, [])

    const [visibleEditor, setVisibleEditor] = useState(false)





    const renderDescription = () => {
        const jsxDesription = ReactHtmlParser(taskDetailModel.description)
        return <div>
            {/* {jsxDesription} */}
            {visibleEditor ? <div> <Editor

                name="description"

                initialValue={taskDetailModel.description}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                }}
                onEditorChange={(content, editor) => {
                    setContentDescription(content);
                }}
            />
                <button className="btn btn-success p-1 mr-2" onClick={() => {

                    dispatch({
                        type : HANDLE_CHANGE_TASK_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: contentDescription
                    })
                    setVisibleEditor(!visibleEditor)
                }}>SAVE</button>
                <button className="btn btn-danger p-1" onClick={() => setVisibleEditor(!visibleEditor)}>CANCEL</button>
            </div> : <div style={{ cursor: "pointer" }} onClick={() => setVisibleEditor(!visibleEditor)}>{jsxDesription}</div>}
        </div>

    }
    const renderTimeTracking = () => {
        const { timeTrackingRemaining, timeTrackingSpent } = taskDetailModel
        const max = Number(timeTrackingRemaining) + Number(timeTrackingSpent)
        const timeRemaning = Math.round(Number(timeTrackingRemaining) / max * 100)
        return <div key="1" style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${timeRemaning}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingSpent)}h estimated</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input min="0" type="number" className="from-control" style={{ width: '30%' }} name="timeTrackingRemaining" onChange={(e) => { handleChange(e) }} defaultValue={timeTrackingRemaining}></input>
                    <input min="0" type="number" className="from-control" style={{ width: '30%' }} name="timeTrackingSpent" onChange={(e) => { handleChange(e) }} defaultValue={timeTrackingSpent}></input>
                </div>
            </div>
        </div>

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name: name,
        //     value: value
        // })
        dispatch({
            type :HANDLE_CHANGE_TASK_POST_API_SAGA,
            actionType : CHANGE_TASK_MODAL,
            name: name,
            value: value
        })
    }

    const dataUserTask = dataUserProject?.filter(item => {
        const { assigness } = taskDetailModel
        let index = assigness?.findIndex(item1 => item1.id === item.userId)
        if (index !== -1) {
            return false
        }
        return true
    })

    const dataUserSelect = dataUserTask?.map((item, index) => {
  
        return <Option key={index} value={item.userId}>{item.name}</Option>
    })
 

    const handleChangeSelect = (value) => {

        let userSelect = dataUserProject?.find(mem => mem.userId == value)
        let userSelectUpdate = { ...userSelect, id: userSelect.userId }
        dispatch({
            type: HANDLE_CHANGE_TASK_POST_API_SAGA,
            actionType:CHANGE_ASSIGNESS,
            assignessUpdate: userSelectUpdate
        })
    }
    return (
        <div>
            <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
                <div className="modal-dialog modal-search">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="search-block">
                                <input className="search" />
                                <i className="fa fa-search" />
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>RECENT ISSUES</p>
                            <div style={{ display: 'flex' }}>
                                <div className="icon">
                                    <i className="fa fa-bookmark" />
                                </div>
                                <div>
                                    <p>cyberlearn</p>
                                    <p>BUG-238066</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title d-flex">
                                <i className="fa fa-bookmark pt-2 pr-2 " />
                                <select className="form-control" defaultValue={taskDetailModel.typeId} name="typeId" onChange={(e) => { handleChange(e) }}>
                                    {typeTaskArr?.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.taskType}</option>
                                    })}
                                </select>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}
                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={require("../../../assets/img/download (1).jfif").default} alt='1' />
                                                </div>
                                                <div className="input-comment">
                                                    <input type="text" placeholder="Add a comment ..." />
                                                    <p>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                        <span>press
                                                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                            to comment</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={require("../../../assets/img/download (1).jfif").default} alt='2' />
                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </p>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lorem ipsum dolor sit amet, consectetur
                                                                adipisicing elit. Repellendus tempora ex
                                                                voluptatum saepe ab officiis alias totam ad
                                                                accusamus molestiae?
                                                            </p>
                                                            <div>
                                                                <span style={{ color: '#929398' }}>Edit</span>
                                                                •
                                                                <span style={{ color: '#929398' }}>Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>

                                            <select name="statusId" className="custom-select" value={taskDetailModel.statusId} onChange={(e) => {
                                                // dispatch(update_status_task_action(taskDetailModel.taskId,e.target.value,taskDetailModel.projectId,))
                                                handleChange(e)

                                            }}>
                                                {arrStatus.map((item, index) => {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                })}
                                            </select>

                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className="row">
                                                {taskDetailModel.assigness?.map((item, index) => {
                                                    return <div className="col-3" key={index} style={{ display: 'flex' }} className="item">
                                                        <div className="avatar">
                                                            <img src={item.avatar} alt={item.avatar} />
                                                        </div>
                                                        <i className="fa fa-times mt-2 ml-2" onClick={()=>{
                                                            dispatch({
                                                                type:HANDLE_CHANGE_TASK_POST_API_SAGA,
                                                                actionType : REMOVE_USER_TASK,
                                                                idUser : item.id
                                                            })
                                                        }} />
                                                    </div>
                                                })}
                                             
                                                <Select  className="my-2 ml-3" optionFilterProp='label' value="Add user" placeholder="Add user"  onChange={handleChangeSelect} style={{ width:  '35%' }}>
                                                    {dataUserSelect}
                                                </Select>
                                            </div>


                                        </div>
                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select className="form-control" name="priorityId" value={taskDetailModel.priorityId} onChange={(e) => {
                                                handleChange(e)
                                            }}>
                                                {arrPriority?.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                })}
                                            </select>

                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input type="text" name="originalEstimate" className="estimate-hours" defaultValue={taskDetailModel.originalEstimate} onChange={(e) => {
                                                handleChange(e)
                                            }}></input>

                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {renderTimeTracking()}
                                            <div style={{ color: '#929398' }}>Create at a month ago</div>
                                            <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
