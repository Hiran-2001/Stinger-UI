
import './App.css'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        {/* Define route for Login */}
        <Route path='/' index element={<Home />} />

        {/* Define route for Register */}

        <Route path="/forgot-password"  element={<ForgotPassword />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login"  element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
