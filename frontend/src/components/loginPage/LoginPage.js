import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'
import user_icon from '../Assets/user_icon.svg'
import email_icon from '../Assets/email_icon.svg'
import password_icon from '../Assets/password_icon.svg'


const LoginPage = () => {

    const [ page, setPage ] = useState("Sign Up");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate()

    const wakeUp = async () => {
      let urls = [
        'https://personal-finances-tracker.onrender.com',
        'https://personal-finances-tracker-1.onrender.com',
        'https://pft-expenses-service.onrender.com',
        'https://pft-budget-service.onrender.com',
      ]
      try {
        const responses = await Promise.all(
          urls.map(url =>
            fetch(url)
              .then(res => console.log(`${url} - Status: ${res.status}`))
              .catch(err => console.error(`${url} - Error: ${err.message}`))
          )
        );
        console.log('All servers have been pinged!');
      } catch (error) {
        console.error('Error waking up servers:', error);
      
    };
    }
    
    const handleLoginClick = async () => {
        if (page ==="Login") {
            try {
                const response = await fetch('https://personal-finances-tracker.onrender.com/api/users/login', {
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
                  wakeUp()
                } else {
                  window.alert("Wrong Email or Password!", data);
                }
              } catch (error) {
                console.error("Error Logging In", error);
              }
            console.log(name, email, password)
        } else {
            document.querySelector('#name').style.display = 'none';
            setPage("Login")}
    }

    const handleSignUpClick = async () => {
        if (page ==="Sign Up") {
            const response = await fetch('https://b-emailvalidation.onrender.com/validate-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email
              }),
            });
            console.log(email)
            const validation = await response.json()
            console.log(validation)
            if (!validation.valid) {
              console.log("Email not valid!");
              return
            }
            
            try {
                const response = await fetch('https://personal-finances-tracker.onrender.com/api/users', {
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
                  navigate('/help')
                  wakeUp()
                } else {
                  console.error("Failed to create user:", data);
                }
              } catch (error) {
                console.error("Error creating user:", error);
              }
            console.log(name, email, password)
        } else {
            document.querySelector('#name').style.display = 'flex';
            setPage("Sign Up")}
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{page}</div>
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
            <div className='welcome-msg'><span>Simplify</span> your finances by tracking your income and expenses! Create budgets to make sure you <span>stay on track</span>. Start tracking with the Personal Finance Tracker <span className='bold'>TODAY!</span></div>
        </div>
    )
}

export default LoginPage