import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center space-x-2">
                <Logo />
                <span className="text-2xl font-bold">ChainTrack</span>
              </div>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>
          <LoginForm />
          
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Info */}
      <div className="hidden lg:flex lg:flex-1 bg-background-card relative">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
        <div className="relative p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Track Your Supply Chain</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Log in to access your dashboard and manage your supply chain operations with blockchain-powered security and transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
