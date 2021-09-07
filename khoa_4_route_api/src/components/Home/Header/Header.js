import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <a className="navbar-brand" href="/">CyberLearn</a>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/todolistrfc">ToDoListRFC</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/todolist">ToDoListRCC</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/todolistredux">ToDoListRedux</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/todolistsaga">ToDoListSaga</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/demodrapdrop">DrapDrop</NavLink>
                        </li>
                    </ul>
                    <div className="btn-group">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            This dropdown's menu is right-aligned
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/demohocmodal">Demo HocModal</NavLink>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}
