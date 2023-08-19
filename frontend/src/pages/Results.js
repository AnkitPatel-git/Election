import React,{useEffect, useRef, useState} from 'react'
import { Footer, Navbar, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider'
import DataTable from 'react-data-table-component'

import { AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiDownload } from 'react-icons/fi';
import { Spin } from 'antd';

const  Results = () => {
  const navigate = useNavigate()
  const [search, setsearch] = useState('');
  const [countries,setCountries]=useState([])
  const [isLoading,setisLoading]=useState(false)


  const getContries= async()=>{
    try {
      setisLoading(true)
        const res=await axios.get(`${process.env.REACT_APP_API_PORT}api/voter/vote-results`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('jwttoken')
          }
        });
        setCountries(res.data.results)
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

    useEffect(() => {
      getContries()
    }, [])
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu,
       themeSettings, 
       } = useStateContext();
  


    
    useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
      }
    }, [setCurrentColor, setCurrentMode]);
    
    const column=[
      
      {
        name:<h1 className='text-lg'>Candidate Name</h1>,
        selector:(row)=>row.candidateName,
        sortable:true
        
        },
      
      
      {
        name:<h1 className='text-lg'>Vote gain</h1>,
        selector:(row)=>row.voteCount,
        sortable:true
        
        },
        
          {
            name:<h1 className='text-lg'>Percentage %</h1>,
            selector:(row)=>row.votePercentage,
            sortable:true
            
            },
       
    
    ]
  return (
<>
<title>Result</title>
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

                

              {/* pages main containt*/}
{
  isLoading ? 
<div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
<Spin  size={'large'}/>
</div>
  
:
<>
<div className='p-2 mt-20 md:mt-5 mx-5 shadow-xl bg-white border'>      
<div className='mt-5'>
<h1 className='text-2xl font-bold px-3 md:text-3xl'>Result</h1>


    
</div>

{countries[0] && <>
<div className='flex justify-between flex-wrap py-2 px-4 my-2'>
<div className='flex flex-wrap mt-1'>
<h1 className='text-lg md:text-xl text-sky-500 mr-2 py-1.5'>Search</h1>
  <input className=' border-2 boder-gray-800 px-3 py-1.5 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
   placeholder='Search By UserName...' value={search} onChange={(e)=>setsearch(e.target.value)}></input>
</div>
</div>
</>}
<DataTable 
   columns={column} data={
    countries}
   pagination

    fixedHeader
    fixedHeaderScrollHeight='500px'
  
    highlightOnHover
   /> 
  </div>
</>
}
                {/* apps  */}
         


          
            </div>
           <Footer />
          </div>
        </div>
    
    </div>



</>
  )
}

export default  Results