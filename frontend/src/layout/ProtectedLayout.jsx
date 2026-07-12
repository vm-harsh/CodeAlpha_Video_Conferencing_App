import React from 'react'
import useCheckAuth from '../hooks/useCheckAuth'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
   useCheckAuth();

   const {loading, isAuthenticated} = useSelector((state)=>state.auth);

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!isAuthenticated){
        return <Navigate  to='/login' replace />
    }

    return <Outlet/>
}

export default ProtectedLayout