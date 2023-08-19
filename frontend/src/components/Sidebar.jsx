import React, { useEffect } from 'react';
import {  NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiFillDashboard } from 'react-icons/ai';
import { useStateContext } from '../contexts/ContextProvider';


const Sidebar = () => {
 


  const active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? currentColor : null,
      // borderBottom: isActive ? '2px solid blue ' : ''
    }
  }



 



  const { currentColor, activeMenu, setActiveMenu } = useStateContext();



  useEffect(() => {

  }, [])
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-700 ml-1.5';

  return (
    <div className=" h-screen  overflow-auto md:hover:overflow-auto pb-10 bg-black">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
              <div className='ml-10 mt-4'>  
            <img src='#' alt='' className='w-32 cursor-pointer'></img>
          </div>
            {/* </Link> */}


            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
          </div>
        </>
      )}
      <div className='cursor-pointer mt-4'>
        <NavLink to='/Dashboard'
          style={active}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className='text-white text-center flex  gap-5 cursor-pointer'>
            <AiFillDashboard className='mt-1.5' />
            <h1 className='text-white text-lg'>Dashboard</h1>
          </div>
        </NavLink>
      </div>

      <div className='cursor-pointer mt-4'>
        <NavLink to='/Results'
          style={active}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className='text-white text-center flex  gap-5 cursor-pointer'>
            <AiFillDashboard className='mt-1.5' />
            <h1 className='text-white text-lg'>Election Results</h1>
          </div>
        </NavLink>
      </div>
      <div className='cursor-pointer mt-4'>
        <NavLink to='/Vote'
          style={active}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className='text-white text-center flex  gap-5 cursor-pointer'>
            <AiFillDashboard className='mt-1.5' />
            <h1 className='text-white text-lg'>Vote</h1>
          </div>
        </NavLink>
      </div>

      <div className='cursor-pointer mt-4'>
        <NavLink to='/logout'
          style={active}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <div className='text-white text-center flex  gap-5 cursor-pointer'>
            <AiFillDashboard className='mt-1.5' />
            <h1 className='text-white text-lg'>Logout</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
