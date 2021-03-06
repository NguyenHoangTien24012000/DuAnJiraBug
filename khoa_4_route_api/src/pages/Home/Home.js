import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
    // console.log(props)
    const userLogin = useSelector(state => state.UserCyberBugReducer.userLogin)
    return (
        <div>
            {userLogin.name}
            <img src = {userLogin.avatar}/>
        </div>
    )
}
