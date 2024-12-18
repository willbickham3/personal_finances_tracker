import { useState } from "react"
import { set } from "mongoose"
import { generateSummariesAndCSV, grabData } from "../utils/visualize"

import './Reports.css'

const { default: NavBar } = require("../utils/NavBar")

const ReportsPage = () => {
    const [data, setData] = useState([])
    const displayData = async () => {
        console.log('Click')
        let response = await generateSummariesAndCSV()
        setData(response)
        console.log(response)

        return
    }

    const generatePDF = async () => {
        let data = await grabData()
        const response = await fetch('http://localhost:5007/pdf', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: data,
            }),
          });

        const pdfBlob = await response.blob();

        console.log(pdfBlob.size)
        const blobURL = window.URL.createObjectURL(pdfBlob)

        console.log(blobURL)
        const newTab = window.open();
        newTab.location.href = blobURL

        const link = document.createElement('a');
    link.href = blobURL;
    link.download = 'report.pdf';
    }

    return (
        <>
        <NavBar />
        <div className="reports-container">
            <button onClick={displayData}>Generate Graphs</button>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
        <div className="fileContainer">
            {data.map((filename, index) => (
                filename.endsWith('.png') ? <img key={index}
                src={`http://localhost:5555/output/${filename}`}
                alt={filename}
                style={{ width: '700px', margin: '10px' }}/> : <div key={index}>{filename}</div>
            ))}
        </div>
        </>
    )
}

export default ReportsPage