import { React} from 'react';
import { Link } from 'react-router-dom';
import './summaryPage.css'
import NavBar from '../utils/NavBar';

const SummaryPage = () => {
    return (
        <>
        <NavBar />
        </>
    )
}

const GetUserId = () => {
  const user_id = sessionStorage.getItem('user_id')
  return (
    <div>{user_id}</div>
  )
}

export default SummaryPage