import { useState, useEffect } from 'react';
import Navigation from './components/user/Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './ProfilePage';

export default function Account() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');

  // Helper funkcija za cookies
  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Proveri login status kada se komponenta učita
  useEffect(() => {
    const token = getCookie('token');
    const userCookie = getCookie('user');
    
    if (token) {
      setIsLoggedIn(true);
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie);
          setUserName(user.full_name || 'User');
        } catch (e) {
          setUserName('User');
        }
      }
    }
  }, []);

  // Ako je korisnik ulogovan, prikaži Profile stranicu
  if (isLoggedIn) {
    return <Profile />;
  }

  // Ako nije ulogovan, prikaži Sign In / Sign Up forme
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation/>
      
      {/* Hero Section */}
      <section className="relative bg-neutral-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            {isSignUp 
              ? 'Join PixelShop today and start your shopping journey' 
              : 'Sign in to continue your shopping experience'}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-800 p-10 rounded-xl border border-neutral-700">
            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  !isSignUp
                    ? 'bg-indigo-600 text-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isSignUp
                    ? 'bg-indigo-600 text-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Form */}
            {!isSignUp && (
              <SignIn 
                onSignInSuccess={(token, user) => {
                  setIsLoggedIn(true);
                  setUserName(user.full_name);
                }} 
              />
            )}

            {/* Sign Up Form */}
            {isSignUp && (
              <SignUp 
                onSignUpSuccess={() => setIsSignUp(false)} 
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}