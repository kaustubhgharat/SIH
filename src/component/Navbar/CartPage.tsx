import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "../hooks/useCart";
import { ToastContainer } from "../ToastContainer";

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total, toasts } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 ml-4">
            Your Shopping Cart
          </h1>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-lg shadow-sm">
            <ShoppingCart size={48} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base px-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/verified")}
              className="mt-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mx-auto sm:mx-0"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">₹{item.price} / kg</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-semibold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-bold text-base sm:text-lg w-full sm:w-24 text-center sm:text-right">
                    ₹{item.price * item.qty}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition self-center"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white p-4 sm:p-6 rounded-xl shadow-sm sticky top-20">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-3 sm:pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between font-bold text-lg sm:text-xl text-gray-800 pt-4 border-t mt-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <button className="mt-6 w-full py-2.5 sm:py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md text-base sm:text-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
