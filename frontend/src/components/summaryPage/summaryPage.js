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

    const currentProgress = (budget) => {
      let newProgressBarContainer = document.createElement('div')
      newProgressBarContainer.setAttribute('class', 'progress-bar')

      let newProgressBar = document.createElement('div')
      newProgressBar.setAttribute('id', `progress-${budget.id}`)

      let progress = ((Number(budget.current_amount) / Number(budget.amount)) * 100).toFixed(2)
      newProgressBar.style.width = `${progress}%`
      newProgressBar.style.height = '100%'
      newProgressBar.style.borderRadius = '10px'
      newProgressBar.style.transition = 'width 0.3s ease'
      newProgressBar.style.backgroundColor = '#4caf50'
      newProgressBarContainer.append(newProgressBar)
      return newProgressBarContainer

      //     height: '100%',
            //     backgroundColor: '#4caf50',
            //     borderRadius: '10px',
            //     transition: 'width 0.3s ease'
    }

    const budgetCards = (budget) => {
      let newCard = card(budget.category, budget.current_amount, budget.amount)
      let progress = currentProgress(budget)
      newCard.append(progress)

      return newCard
    }
    

    return (
        <>
        <NavBar />
        <div className='summary-container'>
          <div className='totalIncome'>Total Income: ${totalIncome.toFixed(2)}</div>
          <div className='totalExpenses'>Total Expenses: ${totalExpenses.toFixed(2)}</div>
          <button onClick={() => {(budgetCards(budgets[0]))}}></button>
          {budgets.map((budget) => (
            document.querySelector('.summary-container').append(budgetCards(budget))
            // <div key={budget.id} className='progress-bar'>
            //   <div id={`progress`} style={{
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