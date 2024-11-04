import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'
import user_icon from '../Assets/user_icon.svg'
import email_icon from '../Assets/email_icon.svg'
import password_icon from '../Assets/password_icon.svg'


const LoginPage = () => {

    const [ page, setPage ] = useState("Login");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate()


    const handleLoginClick = async () => {
        if (page ==="Login") {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                });
            
                const data = await response.json();
                
                if (response.ok) {
                  console.log("Login Successful!");
                  console.log(data.user_id)
                  sessionStorage.setItem('user_id', data.user_id)
                  navigate('/home')
                //   sessionStorage.setItem('authToken', data.token)
                  // Handle success, such as redirecting to a login page or showing a success message
                } else {
                  console.error("Wrong Email or Password!", data);
                  // Handle error, such as displaying an error message to the user
                }
              } catch (error) {
                console.error("Error Logging In", error);
                // Handle network errors
              }
            console.log(name, email, password)
        } else {
            document.querySelector('#name').style.display = 'none';
            setPage("Login")}
    }

    const handleSignUpClick = async () => {
        if (page ==="Sign Up") {
            try {
                const response = await fetch('http://localhost:5000/api/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                });
            
                const data = await response.json();
                
                if (response.ok) {
                  console.log("User created successfully:", data);
                  // Handle success, such as redirecting to a login page or showing a success message
                } else {
                  console.error("Failed to create user:", data);
                  // Handle error, such as displaying an error message to the user
                }
              } catch (error) {
                console.error("Error creating user:", error);
                // Handle network errors
              }
            console.log(name, email, password)
        } else {
            document.querySelector('#name').style.display = 'flex';
            setPage("Sign Up")}
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='login-inputs'>
                <div className='login-input' id='name' style={{display:'none'}}>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='login-input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='login-input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='forgot-password'>Forgot Your Password? <span>Click Here!</span></div>
            <div className='submit-container'>
                <div className={page==="Login"?"submit gray":"submit"} onClick={handleSignUpClick}>Sign Up</div>
                <div className={page==="Sign Up"?"submit gray":"submit"} onClick={handleLoginClick}>Login</div>
            </div>
        </div>
    )
}

export default LoginPage