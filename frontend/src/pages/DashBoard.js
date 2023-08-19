import React,{useEffect, useState} from 'react'
import {  Navbar, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { BsAward } from 'react-icons/bs';



const DashBoard = () => {
 const navigate = useNavigate()

  const location = useLocation()
  const [isLoading,setisLoading]=useState(false)
  const [stats,setStats]=useState([])

  const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success');

    console.log('query')
    console.log(success)

    
  
    const getContries= async()=>{
      try {
        setisLoading(true)
          const res=await axios.get(`${process.env.REACT_APP_API_PORT}api/voter/Dashboard`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('jwttoken')
            }
          });
          console.log(res.data)
          setStats(res.data)
          setisLoading(false)
      } catch (error) {
          console.log(error)
          if(error.response.request.status === 500){
            localStorage.clear()
            toast.error(error.response.data.message)
            navigate('/')
          }
          setisLoading(false)
      }
    }


  const { setCurrentColor, setCurrentMode, currentMode, activeMenu,  themeSettings, 
    // currentColor,  setThemeSettings 
  } = useStateContext();

  useEffect(() => {
    getContries()
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);


  return (

<>
<title>Dashboard</title>
<div className={currentMode === 'Dark' ? 'dark' : ''}>
   
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
           
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
             <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
           <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}


{/* main contant start */}

{
  isLoading ? 
<div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
<Spin  size={'large'}/>
</div>
:
<>
<div className='mt-20 md:mt-5  p-2'>
<h1 className='text-2xl font-bold p-3 md:text-3xl'>Dashboard</h1>

 <div className='grid sm:grid-cols-2  lg:grid-cols-3 bg-slate-50 py-2 px-3 gap-3'>

<div className='px-3 py-5 bg-white shadow-lg'>
  <div className='flex justify-between mb-5 flex-wrap'>
    <h1 className='text-xl text-gray-500 font-semibold'>Total Candidates</h1>
    <h2 className='bg-blue-200 p-2 text-white rounded-full' style={{background: 'linear-gradient(90deg, rgba(83,76,191,1) 0%, rgba(163,70,193,1) 61%, rgba(255,102,0,1) 100%)'}}><BsAward className='' size={20}/></h2>

  </div>
  <div className='flex justify-between flex-wrap'>
    <h1 className='font-bold'>{stats.totalCandidates}</h1>
    <button className=' text-white px-3 py-1 font-semibold rounded-sm' style={{background: 'linear-gradient(90deg, rgba(83,76,191,1) 0%, rgba(163,70,193,1) 61%, rgba(255,102,0,1) 100%)'}}>View</button>
  </div>
</div>


<div className='px-3 py-5 bg-white shadow-lg'>
  <div className='flex justify-between mb-5 flex-wrap'>
    <h1 className='text-xl text-gray-500 font-semibold'>Total Votes</h1>
    <h2 className='bg-blue-200 p-2 text-white rounded-full' style={{background: 'linear-gradient(90deg, rgba(83,76,191,1) 0%, rgba(163,70,193,1) 61%, rgba(255,102,0,1) 100%)'}}><BsAward className='' size={20}/></h2>
  </div>
  <div className='flex justify-between flex-wrap'>
    <h1 className='font-bold'>{stats.totalVotes}</h1>
    <button className='text-white px-3 py-1 font-semibold rounded-sm' style={{background: 'linear-gradient(90deg, rgba(83,76,191,1) 0%, rgba(163,70,193,1) 61%, rgba(255,102,0,1) 100%)'}}>View</button>
  </div>
</div>



</div>
</div>

</>
}
</div>
          </div>
        </div>
    </div>
</>
  )
}

export default DashBoard