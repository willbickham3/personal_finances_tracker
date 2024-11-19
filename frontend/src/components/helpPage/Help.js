import React from "react";
import NavBar from "../utils/NavBar";

import './Help.css'

const HelpPage = () => {
    return (
        <>
        <NavBar />
        <div className="help-container">
            <ul>
                <li>When income, expenses, or budgets are added they will show up on the summary page.</li>
                <li>In order to add income, click the income tab in your Nav Bar and then click the 'add new income' button.</li>
                <li>In order to add expenses, click the expenses tab in your Nav Bar and then click the 'add new expense' button.</li>
                <li>Customizing your budgets is easy! Navigate to the budgets page and add a new budget! Just click the 'add new budget' button on the budgets page.</li>
                <li>When you add everything you can click the summary tab to see a financial summary of your entries!</li>
            </ul>
        </div>
        </>
    )
}

export default HelpPage