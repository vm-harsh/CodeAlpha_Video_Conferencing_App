import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import PublicLayout from './layout/PublicLayout'
import ProtectedLayout from './layout/ProtectedLayout'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedLayout/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default App