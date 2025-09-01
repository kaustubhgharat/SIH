
// src/pages/Profile.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">👤 Profile</h1>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name:</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Role:</span>
            <span>{user?.role ?? "User"}</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
