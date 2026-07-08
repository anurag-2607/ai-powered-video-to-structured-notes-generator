import { useState } from 'react';
import { authService } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.resetPassword(email);
      setMessage(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-950 text-white p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-zinc-400 text-sm mb-6">We'll send a password recovery magic link to your inbox.</p>
        
        {message ? (
          <div className="text-center">
            <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-200 text-sm rounded-lg mb-6">{message}</div>
            <button onClick={() => setPage('login')} className="text-indigo-400 hover:underline text-sm">Back to Sign In</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            <Button isLoading={isLoading}>Send Magic Link</Button>
            <div className="text-center mt-4">
              <button type="button" onClick={() => setPage('login')} className="text-sm text-zinc-400 hover:text-white underline">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}