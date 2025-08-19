import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, ProfilePage } from '../../pages';
import { useAuth } from '../providers/AuthProvider';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <Routes>
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? (
                  <Navigate to="/auth/profile" replace />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              } 
            />
            <Route 
              path="/auth/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/auth/profile" replace />
                ) : (
                  <LoginPage />
                )
              } 
            />
            <Route 
              path="/auth/register" 
              element={
                isAuthenticated ? (
                  <Navigate to="/auth/profile" replace />
                ) : (
                  <RegisterPage />
                )
              } 
            />
            <Route 
              path="/auth/profile" 
              element={
                isAuthenticated ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}; 