
import NavbarPage from "./NavbarPage";

const Analysis = () => {
  return (
    <>
      <NavbarPage />
      <div className="max-w-3xl mx-auto mt-8 bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Supply Chain Analysis</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Total Products Tracked: 350</li>
          <li>Average Transaction Time: 2.3 minutes</li>
          <li>Latest Blockchain Block: #1549</li>
          <li>Fraudulent Transactions Detected: 0</li>
          <li>Most Active Stakeholder: Distributor X</li>
        </ul>
      </div>
    </>
  );
};

export default Analysis;
