import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../../app/Firebase/firebaseConfig';
import { useAuth } from '../../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const from = location.state?.from?.pathname || '/';
  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  }, []);

  const checkEmailVerification = async (user) => {
    const isEmailPasswordProvider = user.providerData.some(
      provider => provider.providerId === 'password'
    );

    if (isEmailPasswordProvider && !user.emailVerified) {
      await sendEmailVerification(user);
      throw new Error('EMAIL_NOT_VERIFIED');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      await checkEmailVerification(userCredential.user);
      
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message === 'EMAIL_NOT_VERIFIED') {
        errorMessage = 'Please verify your email before logging in. A new verification email has been sent to your inbox.';
      } else {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email. Please register first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid login credentials. Please check your email and password.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later or reset your password.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled. Please contact support.';
            break;
          default:
            errorMessage = error.message || 'Login failed. Please try again.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider, providerName) => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithPopup(auth, provider);

      navigate(from, { replace: true });
      
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error(`${providerName} login error:`, error);
        let errorMessage = `${providerName} login failed. Please try again.`;
        
        switch (error.code) {
          case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
            break;
          case 'auth/unauthorized-domain':
            errorMessage = 'This domain is not authorized for OAuth operations.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email but different sign-in method. Please try signing in with your existing method.';
            break;
          case 'auth/auth-domain-config-required':
            errorMessage = 'Authentication domain configuration required. Please contact support.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = `${providerName} sign-in is not enabled. Please contact support.`;
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = error.message || `${providerName} login failed. Please try again.`;
        }
        
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    handleOAuthLogin(provider, 'Google');
  };

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');
    handleOAuthLogin(provider, 'GitHub');
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-5 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 opacity-70 text-sm">Sign in to your ToyTopia account</p>
        </div>
 
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm animate-fade-in-up">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white font-sans"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white font-sans"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                minLength={8}
                maxLength={100}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 opacity-60 hover:opacity-100 hover:text-purple-500 transition-all duration-300 p-1 text-lg"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
              <input type="checkbox" className="w-4 h-4 accent-purple-500" />
              <span className="select-none">Remember me</span>
            </label>
            <NavLink to="/forgot-password" className="text-purple-500 no-underline text-sm font-semibold hover:text-pink-500 hover:underline transition-all duration-300">
              Forgot Password?
            </NavLink>
          </div>

          <button 
            type="submit" 
            className={`w-full bg-linear-to-r from-pink-500 to-purple-500 text-white border-none py-3 rounded-xl text-lg font-bold cursor-pointer transition-all duration-300 font-sans relative overflow-hidden ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-2xl'}`}
            disabled={isLoading}
            aria-label={isLoading ? "Signing in..." : "Sign in"}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="relative text-center my-6 text-gray-500 opacity-60 text-sm">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
          <span className="bg-white px-4 relative z-10">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            className={`flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold cursor-pointer transition-all duration-300 font-sans hover:-translate-y-1 hover:shadow-lg hover:border-red-400 hover:bg-red-50 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            aria-label="Sign in with Google"
          >
            <FaGoogle className="text-red-500 text-base" />
            <span>Google</span>
          </button>
          
          <button 
            className={`flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold cursor-pointer transition-all duration-300 font-sans hover:-translate-y-1 hover:shadow-lg hover:border-gray-800 hover:bg-gray-50 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleGithubLogin}
            disabled={isLoading}
            aria-label="Sign in with GitHub"
          >
            <FaGithub className="text-gray-800 text-base" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="text-center text-gray-600 opacity-80 text-sm">
          <p>
            Don't have an account?{' '}
            <NavLink to="/register" className="text-purple-500 no-underline font-bold hover:text-pink-500 hover:underline transition-all duration-300">
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);