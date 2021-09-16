import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif").default} alt="1" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card mr-1" />
                    <NavLink to='/cyberbugs' className="text-dark" activeClassName="font-weight-bold">Cyber Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink to='/createproject' className="text-dark" activeClassName="font-weight-bold">Create Project</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink to='/projectmanagement' className="text-dark" activeClassName="font-weight-bold">Project Managenment</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-sign-in-alt"></i>
                    <NavLink to='/login' className="text-dark" activeClassName="font-weight-bold">Login</NavLink>
                </div>

            </div>
        </div>
    )
}
