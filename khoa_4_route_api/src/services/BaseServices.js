import Axios from "axios"
import { ACCESS_TOKEN, DOMAIN_CYBERBUG } from "../util/constants/settingSystem"
export class BaseServices {
    put = (url, model) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'PUT',
            data: model,
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    post = (url, model) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'POST',
            data: model,
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    get = (url) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'GET',
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    delete = (url) =>{
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'DELETE',
            headers : {'Authorization' :'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
}