
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        {/* Define route for Login */}
        <Route path='/' index element={<Home />} />

        {/* Define route for Register */}
        <Route path="/register" index element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
