import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [page, setPage] = useState('home');
  const { loading } = useAuth();

  // Show a blank visual state structure while validating local cookies/tokens
  if (loading) {
    return (
      <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <Navbar setPage={setPage} />
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'login' && <Login setPage={setPage} />}
      {page === 'signup' && <Signup setPage={setPage} />}
      {page === 'forgot-password' && <ForgotPassword setPage={setPage} />}
    </div>
  );
}
