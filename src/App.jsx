import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import ProductDetail from './Component/ProductDetail'
import NavbarLayout from './AppLayout/NavbarLayout'
import Dashboard from './pages/Admin/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import GoogleLogin from './pages/auth/GoogleLogin'
import Admin from './pages/Admin/Admin'
import ApproveOrder from './pages/Admin/ApproveOrder'
import Product from './pages/Admin/Product'
import BrandCrud from './pages/Admin/BrandCrud'
import CategoryCurd from './pages/Admin/CategoryCrud'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from "./api/slice"
import AdminLogin from './pages/auth/AdminLogin'
import CartDetail from './Component/CartDetail'
import PaymentForm from './Component/PaymentForm'
import ShopByCategory from './pages/HomePage/ShopByCategory'
import OrderHistory from './Component/OrderHistory'



const App = () => {


  
  return (
    <BrowserRouter>        
            <Routes>
              <Route element={<NavbarLayout />} >
                <Route path='/' element={<HomePage/>} />
                <Route path='/shop' element={<Shop />} />
                <Route path="/productdetail" element={<ProductDetail />}>
                  <Route path=":productID" element={<ProductDetail />} />
                </Route>
                <Route path='/cart-detail' element={<CartDetail />}/>
                <Route path='/order-history' element={<OrderHistory />} />
                <Route path='/payment' element={<PaymentForm />} />
                <Route path='/shop-by-category' element={<ShopByCategory />} >
                    <Route path=':categoryID' element={<ShopByCategory />} />
                </Route>
              </Route>
              
              <Route path='*' element={<PageNotFound />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register />} />
              <Route path='/auth/google' element={<GoogleLogin />} />
              <Route path='/admin/login' element={<AdminLogin />} />
              
              <Route path='/admin' element={<ProtectedRoute component={Admin} />} >
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                    <Route path='/admin/approve_order' element={<ApproveOrder />} />
                    <Route path='/admin/product_crud' element={<Product />} />
                    <Route path='/admin/category_crud' element={<CategoryCurd />} />
                    <Route path='/admin/brand_crud' element={<BrandCrud />} />
              </Route> 
              
            </Routes>
        
    </BrowserRouter>
  )
}

export default App



// ProtectedRoute component to check if the user is authenticated
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Adjust this based on your auth logic
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/admin/login" />;
};

