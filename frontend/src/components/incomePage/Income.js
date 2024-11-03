import { React, useState, useEffect} from 'react';
import './Income.css'

import PopupModal from '../utils/Modal'

import dollar_icon from '../Assets/dollar_icon.svg'
import category_icon from '../Assets/category_icon.svg'
import edit_icon from '../Assets/edit_icon.svg'
import delete_icon from '../Assets/delete_icon.svg'

const IncomePage = () => {
    const [incomes, setIncomes] = useState([])
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isEditing, setEditing ] = useState(false)
    const [ amount,   setAmount ]   = useState('')
    const [ category, setCategory ] = useState('')
    const [ date,     setDate ]     = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleModal = () => {
        if (isEditing) {
            // editIncome()
        }
        else {
            addIncome(amount, category, date)
        }
    }

    useEffect(() => {
        getIncome(); // Fetch incomes when the component mounts
    }, []); // Empty dependency array means this runs once on mount

    const getIncome = async () => {
        const user_id = sessionStorage.getItem('user_id')
        console.log(user_id)
        try {
            const response = await fetch(`http://localhost:5001/api/income/${user_id}`, {
                method: 'GET', 
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch incomes');
            }
    
            const data = await response.json();
            console.log('Fetched incomes:', data); // Log the fetched data
            setIncomes(data); // Update the state with the fetched incomes
        } catch (error) {
            console.error('Error fetching incomes:', error); // Handle errors appropriately
        }
    };

    const addIncome = async (amount, source, date) => {
        console.log(amount, source, date)
        try {
            const user_id = sessionStorage.getItem('user_id')
            const newIncome = {
                user_id, 
                amount: parseFloat(amount), // Ensure amount is a number
                source: source,
                date: date // Format date as needed
            };
            const response = await fetch('http://localhost:5001/api/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Include token
                },
                body: JSON.stringify(newIncome),
            });
    
            if (response.ok) {
                console.log('success')
                // setIncomeSource('');
                // setIncomeAmount('');
                getIncome(); // Refresh the income list after adding
                // setIsModalOpen(false); // Close the modal
            } else {
                console.error('Failed to add income');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const modalContent = () => {}

    const prefillModal = async (amount, source, date) => {
        setAmount(amount)
        setCategory(source)
        setDate(new Date(date).toISOString().split('T')[0])
        setIsModalOpen(true)
        setEditing(true)
    }

    const deleteIncome = async (user_id, id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/income/${user_id}/${id}`, {
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                // },
            });
    
            if (response.ok) {
                getIncome(); // Refresh the income list after deletion
            } else {
                console.error('Failed to delete income');
            }
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    }

    const totalIncome = incomes.reduce((accumulator, income) => {
        return accumulator + Number(income.amount); // Ensure amount is a number
    }, 0); // Start at 0

    return (
        <>
        <div className='container'>
            <div className='header'>
                    <div className='text'>Income</div>
                    <div className='underline'></div>
                </div>
                <table className="income-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Source</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income) => (
                            <tr key={income.id}>
                                <td>${Number(income.amount).toFixed(2)}</td>
                                <td>{income.source}</td>
                                <td>{new Date(income.date).toLocaleDateString()}</td>
                                <td>
                                    <div className='action-container'>
                                        <button className='edit' onClick={() => prefillModal(income.amount, income.source, income.date)}>Edit</button>
                                        <button className='delete' onClick={() => deleteIncome(income.user_id, income.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr><td>Total Income: ${totalIncome.toFixed(2)}</td></tr>
                    </tbody>
                </table>
                <button className='add-income' onClick={() => {openModal()
                    setAmount('')
                    setCategory('')
                    setDate('')}
                }>Add New Income</button>
                <PopupModal isOpen={isModalOpen} onClose={closeModal} title="Add New Income">
                    <div className='inputs'>
                        <div className='input'>
                            <img src={dollar_icon} alt='' />
                            <input type='text' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                        <div className='input'>
                            <img src={category_icon} alt='' />
                            <input type='text' placeholder='Source' value={category} onChange={(e) => setCategory(e.target.value)}/>
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
                    <button className='submit' onClick={() => {addIncome(amount, category, date)
                        closeModal()
                    }}>Submit</button>
                </PopupModal>

            </div>
        </>
    )
}


// const AddIncome = () => {
//     return (
//             <div className='inputs'>
//                 <div className='input'>
//                     <img src={dollar_icon} alt='' />
//                     <input type='text' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
//                 </div>
//                 <div className='input'>
//                     <img src={category_icon} alt='' />
//                     <input type='text' placeholder='Source' value={category} onChange={(e) => setCategory(e.target.value)}/>
//                 </div>
//                 <div className='input'>
//                     {/* <img src={calendar_icon} alt='' /> */}
//                     <input type='date' placeholder='' value={date} onChange={(e) => setDate(e.target.value)}/>
//                 </div>
//                 {/* <div className='edit'><img src={edit_icon} alt='' /></div>
//                 <div className='delete'><img src={delete_icon} alt=''/></div> */}
//             </div>
//     )
// }

export default IncomePage