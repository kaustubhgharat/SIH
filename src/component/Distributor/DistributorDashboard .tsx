import NavbarPage from "../Navbar/NavbarPage";
import FooterPage from "../Footer/FooterPage";
const DistributorDashboard = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Distributor Dashboard
        </h1>
        <p className="text-lg text-gray-700">
          Yahan distributor shipment track karega, records verify karega aur
          delivery status update karega.
        </p>
      </div>
    </div>
    <FooterPage/>
    </>
    
  );
};

export default DistributorDashboard;
