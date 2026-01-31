import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import { useAuth } from './context/AuthContext';
import './App.css';
import type { JSX } from 'react/jsx-runtime';

const ProtectedRoute = ({ children } : {children : JSX.Element} ) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute> 
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
