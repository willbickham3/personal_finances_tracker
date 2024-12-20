import { useState, useEffect } from "react";

export const Card = ({ budget }) => {
    // Takes in a budget entry and creates a card with its values
    return (
    <>
        <div className="budget-card">
          <h4>{budget.category}</h4>
          <p>
            {budget.current_amount} / <b>{budget.amount}</b>
          </p>
          <ProgressBar currentAmount={budget.current_amount} totalAmount={budget.amount}/>
        </div>
    </>
      )
}
const ProgressBar = ({ currentAmount, totalAmount }) => {
    const [width, setWidth] = useState(0);
    const progress = (Number(currentAmount) / Number(totalAmount)) * 100;
    const barColor = chooseBarColor(progress);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setWidth(progress);
      }, 100);
      return () => clearTimeout(timeout);
    }, [progress]);
  
    return (
      <div
        className="progress-bar-container"
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${width}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: '10px',
            transition: 'width 1.8s ease', // Smooth animation
          }}
        ></div>
      </div>
    );
  };

function chooseBarColor(progress) {
    let bgColor;
    if (progress > 100) {
      bgColor = 'red'
    }
    else if (progress > 80) {
      bgColor = 'orange'
    }
    else if (progress > 50) {
      bgColor = 'yellow'
    }
    else {
      bgColor = 'green'
    }
    return bgColor
}