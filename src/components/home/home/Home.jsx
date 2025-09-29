import React from 'react'
import Nav from '../nav/Nav'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../loading/Loader';

const Home = () => {
const {loading}=useSelector((state)=>state.authReducer)
console.log(loading);

  return (
    <div>
        {
            loading && <Loader></Loader>
        }
        <Nav></Nav>
       <div className='h-[calc(100vh-4rem)] bg-white p-5 overflow-y-scroll'>
         <Outlet></Outlet>
       </div>
    </div>
  )
}

export default Home