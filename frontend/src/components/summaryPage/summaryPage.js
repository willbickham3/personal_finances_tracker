import { React} from 'react';
import { Link } from 'react-router-dom';
import './summaryPage.css'

const SummaryPage = () => {
    return (
        <>
        <nav className="navbar">
      <div className="navbar-container">
        <div className='nav-item logo'>Personal Finances Tracker</div>
        <div className='nav-item'><Link to="/income" className="nav-link">
              Incomes
            </Link></div>
        <div className='nav-item'><Link to="/expenses" className="nav-link">
              Expenses
            </Link></div>
        <div className='nav-item'><Link to="/budgets" className="nav-link">
              Budgets
            </Link></div>
      </div>
    </nav>
        </>
    )
}

export default SummaryPage