import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login({ setPage }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authService.login(email, password);
      login(data.user, data.token);
      setPage('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-2 bg-zinc-950 text-white">
      {/* Left Column: Visual Hook */}
      <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950 border-r border-zinc-800">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Drop a video URL.<br />Get flawless AI summary notes.
        </h1>
        <p className="text-zinc-400 max-w-md">Save hours of scrubbing through timestamps. Let AI process lecture, meeting, or tutorial videos instantly.</p>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-zinc-400 text-sm mb-6">Enter your details to access your account dashboard.</p>
          
          {error && <div className="p-3 bg-red-950/50 border border-red-800 text-red-200 text-sm rounded-lg mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            
            <div className="text-right mb-6">
              <button type="button" onClick={() => setPage('forgot-password')} className="text-xs text-indigo-400 hover:underline">Forgot password?</button>
            </div>

            <Button isLoading={isLoading}>Sign In</Button>
          </form>

          <p className="text-center text-zinc-400 text-sm mt-6">
            Don't have an account? <button onClick={() => setPage('signup')} className="text-indigo-400 hover:underline">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}