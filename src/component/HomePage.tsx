import type { ReactNode } from "react";
import {
  Tractor,
  Truck,
  ShoppingCart,
  ShieldCheck,
  LocateFixed,
  QrCode,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";
import FooterPage from "./Footer/FooterPage";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

// --- Reusable Card with polished styling ---
const FeatureCard = ({ icon, title, children }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-8 text-center bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full text-green-700 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main>
        {/* Hero Section */}
        <header className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-green-50 to-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 leading-tight tracking-tight">
              Building Trust from Farm to Fork
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Leveraging blockchain to create a transparent, fair, and efficient
              supply chain for all agricultural produce.
            </p>

            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 gap-4 sm:gap-0 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-full sm:w-auto">
                    Register
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 w-full sm:w-auto mt-4 sm:mt-0">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <a
                  href="#how-it-works"
                  className="bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 w-full sm:w-auto"
                >
                  Learn More
                </a>
              </SignedIn>
            </div>
          </div>
        </header>

        {/* How It Works Section */}
<section id="how-it-works" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        A Transparent Journey in Three Steps
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        From farmers to distributors to consumers — every step of the supply chain is transparent and trustworthy.
      </p>
    </div>

    {/* Grid without connecting arrows/line */}
    <div className="grid md:grid-cols-3 gap-10">
      <FeatureCard icon={<Tractor className="w-8 h-8" />} title="1. For Farmers">
        Register produce on the blockchain to guarantee authenticity,
        prove quality, and secure fair pricing.
      </FeatureCard>

      <FeatureCard icon={<Truck className="w-8 h-8" />} title="2. For Distributors">
        Manage and track shipments within the supply chain. Verify
        origin and maintain trust with immutable blockchain records.
      </FeatureCard>

      <FeatureCard icon={<ShoppingCart className="w-8 h-8" />} title="3. For Consumers">
        Scan the unique QR code of a farmer or distributor to view available
        inventory and directly add transactions with confidence.
      </FeatureCard>
    </div>
  </div>
</section>


        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Core Features of AgriTrace
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The technology powering a trustworthy and modern supply chain.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<ShieldCheck className="w-8 h-8" />}
                title="Blockchain Security"
              >
                Every transaction is recorded on an immutable ledger, preventing
                fraud and ensuring absolute data integrity.
              </FeatureCard>
              <FeatureCard
                icon={<LocateFixed className="w-8 h-8" />}
                title="Supply Chain Tracking"
              >
                View and follow the supply chain process step by step, from the
                farm to the shelf.
              </FeatureCard>
              <FeatureCard
                icon={<QrCode className="w-8 h-8" />}
                title="QR Code Integration"
              >
                Each farmer or distributor has a unique QR code. Buyers can scan
                it to view available inventory and seamlessly add transactions.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-green-600">
          <div className="max-w-4xl mx-auto text-center py-20 px-6">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Join the Future of Agriculture
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Whether you’re a farmer, distributor, or retailer, take the first
              step toward transparency.
            </p>

            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-white hover:bg-gray-100 text-green-700 px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Get Started Today
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <a
                href="/"
                className="bg-white hover:bg-gray-100 text-green-700 px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Go to Your Dashboard
              </a>
            </SignedIn>
          </div>
        </section>
      </main>

      <FooterPage />
    </div>
  );
};

export default HomePage;
