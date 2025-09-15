import React, { useState, useMemo } from "react";
import { ArrowRight, Search, ArrowUp, ArrowDown, Package, Apple, Wheat, Carrot, Leaf } from "lucide-react";

// --- Type Definitions and Initial Data ---
type Transaction = {
  id: string;
  product: string;
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  time: string;
  quantity: number;
  price: number;
};

// Updated dummy data with more variety and recent dates
const dummyTransactions: Transaction[] = [
  { id: "T001", product: "Tomatoes", from: "GreenLeaf Farms", to: "FreshMart Pune", date: "2025-09-15", time: "10:30 AM", quantity: 500, price: 15000 },
  { id: "T002", product: "Basmati Rice", from: "Himalayan Grains", to: "Nature's Basket", date: "2025-09-14", time: "02:15 PM", quantity: 1200, price: 110000 },
  { id: "T003", product: "Potatoes", from: "Satara Growers", to: "Local Grocers", date: "2025-09-14", time: "09:00 AM", quantity: 800, price: 20000 },
  { id: "T004", product: "Wheat", from: "Punjab Fields", to: "AgriCorp Inc.", date: "2025-09-12", time: "04:20 PM", quantity: 1500, price: 55000 },
  { id: "T005", product: "Onions", from: "Nashik Traders", to: "FreshMart Pune", date: "2025-09-11", time: "11:10 AM", quantity: 600, price: 18000 },
  { id: "T006", product: "Corn", from: "Deccan Harvest", to: "Nature's Basket", date: "2025-09-10", time: "01:45 PM", quantity: 700, price: 21000 },
];

// --- Helper Functions and Components ---

// Map products to icons
const getProductIcon = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes("tomato")) return <Apple className="w-5 h-5 text-red-500" />;
    if (name.includes("rice")) return <Package className="w-5 h-5 text-amber-600" />;
    if (name.includes("potato") || name.includes("onion")) return <Carrot className="w-5 h-5 text-orange-500" />;
    if (name.includes("wheat")) return <Wheat className="w-5 h-5 text-yellow-500" />;
    if (name.includes("corn")) return <Leaf className="w-5 h-5 text-green-500" />;
    return <Package className="w-5 h-5 text-gray-400" />;
};

// Format date and provide relative context
const formatDate = (dateString: string) => {
    const today = new Date('2025-09-15T18:35:14'); // Fixed current date for consistent output
    const date = new Date(dateString);
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let relative = "";
    if (diffDays === 0 && today.getDate() === date.getDate()) relative = "Today";
    else if (diffDays === 1) relative = "Yesterday";
    else if (diffDays > 1 && diffDays <= 7) relative = `${diffDays} days ago`;

    const formattedDate = date.toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' });
    return { full: formattedDate, relative };
};

const TransactionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

  const sortedAndFilteredTransactions = useMemo(() => {
    const filtered = dummyTransactions.filter(tx =>
      tx.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Special handling for date sorting
      if (sortConfig.key === 'date') {
        aValue = new Date(a.date + ' ' + a.time).getTime();
        bValue = new Date(b.date + ' ' + b.time).getTime();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortConfig]);
  
  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader: React.FC<{ sortKey: keyof Transaction; children: React.ReactNode }> = ({ sortKey, children }) => (
    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer" onClick={() => requestSort(sortKey)}>
        <div className="flex items-center gap-2">
            {children}
            {sortConfig.key === sortKey && (sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </div>
    </th>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="mt-1 text-md text-slate-600">Review all recent movements in the supply chain.</p>
        </header>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* --- Filter/Search Controls --- */}
            <div className="p-4 border-b border-slate-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by product, ID, sender, or receiver..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="text-slate-400" size={20} />
                    </div>
                </div>
            </div>

            {/* --- Desktop Table --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <SortableHeader sortKey="id">ID</SortableHeader>
                    <SortableHeader sortKey="product">Product</SortableHeader>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase">Route</th>
                    <SortableHeader sortKey="date">Date</SortableHeader>
                    <SortableHeader sortKey="quantity">Quantity</SortableHeader>
                    <SortableHeader sortKey="price">Price</SortableHeader>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sortedAndFilteredTransactions.map((tx) => {
                      const { full, relative } = formatDate(tx.date);
                      return(
                        <tr key={tx.id} className="hover:bg-emerald-50/50 transition-colors">
                            <td className="p-4 whitespace-nowrap"><code className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">{tx.id}</code></td>
                            <td className="p-4 font-medium text-gray-800"><div className="flex items-center gap-3">{getProductIcon(tx.product)}<span>{tx.product}</span></div></td>
                            <td className="p-4 text-slate-600"><div className="flex items-center gap-2"><span>{tx.from}</span><ArrowRight size={16} className="text-emerald-500" /><span>{tx.to}</span></div></td>
                            <td className="p-4 text-slate-600"><div>{full}{relative && <span className="text-xs text-emerald-600 block">{relative}</span>}</div></td>
                            <td className="p-4 text-slate-600">{tx.quantity.toLocaleString('en-IN')} kg</td>
                            <td className="p-4 text-slate-800 font-semibold">₹{tx.price.toLocaleString('en-IN')}</td>
                            <td className="p-4 text-right"><button className="px-3 py-1.5 bg-white text-emerald-700 border border-emerald-300 text-xs font-semibold rounded-md hover:bg-emerald-50 transition">View Supply Chain</button></td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>

            {/* --- Mobile Cards --- */}
            <div className="md:hidden">
              <ul className="divide-y divide-slate-200">
                {sortedAndFilteredTransactions.map((tx) => {
                   const { full, relative } = formatDate(tx.date);
                   return (
                    <li key={tx.id} className="p-4 hover:bg-emerald-50/50">
                        <div className="flex justify-between items-center mb-2">
                            <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">{tx.id}</code>
                            <span className="text-sm text-slate-500">{full} {relative && `(${relative})`}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-gray-800 mb-1">{getProductIcon(tx.product)} {tx.product}</div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm mt-1"><span>{tx.from}</span><ArrowRight size={14} className="text-emerald-500" /><span>{tx.to}</span></div>
                        <div className="mt-3 flex justify-between items-center text-sm">
                            <div className="text-slate-700"><span className="font-medium">Qty:</span> {tx.quantity.toLocaleString('en-IN')} kg</div>
                            <div className="font-bold text-emerald-600 text-base">₹{tx.price.toLocaleString('en-IN')}</div>
                        </div>
                    </li>
                   );
                })}
              </ul>
            </div>
            
            {sortedAndFilteredTransactions.length === 0 && (
                <div className="text-center py-16 px-4">
                    <Search className="mx-auto text-slate-400" size={40}/>
                    <h3 className="mt-2 text-lg font-semibold text-slate-800">No Transactions Found</h3>
                    <p className="mt-1 text-sm text-slate-500">Your search for "{searchTerm}" did not match any transactions.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;