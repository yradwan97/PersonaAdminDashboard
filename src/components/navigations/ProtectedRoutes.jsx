import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from 'src/components/layout/sidebar/Sidebar';
import Navbar from 'src/components/layout/navbar/Navbar';
import Footer from 'src/components/layout/footer/Footer';

import { checkAuthentication } from 'src/store/auth/authSlice';
import { AppWrapper } from "src/AppStyle";
import { Box } from "@chakra-ui/react";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    dispatch(checkAuthentication())
      .unwrap()
      .then(_ => {
        setIsAuth(true);
      }).catch(_ => {
        navigate("/login");
      });
  }, [dispatch, navigate]);

  return isAuth ? (
    <AppWrapper>
      <Sidebar />
      <Box className={`content-wrapper ${sidebar.isNotOpened ? 'active' : ''}`}>
        <Box className="content">
          <Navbar />
          <Box className="app-content">
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Box>
    </AppWrapper>

  ) : <h5>please wait ...</h5>;
};

export default ProtectedRoutes;
