import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Shield, AlertTriangle, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getURLStats } from '../services/database';

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalScans: 0,
    phishingCount: 0,
    legitimateCount: 0,
    riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
    monthlyTrend: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const data = getURLStats();
    setStats(data);
  };

  // Pie chart data
  const pieData = [
    { name: 'Phishing', value: stats.phishingCount, color: '#ef4444' },
    { name: 'Legitimate', value: stats.legitimateCount, color: '#22c55e' },
  ];

  // Risk distribution data
  const riskData = [
    { name: 'Low', value: stats.riskDistribution.low, color: '#22c55e' },
    { name: 'Medium', value: stats.riskDistribution.medium, color: '#3b82f6' },
    { name: 'High', value: stats.riskDistribution.high, color: '#f59e0b' },
    { name: 'Critical', value: stats.riskDistribution.critical, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Track your URL scanning history and security insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Shield className="w-8 h-8" />}
            title="Total Scans"
            value={stats.totalScans}
            gradient="from-cyan-500 to-blue-600"
          />
          <StatCard
            icon={<AlertTriangle className="w-8 h-8" />}
            title="Phishing Detected"
            value={stats.phishingCount}
            gradient="from-red-500 to-pink-600"
            subtext={`${stats.totalScans > 0 ? Math.round((stats.phishingCount / stats.totalScans) * 100) : 0}% of total`}
          />
          <StatCard
            icon={<Shield className="w-8 h-8" />}
            title="Safe URLs"
            value={stats.legitimateCount}
            gradient="from-green-500 to-emerald-600"
            subtext={`${stats.totalScans > 0 ? Math.round((stats.legitimateCount / stats.totalScans) * 100) : 0}% of total`}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Prediction Distribution */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Prediction Distribution</h2>
            </div>
            {stats.totalScans > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a1628',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available. Start scanning URLs!
              </div>
            )}
          </div>

          {/* Risk Level Distribution */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Risk Level Distribution</h2>
            </div>
            {stats.totalScans > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a1628',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available. Start scanning URLs!
              </div>
            )}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Monthly Scan Trend</h2>
          </div>
          {stats.monthlyTrend.some((d: any) => d.total > 0) ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={stats.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 211, 238, 0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  style={{ fontSize: '14px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '14px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a1628',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Legend
                  wrapperStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="phishing"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 5 }}
                  name="Phishing"
                />
                <Line
                  type="monotone"
                  dataKey="legitimate"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  name="Legitimate"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-500">
              No trend data available. Scan more URLs to see trends!
            </div>
          )}
        </div>

        {/* Risk Breakdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <RiskCard
            level="Low"
            count={stats.riskDistribution.low}
            color="from-green-500 to-emerald-600"
          />
          <RiskCard
            level="Medium"
            count={stats.riskDistribution.medium}
            color="from-blue-500 to-cyan-600"
          />
          <RiskCard
            level="High"
            count={stats.riskDistribution.high}
            color="from-orange-500 to-yellow-600"
          />
          <RiskCard
            level="Critical"
            count={stats.riskDistribution.critical}
            color="from-red-500 to-pink-600"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, gradient, subtext }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  gradient: string;
  subtext?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 text-white`}>
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{title}</div>
      {subtext && <div className="text-sm text-cyan-400 mt-1">{subtext}</div>}
    </div>
  );
}

function RiskCard({ level, count, color }: {
  level: string;
  count: number;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-r ${color} p-4 rounded-xl text-white`}>
      <div className="text-3xl font-bold mb-1">{count}</div>
      <div className="text-sm opacity-90">{level} Risk</div>
    </div>
  );
}
