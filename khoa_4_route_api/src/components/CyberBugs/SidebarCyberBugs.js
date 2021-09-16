import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    PlusCircleOutlined,
    SearchOutlined,
    UploadOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import FormCreateTask from '../Forms/FormCreateTask';

const { Header, Sider, Content } = Layout;
export default function SidebarCyberBugs() {
    const [state, setstate] = useState({ collapsed: true })
    const toggle = () => {
        setstate({
            collapsed: !state.collapsed,
        });
    };
    
    const [{height},setSize] = useState({height:window.innerHeight});
    useEffect(()=>{
        window.onresize =() =>{
            setSize({
            
                height:window.innerHeight
            })
        }
    },[])
    const dispatch = useDispatch()
    return (
        <Layout style={{flex:"none"}}>
            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{height:height}}>
                <div className="text-center" onClick={toggle}>
                <MenuOutlined style={{color : 'white',cursor:'pointer',fontSize:'25px'}} />
                </div>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusCircleOutlined />} onClick ={() =>{
                        dispatch({
                            type : 'OPEN_FORM_EDIT_PROJECT',
                            Component : <FormCreateTask />,
                            title : 'Create Task'
                        })
                    }}>
                        Create task
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined />}>
                        Search
                    </Menu.Item>
                  
                </Menu>
            </Sider>
            
        </Layout>
    )
}
