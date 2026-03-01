import { useNavigate } from 'react-router';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <AlertTriangle className="w-24 h-24 text-red-400 mx-auto" />
          <div className="absolute inset-0 bg-red-400/30 blur-3xl animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 rounded-xl shadow-lg shadow-cyan-500/30"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
