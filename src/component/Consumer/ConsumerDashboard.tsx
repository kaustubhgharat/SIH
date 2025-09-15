import NavbarPage from "../Navbar/NavbarPage";
import FooterPage from "../Footer/FooterPage";
const ConsumerDashboard = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">
          Consumer Dashboard
        </h1>
        <p className="text-lg text-gray-700">
          Yahan consumer QR code scan karke product ki journey trace karega aur
          authenticity verify karega.
        </p>
      </div>
    </div>
    <FooterPage/>
    </>
    
  );
};

export default ConsumerDashboard;
