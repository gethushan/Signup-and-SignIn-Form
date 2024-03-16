import React from 'react'
import {useState} from 'react'
import Axios from 'axios'
import "./reg.css";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const schema = yup.object().shape({
        Email: yup.string().email().required(),
        Password: yup.string().min(8)
                    .matches(/(?=.*[a-z])/,'Atleast one Lowercase required')
                    .matches(/(?=.*[A-Z])/,'Atleast one Uppercase required')
                    .matches(/(?=.*[0-9])/,'Atleast one Numeric Character required')
                    .matches(/(?=.*[!@#$%^&*])/,'Atleast one Specialcharacter required').max(20).required(),
        Confirm_Password: yup.string().oneOf([yup.ref("Password"),null],"Password must match").required(),
    })
    
    const {register, handleSubmit,formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })

const allowLogin = (event) => {
    Axios.post('https://signup-and-signin.vercel.app/j/register',{
      email,
      password,
     }).then(() =>{
        window.location.replace("/login");
    }).catch(err =>{
        const errr = err.response.data
        document.getElementById('merr').innerHTML = errr
    })
  }
    return(
        <div className='main'>
            <div className='glass'>
                <div className='title'>
                    Register
                </div>
                <form onSubmit={handleSubmit(allowLogin)} >
                    <div className='forum'>
                        <br></br>
                        <label htmlFor='Em'>Email:</label>
                        <input id='Em' type="text" placeholder="Email..." {...register("Email")}  onChange={(event) => {setEmail(event.target.value)}}/>
                        <p id='merr' className='db'>{errors.Email?.message}</p>
                        <label htmlFor='Ps'>Password:</label>
                        <input id='Ps' type="password" placeholder="Password..." {...register("Password")} onChange={(event) => {setPassword(event.target.value)}}/>
                        <p className='db'>{errors.Password?.message}</p>
                        <label htmlFor='cPs'>Password:</label>
                        <input id='cPs' type="password" placeholder="Confirm Password..." {...register("Confirm_Password")} />
                        <p className='db'>{errors.Confirm_Password?.message}</p><br></br>
                        <button type="submit" >Register</button><br></br>
                        <a className='log' href="./login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register;