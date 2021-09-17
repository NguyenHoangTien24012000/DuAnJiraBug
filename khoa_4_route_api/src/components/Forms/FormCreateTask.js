
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,connect } from 'react-redux';
import { Select, Slider } from 'antd';
import { CREATE_TASK_SAGA, GET_USER_BY_PROJECT_ID_SAGA } from '../../redux/types/CyberBugsTypes';


import { withFormik, yupToFormErrors } from 'formik';
import { get_all_project_action } from '../../redux/actions/ProjectAction';
import { get_task_type_action } from '../../redux/actions/TaskTypeAction';
import { status_all_action } from '../../redux/actions/StatusAction';
import { get_priority_action } from '../../redux/actions/PriorityAction';
import { get_user_action } from '../../redux/actions/UsersAction';
function FormCreateTask(props) {
    const { project } = useSelector(state => state.ProjectCyberBugsReducer)
    const { typeTaskArr } = useSelector(state => state.TypeProjectCyberBugs)
    const { arrPriority } = useSelector(state => state.GetArrPriority)
    const { dataUser,dataUserProject } = useSelector(state => state.GetUserCyberBugsReducer)
    const {arrStatus} = useSelector(state => state.GetStausAllReducer)
    const dispatch = useDispatch()
    const [disabled, setdisabled] = useState(false)
    const [timeTracking, settimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0

    })

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setInitialValue,
        setFieldValue
    } = props;

    const handleEditorChange = (content, editor) => {
        setFieldValue('description',content)
    }

     const dataUserbyPorjectId = dataUserProject?.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const handleChangeSelect = (value) => {
        // console.log(`Selected: ${value}`);
        setFieldValue('listUserAsign',value)
    }


    useEffect(() => {
        dispatch(get_all_project_action())
            
        dispatch(get_task_type_action())
        dispatch(get_priority_action())
        dispatch(get_user_action(''))
        dispatch(status_all_action())
        dispatch({
            type : "SET_SUBMIT_CREATE_TASK",
            submitFunction : handleSubmit
        })
    }, [])
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <p className="font-weight-bold">Project</p>
                    <select name="projectId" style={{ width: '47%' }} className="form-control" onChange = {(e) =>{
                        setFieldValue('projectId', e.target.value)
                        dispatch({
                            type : GET_USER_BY_PROJECT_ID_SAGA,
                            idProject :  e.target.value
                        })
                    }}>
                        {project?.map((item, index) => {
                            return <option key={index} value={item.id}>{item.projectName}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <p className="font-weight-bold">Task Name</p>
                    <input className="form-control" name="taskName" onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <p>Status</p>
                    <select name="statusId" className="form-control" onChange={handleChange}>
                        {arrStatus?.map((item,index)=>{
                            return <option key = {index} value = {item.statusId}>{item.statusName}</option>
                        })}
                    </select>
                </div>
                <div className='form-group row'>
                    <div className="col-6">
                        <p className="font-weight-bold">Task Type</p>
                        <select className="form-control" name="typeId" onChange={handleChange}>
                            {typeTaskArr?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p className="font-weight-bold">PriorityId</p>
                        <select className="form-control" name="priorityId"  onChange={handleChange}>
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>

                    </div>
                </div>
                <div className="form-group">
                    <p className="font-weight-bold">Assignees</p>
                    <Select
                        mode="multiple"
                        options={dataUserbyPorjectId}
                        placeholder="Select user"
                        optionFilterProp='label'
                        onChange={handleChangeSelect}
                        style={{ width: '100%' }}
                    >
                    </Select>
                </div>
                <div className="form-group" >
                    <p className="font-weight-bold">Time Tracking</p>
                    <Slider value={timeTracking.timeTrackingSpent} disabled={disabled} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                    <div className="d-flex justify-content-between ">
                        <span className="text-success">{timeTracking.timeTrackingSpent}h logged</span>
                        <span className="text-danger">{timeTracking.timeTrackingRemaining}h remaining</span>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <p>Time Spent(hour)</p>
                            <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                settimeTracking({
                                    ...timeTracking,
                                    timeTrackingSpent: e.target.value
                                })
                                setFieldValue('timeTrackingSpent', e.target.value)
                            }}></input>
                        </div>
                        <div className="col-6">
                            <p>Time remaining(hour)</p>
                            <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                settimeTracking({
                                    ...timeTracking,
                                    timeTrackingRemaining: e.target.value
                                })
                                setFieldValue('timeTrackingRemaining', e.target.value)
                            }}></input>
                        </div>
                    </div>
                    <p className="mt-3">Original Estimate</p>
                    <input type="number" defaultValue="0" min="0" className="form-control" name="originalEstimate" onChange={handleChange}></input>
                </div>
                <div className="form-group" >
                    <p className="font-weight-bold">Description</p>

                    <Editor

                        name="description"

                        initialValue=""
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
            </form>
        </div>
    )


}
const formCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log(props)
        const {project,typeTaskArr,arrPriority,arrStatus} = props
        return {
            taskName : '',
            description : '',
            statusId:arrStatus[0]?.statusId ,
            originalEstimate: 0,
            timeTrackingSpent:0,
            timeTrackingRemaining:0,
            projectId: project[0]?.id,
            typeId : typeTaskArr[0]?.id,
            priorityId : arrPriority[0]?.priorityId,
            listUserAsign : []
        }
    },
  
    // Custom sync validation
    validationSchema: Yup.object().shape({
        taskName: Yup.string().required('TaskName is required!!'),
        description: Yup.string().required('Description is required!!')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type : CREATE_TASK_SAGA,
            valueTask : values
        })
        // console.log('values',values)
    },

    displayName: 'CreateTaskForm',
})(FormCreateTask);

const mapStateToProps = (state) =>{
    return {
        project : state.ProjectCyberBugsReducer.project,
        typeTaskArr : state.TypeProjectCyberBugs.typeTaskArr,
        arrPriority : state.GetArrPriority.arrPriority,
        dataUser : state.GetUserCyberBugsReducer.dataUser,
        arrStatus : state.GetStausAllReducer.arrStatus
    }
}

export default connect(mapStateToProps)(formCreateTask);
