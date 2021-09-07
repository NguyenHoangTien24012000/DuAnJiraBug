import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
const { Option } = Select;
export default function DrawerCyberBugs(props) {

    const {visible,componentContentDrawer,title,callBackSubmit } = useSelector(state => state.DrawerCyberBugsReducer)

    const dispatch = useDispatch()

    const showDrawer = () => {
        dispatch({
            type : 'OPEN_DRAWER'
        });
    };

    const onClose = () => {
        dispatch({
            type : 'CLOSE_DRAWER'
        });
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
                >
                {componentContentDrawer}
           
            </Drawer>
        </>
    )
}
