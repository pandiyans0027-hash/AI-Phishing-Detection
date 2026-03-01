import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Shield, Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { createUser, loginUser } from '../services/database';
import { toast } from 'sonner';

export function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      createUser(email, password, name);
      // Auto-login after signup
      loginUser(email, password);
      // Success - redirect to scan page
      navigate('/scan');
      toast.success('Account created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      toast.error(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto" />
            <div className="absolute inset-0 bg-cyan-400/30 blur-2xl animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join PhishGuard AI to secure your browsing</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 rounded-xl"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-11 bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 h-12 rounded-xl shadow-lg shadow-cyan-500/30"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-sm">Track your scanning history</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-sm">Access detailed analytics</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-sm">Get personalized insights</span>
          </div>
        </div>
      </div>
    </div>
  );
}