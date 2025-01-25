
import Forgotpassword from './pages/Forgotpassword';
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Resetpassword from './pages/ResetPassword';
function App() {
  

  return (
   
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element ={<Forgotpassword/>} />
        <Route path='/reset-password/:token' element ={<Resetpassword/>} />
      </Routes>
    </Router>
  )
}

export default App
