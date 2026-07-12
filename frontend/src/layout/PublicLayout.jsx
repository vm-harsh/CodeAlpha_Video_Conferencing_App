import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useCheckAuth from '../hooks/useCheckAuth';

const PublicLayout = () => {

  useCheckAuth();

  const {loading, isAuthenticated} = useSelector((state)=>state.auth);

  if(loading){
      return <h1>Loading...</h1>
  }

  if(isAuthenticated){
      return <Navigate  to='/home' replace />
  }

  return <Outlet/>
}

export default PublicLayout