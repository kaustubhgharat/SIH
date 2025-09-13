import NavbarPage from "./NavbarPage";
import { ArrowRight } from "lucide-react";

type Transaction = {
  id: string;
  product: string;
  from: string;
  to: string;
  date: string;
};

const dummyTransactions: Transaction[] = [
  { id: "T001", product: "Tomato", from: "Farm A", to: "Distributor X", date: "2025-09-05" },
  { id: "T002", product: "Rice", from: "Farm B", to: "Retailer Y", date: "2025-09-06" },
  { id: "T003", product: "Potato", from: "Farm C", to: "Distributor Z", date: "2025-09-07" },
  { id: "T004", product: "Wheat", from: "Farm D", to: "Retailer M", date: "2025-09-08" },
  { id: "T005", product: "Onion", from: "Farm E", to: "Distributor Y", date: "2025-09-09" },
  { id: "T006", product: "Corn", from: "Farm F", to: "Retailer N", date: "2025-09-10" },
];

const TransactionPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <NavbarPage />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Transaction History
          </h1>
          <p className="mt-1 text-sm sm:text-md text-slate-600">
            Review all recent movements in the supply chain.
          </p>
        </header>

        {/* --- Desktop Table --- */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase">Transaction ID</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase">Route</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {dummyTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-green-50/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">{tx.id}</code>
                    </td>
                    <td className="p-4 font-medium text-gray-800">{tx.product}</td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span>{tx.from}</span>
                        <ArrowRight size={16} className="text-green-500" />
                        <span>{tx.to}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{tx.date}</td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1.5 bg-white text-green-700 border border-green-300 text-xs font-semibold rounded-md hover:bg-green-50 transition">
                        View Supply Chain
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Mobile Cards --- */}
        <div className="md:hidden space-y-4">
          {dummyTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                  {tx.id}
                </code>
                <span className="text-sm text-slate-500">{tx.date}</span>
              </div>
              <p className="font-semibold text-gray-800">{tx.product}</p>
              <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                <span>{tx.from}</span>
                <ArrowRight size={14} className="text-green-500" />
                <span>{tx.to}</span>
              </div>
              <button className="mt-3 w-full px-3 py-2 bg-green-100 text-green-700 border border-green-200 text-sm font-medium rounded-md hover:bg-green-200 transition">
                View Supply Chain
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;
