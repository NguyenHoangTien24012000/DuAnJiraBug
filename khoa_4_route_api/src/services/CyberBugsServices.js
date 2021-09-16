import Axios from "axios"
import { ACCESS_TOKEN, DOMAIN_CYBERBUG } from "../util/constants/settingSystem"

export const cyberbugsService ={
    signinCyberBugs : (userLogin) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Users/signin`,
            method:'POST',
            data:userLogin
        })
    },
    createProjectCategory:(newProject) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Project/createProject`,
            method:'POST',
            data : newProject
        })
    },
    createProjectAuthorization : (newProject) =>{
      return Axios({
          url :`${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
          method : 'POST',
          data:newProject,
          headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
      })
    },
    getListProjectCyberBugs : () =>{
        return Axios({
            url :`${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method : 'GET',
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    },
    updateProject : (projectUpdate) =>{
        return Axios({
            url : `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method : 'PUT',
            data: projectUpdate,
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    }
}

