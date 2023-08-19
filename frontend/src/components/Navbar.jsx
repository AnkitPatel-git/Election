import React, { useEffect } from 'react';
import {  AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';
import { FaHome } from 'react-icons/fa';
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick,  screenSize } = useStateContext();
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize,setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-3  relative bg-white shadow-lg">
<div className='flex justify-inline'>


      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu className='text-black font-bold' />} />
      <div className='pt- flex gap-2'>
      <FaHome className='mt-2.5 text-purple-500 hidden sm:block' size={20}/>
   
   </div>
      
</div>
      
      <div className="flex">  
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            
            <p className=''>
              <span className="text-gray-700 text-14 pl-2">  { localStorage.getItem('username') }</span>{' '}
            </p>
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
