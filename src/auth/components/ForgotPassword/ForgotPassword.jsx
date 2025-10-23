import React, { useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../app/Firebase/firebaseConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address. Please check your email or create a new account.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Password reset is not enabled. Please contact support.';
          break;
        default:
          errorMessage = error.message || 'Failed to send reset email. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-5 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        
        <button
          onClick={handleBackToLogin}
          className="flex items-center gap-2 text-purple-500 hover:text-pink-500 transition-all duration-300 mb-6 text-sm font-semibold"
        >
          <FaArrowLeft className="text-base" />
          Back to Login
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 opacity-70 text-sm">
            {success 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to receive a password reset link'
            }
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-fade-in-up">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="shrink-0 text-green-500 text-lg" />
              <div>
                <p className="font-semibold">Reset email sent successfully!</p>
                <p className="mt-1 text-green-600 opacity-90">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <p className="mt-2 text-xs text-green-600 opacity-80">
                  Redirecting to login in 5 seconds...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm animate-fade-in-up">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {!success && (
          <>
            <form className="mb-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white font-sans"
                    placeholder="Enter your registered email"
                    required
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 opacity-70">
                  Enter the email address associated with your ToyTopia account.
                </p>
              </div>

              <button 
                type="submit" 
                className={`w-full bg-linear-to-r from-pink-500 to-purple-500 text-white border-none py-3 rounded-xl text-lg font-bold cursor-pointer transition-all duration-300 font-sans relative overflow-hidden ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-2xl'
                }`}
                disabled={isLoading}
                aria-label={isLoading ? "Sending reset email..." : "Send reset email"}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-blue-500 text-lg mt-0.5 shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold text-sm mb-1">Didn't receive the email?</p>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email address</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-gray-600 opacity-80 text-sm">
            <p>
              Remember your password?{' '}
              <NavLink 
                to="/login" 
                className="text-purple-500 no-underline font-bold hover:text-pink-500 hover:underline transition-all duration-300"
              >
                Back to Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);
