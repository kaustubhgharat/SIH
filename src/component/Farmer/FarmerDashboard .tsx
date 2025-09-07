import NavbarPage from "../Navbar/NavbarPage";
import FooterPage from "../Footer/FooterPage";
const FarmerDashboard = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <NavbarPage />
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          Farmer Dashboard
        </h1>
        <p className="text-lg text-gray-700">
          Yahan farmer apna produce register karega, details blockchain pe add
          karega aur price manage karega.
        </p>
      </div>
    </div>
    <FooterPage/>
    </>
    
  );
};

export default FarmerDashboard;
