import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ContactPage from "./Pages/ContactPage";
import CarsPage from "./Pages/CarsPage";
import CarDetailPage from "./Pages/CarDetailPage";
import MyBooking from "./Pages/MyBookingpage";
import VerifyPaymentPage from "./Pages/VerifyPaymentPage";

import { FaAngleDoubleUp } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

const RedirectIfAuthenticated = ({children}) => {
  const authToken = localStorage.getItem('token');
  if(authToken) {
    return <Navigate to='/' replace />
  }
  return children;
};

const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top:0, behavior: "smooth" });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cars" element={<CarsPage />} />

        <Route
          path="/cars/:id"
          element={
            <ProtectedRoute>
              <CarDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <MyBooking />
          </ProtectedRoute>
        }/>

         <Route path="/login" element={
          
            <RedirectIfAuthenticated>
              <Login  />
            </RedirectIfAuthenticated>} />
        <Route path="/signup" element={<RedirectIfAuthenticated>
              <Signup />
        </RedirectIfAuthenticated> } />

        <Route path="/success" element={<VerifyPaymentPage />} />
        <Route path="/cancel" element={<VerifyPaymentPage />} />
 
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showButton && (
        <button 
        className="bg-black text-white p-2 rounded fixed bottom-4 right-4 transition-opacity cursor-pointer"
        onClick={scrollToTop}
        ><FaAngleDoubleUp className="absolute right-9 bottom-3" /> Top
        </button>
      )}
    </>
  );
};

export default App;
