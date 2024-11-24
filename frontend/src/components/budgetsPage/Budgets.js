import { React, useState, useEffect} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import NavBar from '../utils/NavBar';
import PopupModal from '../utils/Modal';

import './Budgets.css'
import dollar_icon from '../Assets/dollar_icon.svg'
import category_icon from '../Assets/category_icon.svg'

const BudgetPage = () => {
    const [ budgets, setBudgets ]               = useState([])
    const [ currentAmount, setCurrentAmount ]   = useState('')
    const [ isModalOpen, setIsModalOpen ]       = useState(false)
    const [ isEditing, setEditing ]             = useState(false)
    const [ amount,   setAmount ]               = useState('')
    const [ category, setCategory ]             = useState('')
    const [ date,     setDate ]                 = useState('')
    const [ itemId, setItemId ]                 = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        getBudgets(); // Fetch Budgets when the component mounts
    }, []); // Empty dependency array means this runs once on mount

    const getBudgets = async () => {
        const user_id = sessionStorage.getItem('user_id')
        console.log(user_id)
        try {
            const response = await fetch(`https://personal-finances-tracker.onrender.com/api/budgets/${user_id}`, {
                method: 'GET', 
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch Budgets');
            }
    
            const data = await response.json();
            console.log('Fetched Budgets:', data); // Log the fetched data
            setBudgets(data); // Update the state with the fetched Budgets
        } catch (error) {
            console.error('Error fetching Budgets:', error); // Handle errors appropriately
        }
    };

    const addBudget = async (currentAmount, amount, category, date) => {
        console.log(currentAmount, amount, category, date)
        try {
            const user_id = sessionStorage.getItem('user_id')
            const newBudget = {
                user_id,
                current_amount: parseFloat(currentAmount), 
                amount: parseFloat(amount), // Ensure amount is a number
                category: category,
                date: date // Format date as needed
            };
            const response = await fetch('https://personal-finances-tracker.onrender.com/api/budgets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Include token
                },
                body: JSON.stringify(newBudget),
            });
    
            if (response.ok) {
                console.log('success')
                setCategory('');
                setCurrentAmount('');
                setAmount('');
                getBudgets(); // Refresh the expense list after adding
                setIsModalOpen(false); // Close the modal
            } else {
                console.error('Failed to add budget');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const editBudget = async (currentAmount, amount, category, date) => {
        const user_id = sessionStorage.getItem('user_id')
        const updatedexpense = {
            id: itemId,
            user_id: user_id,
            current_amount: currentAmount, 
            amount: parseFloat(amount), // Ensure amount is a number
            category: category,
            date: date // Format date as needed
            }
            console.log("being sent:", itemId, user_id, currentAmount, amount, category, date)
        try {
            const response = await fetch('https://personal-finances-tracker.onrender.com/api/budgets/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(updatedexpense),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
    
            const data = await response.json();
            console.log('Fetched expenses:', data); // Log the fetched data
            getBudgets(); // Update the state with the fetched expenses
        } catch (error) {
            console.error('Error fetching expenses:', error); // Handle errors appropriately
        }
    }

    const prefillModal = async (currentAmount, amount, category, date, id) => {
        setCurrentAmount(currentAmount)
        setAmount(amount)
        setCategory(category)
        setItemId(id)
        setDate(new Date(date).toISOString().split('T')[0])
        setIsModalOpen(true)
        setEditing(true)
    }

    const deleteBudget = async (user_id, id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this budget?")

        if (!confirmDelete) {return}
        try {
            const response = await fetch(`https://personal-finances-tracker.onrender.com/api/budgets/${user_id}/${id}`, {
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                // },
            });
    
            if (response.ok) {
                getBudgets(); // Refresh the expense list after deletion
            } else {
                console.error('Failed to delete budget');
            }
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    }

    const handleSubmit = async (currentAmount, amount, category, date) => {
        
        if (isEditing) {
            console.log("Editing")
            await editBudget(currentAmount, amount, category, date)
            setEditing(false)
        }
        else {await addBudget(currentAmount, amount, category, date)}
    }

    return (
        <>
        <NavBar />
        <div className='container'>
            <div className='header'>
                    <div className='text'>Budgets</div>
                    <div className='underline'></div>
                </div>
                <table className="budget-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Current Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((budget) => (
                            <tr key={budget.id}>
                                <td>${Number(budget.current_amount)}</td>
                                <td>${Number(budget.amount).toFixed(2)}</td>
                                <td>{budget.category}</td>
                                <td>{new Date(budget.date).toLocaleDateString()}</td>
                                <td>
                                    <div className='action-container'>
                                        <button className='edit' onClick={() => prefillModal(budget.current_amount, budget.amount, budget.category, budget.date, budget.id)}>Edit</button>
                                        <button className='delete' onClick={() => deleteBudget(budget.user_id, budget.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* <tr><td>Total expense: ${totalexpense.toFixed(2)}</td></tr> */}
                    </tbody>
                </table>
                <button className='add-budget' onClick={() => {openModal()
                    setCurrentAmount('')
                    setAmount('')
                    setCategory('')
                    setDate('')}
                }>Add New Expense</button>
                <PopupModal isOpen={isModalOpen} onClose={closeModal} title="Add New Budget">
                    <div className='inputs'>
                        <div className='input'>
                            <img src={dollar_icon} alt='' />
                            <input type='number' placeholder='Current Amount' step={0.01} min={0} value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)}/>
                        </div>
                        <div className='input'>
                            <img src={dollar_icon} alt='' />
                            <input type='number' placeholder='Amount' step={0.01} min={0} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                        <div className='input'>
                            <img src={category_icon} alt='' />
                            <input type='text' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/>
                        </div>
                        <div className='input'>
                            {/* <img src={calendar_icon} alt='' /> */}
                            <input type='date' placeholder='' value={date} onChange={(e) => {setDate(e.target.value)
                                console.log(date)
                            }}/>
                        </div>
                        {/* <div className='edit'><img src={edit_icon} alt='' /></div>
                        <div className='delete'><img src={delete_icon} alt=''/></div> */}
                    </div>
                    <button className='submit' onClick={() => {handleSubmit(currentAmount, amount, category, date)
                        closeModal()
                    }}>Submit</button>
                </PopupModal>

            </div>
        </>
    )
}

export default BudgetPage