// Simulated MongoDB database using localStorage

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

export interface URLLog {
  id: string;
  url: string;
  prediction: 'legitimate' | 'phishing';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  features: any;
  timestamp: string;
  user_id?: string;
}

export interface Session {
  user_id: string;
  email: string;
  name: string;
}

// Initialize database
const initDB = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('url_logs')) {
    localStorage.setItem('url_logs', JSON.stringify([]));
  }
  if (!localStorage.getItem('session')) {
    localStorage.setItem('session', JSON.stringify(null));
  }
};

// User operations
export const createUser = (email: string, password: string, name: string): User => {
  initDB();
  
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    password_hash: btoa(password), // Simple encoding (not secure, for demo only)
    name,
    created_at: new Date().toISOString()
  };
  
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  
  return user;
};

export const loginUser = (email: string, password: string): User => {
  initDB();
  
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password_hash === btoa(password));
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Create session
  const session: Session = {
    user_id: user.id,
    email: user.email,
    name: user.name
  };
  localStorage.setItem('session', JSON.stringify(session));
  
  return user;
};

export const logoutUser = () => {
  localStorage.setItem('session', JSON.stringify(null));
};

export const getCurrentSession = (): Session | null => {
  initDB();
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
};

// URL Log operations
export const saveURLLog = (log: Omit<URLLog, 'id' | 'timestamp' | 'user_id'>): URLLog => {
  initDB();
  
  const logs: URLLog[] = JSON.parse(localStorage.getItem('url_logs') || '[]');
  const session = getCurrentSession();
  
  const urlLog: URLLog = {
    ...log,
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    user_id: session?.user_id
  };
  
  logs.push(urlLog);
  localStorage.setItem('url_logs', JSON.stringify(logs));
  
  return urlLog;
};

export const getAllURLLogs = (): URLLog[] => {
  initDB();
  const logs: URLLog[] = JSON.parse(localStorage.getItem('url_logs') || '[]');
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getUserURLLogs = (userId: string): URLLog[] => {
  const logs = getAllURLLogs();
  return logs.filter(log => log.user_id === userId);
};

export const getURLStats = () => {
  const logs = getAllURLLogs();
  
  const totalScans = logs.length;
  const phishingCount = logs.filter(log => log.prediction === 'phishing').length;
  const legitimateCount = logs.filter(log => log.prediction === 'legitimate').length;
  
  // Risk distribution
  const lowRisk = logs.filter(log => log.riskLevel === 'low').length;
  const mediumRisk = logs.filter(log => log.riskLevel === 'medium').length;
  const highRisk = logs.filter(log => log.riskLevel === 'high').length;
  const criticalRisk = logs.filter(log => log.riskLevel === 'critical').length;
  
  // Monthly trend (last 6 months)
  const monthlyData = getMonthlyTrend(logs);
  
  return {
    totalScans,
    phishingCount,
    legitimateCount,
    riskDistribution: {
      low: lowRisk,
      medium: mediumRisk,
      high: highRisk,
      critical: criticalRisk
    },
    monthlyTrend: monthlyData
  };
};

const getMonthlyTrend = (logs: URLLog[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyData = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    const monthName = months[monthIndex];
    
    const monthLogs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate.getMonth() === monthIndex && logDate.getFullYear() === year;
    });
    
    const phishing = monthLogs.filter(log => log.prediction === 'phishing').length;
    const legitimate = monthLogs.filter(log => log.prediction === 'legitimate').length;
    
    monthlyData.push({
      month: monthName,
      phishing,
      legitimate,
      total: phishing + legitimate
    });
  }
  
  return monthlyData;
};

// Initialize on import
initDB();
