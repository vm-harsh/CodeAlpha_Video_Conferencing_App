import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
    loading:true,
    isAuthenticated:false
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state,action)=> {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.isAuthenticated = false;
        },
        setLoading: (state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {setUser,logout,setLoading} = authSlice.actions;
export default authSlice.reducer; 