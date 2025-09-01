// src/pages/Home.tsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow bg-gradient-to-r from-green-400 to-blue-500 text-white text-center px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🌱 Welcome to AgriTrace
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8">
          A platform to ensure transparency, trust, and efficiency in the
          agriculture supply chain.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-green-600 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-700 text-white rounded-xl shadow hover:bg-green-800 transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          🚀 Why Choose AgriTrace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔗 Transparency</h3>
            <p className="text-gray-600">
              Track products from farm to market with full visibility.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📦 Traceability</h3>
            <p className="text-gray-600">
              Verify authenticity of produce through blockchain-powered records.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⚡ Efficiency</h3>
            <p className="text-gray-600">
              Reduce delays and losses with smarter supply chain management.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} AgriTrace. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
