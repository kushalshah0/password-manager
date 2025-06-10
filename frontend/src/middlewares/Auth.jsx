import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token") || 21;
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Auth;