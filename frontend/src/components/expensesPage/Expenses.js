import { React, useState} from 'react';

import NavBar from '../utils/NavBar';

const ExpensePage = () => {
    const [ expense, setExpense ] = useState('')

    return (
        <>
        <NavBar />
        </>
    )
}

export default ExpensePage