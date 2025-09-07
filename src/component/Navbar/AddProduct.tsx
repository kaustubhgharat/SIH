import { useState } from "react";
import NavbarPage from "./NavbarPage";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    origin: "",
    price: "",
    quality: ""
  });

  // 👇 Input change handler with type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 👇 Form submit handler with type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Integrate with blockchain (Web3/contract) here
    alert("Product submitted!\n" + JSON.stringify(product, null, 2));
  };

  return (
    <>
      <NavbarPage />
      <div className="max-w-xl mx-auto mt-8 p-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="origin"
            value={product.origin}
            onChange={handleChange}
            placeholder="Farm/Origin"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="quality"
            value={product.quality}
            onChange={handleChange}
            placeholder="Quality/Grade"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
