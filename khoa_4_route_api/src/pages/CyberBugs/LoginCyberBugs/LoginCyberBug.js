import React from 'react'
import { Input,Button } from 'antd';
import { UserOutlined ,LockOutlined,TwitterOutlined} from '@ant-design/icons';
import {Formik, withFormik,useFormik} from "formik"
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { USER_SIGNIN_API } from '../../../redux/types/CyberBugsTypes';
import { signin_cyberbug_action } from '../../../redux/actions/CyberBugsAction';
function LoginCyberBug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: window.innerHeight}}>
                <h3 className="text-center">Login CyberBugs</h3>
                
                <Input onChange={handleChange} className="mt-3" style={{width : "60%"}} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                <div className="text-danger">{errors.email}</div>
                
                
                <Input onChange={handleChange} className="mt-3"style={{width : "60%"}} name = "password" size="large" placeholder="password" type="password" prefix={<LockOutlined />} />
                <div className="text-danger">{errors.password}</div>
                <Button htmlType="submit" className="mt-4" style={{width:"60%"}} size="large"  type="primary">Login</Button>
                <div className="social mt-3 d-flex">
                    <Button  shape="circle" size="large"  style={{backgroundColor : 'rgb(59,89,152)'}}>
                        <span className="font-weight-bold" style={{color:'white'}}><i className="fab fa-facebook-f"></i></span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" icon ={<TwitterOutlined />} size ="large"></Button>

                </div>
            </div>

        </form>
    )
}
const LoginCyberWithFormik = withFormik({
    mapPropsToValues: () => ({ 
        email: '',
        password : '' 
    }),
  
    // Custom sync validation
    // validate: values => {
    //   const errors = {};
  
    //   if (!values.name) {
    //     errors.name = 'Required';
    //   }
  
    //   return errors;
    // },
    validationSchema: Yup.object().shape({
        email:Yup.string().required('Email is required!!').email("Email is invalid!"),
        password :Yup.string().required('Password is required!!').min(6,'password must have min 6 characters').max(32, 'password must have max 32 character')
    }),
    handleSubmit: (values, {props, setSubmitting }) => {
       
           let userLogin = {
                email : values.email,
                password : values.password
            }
      
        props.dispatch(signin_cyberbug_action(userLogin));
    },
  
    displayName: 'Login CyberBugs',
  })(LoginCyberBug);


export default connect ()(LoginCyberWithFormik)
