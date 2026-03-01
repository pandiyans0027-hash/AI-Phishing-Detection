import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Loader2, Search, TrendingUp, Globe, Hash, Server, Calendar, Repeat, Key, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { scanURL } from '../services/mlEngine';
import { saveURLLog } from '../services/database';
import { toast } from 'sonner';
import type { PredictionResult } from '../services/mlEngine';

export function ScanPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const scanResult = await scanURL(url);
      setResult(scanResult);
      
      // Save to database
      saveURLLog({
        url,
        prediction: scanResult.prediction,
        confidence: scanResult.confidence,
        riskLevel: scanResult.riskLevel,
        features: scanResult.features
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during scanning');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'phishing' 
      ? 'text-red-400 bg-red-500/20 border-red-500/30' 
      : 'text-green-400 bg-green-500/20 border-green-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <Search className="w-16 h-16 text-cyan-400 mx-auto" />
            <div className="absolute inset-0 bg-cyan-400/30 blur-2xl animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            URL Phishing Scanner
          </h1>
          <p className="text-xl text-gray-400">
            Enter a URL to analyze for phishing threats using AI
          </p>
        </div>

        {/* Scan Input */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              className="flex-1 bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 h-12 text-lg rounded-xl"
              disabled={loading}
            />
            <Button
              onClick={handleScan}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 h-12 px-8 rounded-xl shadow-lg shadow-cyan-500/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Scan URL
                </>
              )}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-12 rounded-2xl border border-cyan-500/20 backdrop-blur-sm text-center">
            <Loader2 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-2xl font-bold text-white mb-2">Analyzing URL...</h3>
            <p className="text-gray-400">Extracting features and running ML prediction</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Prediction Result */}
            <div className={`p-8 rounded-2xl border backdrop-blur-sm ${getPredictionColor(result.prediction)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {result.prediction === 'phishing' ? (
                    <AlertTriangle className="w-12 h-12" />
                  ) : (
                    <CheckCircle className="w-12 h-12" />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold">
                      {result.prediction === 'phishing' ? 'PHISHING DETECTED' : 'URL APPEARS SAFE'}
                    </h2>
                    <p className="text-sm opacity-80 mt-1">
                      {result.prediction === 'phishing' 
                        ? 'This URL exhibits characteristics of a phishing site' 
                        : 'No significant phishing indicators detected'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{result.confidence}%</div>
                  <div className="text-sm opacity-80">Confidence</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-6">
                <div className={`px-4 py-2 rounded-xl border font-semibold ${getRiskColor(result.riskLevel)}`}>
                  Risk Level: {result.riskLevel.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Feature Analysis */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
                Feature Analysis
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FeatureItem
                  icon={<Hash className="w-5 h-5" />}
                  label="URL Length"
                  value={`${result.features.urlLength} characters`}
                  status={result.features.urlLength > 75 ? 'warning' : result.features.urlLength > 54 ? 'medium' : 'safe'}
                />
                <FeatureItem
                  icon={<Lock className="w-5 h-5" />}
                  label="HTTPS Protocol"
                  value={result.features.hasHTTPS ? 'Yes' : 'No'}
                  status={result.features.hasHTTPS ? 'safe' : 'danger'}
                />
                <FeatureItem
                  icon={<Key className="w-5 h-5" />}
                  label="Special Characters"
                  value={`${result.features.specialCharCount} found`}
                  status={result.features.specialCharCount > 5 ? 'danger' : result.features.specialCharCount > 3 ? 'warning' : 'safe'}
                />
                <FeatureItem
                  icon={<Server className="w-5 h-5" />}
                  label="IP Address"
                  value={result.features.hasIPAddress ? 'Detected' : 'Not Found'}
                  status={result.features.hasIPAddress ? 'danger' : 'safe'}
                />
                <FeatureItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Domain Age"
                  value={result.features.domainAge}
                  status={result.features.domainAge.includes('New') ? 'warning' : 'safe'}
                />
                <FeatureItem
                  icon={<Repeat className="w-5 h-5" />}
                  label="Redirections"
                  value={`${result.features.redirectionCount} detected`}
                  status={result.features.redirectionCount > 2 ? 'danger' : result.features.redirectionCount > 0 ? 'warning' : 'safe'}
                />
                <FeatureItem
                  icon={<AlertTriangle className="w-5 h-5" />}
                  label="Suspicious Keywords"
                  value={result.features.hasSuspiciousKeywords ? 'Found' : 'None'}
                  status={result.features.hasSuspiciousKeywords ? 'warning' : 'safe'}
                />
                <FeatureItem
                  icon={<Globe className="w-5 h-5" />}
                  label="Subdomains"
                  value={`${result.features.subdomainCount} found`}
                  status={result.features.subdomainCount > 3 ? 'danger' : result.features.subdomainCount > 2 ? 'warning' : 'safe'}
                />
                <FeatureItem
                  icon={<Shield className="w-5 h-5" />}
                  label="Custom Port"
                  value={result.features.hasPort ? 'Yes' : 'No'}
                  status={result.features.hasPort ? 'warning' : 'safe'}
                />
              </div>
            </div>

            {/* Scan Another */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setUrl('');
                  setResult(null);
                  setError('');
                }}
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
              >
                Scan Another URL
              </Button>
            </div>
          </div>
        )}

        {/* Example URLs */}
        {!result && !loading && (
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 rounded-2xl border border-cyan-500/10">
            <h3 className="text-lg font-semibold text-white mb-3">Try these example URLs:</h3>
            <div className="space-y-2">
              <button
                onClick={() => setUrl('https://www.google.com')}
                className="block w-full text-left px-4 py-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                https://www.google.com (Legitimate)
              </button>
              <button
                onClick={() => setUrl('http://192.168.1.1/login-verify-account')}
                className="block w-full text-left px-4 py-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                http://192.168.1.1/login-verify-account (Suspicious)
              </button>
              <button
                onClick={() => setUrl('http://secure-banking-login-verify.suspicious-domain.xyz/account/update')}
                className="block w-full text-left px-4 py-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                Long suspicious URL with keywords (High Risk)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({ icon, label, value, status }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'safe' | 'warning' | 'medium' | 'danger';
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'safe': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'danger': return 'text-red-400 bg-red-500/20 border-red-500/30';
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${getStatusColor()}`}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm opacity-80 mb-1">{label}</div>
          <div className="font-semibold truncate">{value}</div>
        </div>
      </div>
    </div>
  );
}