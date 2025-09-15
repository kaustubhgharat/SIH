import React, { useState, useMemo } from "react";
import type { FC } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  
} from "recharts";
import {
  Activity,
  Users,
  Truck,
  Store,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart as PieIcon,
  Loader2,
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type Timeframe = "7d" | "30d" | "90d";

interface StatCardProps {
  title: string;
  value: string;
  change: { value: number; direction: "up" | "down" };
  icon: React.ElementType;
  color: { bg: string; text: string };
}

interface ChartCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isLoading: boolean;
}

interface TransactionEntry {
  date: string;
  transactions: number;
}

interface ProductEntry {
  name: string;
  value: number;
  revenue: number;
  color: string;
}

// --- DATA GENERATION (More realistic and extensive) ---
const generateDate = (daysAgo: number) => {
  const date = new Date("2025-09-15T12:00:00Z");
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const transactionData: TransactionEntry[] = Array.from({ length: 90 }, (_, i) => ({
  date: generateDate(89 - i).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  }),
  transactions:
    20 +
    Math.floor(Math.random() * 50) +
    Math.floor(i / 7) * 2, // General upward trend
}));

const productDistribution: ProductEntry[] = [
  { name: "Nashik Onions", value: 350, revenue: 1200000, color: "#22c55e" },
  { name: "Basmati Rice", value: 450, revenue: 3500000, color: "#3b82f6" },
  { name: "Punjab Wheat", value: 600, revenue: 2100000, color: "#f59e0b" },
  { name: "Himalayan Potatoes", value: 250, revenue: 950000, color: "#ef4444" },
  { name: "Organic Tomatoes", value: 150, revenue: 750000, color: "#8b5cf6" },
];

const statsData = {
  "7d": {
    totalTransactions: { value: 345, prev: 328 },
    activeFarmers: { value: 42, prev: 40 },
    distributors: { value: 18, prev: 18 },
    retailers: { value: 25, prev: 24 },
  },
  "30d": {
    totalTransactions: { value: 1420, prev: 1350 },
    activeFarmers: { value: 89, prev: 85 },
    distributors: { value: 22, prev: 21 },
    retailers: { value: 31, prev: 29 },
  },
  "90d": {
    totalTransactions: { value: 4510, prev: 4200 },
    activeFarmers: { value: 156, prev: 145 },
    distributors: { value: 28, prev: 25 },
    retailers: { value: 38, prev: 35 },
  },
};

// --- HELPER & REUSABLE COMPONENTS ---
const StatCard: FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between gap-2 transition-all hover:shadow-md hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${color.bg}`}>
        <Icon size={24} className={color.text} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
    <div className="flex items-center gap-1 text-xs">
      {change.direction === "up" ? (
        <ArrowUp size={14} className="text-emerald-500" />
      ) : (
        <ArrowDown size={14} className="text-red-500" />
      )}
      <span
        className={
          change.direction === "up" ? "text-emerald-500" : "text-red-500"
        }
      >
        {change.value.toFixed(1)}%
      </span>
      <span className="text-slate-400">vs prev. period</span>
    </div>
  </div>
);

const ChartCard: FC<ChartCardProps> = ({
  title,
  icon: Icon,
  children,
  isLoading,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <Icon className="text-slate-400" size={20} /> {title}
    </h3>
    {isLoading && (
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    )}
    <div className="h-80">{children}</div>
  </div>
);

// ✅ Fixed CustomTooltip typing

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    stroke?: string;
    payload?: { fill?: string };
  }[];
  label?: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-gray-700">{label}</p>
        <p
          className="text-sm"
          style={{
            color: data.stroke || data.payload?.fill,
          }}
        >
          {`${data.name}: ${data.value.toLocaleString("en-IN")}`}
        </p>
      </div>
    );
  }
  return null;
};


// --- MAIN ANALYSIS COMPONENT ---
const Analysis: FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");
  const [loading, setLoading] = useState(false);

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setLoading(true);
    setTimeframe(newTimeframe);
    setTimeout(() => setLoading(false), 500); // Simulate data fetching
  };

  const currentStats = statsData[timeframe];

  const getChange = (current: number, prev: number) => {
    if (prev === 0) return { value: 100, direction: "up" as const };
    const value = ((current - prev) / prev) * 100;
    return {
      value: Math.abs(value),
      direction: value >= 0 ? ("up" as const) : ("down" as const),
    };
  };

  const chartData = useMemo(() => {
    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
    return transactionData.slice(-days);
  }, [timeframe]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Supply Chain Analysis
            </h1>
            <p className="mt-1 text-md text-slate-600">
              Performance insights for your supply chain operations.
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-200/60 rounded-full">
            {(["7d", "30d", "90d"] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  timeframe === tf
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-300/50"
                }`}
              >
                Last {tf.replace("d", "")} Days
              </button>
            ))}
          </div>
        </header>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Transactions"
            value={currentStats.totalTransactions.value.toLocaleString("en-IN")}
            change={getChange(
              currentStats.totalTransactions.value,
              currentStats.totalTransactions.prev
            )}
            icon={Activity}
            color={{ bg: "bg-emerald-100", text: "text-emerald-600" }}
          />
          <StatCard
            title="Active Farmers"
            value={currentStats.activeFarmers.value.toLocaleString("en-IN")}
            change={getChange(
              currentStats.activeFarmers.value,
              currentStats.activeFarmers.prev
            )}
            icon={Users}
            color={{ bg: "bg-blue-100", text: "text-blue-600" }}
          />
          <StatCard
            title="Distributors"
            value={currentStats.distributors.value.toLocaleString("en-IN")}
            change={getChange(
              currentStats.distributors.value,
              currentStats.distributors.prev
            )}
            icon={Truck}
            color={{ bg: "bg-yellow-100", text: "text-yellow-600" }}
          />
          <StatCard
            title="Retailers"
            value={currentStats.retailers.value.toLocaleString("en-IN")}
            change={getChange(
              currentStats.retailers.value,
              currentStats.retailers.prev
            )}
            icon={Store}
            color={{ bg: "bg-purple-100", text: "text-purple-600" }}
          />
        </div>

        {/* --- Main Dashboard Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions Over Time */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Transactions Over Time"
              icon={BarChart3}
              isLoading={loading}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorTransactions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#22c55e"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    name="Transactions"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTransactions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Product Volume */}
          <div className="space-y-6">
            <ChartCard title="Product Volume" icon={PieIcon} isLoading={loading}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {productDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-slate-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Revenue */}
          <div className="lg:col-span-3">
            <ChartCard
              title="Revenue by Product (All Time)"
              icon={BarChart3}
              isLoading={false}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productDistribution}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `₹${Number(value) / 100000}L`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-slate-600 capitalize">{value}</span>
                    )}
                  />
                  <Bar dataKey="revenue" name="Revenue">
                    {productDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
