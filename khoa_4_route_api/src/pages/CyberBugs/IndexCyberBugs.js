import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ContentMain from '../../components/CyberBugs/Main/ContentMain'
import HeaderMain from '../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../components/CyberBugs/Main/InfoMain'
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/types/CyberBugsTypes'


export default function IndexCyberBugs(props) {

  let { projectDetail } = useSelector(state => state.ProjectEditReducer)


  const dispatch = useDispatch()
  useEffect(()=>{
    const {projectId} = props.match.params;
 
    dispatch({
      type : GET_PROJECT_DETAIL_SAGA,
      projectId : projectId
    })
  },[])

  return (
    <div className="main">
      <HeaderMain projectDetail = {projectDetail} />
      <InfoMain projectDetail = {projectDetail} />
      <ContentMain projectDetail = {projectDetail}  />


    </div>
  )
}
