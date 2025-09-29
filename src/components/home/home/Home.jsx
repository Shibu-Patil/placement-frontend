import React, { useEffect } from 'react'
import Nav from '../nav/Nav'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loading/Loader';
import { getAllTrainersThunk } from '../../../slices/AuthSlice';

const Home = () => {
  let dispatch=useDispatch()
  useEffect(()=>{
    // console.log("hiiii");
    
    dispatch(getAllTrainersThunk())
  },[])
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