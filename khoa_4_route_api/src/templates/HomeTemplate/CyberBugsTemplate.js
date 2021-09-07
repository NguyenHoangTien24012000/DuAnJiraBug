import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import ContentMain from '../../components/CyberBugs/Main/ContentMain';
import HeaderMain from '../../components/CyberBugs/Main/HeaderMain';
import InfoMain from '../../components/CyberBugs/Main/InfoMain';
import MenuCyberBugs from '../../components/CyberBugs/MenuCyberBugs';
import ModalCyberBugs from '../../components/CyberBugs/ModalCyberBugs/ModalCyberBugs';
import SidebarCyberBugs from '../../components/CyberBugs/SidebarCyberBugs';
import Header from '../../components/Home/Header/Header';
import '../../index.css';

export const CyberBugsTemplate = (props) => {

    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return (
            <div className="jira">
                <SidebarCyberBugs />
                <MenuCyberBugs />
                <Component {...propsRoute} />
                <ModalCyberBugs />
            </div>
        )
    }} />
}