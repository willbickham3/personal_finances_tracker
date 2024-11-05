import profile_icon from '../Assets/profile_icon.svg'
import {React} from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()

  const Logout = () => {
      const logoutConfirmation = window.confirm('Logout?')
      if (!logoutConfirmation) {return}
      console.log(sessionStorage.getItem('authToken'))
      sessionStorage.removeItem('authToken')
      console.log(sessionStorage.getItem('authToken'))
      navigate('/')
    
    }
    return (
        <>
        <nav className="navbar">
      <div className="navbar-container">
        <div className='nav-item logo'>Personal Finances Tracker</div>
            <div className='nav-item'><Link to="/home" className="nav-link">
                  Summary
                </Link></div>
            <div className='nav-item'><Link to="/income" className="nav-link">
                  Incomes
                </Link></div>
            <div className='nav-item'><Link to="/expenses" className="nav-link">
                  Expenses
                </Link></div>
            <div className='nav-item'><Link to="/budgets" className="nav-link">
                  Budgets
                </Link></div>
            <div className='nav-item'><Link to="/help" className="nav-link">
              Help
            </Link></div>  
            <div className="nav-item" id="profile">
          <img src={profile_icon} alt="profile svg" onClick={Logout}/>
        </div>
        </div>
        </nav>
        </>
    )
}

export default NavBar