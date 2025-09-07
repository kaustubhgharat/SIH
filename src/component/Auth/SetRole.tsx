import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SetRole() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Check if role already saved in localStorage
  useEffect(() => {
    if (user) {
      const savedRole = localStorage.getItem(`role_${user.id}`);
      if (savedRole) {
        setRole(savedRole);
        // Auto redirect agar role already hai
        if (savedRole === "farmer") navigate("/farmer-dashboard");
        if (savedRole === "distributor") navigate("/distributor-dashboard");
        if (savedRole === "consumer") navigate("/consumer-dashboard");
      }
    }
  }, [user, navigate]);

  const handleSaveRole = () => {
    if (!role || !user) return;
    setLoading(true);

    // ✅ Role save in localStorage
    localStorage.setItem(`role_${user.id}`, role);

    // ✅ Redirect
    if (role === "farmer") navigate("/farmer-dashboard");
    if (role === "distributor") navigate("/distributor-dashboard");
    if (role === "consumer") navigate("/consumer-dashboard");

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold">Select Your Role</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">-- Select Role --</option>
        <option value="farmer">Farmer</option>
        <option value="distributor">Distributor</option>
        <option value="consumer">Consumer</option>
      </select>
      <button
        onClick={handleSaveRole}
        disabled={loading}
        className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
