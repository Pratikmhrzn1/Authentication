import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import FreeTrial from './pages/FreeTrial.tsx';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/freeTrial' element={<FreeTrial />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

    <ToastContainer
      position="top-right"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      closeButton={true}
    />
  </React.StrictMode>
);