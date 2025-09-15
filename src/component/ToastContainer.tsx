import React from "react";
import { CheckCircle } from "lucide-react";

type ToastMessage = { id: number; message: string };

export const ToastContainer: React.FC<{ toasts: ToastMessage[] }> = ({ toasts }) => (
  <div className="fixed bottom-5 right-5 z-50 space-y-3">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className="bg-slate-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fadeInUp"
      >
        <CheckCircle className="text-emerald-400" />
        <span>{toast.message}</span>
      </div>
    ))}
  </div>
);
