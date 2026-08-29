// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Reviews from './pages/Review/Reviews';
import Reports from './pages/Reports/Reports';
import Certificates from './pages/Certificates/Certificates';
import Login from './pages/Login/Login';
import AuthGuard from './components/auth/AuthGuard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/certificates" element={<Certificates />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
