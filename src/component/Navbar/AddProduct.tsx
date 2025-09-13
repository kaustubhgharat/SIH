import { useState } from "react";
import NavbarPage from "./NavbarPage";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    quality: "",
    image: null as File | null,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      "Product submitted!\n" +
        JSON.stringify(
          {
            ...product,
            image: product.image ? product.image.name : null,
          },
          null,
          2
        )
    );
  };

  return (
    <>
      <NavbarPage />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-green-700 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity
            </label>
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity (optional)"
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price (optional)"
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Quality */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quality / Grade
            </label>
            <input
              name="quality"
              value={product.quality}
              onChange={handleChange}
              placeholder="Enter quality (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 shadow-md transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
