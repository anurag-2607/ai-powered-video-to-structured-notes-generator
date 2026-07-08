import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Signup({ setPage }) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.signup(name, email, password);
      login(data.user, data.token);
      setPage('home');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-950 text-white p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-zinc-400 text-sm mb-6">Get started with free video tokens today.</p>
        
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Minimum 8 characters" />
          
          <Button isLoading={isLoading}>Create Account</Button>
        </form>

        <p className="text-center text-zinc-400 text-sm mt-6">
          Already have an account? <button onClick={() => setPage('login')} className="text-indigo-400 hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}