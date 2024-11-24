import { React, useState, useEffect} from 'react';
import PopupModal from '../utils/Modal'

import './Expenses.css'
import dollar_icon from '../Assets/dollar_icon.svg'
import category_icon from '../Assets/category_icon.svg'
import edit_icon from '../Assets/edit_icon.svg'
import delete_icon from '../Assets/delete_icon.svg'

import NavBar from '../utils/NavBar';

const ExpensePage = () => {
    const [ expenses, setExpenses] = useState([])
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isEditing, setEditing ] = useState(false)
    const [ amount,   setAmount ]   = useState('')
    const [ category, setCategory ] = useState('')
    const [ date,     setDate ]     = useState('')
    const [ itemId, setItemId ] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        getExpense(); // Fetch expenses when the component mounts
    }, []); // Empty dependency array means this runs once on mount

    const getExpense = async () => {
        const user_id = sessionStorage.getItem('user_id')
        console.log(user_id)
        try {
            const response = await fetch(`https://personal-finances-tracker.onrender.com/api/expenses/${user_id}`, {
                method: 'GET', 
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
    
            const data = await response.json();
            console.log('Fetched expenses:', data); // Log the fetched data
            setExpenses(data); // Update the state with the fetched expenses
        } catch (error) {
            console.error('Error fetching expenses:', error); // Handle errors appropriately
        }
    };

    const addExpense = async (amount, category, date) => {
        console.log(amount, category, date)
        if (category === ''){
            return window.alert('Please check the inputs and ensure you fill out every one.')
        }
        try {
            const user_id = sessionStorage.getItem('user_id')
            const newexpense = {
                user_id, 
                amount: parseFloat(amount), // Ensure amount is a number
                category: category,
                date: date // Format date as needed
            };
            const response = await fetch('https://personal-finances-tracker.onrender.com/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Include token
                },
                body: JSON.stringify(newexpense),
            });
    
            if (response.ok) {
                console.log('success')
                setCategory('');
                setAmount('');
                getExpense(); // Refresh the expense list after adding
                setIsModalOpen(false); // Close the modal
            } else {
                console.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const editExpense = async (amount, category, date) => {
        const user_id = sessionStorage.getItem('user_id')
        const updatedexpense = {
            id: itemId,
            user_id: user_id, 
            amount: parseFloat(amount), // Ensure amount is a number
            category: category,
            date: date // Format date as needed
            }
            console.log("being sent:", itemId, user_id, amount, category, date)
        try {
            const response = await fetch('https://personal-finances-tracker.onrender.com/api/expenses', {
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
            getExpense(); // Update the state with the fetched expenses
        } catch (error) {
            console.error('Error fetching expenses:', error); // Handle errors appropriately
        }
    }

    const prefillModal = async (amount, category, date, id) => {
        setAmount(amount)
        setCategory(category)
        setItemId(id)
        setDate(new Date(date).toISOString().split('T')[0])
        setIsModalOpen(true)
        setEditing(true)
    }

    const deleteExpense = async (user_id, id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this expense?")

        if (!confirmDelete) {return}
        try {
            const response = await fetch(`https://personal-finances-tracker.onrender.com/api/expenses/${user_id}/${id}`, {
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                // },
            });
    
            if (response.ok) {
                getExpense(); // Refresh the expense list after deletion
            } else {
                console.error('Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    }

    const handleSubmit = async (amount, category, date) => {
        
        if (isEditing) {
            console.log("Editing")
            await editExpense(amount, category, date)
            setEditing(false)
        }
        else {await addExpense(amount, category, date)}
    }

    const totalexpense = expenses.reduce((accumulator, expense) => {
        return accumulator + Number(expense.amount); 
    }, 0);

    return (
        <>
        <NavBar />
        <div className='container'>
            <div className='header'>
                    <div className='text'>Expenses</div>
                    <div className='underline'></div>
                </div>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>${Number(expense.amount).toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>
                                    <div className='action-container'>
                                        <button className='edit' onClick={() => prefillModal(expense.amount, expense.category, expense.date, expense.id)}>Edit</button>
                                        <button className='delete' onClick={() => deleteExpense(expense.user_id, expense.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr><td>Total expense: ${totalexpense.toFixed(2)}</td></tr>
                    </tbody>
                </table>
                <button className='add-expense' onClick={() => {openModal()
                    setAmount('')
                    setCategory('')
                    setDate('')}
                }>Add New Expense</button>
                <PopupModal isOpen={isModalOpen} onClose={closeModal} title="Add New Expense">
                    <div className='inputs'>
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
                    <button className='submit' onClick={() => {handleSubmit(amount, category, date)
                        closeModal()
                    }}>Submit</button>
                </PopupModal>

            </div>
        </>
    )
}

export default ExpensePage