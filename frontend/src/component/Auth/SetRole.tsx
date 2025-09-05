import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SetRole() {
  const { user } = useUser();
  const { user: clerkUser } = useClerk();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSaveRole = async () => {
    if (!role || !clerkUser) return;
    // Clerk user metadata me save karo
    await clerkUser.update({
      unsafeMetadata: { role },
    });

    // role ke hisab se redirect
    if (role === "farmer") navigate("/farmer-dashboard");
    if (role === "distributor") navigate("/distributor-dashboard");
    if (role === "consumer") navigate("/consumer-dashboard");
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
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}
