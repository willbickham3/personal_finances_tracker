// import './App.css';
import LoginPage from './components/loginPage/loginPage';
import SummaryPage from './components/summaryPage/summaryPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/home" element={<SummaryPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
