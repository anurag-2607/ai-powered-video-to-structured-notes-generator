// import './App.css'; 
// import { useState } from 'react';
// import Navbar from './authentication/components/Navbar';
// import Home from './authentication/pages/Home';
// import Login from './authentication/pages/Login';
// import Signup from './authentication/pages/Signup';
// import ForgotPassword from './authentication/pages/ForgotPassword';
// import { useAuth } from './authentication/hooks/useAuth';

// export default function App() {
//   const [page, setPage] = useState('home');
//   const { loading } = useAuth();

//   // Show a blank visual state structure while validating local cookies/tokens
//   if (loading) {
//     return (
//       <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-zinc-950">
//       <Navbar setPage={setPage} />
//       {page === 'home' && <Home setPage={setPage} />}
//       {page === 'login' && <Login setPage={setPage} />}
//       {page === 'signup' && <Signup setPage={setPage} />}
//       {page === 'forgot-password' && <ForgotPassword setPage={setPage} />}
//     </div>
//   );
// }


//dashboard
// import { useState } from 'react';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ForgotPassword from './pages/ForgotPassword';
// import Dashboard from './dashboard/pages/Dashboard'; // New route connection mapping hook
// import { useAuth } from './hooks/useAuth';

// export default function App() {
//   const [page, setPage] = useState('home');
//   const { loading, user } = useAuth();

//   if (loading) {
//     return (
//       <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // Intercept routing matrix targets to enforce strict authentication safety state rules
//   if (user && ['home', 'login', 'signup'].includes(page)) {
//     return <Dashboard setPage={setPage} />;
//   }

//   return (
//     <div className="w-full min-h-screen bg-zinc-950">
//       {page === 'home' && <Home setPage={setPage} />}
//       {page === 'login' && <Login setPage={setPage} />}
//       {page === 'signup' && <Signup setPage={setPage} />}
//       {page === 'forgot-password' && <ForgotPassword setPage={setPage} />}
//       {page === 'dashboard' && <Dashboard setPage={setPage} />}
//     </div>
//   );
// }

//FINAL
import './App.css'; 
import { useState, useEffect } from 'react';
import Navbar from './authentication/components/Navbar';
import Home from './authentication/pages/Home';
import Login from './authentication/pages/Login';
import Signup from './authentication/pages/Signup';
import ForgotPassword from './authentication/pages/ForgotPassword';
import Dashboard from './dashboard/pages/Dashboard'; // Connected your dashboard core component
import { useAuth } from './authentication/hooks/useAuth';

export default function App() {
  const [page, setPage] = useState('home');
  const { loading, user } = useAuth(); // Destructured 'user' to evaluate current session status

  // Industry Standard Route Guarding & Automatic Redirects
  useEffect(() => {
    if (!loading) {
      if (user) {
        // If an active user exists, restrict access to auth/landing views and force dashboard view
        if (['home', 'login', 'signup', 'forgot-password'].includes(page)) {
          setPage('dashboard');
        }
      } else {
        // If user logs out or session token expires, kick them back to public landing view
        if (page === 'dashboard') {
          setPage('home');
        }
      }
    }
  }, [user, loading, page]);

  // Show a blank visual state structure while validating local cookies/tokens
  if (loading) {
    return (
      <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Self-Contained App Workspace Layout
  // When 'dashboard' is active, it renders its own dynamic dashboard nav and layout ecosystem.
  if (page === 'dashboard') {
    return <Dashboard setPage={setPage} />;
  }

  // Standard Public Marketing & Authentication Layout Container
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