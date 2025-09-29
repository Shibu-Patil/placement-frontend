import React, { useEffect, useState } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { MdOutlinePassword } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { userThunk } from '../../slices/AuthSlice';
import toast from 'react-hot-toast';




const Register = () => {
 const disptch=useDispatch()
    const {loading, error, isLogged}=useSelector((state)=>state.authReducer)
    
const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    rePassword:"",
    role:""
})
useEffect(() => {
  if (isLogged) {
    toast.success("Registered successfully!");
  }
  if (error) {
    toast.error(error);
  }
}, [isLogged, error]);

const handelChange=(e)=>{
    let {name,value}=e.target
    setFormData((preVal)=>({...preVal,[name]:value}))
}
const handelSubmit=(e)=>{
    e.preventDefault()
    let payload={email,password,username,role}
    console.log(payload);
    disptch(userThunk(payload))
}
let {email,password,rePassword,username,role}=formData
// console.log(email);

  return (
    <div className='size-full flex justify-center items-center bg-main-back bg-[url(/images/logo.png)] bg-contain bg-center bg-no-repeat'>
            <form action="" className='h-4/5 w-1/3  rounded-4xl animate-bgblur bg-white/40 shadow-2xl  overflow-scroll max-xl:w-1/2 max-md:w-4/5' onSubmit={handelSubmit}>
                    <div className='size-full p-14 flex flex-col gap-6 animate-inputShow'>
                        <div>
                            <h1 className='text-tiny font-bold flex justify-center items-center py-2'>
                                Registration Form
                            </h1>
                        </div>
                            <div className={`flex flex-col w-full h-[40px] bg-transparent border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200 ${email?"border-0 border-b-2 rounded-none":""}`}>
                              <div className='flex size-full absolute justify-center items-center px-2'>
                                  <input type="email" id='email' className='size-full outline-0' name='email' onChange={handelChange}/>
                                  <MdAlternateEmail />

                              </div>
                                <label htmlFor="email" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs  ${email?"top-[-10px] pl-2 text-xs":""}`}>Email</label>
                            </div>
                             <div className={`flex flex-col w-full h-[40px] bg-transparent border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none  transition-all duration-200 ${username?"border-0 border-b-2 rounded-none":""}`}>
                                <div className='flex size-full absolute justify-center items-center px-2'>
                                    <input type="text" id='username' className='size-full outline-0' onChange={handelChange} name='username'/>
                                    <CgRename />

                                </div>
                                <label htmlFor="username" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs  ${username?"top-[-10px] pl-2 text-xs":""}`}>User Name</label>
                            </div>
                             <div className={`flex flex-col w-full h-[40px] bg-transparent border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none  transition-all duration-200 ${password?"border-0 border-b-2 rounded-none":""}`}>
                               <div className='flex size-full absolute justify-center items-center px-2'>
                                 <input type="password" id='password' className='size-full outline-0' onChange={handelChange} name='password'/>
                                 <MdOutlinePassword />
                               </div>
                                <label htmlFor="password" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs  ${password?"top-[-10px] pl-2 text-xs":""}`}>Password</label>
                            </div>
                            <div className={`flex flex-col w-full h-[40px] bg-transparent border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none  transition-all duration-200 ${rePassword?"border-0 border-b-2 rounded-none":""}`}>
                                <div className='flex size-full absolute justify-center items-center px-2'>
                                    <input type="text"  id='rePassword' className='size-full outline-0' onChange={handelChange} name='rePassword'/>
                                    <BsArrowRepeat />

                                </div>
                                <label htmlFor="rePassword" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs  ${rePassword?"top-[-10px] pl-2 text-xs":""}`}>Re-enter Password</label>
                            </div>
                             <div className={`w-full h-[40px] border flex justify-center items-center rounded-2xl px-2 focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200 ${role?" border-0 border-b-2 rounded-none":""}`}>
                                <select  className='w-full outline-0 p-4 rounded-2xl' onChange={handelChange} name='role' >
                                    <option value="" disabled>select</option>
                                    <option value="trainer" className='p-2 rounded-2xl bg-main-back'>Trainer</option>
                                    <option value="trainer">Trainer</option>
                                    <option value="trainer">Trainer</option>
                                </select>
                            </div>
                            <div   className='flex w-full h-[40px]  justify-center'>
                                <button className='flex w-1/2 h-full bg-main-font rounded-2xl justify-center items-center text-main-front font-bold'>Register</button>
                            </div>
                    </div>
            </form>
    </div>
  )
}

export default Register