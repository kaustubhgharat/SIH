import { useState, useEffect } from "react";
import NavbarPage from "./NavbarPage";
import { Search, X, Box, Package, MapPin, Loader2 } from "lucide-react";

import qrImage from "../assets/qr.jpeg";
import tomatoImg from "../assets/tomato.jpeg";
import riceImg from "../assets/rice.jpeg";
import potatoImg from "../assets/potato.jpeg";
import wheatImg from "../assets/wheat.jpeg";

// Define a type for your inventory item for better type safety
type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  govtStatus: "Pending" | "Verified";
  origin: string;
  image: string;
};

const initialInventory: InventoryItem[] = [
  { id: "1", name: "Tomato", category: "Vegetable", quantity: 150, govtStatus: "Pending", origin: "Farm A", image: tomatoImg },
  { id: "2", name: "Rice", category: "Grain", quantity: 200, govtStatus: "Verified", origin: "Farm B", image: riceImg },
  { id: "3", name: "Potato", category: "Vegetable", quantity: 100, govtStatus: "Pending", origin: "Farm C", image: potatoImg },
  { id: "4", name: "Wheat", category: "Grain", quantity: 300, govtStatus: "Verified", origin: "Farm D", image: wheatImg },
];

// Reusable Status Badge Component - Now with updated 'emerald' color
const StatusBadge = ({ status }: { status: "Verified" | "Pending" }) => {
  const isVerified = status === "Verified";
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${isVerified ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"}`}>
      {status}
    </span>
  );
};

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Verified" | "Pending">("All");
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyProduct = (itemToVerify: InventoryItem) => {
    setIsVerifying(true);
    setTimeout(() => {
      setInventory(prevInventory =>
        prevInventory.map(item =>
          item.id === itemToVerify.id ? { ...item, govtStatus: "Verified" } : item
        )
      );
      setIsVerifying(false);
      handleCloseModal();
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 300);
  };
  
  const filteredInventory = inventory
    .filter(item => filterStatus === "All" || item.govtStatus === filterStatus)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selected]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <NavbarPage />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Inventory Management
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Search, view, and verify your products.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10 items-center">
          <div className="relative w-full max-w-lg">
            <input type="text" placeholder="Search product by name..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-5 pr-12 py-3 border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-200/60 rounded-full">
            {(["All", "Verified", "Pending"] as const).map(status => (
              <button key={status} onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${filterStatus === status ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:bg-slate-300/50'}`}>
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item, index) => (
                  <div key={item.id} style={{ animationDelay: `${index * 50}ms` }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeInUp">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                        <StatusBadge status={item.govtStatus} />
                      </div>
                      <p className="text-slate-500 mt-1 text-sm">Category: {item.category}</p>
                      <div className="mt-4 space-y-2 text-slate-700">
                        <p className="font-medium"><strong>Quantity:</strong> {item.quantity} kg</p>
                        <p className="font-medium"><strong>Origin:</strong> {item.origin}</p>
                      </div>
                      <button onClick={() => setSelected(item)} className="mt-5 w-full px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 bg-white text-center text-slate-500 py-16 rounded-xl shadow-sm border">No products found.</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center sticky top-8">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Scan to Add Product</h2>
              <p className="text-slate-600 mb-6 text-sm">Use your mobile device to add a new item to the inventory.</p>
              <div className="flex justify-center">
                <div className="p-1 rounded-lg border-2 border-slate-200 relative animate-glow">
                  <img src={qrImage} alt="QR Code" className="w-56 h-56 object-contain rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className={`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}>
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full p-1 transition" aria-label="Close modal">
              <X size={24} />
            </button>
            <div className="text-center">
              <img src={selected.image} alt={selected.name} className="w-40 h-40 object-cover rounded-full shadow-lg mb-4 mx-auto border-4 border-white"/>
              <h3 className="text-3xl font-extrabold text-emerald-600">{selected.name}</h3>
              <div className="my-2"><StatusBadge status={selected.govtStatus}/></div>
            </div>
            <hr className="my-6 border-slate-200" />
            <div className="space-y-4 text-slate-700 text-left text-base">
              <p className="flex items-center gap-3"><Box className="text-emerald-500" size={20}/> <strong className="font-medium text-slate-500">Category:</strong> <span className="ml-auto font-semibold text-slate-800">{selected.category}</span></p>
              <p className="flex items-center gap-3"><Package className="text-emerald-500" size={20}/> <strong className="font-medium text-slate-500">Quantity:</strong> <span className="ml-auto font-semibold text-slate-800">{selected.quantity} kg</span></p>
              <p className="flex items-center gap-3"><MapPin className="text-emerald-500" size={20}/> <strong className="font-medium text-slate-500">Origin:</strong> <span className="ml-auto font-semibold text-slate-800">{selected.origin}</span></p>
            </div>
            {selected.govtStatus === "Pending" && (
              <div className="mt-8">
                <button onClick={() => handleVerifyProduct(selected)} disabled={isVerifying}
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition disabled:bg-emerald-400 disabled:cursor-not-allowed">
                  {isVerifying ? <><Loader2 className="animate-spin" size={20}/> Verifying...</> : 'Verify Product'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;