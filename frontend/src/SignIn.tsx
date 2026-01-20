import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface SignInProps {
  onSignInSuccess?: (token: string, user: any) => void;
}

export default function SignIn({ onSignInSuccess }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Helper funkcije za cookies
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch('https://pixelshop-production.up.railway.app/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInData.email,
        password: signInData.password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      return response.json();
    })
    .then(data => {
      console.log('Sign In Success:', data);
      alert('Sign in successful!');
      
      // Postavi cookies sa trajanjem od 5 dana
      setCookie('token', data.token, 5);
      setCookie('user', JSON.stringify(data.user), 5);
      setCookie('user_id', data.user.id.toString(), 5); 
      
      // Pozovi callback ako postoji
      if (onSignInSuccess) {
        onSignInSuccess(data.token, data.user);
      }
      
      window.location.href = '/products';
    })
    .catch(error => {
      console.error('Sign In Error:', error);
      alert('Sign in failed. Please check your credentials and try again.');
    });
  };

  return (
    <form onSubmit={handleSignInSubmit} className="space-y-6">
      <div>
        <label htmlFor="signin-email" className="block text-white font-semibold mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="email"
            id="signin-email"
            name="email"
            value={signInData.email}
            onChange={handleSignInChange}
            required
            className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signin-password" className="block text-white font-semibold mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="signin-password"
            name="password"
            value={signInData.password}
            onChange={handleSignInChange}
            required
            className="w-full pl-11 pr-11 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-neutral-400">Remember me</span>
        </label>
        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
      >
        Sign In
      </button>
    </form>
  );
}