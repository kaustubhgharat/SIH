// src/component/Navbar/Analysis.tsx
import React, { useState, useMemo } from "react";
import type { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie
} from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Activity,
  Users,
  Truck,
  Store,
  ArrowUp,
  ArrowDown,
  BarChart3,
} from "lucide-react";

// ------------------ TYPES ------------------
type Timeframe = "7d" | "30d" | "90d";

interface TransactionEntry {
  date: string;
  product: string;
  quantity: number;
  pricePerUnit: number;
  revenue: number;
}


interface StatCardProps {
  title: string;
  value: string;
  change: { value: number; direction: "up" | "down" };
  icon: React.ElementType;
  color: { bg: string; text: string };
}

interface CustomTooltipProps {
  active?: boolean;
  // FIX: Replaced 'any' with a specific type for the recharts payload.
  // This tooltip is used for the TransactionEntry chart.
  payload?: { payload: TransactionEntry }[];
  label?: string;
}

// FIX: Added a specific type for the map geography object to avoid 'any'.
interface GeoObject {
  rsmKey: string;
  properties: {
    NAME_1?: string;
    [key: string]: any; // Allow other properties
  };
}

// ------------------ DATA ------------------
// Sample products
const products = ["Onions", "Rice", "Wheat", "Potatoes", "Tomatoes"];

// Generate 90 days of personal transactions
const transactionData: TransactionEntry[] = Array.from({ length: 90 }, (_, i) => {
  const product = products[Math.floor(Math.random() * products.length)];
  const quantity = Math.floor(Math.random() * 50) + 10;
  const price = Math.floor(Math.random() * 500) + 50;
  return {
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    product,
    quantity,
    pricePerUnit: price,
    revenue: quantity * price,
  };
});
// -----------------------------------
// Per-product monthly comparison data
// -----------------------------------
const productsList = ["Rice", "Wheat", "Onions", "Potatoes", "Tomatoes"];

// Calculate your average price/unit per product
const personalAvgPrice = productsList.map((product) => {
  const productTx = transactionData.filter(tx => tx.product === product);
  const avg = productTx.length > 0
    ? productTx.reduce((sum, tx) => sum + tx.pricePerUnit, 0) / productTx.length
    : 0;
  return { product, yourPrice: avg };
});

// Simulate other farmers’ average per product
const areaAvgPrice = productsList.map((product) => {
  const avg = Math.floor(Math.random() * 200) + 50; // mock area average
  return { product, areaAvg: avg };
});

// Merge for chart
const comparisonData = productsList.map((product) => {
  const personal = personalAvgPrice.find(p => p.product === product)?.yourPrice || 0;
  const area = areaAvgPrice.find(a => a.product === product)?.areaAvg || 0;
  return { product, yourPrice: personal, areaAvg: area };
});



// Stats for quick overview
const statsData: Record<Timeframe, Record<string, { value: number; prev: number }>> = {
  "7d": { totalTransactions: { value: 345, prev: 328 }, activeFarmers: { value: 42, prev: 40 }, distributors: { value: 18, prev: 18 }, retailers: { value: 25, prev: 24 } },
  "30d": { totalTransactions: { value: 1420, prev: 1350 }, activeFarmers: { value: 89, prev: 85 }, distributors: { value: 22, prev: 21 }, retailers: { value: 31, prev: 29 } },
  "90d": { totalTransactions: { value: 4510, prev: 4200 }, activeFarmers: { value: 156, prev: 145 }, distributors: { value: 28, prev: 25 }, retailers: { value: 38, prev: 35 } },
};

// ------------------ COMPONENTS ------------------
const StatCard: FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between gap-2">
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
      {change.direction === "up" ? <ArrowUp size={14} className="text-emerald-500" /> : <ArrowDown size={14} className="text-red-500" />}
      <span className={change.direction === "up" ? "text-emerald-500" : "text-red-500"}>{change.value.toFixed(1)}%</span>
      <span className="text-slate-400">vs prev. period</span>
    </div>
  </div>
);

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-gray-700">{label}</p>
        {/* This logic assumes the tooltip is only for TransactionEntry data */}
        <p className="text-sm">{`Product: ${data.product}, Qty: ${data.quantity}, Price: ₹${data.pricePerUnit.toLocaleString("en-IN")}, Revenue: ₹${data.revenue.toLocaleString("en-IN")}`}</p>
      </div>
    );
  }
  return null;
};

