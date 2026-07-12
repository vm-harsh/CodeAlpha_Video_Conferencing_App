import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../redux/slices/authSlice';

const useCheckAuth = () => {
    
    const dispatch = useDispatch();


  useEffect(()=> {

    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`,{withCredentials:true});
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(logout())
        console.log(error);
      }
    }

    checkAuth();
  },[dispatch])

}

export default useCheckAuth