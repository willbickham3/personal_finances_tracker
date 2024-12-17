import Chart from 'chart.js/auto'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'

export async function grabData() {
    const user_id = sessionStorage.getItem('user_id')
    const incomesResponse  = await fetch(`https://personal-finances-tracker-1.onrender.com/api/income/${user_id}`);
    const expensesResponse = await fetch(`https://pft-expenses-service.onrender.com/api/expenses/${user_id}`);
    const budgetsResponse  = await fetch(`https://pft-budget-service.onrender.com/api/budgets/${user_id}`);

    const incomesData  = await incomesResponse.json();
    const expensesData = await expensesResponse.json();
    const budgetsData  = await budgetsResponse.json();
    return {incomesData, expensesData, budgetsData}
}

export async function generateSummariesAndCSV() {
    let {incomesData, expensesData, budgetsData} = await grabData()
    console.log(incomesData, expensesData, budgetsData)
    let dataToSend = []

    incomesData.forEach(entry => {
    entry['type'] = 'income'
    dataToSend.push(entry)
    });

    changeKeys(expensesData, 'expense', dataToSend)
    changeKeys(budgetsData, 'budget', dataToSend)

    try {
        const response = await fetch('http://localhost:5555/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        let fileNames = []
        const reportData = await response.json();
        console.log('Response: ', reportData)
        reportData.output_files.forEach(file => {
            fileNames.push(file)
        })
        return fileNames
    }
    catch (error) {
        console.log(error)
    }
}

function changeKeys(data, type, array) {
    data.forEach(entry => {
        entry['type'] = `${type}`
        entry['source'] = entry['category']
        entry['Amount'] = entry['amount']
        if (type === 'budget') {
            entry['currentAmount'] = entry['current_amount']}
        
        array.push(entry)
        });
        return array
}
