// import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage    from './components/loginPage/LoginPage';
import SummaryPage  from './components/summaryPage/summaryPage'
import IncomePage   from './components/incomePage/Income'
import ExpensePage  from './components/expensesPage/Expenses'
import BudgetsPage  from './components/budgetsPage/Budgets'
import HelpPage from './components/helpPage/Help.js'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"         element={<LoginPage />}/>
        <Route path="/home"     element={<SummaryPage />}/>
        <Route path="/income"   element={<IncomePage />}/>
        <Route path="/expenses" element={<ExpensePage />}/>
        <Route path="/budgets"  element={<BudgetsPage />}/>
        <Route path="/help"     element={<HelpPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
