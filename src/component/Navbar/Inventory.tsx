
import NavbarPage from "./NavbarPage";

const dummyInventory = [
  { id: "1", name: "Tomato", category: "Vegetable", origin: "Farm A", quantity: 150, status: "Available" },
  { id: "2", name: "Rice", category: "Grain", origin: "Farm B", quantity: 200, status: "Distributed" },
];

const Inventory = () => {
  return (
    <>
      <NavbarPage />
      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Inventory</h2>
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Origin</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyInventory.map(item => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.origin}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;
