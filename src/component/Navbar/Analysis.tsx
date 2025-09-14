import NavbarPage from "./NavbarPage";
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
} from "recharts";
import { Activity, Users, Truck, Store, MapPin } from "lucide-react";
import React from "react";

// --- TYPES ---
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: { bg: string; text: string };
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}

interface RenderLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
}

// --- DUMMY DATA ---
const transactionTrend = [
  { date: "Sep 1", transactions: 20 },
  { date: "Sep 2", transactions: 35 },
  { date: "Sep 3", transactions: 28 },
  { date: "Sep 4", transactions: 40 },
  { date: "Sep 5", transactions: 50 },
  { date: "Sep 6", transactions: 45 },
  { date: "Sep 7", transactions: 60 },
];

const productDistribution = [
  { name: "Tomato", value: 25 },
  { name: "Rice", value: 30 },
  { name: "Wheat", value: 20 },
  { name: "Potato", value: 15 },
  { name: "Onion", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

// --- HELPER & REUSABLE COMPONENTS ---

// Reusable Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-1">
      <div className={`p-3 rounded-full ${color.bg}`}>
        <Icon size={24} className={color.text} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
  );
};

// Reusable Chart Container Card
const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="h-72">{children}</div>
  </div>
);

// Custom Tooltip for Recharts
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          {`${payload[0].name}: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

// Custom Label for Pie Chart
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderLabelProps): React.ReactNode => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- MAIN ANALYSIS COMPONENT ---
const Analysis = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <NavbarPage />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Supply Chain Analysis
          </h1>
          <p className="mt-1 text-md text-slate-600">
            Key metrics and insights into the supply chain performance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* --- Stats Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Transactions"
                value="278"
                icon={Activity}
                color={{ bg: "bg-green-100", text: "text-green-600" }}
              />
              <StatCard
                title="Active Farmers"
                value="35"
                icon={Users}
                color={{ bg: "bg-blue-100", text: "text-blue-600" }}
              />
              <StatCard
                title="Distributors"
                value="18"
                icon={Truck}
                color={{ bg: "bg-yellow-100", text: "text-yellow-600" }}
              />
              <StatCard
                title="Retailers"
                value="22"
                icon={Store}
                color={{ bg: "bg-purple-100", text: "text-purple-600" }}
              />
            </div>

            {/* --- Transaction Trend Chart --- */}
            <ChartCard title="Transactions Over Time">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transactionTrend}
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
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
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
                  <Legend iconType="circle" iconSize={10} />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    stroke="#22c55e"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTransactions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* --- Product Distribution Chart --- */}
            <ChartCard title="Product Distribution">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    labelLine={false}
                    label={renderCustomizedLabel as (props: any) => React.ReactNode} // ✅ type cast
                    paddingAngle={5}
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="focus:outline-none"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={10} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* --- Right Column (Map Placeholder) --- */}
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6 flex flex-col justify-center text-center space-y-4 lg:sticky lg:top-8 h-fit">
            <MapPin className="mx-auto text-green-500" size={48} />
            <h3 className="text-lg font-semibold text-gray-800">
              Live Supply Chain Map
            </h3>
            <p className="text-sm text-slate-500">
              Visualize the journey of products from farms to retailers in
              real-time.
            </p>
            <div className="w-full h-80 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <span className="text-slate-400 font-medium">
                Map Integration Placeholder
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
