import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SignUpCredentials, UserRole } from '../../types/auth';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const credentials: SignUpCredentials = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      role: formData.get('role') as UserRole,
    };

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.signUp(credentials);
      login(response.user);
      navigate(`/${response.user.role.toLowerCase()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="bg-red-50/10 border border-red-300/10 text-red-400 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Username
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-300">
          Role
        </label>
        <select
          name="role"
          id="role"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select a role</option>
          <option value="PRODUCER">Producer</option>
          <option value="TRANSPORTER">Transporter</option>
          <option value="WAREHOUSE">Warehouse</option>
          <option value="DISTRIBUTOR">Distributor</option>
          <option value="CONSUMER">Consumer</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md font-medium text-white"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
