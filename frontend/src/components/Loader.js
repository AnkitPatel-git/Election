import React from 'react'
import {  ImSpinner3 } from 'react-icons/im';
const Loader = () => {
  return (
 <>
<div className='bg-black/50 fixed w-full h-screen z-10'>
<div className='flex items-center justify-center h-[100vh] flex-col'>
<ImSpinner3 size={50} className='text-sky-400 animate-spin'/>
{/* <h1 className='my-2 text-lg  text-white'>Loading...</h1> */}
</div>
</div>
 </>
  )
}

export default Loader