// ------------------ MAIN ANALYSIS ------------------
const INDIA_TOPO_JSON = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Analysis: FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const currentStats = statsData[timeframe];

  const chartData = useMemo(() => {
    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
    return transactionData.slice(-days);
  }, [timeframe]);

  // FIX: Added an explicit return type to match the StatCardProps['change'] type.
  const getChange = (current: number, prev: number): { value: number; direction: "up" | "down" } => {
    if (prev === 0) return { value: 100, direction: "up" };
    const value = ((current - prev) / prev) * 100;
    return { value: Math.abs(value), direction: value >= 0 ? "up" : "down" };
  };

  // Pie chart data for crop volumes
  const cropVolumeData = useMemo(() => {
    const map: Record<string, number> = {};
    chartData.forEach(t => { map[t.product] = (map[t.product] || 0) + t.quantity; });
    return Object.keys(map).map((k, i) => ({
      name: k,
      value: map[k],
      color: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5],
    }));
  }, [chartData]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supply Chain Analysis</h1>
            <p className="mt-1 text-md text-slate-600">Performance insights for your supply chain operations.</p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Transactions" value={currentStats.totalTransactions.value.toString()} change={getChange(currentStats.totalTransactions.value, currentStats.totalTransactions.prev)} icon={Activity} color={{ bg: "bg-emerald-100", text: "text-emerald-600" }} />
          <StatCard title="Active Farmers" value={currentStats.activeFarmers.value.toString()} change={getChange(currentStats.activeFarmers.value, currentStats.activeFarmers.prev)} icon={Users} color={{ bg: "bg-blue-100", text: "text-blue-600" }} />
          <StatCard title="Distributors" value={currentStats.distributors.value.toString()} change={getChange(currentStats.distributors.value, currentStats.distributors.prev)} icon={Truck} color={{ bg: "bg-yellow-100", text: "text-yellow-600" }} />
          <StatCard title="Retailers" value={currentStats.retailers.value.toString()} change={getChange(currentStats.retailers.value, currentStats.retailers.prev)} icon={Store} color={{ bg: "bg-purple-100", text: "text-purple-600" }} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Personal Transactions */}
          <div className="space-y-6">
            {/* Bar chart: Quantity & Price/Unit */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart3 size={20} /> Personal Transactions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#22c55e" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="quantity" name="Quantity" fill="#22c55e" />
                  <Bar yAxisId="right" dataKey="pricePerUnit" name="Price/Unit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart: Crop volume */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart3 size={20} /> Crop Volume Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cropVolumeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {cropVolumeData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: Monthly Comparison + Map */}
          <div className="space-y-6">
            {/* Monthly Product Price Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={20} /> Monthly Product Price Comparison
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yourPrice" name="Your Price/Unit" fill="#22c55e" />
                  <Bar dataKey="areaAvg" name="Area Avg Price/Unit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>


            {/* Area-wise Map */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart3 size={20} /> Area-wise Summary (India)</h3>
              <ComposableMap projection="geoMercator" width={400} height={400} projectionConfig={{ scale: 900, center: [82, 22] }}>
                <Geographies geography={INDIA_TOPO_JSON}>
                  {/* FIX: Replaced 'any' with specific types for the render prop. */}
                  {({ geographies }: { geographies: GeoObject[] }) =>
                    geographies.map((geo: GeoObject) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelectedArea(geo.properties?.NAME_1 || "Unknown")}
                        style={{
                          default: { fill: "#E0E0E0", outline: "none" },
                          hover: { fill: "#22c55e", outline: "none" },
                          pressed: { fill: "#15803d", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
              {selectedArea && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-slate-600">Selected Area:</p>
                  <h3 className="font-bold text-lg">{selectedArea}</h3>
                  <p className="text-slate-700">Summary data for {selectedArea} (transactions, revenue, farmers, etc.)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;