import { React, useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import NavBar from '../utils/NavBar';

const BudgetPage = () => {
    const [ budget, setBudget ] = useState('')
    const [ currentAmount, setCurrentAmount ] = useState('')
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isEditing, setEditing ] = useState(false)
    const [ amount,   setAmount ]   = useState('')
    const [ category, setCategory ] = useState('')
    const [ date,     setDate ]     = useState('')
    const [ itemId, setItemId ] = useState('')
    return (
        <>
        <NavBar />
        </>
    )
}

export default BudgetPage