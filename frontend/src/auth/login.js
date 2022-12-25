import React from 'react'
import {useState,} from 'react'
import Axios from 'axios'
import "./log.css";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const schema = yup.object().shape({
        Email: yup.string().email().required(),
        Password: yup.string().min(4).max(20).required(),
    })
    
    const {register, handleSubmit,formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })

const allowHome = (event) =>{
    Axios.post('http://localhost:4000/j/login',{
      email,
      password,
     }).then((response) =>{
        localStorage.setItem('auth',JSON.stringify(response.data))
        window.location.replace("/home");
    }).catch(err =>{
        const errr = err.response.data
        document.getElementById('merr').innerHTML = errr
        document.getElementById('perr').innerHTML = errr
    })
  }
    return(
        <div className='main'>
            <div className='glass'>
                <div className='title'>
                    Login
                </div>
                <form onSubmit={ handleSubmit(allowHome)} >
                    <div className='forum'>
                        <br></br>
                        <label htmlFor='Em'>Email:</label>
                        <input id='Em' type="text" placeholder="Email..." {...register("Email")} onChange={(event) => {setEmail(event.target.value)}}/>
                        <p id='merr' className='db'>{errors.Email?.message}</p>
                        <label htmlFor='Ps'>Password:</label>
                        <input id='Ps' type="password" placeholder="Password..." {...register("Password")} onChange={(event) => {setPassword(event.target.value)}}/>
                        <p id='perr' className='db'>{errors.Password?.message}</p><br></br>
                        <button type="submit" >Login</button><br></br>
                        <a className='reg' href="./register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;
