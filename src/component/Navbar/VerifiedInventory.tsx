import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";

import { useCart } from "../hooks/useCart";
import riceImg from "../assets/rice.jpeg";
import potatoImg from "../assets/potato.jpeg";
import wheatImg from "../assets/wheat.jpeg";
import { ToastContainer } from "../ToastContainer";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  govtStatus: "Pending" | "Verified";
  origin: string;
  image: string;
  price: number;
};

const inventory: InventoryItem[] = [
  
  {
    id: "2",
    name: "Basmati Rice",
    category: "Grain",
    quantity: 200,
    govtStatus: "Verified",
    origin: "Dehradun, Uttarakhand",
    image: riceImg,
    price: 120,
  },
  {
    id: "3",
    name: "Himalayan Potatoes",
    category: "Vegetable",
    quantity: 100,
    govtStatus: "Pending",
    origin: "Shimla, Himachal Pradesh",
    image: potatoImg,
    price: 40,
  },
  {
    id: "4",
    name: "Punjab Wheat",
    category: "Grain",
    quantity: 300,
    govtStatus: "Verified",
    origin: "Ludhiana, Punjab",
    image: wheatImg,
    price: 100,
  },
];

export const VerifiedInventory: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, cartCount, toasts } = useCart();
  const verifiedItems = inventory.filter(
    (item) => item.govtStatus === "Verified"
  );

  // 🔹 Track quantities for each product
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const newQty = Math.max(1, current + delta); // at least 1
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer toasts={toasts} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle className="text-emerald-500" /> Verified Marketplace
            </h1>
            <p className="text-slate-500 mt-1">
              Fresh produce, certified for quality.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              <ArrowLeft size={18} /> Back to Home
            </button>
            <NavLink to="/cart" className="relative group p-2">
              <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-emerald-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-md group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </header>

        {/* Products Grid */}
        {verifiedItems.length === 0 ? (
          <p className="text-slate-600 text-center py-20">
            No verified products available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {verifiedItems.map((item) => {
              const qty = quantities[item.id] || 1;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-slate-800">
                      {item.name}
                    </h2>
                    <p className="text-slate-500 text-sm mb-2">
                      Origin: {item.origin}
                    </p>

                    {/* 🔹 Quantity Selector with input */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300"
                        disabled={qty <= 1} // prevent going below 1
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        min={1}
                        max={item.quantity}
                        value={qty}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!isNaN(val)) {
                            setQuantities((prev) => ({
                              ...prev,
                              [item.id]: Math.min(
                                Math.max(1, val),
                                item.quantity
                              ),
                            }));
                          }
                        }}
                        className="w-16 text-center border rounded-lg px-2 py-1 text-gray-700"
                      />

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            qty < item.quantity ? +1 : 0
                          )
                        }
                        disabled={qty >= item.quantity} // prevent exceeding stock
                        className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price + Add Button */}
                    <div className="flex justify-between items-center mt-auto pt-4">
                      <p className="text-xl font-bold text-emerald-700">
                        ₹{item.price}
                        <span className="text-sm font-normal text-slate-500">
                          /kg
                        </span>
                      </p>
                      <button
                        onClick={() => addToCart(item, qty)}
                        disabled={qty > item.quantity} // 🔹 prevent adding beyond stock
                        className={`px-4 py-2 rounded-lg font-semibold transition transform ${
                          qty > item.quantity || item.quantity === 0
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
                        }`}
                      >
                        {item.quantity === 0
                          ? "Out of Stock"
                          : `Add ${qty} to Cart`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
