import { React, useState, useEffect} from 'react';
import './Income.css'
import NavBar from '../utils/NavBar';

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
    const [ itemId, setItemId ] = useState('')

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
                setCategory('');
                setAmount('');
                getIncome(); // Refresh the income list after adding
                setIsModalOpen(false); // Close the modal
            } else {
                console.error('Failed to add income');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const editIncome = async (amount, source, date) => {
        const user_id = sessionStorage.getItem('user_id')
        const updatedIncome = {
            id: itemId,
            user_id: user_id, 
            amount: parseFloat(amount), // Ensure amount is a number
            source: source,
            date: date // Format date as needed
            }
            console.log("being sent:", itemId, user_id, amount, source, date)
        try {
            const response = await fetch(`http://localhost:5001/api/income`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(updatedIncome),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch incomes');
            }
    
            const data = await response.json();
            console.log('Fetched incomes:', data); // Log the fetched data
            getIncome(); // Update the state with the fetched incomes
        } catch (error) {
            console.error('Error fetching incomes:', error); // Handle errors appropriately
        }
    }

    const prefillModal = async (amount, source, date, id) => {
        setAmount(amount)
        setCategory(source)
        setItemId(id)
        setDate(new Date(date).toISOString().split('T')[0])
        setIsModalOpen(true)
        setEditing(true)
    }

    const deleteIncome = async (user_id, id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this income?")

        if (!confirmDelete) {return}
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

    const handleSubmit = async (amount, category, date) => {
        
        if (isEditing) {
            console.log("Editing")
            await editIncome(amount, category, date)
            setEditing(false)
        }
        else {await addIncome(amount, category, date)}
    }

    const totalIncome = incomes.reduce((accumulator, income) => {
        return accumulator + Number(income.amount); 
    }, 0);

    return (
        <>
        <NavBar />
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
                                        <button className='edit' onClick={() => prefillModal(income.amount, income.source, income.date, income.id)}>Edit</button>
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
                            <input type='number' placeholder='Amount' step={0.01} min={0} value={amount} onChange={(e) => setAmount(e.target.value)}/>
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
                    <button className='submit' onClick={() => {handleSubmit(amount, category, date)
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