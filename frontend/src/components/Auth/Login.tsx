import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../UI/Card";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy login validation
    if (username === "k" && password === "k") {
      localStorage.setItem("authUser", JSON.stringify({ username, role }));

      // redirect based on role
      if (role === "farmer") navigate("/farmer");
      else if (role === "distributor") navigate("/distributor");
      else if (role === "consumer") navigate("/consumer");
      else navigate("/profile");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 min-h-screen">
      <Card className="w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login to AgriTrace</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Username"
            value={username}
            onChange={setUsername}
            placeholder="Enter your username"
          />
          <Input
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="farmer">Farmer</option>
              <option value="distributor">Distributor</option>
              <option value="consumer">Consumer</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
