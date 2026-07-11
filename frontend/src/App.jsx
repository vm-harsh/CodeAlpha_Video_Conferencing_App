import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Home from './Pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}

export default App