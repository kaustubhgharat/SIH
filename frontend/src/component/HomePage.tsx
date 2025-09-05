import type { ReactNode } from "react";
import NavbarPage from "./Navbar/NavbarPage";
import {
  Tractor,
  Truck,
  ShoppingCart,
  ShieldCheck,
  LocateFixed,
  QrCode,
} from "lucide-react";
import { SignInButton, SignUpButton, SignedOut, SignedIn } from "@clerk/clerk-react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

// Helper component for feature cards
const FeatureCard = ({ icon, title, children }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-8 text-center bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full text-green-700">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-green-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarPage />

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 leading-tight drop-shadow-sm">
          Building Trust from Farm to Table
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
          Leveraging blockchain to create a transparent, fair, and efficient
          supply chain for agricultural produce.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Register
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href="#how-it-works"
              className="bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105"
            >
              Learn More
            </a>
          </SignedIn>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-green-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, three-step process for complete transparency.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Tractor className="w-8 h-8" />}
              title="For Farmers"
            >
              Register produce details on the blockchain to guarantee
              authenticity, prove quality, and secure fair pricing.
            </FeatureCard>
            <FeatureCard
              icon={<Truck className="w-8 h-8" />}
              title="For Distributors"
            >
              Track shipments in real-time. Verify quality and origin with
              immutable blockchain records at every step.
            </FeatureCard>
            <FeatureCard
              icon={<ShoppingCart className="w-8 h-8" />}
              title="For Consumers"
            >
              Scan a simple QR code to trace the entire journey of your food,
              ensuring it's fresh, safe, and ethically sourced.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-green-900 mb-4">
              Core Features of AgriTrace
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The technology powering a trustworthy supply chain.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Blockchain Security"
            >
              Every transaction is recorded on an immutable ledger, preventing
              fraud and ensuring data integrity.
            </FeatureCard>
            <FeatureCard
              icon={<LocateFixed className="w-8 h-8" />}
              title="Real-time Tracking"
            >
              Monitor the location and status of produce from the moment it
              leaves the farm until it reaches the shelf.
            </FeatureCard>
            <FeatureCard
              icon={<QrCode className="w-8 h-8" />}
              title="QR Code Integration"
            >
              Easy-to-use QR codes on packaging provide instant access to the
              product's complete history for all stakeholders.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8 text-center">
          <p className="mb-2 text-lg">© 2025 AgriTrace. All rights reserved.</p>
          <p className="text-green-200">
            For inquiries, please contact us at:{" "}
            <a
              href="mailto:support@agritrace.com"
              className="font-semibold hover:underline"
            >
              support@agritrace.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
