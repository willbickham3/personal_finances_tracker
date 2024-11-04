import { React, useState} from 'react';

import NavBar from '../utils/NavBar';

const BudgetPage = () => {
    const [ budget, setBudget ] = useState('')

    return (
        <>
        <NavBar />
        </>
    )
}

export default BudgetPage