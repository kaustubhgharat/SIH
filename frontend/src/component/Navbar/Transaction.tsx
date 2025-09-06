
import NavbarPage from "./NavbarPage";

const dummyTransactions = [
  { id: "T001", product: "Tomato", from: "Farm A", to: "Distributor X", date: "2025-09-05", status: "Completed" },
  { id: "T002", product: "Rice", from: "Farm B", to: "Retailer Y", date: "2025-09-06", status: "In Transit" },
];

const Transaction = () => {
  return (
    <>
      <NavbarPage />
      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Transaction History</h2>
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyTransactions.map(tx => (
              <tr key={tx.id}>
                <td className="p-2 border">{tx.id}</td>
                <td className="p-2 border">{tx.product}</td>
                <td className="p-2 border">{tx.from}</td>
                <td className="p-2 border">{tx.to}</td>
                <td className="p-2 border">{tx.date}</td>
                <td className="p-2 border">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
