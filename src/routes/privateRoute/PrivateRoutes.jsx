import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { isLogged } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  return isLogged ? children : null;
};

export default PrivateRoutes;
