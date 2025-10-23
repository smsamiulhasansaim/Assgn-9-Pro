import React, { useState, useCallback, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaGoogle, 
  FaGithub, 
  FaEye, 
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa';
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../../app/Firebase/firebaseConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const passwordRequirements = useMemo(() => ({
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  }), [formData.password]);

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  }, [error]);

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      setSuccess('Verification email sent! Please check your inbox and verify your email before logging in.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('Account created but failed to send verification email. Please try logging in to resend.');
    }
  };

  const handleEmailRegistration = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      formData.email, 
      formData.password
    );
    
    await updateProfile(userCredential.user, {
      displayName: formData.fullName
    });

 
    await sendVerificationEmail(userCredential.user);

    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      setError('Please make sure your password meets all requirements.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await handleEmailRegistration();
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please use a different email or login.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        default:
          errorMessage = error.message || 'Registration failed. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleOAuthRegistration = async (provider, providerName) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await signInWithPopup(auth, provider);

      setSuccess(`Welcome to ToyTopia! ${providerName} registration successful.`);
      
      setTimeout(() => navigate('/'), 2000);
      
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error(`${providerName} registration error:`, error);
        let errorMessage = `${providerName} registration failed. Please try again.`;
        
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
            errorMessage = error.message || `${providerName} registration failed. Please try again.`;
        }
        
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    handleOAuthRegistration(provider, 'Google');
  };

  const handleGithubRegister = () => {
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');
    handleOAuthRegistration(provider, 'GitHub');
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const RequirementIcon = ({ met }) => 
    met ? <FaCheck className="text-green-500 text-xs" /> : <FaTimes className="text-red-500 text-xs" />;

  const RequirementText = ({ met, children }) => (
    <span className={met ? "text-green-600 font-semibold" : "text-gray-600 opacity-70"}>
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-5 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Join ToyTopia!
          </h1>
          <p className="text-gray-600 opacity-70 text-sm">Create your account and start your magical journey</p>
        </div> 
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-fade-in-up">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="shrink-0" />
              <span>{success}</span>
            </div>
          </div>
        )}

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
            <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2 text-sm">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white font-sans"
                placeholder="Enter your full name"
                required
                minLength={2}
                maxLength={50}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">
              Email Address
            </label>
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
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white font-sans"
                placeholder="Create a strong password"
                required
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
            
            <div className="mt-3 p-3 bg-gray-50 rounded-xl border-l-4 border-purple-500">
              <p className="font-semibold mb-2 text-gray-700 text-sm">Password must contain:</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <RequirementIcon met={passwordRequirements.minLength} />
                  <RequirementText met={passwordRequirements.minLength}>
                    At least 8 characters
                  </RequirementText>
                </div>
                <div className="flex items-center gap-2">
                  <RequirementIcon met={passwordRequirements.hasUpperCase} />
                  <RequirementText met={passwordRequirements.hasUpperCase}>
                    One uppercase letter
                  </RequirementText>
                </div>
                <div className="flex items-center gap-2">
                  <RequirementIcon met={passwordRequirements.hasLowerCase} />
                  <RequirementText met={passwordRequirements.hasLowerCase}>
                    One lowercase letter
                  </RequirementText>
                </div>
                <div className="flex items-center gap-2">
                  <RequirementIcon met={passwordRequirements.hasNumber} />
                  <RequirementText met={passwordRequirements.hasNumber}>
                    One number
                  </RequirementText>
                </div>
                <div className="flex items-center gap-2">
                  <RequirementIcon met={passwordRequirements.hasSpecialChar} />
                  <RequirementText met={passwordRequirements.hasSpecialChar}>
                    One special character
                  </RequirementText>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-4 bg-white font-sans ${
                  formData.confirmPassword && !passwordsMatch 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-purple-500 focus:ring-purple-100'
                }`}
                placeholder="Confirm your password"
                required
                minLength={8}
                maxLength={100}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 opacity-60 hover:opacity-100 hover:text-purple-500 transition-all duration-300 p-1 text-lg"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-red-500 text-sm font-semibold mt-2">Passwords do not match</p>
            )}
          </div>

          <div className="mt-4 mb-4">
            <label className="flex items-start gap-3 cursor-pointer text-gray-700 text-sm leading-relaxed">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 accent-purple-500 mt-0.5 shrink-0" 
                required
              />
              <span className="select-none">
                I agree to the{' '}
                <NavLink to="/terms" className="text-purple-500 no-underline font-semibold hover:text-pink-500 hover:underline transition-all duration-300">
                  Terms of Service
                </NavLink>
                {' '}and{' '}
                <NavLink to="/privacy" className="text-purple-500 no-underline font-semibold hover:text-pink-500 hover:underline transition-all duration-300">
                  Privacy Policy
                </NavLink>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className={`w-full bg-linear-to-r from-pink-500 to-purple-500 text-white border-none py-3 rounded-xl text-lg font-bold cursor-pointer transition-all duration-300 font-sans relative overflow-hidden mt-2 ${
              isLoading || !isPasswordValid || !passwordsMatch || !formData.agreeToTerms 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:-translate-y-1 hover:shadow-2xl'
            }`}
            disabled={isLoading || !isPasswordValid || !passwordsMatch || !formData.agreeToTerms}
            aria-label={isLoading ? "Creating account..." : "Create account"}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="relative text-center my-6 text-gray-500 opacity-60 text-sm">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
          <span className="bg-white px-4 relative z-10">Or sign up with</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            className={`flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold cursor-pointer transition-all duration-300 font-sans hover:-translate-y-1 hover:shadow-lg hover:border-red-400 hover:bg-red-50 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleGoogleRegister}
            disabled={isLoading}
            aria-label="Sign up with Google"
          >
            <FaGoogle className="text-red-500 text-base" />
            <span>Google</span>
          </button>
          
          <button 
            className={`flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold cursor-pointer transition-all duration-300 font-sans hover:-translate-y-1 hover:shadow-lg hover:border-gray-800 hover:bg-gray-50 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleGithubRegister}
            disabled={isLoading}
            aria-label="Sign up with GitHub"
          >
            <FaGithub className="text-gray-800 text-base" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="text-center text-gray-600 opacity-80 text-sm">
          <p>
            Already have an account?{' '}
            <NavLink to="/login" className="text-purple-500 no-underline font-bold hover:text-pink-500 hover:underline transition-all duration-300">
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
