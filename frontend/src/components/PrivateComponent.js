import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'

function PrivateComponent() {
    const auth =localStorage.getItem('jwttoken')
    return auth ? <Outlet/> : <Navigate to='/'/>
  
}

export default PrivateComponent