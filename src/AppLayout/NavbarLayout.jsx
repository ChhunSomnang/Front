import React, { useState , useEffect } from 'react'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Outlet } from 'react-router-dom';
import HeaderLogin from '../Component/HeaderLogin';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../api/slice";

function NavbarLayout() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (!currentUser) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser]);

  
  
  return (
    <>
      <div className="flex flex-col h-screen">
        {currentUser ? <HeaderLogin /> : <Navbar />}
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default NavbarLayout;