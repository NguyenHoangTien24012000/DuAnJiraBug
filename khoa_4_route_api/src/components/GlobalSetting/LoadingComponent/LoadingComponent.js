import React from 'react'
import  styleLoaing from './LoadingComponent.module.css'
import {useSelector} from 'react-redux'
export default function LoadingComponent() {

    const {isLoading} = useSelector(state => state.LoadingReducer)
    if(isLoading){
        return (
        
            <div className={styleLoaing.bgLoading} >
                <img src={require('../../../assets/imgLoading/eafloading.gif').default} />
            </div>
        )
    }else{
        return ''
    }
}
