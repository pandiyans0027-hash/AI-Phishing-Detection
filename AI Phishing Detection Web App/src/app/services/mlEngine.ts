// ML Feature Extraction and Prediction Engine

export interface URLFeatures {
  urlLength: number;
  hasHTTPS: boolean;
  specialCharCount: number;
  hasIPAddress: boolean;
  domainAge: string;
  redirectionCount: number;
  hasSuspiciousKeywords: boolean;
  subdomainCount: number;
  pathDepth: number;
  hasPort: boolean;
}

export interface PredictionResult {
  prediction: 'legitimate' | 'phishing';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  features: URLFeatures;
}

// Simulate ML feature extraction
export const extractFeatures = (url: string): URLFeatures => {
  try {
    const urlObj = new URL(url);
    
    // Extract features
    const urlLength = url.length;
    const hasHTTPS = urlObj.protocol === 'https:';
    const specialCharCount = (url.match(/[@!#$%^&*()+=\[\]{}|\\;':",<>?]/g) || []).length;
    
    // Check for IP address in hostname
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const hasIPAddress = ipPattern.test(urlObj.hostname);
    
    // Suspicious keywords
    const suspiciousKeywords = ['login', 'verify', 'account', 'secure', 'update', 'banking', 'paypal', 'confirm', 'signin'];
    const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => 
      url.toLowerCase().includes(keyword)
    );
    
    // Count subdomains
    const subdomainCount = urlObj.hostname.split('.').length - 2;
    
    // Path depth
    const pathDepth = urlObj.pathname.split('/').filter(p => p.length > 0).length;
    
    // Check for port
    const hasPort = urlObj.port !== '';
    
    // Simulate domain age (random for demo)
    const ages = ['New (< 1 year)', 'Medium (1-3 years)', 'Old (> 3 years)'];
    const domainAge = ages[Math.floor(Math.random() * ages.length)];
    
    // Simulate redirection count
    const redirectionCount = Math.floor(Math.random() * 5);
    
    return {
      urlLength,
      hasHTTPS,
      specialCharCount,
      hasIPAddress,
      domainAge,
      redirectionCount,
      hasSuspiciousKeywords,
      subdomainCount,
      pathDepth,
      hasPort
    };
  } catch (error) {
    // Invalid URL
    throw new Error('Invalid URL format');
  }
};

// Simulate ML prediction based on features
export const predictPhishing = (features: URLFeatures): PredictionResult => {
  let phishingScore = 0;
  let maxScore = 100;
  
  // Scoring algorithm (simulating ML model)
  
  // URL Length (longer URLs are more suspicious)
  if (features.urlLength > 75) phishingScore += 15;
  else if (features.urlLength > 54) phishingScore += 10;
  
  // HTTPS (lack of HTTPS is suspicious)
  if (!features.hasHTTPS) phishingScore += 20;
  
  // Special characters
  if (features.specialCharCount > 5) phishingScore += 15;
  else if (features.specialCharCount > 3) phishingScore += 10;
  
  // IP Address in URL (very suspicious)
  if (features.hasIPAddress) phishingScore += 25;
  
  // Suspicious keywords
  if (features.hasSuspiciousKeywords) phishingScore += 12;
  
  // Domain age (newer domains are more suspicious)
  if (features.domainAge === 'New (< 1 year)') phishingScore += 10;
  
  // Redirections
  if (features.redirectionCount > 2) phishingScore += 15;
  else if (features.redirectionCount > 0) phishingScore += 8;
  
  // Subdomains (many subdomains are suspicious)
  if (features.subdomainCount > 3) phishingScore += 10;
  else if (features.subdomainCount > 2) phishingScore += 5;
  
  // Path depth (complex paths can be suspicious)
  if (features.pathDepth > 5) phishingScore += 8;
  
  // Port (non-standard ports are suspicious)
  if (features.hasPort) phishingScore += 10;
  
  // Calculate confidence and prediction
  const confidence = Math.min(95, Math.max(55, phishingScore + Math.random() * 10));
  const prediction: 'legitimate' | 'phishing' = phishingScore > 50 ? 'phishing' : 'legitimate';
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' | 'critical';
  if (phishingScore < 30) riskLevel = 'low';
  else if (phishingScore < 50) riskLevel = 'medium';
  else if (phishingScore < 70) riskLevel = 'high';
  else riskLevel = 'critical';
  
  return {
    prediction,
    confidence: Math.round(confidence),
    riskLevel,
    features
  };
};

// Main scan function
export const scanURL = async (url: string): Promise<PredictionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const features = extractFeatures(url);
  const result = predictPhishing(features);
  
  return result;
};
