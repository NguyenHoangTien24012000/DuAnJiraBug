import React,{useState,useEffect} from 'react'
import { Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from 'antd'

const { Header, Footer, Sider, Content } = Layout;

export const UseLoginTemplate = (props) => {

    const [{width,height},setSize] = useState({width:Math.round(window.innerWidth),height:Math.round(window.innerHeight)});
    useEffect(()=>{
        window.onresize =() =>{
            setSize({
                width : Math.round(window.innerWidth),
                height:Math.round(window.innerHeight)
            })
        }
    },[])

    let { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <Fragment>
            <Layout>
                <Sider width={width/2} style={{height:height,backgroundImage :`url(https:picsum.photos/${Math.round(width/2)}/${Math.round(height)}`,alt : "123"}}>
               
                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>
        </Fragment>
    }} />
}