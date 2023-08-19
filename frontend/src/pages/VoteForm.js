import React,{useEffect, useState} from 'react'
import {  Navbar, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider'
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import axios from 'axios';

const VoteForm = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedUser ,setselectedUser] = useState('')
  const [isLoading]=useState(false)

 
  const getUserList = async () => {
    try {
     
        const res=await axios.get(`${process.env.REACT_APP_API_PORT}api/voter/candidates`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwttoken')
              }
        });
         console.log(res.data)
         setSelectedOption(res.data)
     
    } catch (error) {
        console.log(error.response)
      
    }
  };
  

  const handleOptionChange = (event) => {
    setselectedUser(event.target.value);
  };
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu,  themeSettings, 
    // currentColor,  setThemeSettings 
  } = useStateContext();

  useEffect(() => {
    getUserList()
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios
      .post(`${process.env.REACT_APP_API_PORT}api/voter/vote`, {
        candidateId:selectedUser
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('jwttoken')
        },
      })
      .then((res) => {
    
        console.log(res);
        toast.success(res.data.message)
     
      })
      .catch((error) => {
   
        console.log(error);
        if(error.response.data.message){
            toast.error(error.response.data.message)
        }
        
      });
  };
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
        
        
         <div className="bg-white p-6 rounded shadow">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <div className="mt-2 flex flex-col">
        {selectedOption.map((option) => (
          <div key={option._id} className="mb-2 flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <span className="text-gray-800">{option.username}</span>
              <input
                type="radio"
                name="gender"
                value={option._id}
                className={`form-radio ${selectedUser === option._id ? 'text-green-600 border-green-600' : 'text-indigo-600'}`}
                checked={selectedUser === option._id}
                onChange={handleOptionChange}
                required
              />
            </label>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
      >
        Submit
      </button>
    </div>
  </form>
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


};

export default VoteForm;