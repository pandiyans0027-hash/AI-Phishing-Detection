import { useNavigate } from 'react-router';
import { Shield, Zap, Eye, Brain, Lock, TrendingUp, Search, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <Shield className="w-24 h-24 text-cyan-400 mx-auto" />
            <div className="absolute inset-0 bg-cyan-400/30 blur-3xl animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            AI-Powered Phishing URL Detection System
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Protect yourself from phishing attacks with advanced machine learning algorithms.
            Real-time URL analysis with 95%+ accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/scan')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 text-lg px-8 py-6 rounded-2xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60 transition-all"
            >
              <Search className="w-5 h-5 mr-2" />
              Scan a URL
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              variant="outline"
              className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-6 rounded-2xl"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400 mb-2">95%+</div>
              <div className="text-gray-300">Detection Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400 mb-2">&lt;2s</div>
              <div className="text-gray-300">Analysis Time</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400 mb-2">10+</div>
              <div className="text-gray-300">Feature Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Powerful Security Features
            </h2>
            <p className="text-xl text-gray-400">
              Advanced AI technology protecting you from cyber threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI-Powered Detection"
              description="Machine learning algorithms trained on millions of URLs to detect sophisticated phishing attempts."
              gradient="from-cyan-500 to-blue-500"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Real-Time Analysis"
              description="Instant URL scanning with comprehensive feature extraction and risk assessment."
              gradient="from-blue-500 to-purple-500"
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Feature Extraction"
              description="Analyzes 10+ URL characteristics including length, HTTPS, IP detection, and more."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Security Scoring"
              description="Multi-level risk assessment from low to critical with confidence percentages."
              gradient="from-pink-500 to-red-500"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Analytics Dashboard"
              description="Track scanning history, trends, and insights with interactive charts."
              gradient="from-red-500 to-orange-500"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Threat Intelligence"
              description="Stay protected with continuously updated threat detection patterns."
              gradient="from-orange-500 to-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-cyan-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to protect yourself from phishing attacks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WorkflowStep
              number="1"
              title="Enter URL"
              description="Paste any suspicious URL into our scanner. Our system accepts any valid web address."
              icon={<Search className="w-12 h-12" />}
            />
            <WorkflowStep
              number="2"
              title="AI Analysis"
              description="Our ML engine extracts features and analyzes patterns to detect phishing indicators."
              icon={<Brain className="w-12 h-12" />}
            />
            <WorkflowStep
              number="3"
              title="Get Results"
              description="Receive instant verdict with confidence score, risk level, and detailed feature analysis."
              icon={<CheckCircle className="w-12 h-12" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-12 rounded-3xl border border-cyan-500/30 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Secure Your Browsing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start scanning URLs now and protect yourself from phishing threats
            </p>
            <Button
              onClick={() => navigate('/scan')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 text-lg px-8 py-6 rounded-2xl shadow-lg shadow-cyan-500/50"
            >
              Start Scanning Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function WorkflowStep({ number, title, description, icon }: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-400/20 blur-2xl" />
          <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-2xl border border-cyan-500/30">
            <div className="text-cyan-400">
              {icon}
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {number}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
