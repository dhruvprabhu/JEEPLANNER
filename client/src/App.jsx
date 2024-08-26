import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Cards/Header';
import CategoryCards from './components/Cards/CategoryCards';
import Auth from './components/Auth/Auth';
import ResetPassword from './components/Auth/ResetPassword';
import TaskNotification from './components/Notifications/TaskNotification';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/reset-pass/:userId/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <div>
              <TaskNotification />
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
