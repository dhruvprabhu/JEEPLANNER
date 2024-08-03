import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Cards/Header';
import CategoryCards from './components/Cards/CategoryCards';
import Auth from './components/Auth/Auth';
import ResetPassword from './components/Auth/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to /auth when the app starts */}
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth/*" element={<Auth />} /> {/* Ensure all auth routes are under /auth */}
        <Route path="/reset-pass/:userId/:token" element={<ResetPassword />} />
        
        {/* Private route for authenticated content */}
        <Route
          path="/dashboard"
          element={
            <div>
              <Header />
              <CategoryCards />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
