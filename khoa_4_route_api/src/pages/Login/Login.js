import React,{useState} from 'react'
import { Prompt } from 'react-router';


export default function Login(props) {

    const [userLogin, setUserLogin] = useState({userName:'',passWord:'', status : false})
    
    const handleChange = (event) =>{
        const {name, value} = event.target;
        const newUserLogin ={
            ...userLogin,
            [name] : value
        }
        let valid = true;
        for(let key in newUserLogin){
            if(key !== 'status'){
                if(newUserLogin[key].trim() ===''){
                    valid = false
                }
            }
        }
        if(!valid){
            newUserLogin.status = true
        }else{
            newUserLogin.status = false
        }
        setUserLogin(newUserLogin)
      
    }


    const handleLogin = (event) =>{
        event.preventDefault();
        if(userLogin.userName === 'cyberlearn' && userLogin.passWord === 'cyberlearn'){
            //thanh cong thi chuyen va trang truoc do
            // props.history.goBack();
            //chuyen den trang chi dinh sau khi su ly
            // props.history.push('/home');
            //replace thay doi noi dung
            props.history.goBack();
            localStorage.setItem('userLogin', JSON.stringify(userLogin))
        }else{
            alert('Login fail!!')
        }
    }
    return (
        <form className='container' onSubmit = {handleLogin}>
            
            <h3 className="text-success">Login</h3>
            <div className='form-group'>
                <label>User Name</label>
                <input type='text' name='userName' className='form-control' onChange ={handleChange}></input>
            </div>
            <div className='form-group'>
                <label>PassWord</label>
                <input type='text' name='passWord' className='form-control' onChange ={handleChange}></input>
            </div>
            <div className='form-group'>
                <button className="btn btn-success">Dang nhap</button>
            </div>
            <Prompt when={userLogin.status} message ={(location) =>{
                return 'Bạn có chắc muốn rời khỏi trang này!!'
            }} />
            
        </form>

    )
}
