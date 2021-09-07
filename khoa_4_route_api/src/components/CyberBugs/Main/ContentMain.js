import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, TASK_DETAIL_MODAIL_SAGA } from '../../../redux/types/CyberBugsTypes';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { update_status_task_action } from '../../../redux/actions/CyberBugsAction';
export default function ContentMain(props) {
    const dispatch = useDispatch()
    const { projectDetail } = props;
    
    useEffect(() => {
        dispatch({
            type: GET_USER_BY_PROJECT_ID,
            dataUserProject: projectDetail.members
        })
    })
    const handdleDragEnd = (result) => {
        console.log(result)
        let {projectId, taskId} =JSON.parse(result.draggableId)
    
        let {source,destination} = result
        if(!result.destination){
            return
        }
        if(source.index === destination.index && source.droppableId === destination.droppableId){
            return 
        }
  
        dispatch(update_status_task_action(taskId,destination.droppableId,projectId))
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handdleDragEnd}>
            {

                projectDetail.lstTask?.map((taskListDetail, index) => {
                    return <Droppable droppableId={taskListDetail.statusName} key={index}>
                        {(provided) => {
                            return <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="card pb-2" style={{ width: '15rem', height: 'auto' }} key={index} >
                                <div className="card-header">
                                    {taskListDetail.statusName}
                                </div>
                                <ul

                                    className="list-group list-group-flush">
                                    {taskListDetail.lstTaskDeTail.map((item, index) => {

                                        return <Draggable key={item.taskId.toString()} index={index} draggableId={JSON.stringify({projectId:item.projectId,taskId: item.taskId})}>
                                            {(provided) => {
                                                return <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={index} className="list-group-item " data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                        dispatch({
                                                            type: TASK_DETAIL_MODAIL_SAGA,
                                                            taskId: item.taskId
                                                        })
                                                    }}>
                                                    <p className="font-weight-bold">
                                                        {item.taskName}
                                                    </p>
                                                    <div className="block" style={{ display: 'flex' }}>
                                                        <div className="block-left">
                                                            <p className="text-danger">{item.priorityTask.priority}</p>
                                                        </div>
                                                        <div className="block-right">
                                                            <div className="avatar-group" style={{ display: 'flex' }}>
                                                                {item.assigness.map((item1, index) => {
                                                                    return <div className="avatar" key={index}>
                                                                        <img src={item1.avatar} alt={item1.avatar} />
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            }}
                                        </Draggable>
                                    })}

                                    {provided.placeholder}
                                </ul>
                            </div>
                        }}
                    </Droppable>

                })
            }
        </DragDropContext>

    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}

        </div>
    )
}
