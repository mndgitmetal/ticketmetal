import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Events from './pages/Events.tsx';
import EventForm from './pages/EventForm.tsx';
import EventDetails from './pages/EventDetails.tsx';
import Reports from './pages/Reports.tsx';
import Login from './pages/Login.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/events/new" element={<EventForm />} />
                      <Route path="/events/:id" element={<EventDetails />} />
                      <Route path="/events/:id/edit" element={<EventForm />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
