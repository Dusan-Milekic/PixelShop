import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

interface SignUpProps {
  onSignUpSuccess?: () => void;
}

export default function SignUp({ onSignUpSuccess }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUpData, setSignUpData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/registration', {
        full_name: signUpData.full_name,
        email: signUpData.email,
        password: signUpData.password
      });
      
      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully");
        // Resetuj formu
        setSignUpData({
          full_name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        // Pozovi callback ako postoji
        if (onSignUpSuccess) {
          onSignUpSuccess();
        }
      }
    } catch (error: any) {
      console.error('Full error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      alert('Failed to create new account');
    }
  };

  return (
    <form onSubmit={handleSignUpSubmit} className="space-y-6">
      <div>
        <label htmlFor="signup-name" className="block text-white font-semibold mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            id="signup-name"
            name="full_name"
            value={signUpData.full_name}
            onChange={handleSignUpChange}
            required
            className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-white font-semibold mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="email"
            id="signup-email"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
            className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-white font-semibold mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="signup-password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
            className="w-full pl-11 pr-11 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="Create a password"
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

      <div>
        <label htmlFor="signup-confirm-password" className="block text-white font-semibold mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="signup-confirm-password"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleSignUpChange}
            required
            className="w-full pl-11 pr-11 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="terms"
          required
          className="w-4 h-4 mt-1 rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-neutral-400">
          I agree to the{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300">
            Terms and Conditions
          </a>
          {' '}and{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
      >
        Create Account
      </button>
    </form>
  );
}