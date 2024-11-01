import { React, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'
import user_icon from '../Assets/user_icon.svg'
import email_icon from '../Assets/email_icon.svg'
import password_icon from '../Assets/password_icon.svg'


const LoginPage = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Name'/>
                </div>
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Address'/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password'/>
                </div>
            </div>
            <div className='forgot-password'>Forgot Your Password? <span>Click Here!</span></div>
            <div className='submit-container'>
                <div className='submit'>Sign Up</div>
                <div className='submit'>Login</div>
            </div>
        </div>
    )
}

export default LoginPage