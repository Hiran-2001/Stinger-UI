

import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Resetpassword from './pages/Resetpassword';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import { AdminRoute, CustomerRoute } from './utils/ProtectedRoute';
import Order from './pages/Orders';
import ProductForm from './admin/pages/ProductForm';
import SalesPage from './admin/pages/SalesPage';
import RefundPage from './admin/pages/RefundPage';
import Forgotpassword from './pages/ForgotPassword';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/reset-password/:token' element={<Resetpassword />} />

        <Route element={<CustomerRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop/:category' element={<ProductPage />} />
          <Route path='/shop/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/order' element={<Order />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/admin/products' element={<ProductForm />} />
          <Route path='/admin/sales' element={<SalesPage />} />
          <Route path='/admin/refunds' element={<RefundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
