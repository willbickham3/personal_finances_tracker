import { React, useState, useEffect} from 'react';
import './summaryPage.css'
import NavBar from '../utils/NavBar';
import { Card } from '../utils/Card';

const SummaryPage = () => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
      const user_id = sessionStorage.getItem('user_id')
      const fetchData = async () => {
          try {
              // fetching user data
              const incomesResponse  = await fetch(`https://personal-finances-tracker-1.onrender.com/api/income/${user_id}`);
              const expensesResponse = await fetch(`https://pft-expenses-service.onrender.com/api/expenses/${user_id}`);
              const budgetsResponse  = await fetch(`https://pft-budget-service.onrender.com/api/budgets/${user_id}`);

              // Waiting for all of the data to be processed
              const incomesData  = await incomesResponse.json();
              const expensesData = await expensesResponse.json();
              const budgetsData  = await budgetsResponse.json();

              // Sets data for extrapolation
              setIncomes(incomesData);
              setExpenses(expensesData);
              setBudgets(budgetsData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

    let totalIncome = generateTotals(incomes)
    let totalExpenses = generateTotals(expenses)

    return (
        <>
        <NavBar />
        <div className='summary-container'>
          <h1 className='summaryHeader'>Financial Summary</h1>
          <section className='totalIncome'>Total Income: ${totalIncome}</section>
          <section className='totalExpenses'>Total Expenses: ${totalExpenses}</section>
          <section className='totalBudgets'>
            {budgets.map((budget) => (
              <Card key={budget.id} budget={budget} />
            ))}
          </section>
        </div>
        </>
    )
}

function generateTotals(data) {
  // Generates total amount of a passed data set
  let totalData;
  if (data.length > 0){
    totalData = data.reduce((accumulator, data) => {
        return accumulator + Number(data.amount); 
    }, 0);
  return totalData ? totalData.toFixed(2) : '0.00'
}}

export default SummaryPage