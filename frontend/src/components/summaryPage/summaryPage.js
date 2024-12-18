import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './summaryPage.css'
import NavBar from '../utils/NavBar';
import dollar_icon from '../Assets/dollar_icon.svg'
import category_icon from '../Assets/category_icon.svg'
import { card } from '../utils/Card';

const SummaryPage = () => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
      const user_id = sessionStorage.getItem('user_id')
      const fetchData = async () => {
          try {
              const incomesResponse  = await fetch(`https://personal-finances-tracker-1.onrender.com/api/income/${user_id}`); // Replace with your incomes API endpoint
              const expensesResponse = await fetch(`https://pft-expenses-service.onrender.com/api/expenses/${user_id}`); // Replace with your expenses API endpoint
              const budgetsResponse  = await fetch(`https://pft-budget-service.onrender.com/api/budgets/${user_id}`); // Replace with your budgets API endpoint

              const incomesData  = await incomesResponse.json();
              const expensesData = await expensesResponse.json();
              const budgetsData  = await budgetsResponse.json();

              incomesData.forEach(entry => {
                console.log(entry)
                entry['type'] = 'income'
              });

              console.log(incomesData)

              setIncomes(incomesData);
              setExpenses(expensesData);
              setBudgets(budgetsData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

    let totalIncome;
    let totalExpenses
    let totalBudgets;
    if (incomes.length > 0 && expenses.length > 0 && budgets.length > 0){
      totalIncome = incomes.reduce((accumulator, income) => {
          return accumulator + Number(income.amount); 
      }, 0);
      totalExpenses = expenses.reduce((accumulator, expense) => {
        return accumulator + Number(expense.amount); 
      }, 0);
      totalBudgets = budgets.map((budget) => (
        <tr key={budget.id}>
            <td>${Number(budget.current_amount).toFixed(2)} / ${Number(budget.amount).toFixed(2)}</td>
            {/* <td>${Number(budget.amount).toFixed(2)}</td> */}
            <td>{budget.category}</td>
        </tr>
      ))
    
    }
    else {
      totalIncome = 0
      totalExpenses = 0
      totalBudgets = <tr>
      <td></td>
      <td></td>
      <td></td>
      </tr>
    }

    const ProgressBar = ({ currentAmount, totalAmount}) => {
      const progress = ((Number(currentAmount) / Number(totalAmount)) * 100)
      console.log('Progress: ', (Number(currentAmount) / Number(totalAmount)), 'Current Amount: ', currentAmount, 'Total Amount: ', totalAmount)
      console.log(progress)
      let bgColor;
      if (progress > 80) {
        bgColor = 'red'
      }
      else if (progress > 50) {
        bgColor = 'yellow'
      }
      else {
        bgColor = 'green'
      }
      return (
        <div className='progress-bar-container' style={{ width: '100%', backgroundColor:'white', borderRadius: '10px'}}>
          <div className='progress-bar'
            style={{
              width: `${progress}`,
              height: '100%',
              backgroundColor: `${bgColor}`,
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}>
          </div>
        </div>
      )
    }

    const BudgetCard = ({ budget }) => {
      console.log(budget)
      console.log(budget.current_amount, budget.amount)
      return (
        <div className="budget-card">
          <h4>{budget.category}</h4>
          <p>
            {budget.current_amount} / {budget.amount}
          </p>
          <ProgressBar currentAmount={budget.current_amount} totalAmount={budget.amount} />
        </div>
      )
    }
    

    return (
        <>
        <NavBar />
        <div className='summary-container'>
          <div className='totalIncome'>Total Income: ${totalIncome.toFixed(2)}</div>
          <div className='totalExpenses'>Total Expenses: ${totalExpenses.toFixed(2)}</div>
          <button onClick={() => {console.log('hi')}}></button>
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
            // <div key={budget.id} className='progress-bar'>
            //   <div id={`progress`} stylffe={{
            //     width: `${((Number(budget.current_amount) / Number(budget.amount)) * 100).toFixed(2)}%`,
            //     height: '100%',
            //     backgroundColor: '#4caf50',
            //     borderRadius: '10px',
            //     transition: 'width 0.3s ease'
            //   }}></div>
            // </div>
          ))}
          <table className="budget-summary">
                    <thead>
                    <th className='summaryHead' colSpan="2">Budgets</th>
                        <tr>
                            <th>Status</th>
                            <th>Category</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                      {totalBudgets}
                        {/* <tr><td>Total expense: ${totalexpense.toFixed(2)}</td></tr> */}
                    </tbody>
                </table>
        </div>
        </>
    )
}

const GetUserId = () => {
  const user_id = sessionStorage.getItem('user_id')
  return (
    <div>{user_id}</div>
  )
}

export default SummaryPage