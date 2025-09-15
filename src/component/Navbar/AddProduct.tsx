import { useState, useRef } from "react";
import type { ChangeEvent,FormEvent } from "react";

import { UploadCloud, X, Package, Loader2 } from "lucide-react";

// --- Type Definitions ---
interface ProductState {
  name: string;
  category: string;
  quantity: string;
  price: string;
  quality: string;
  image: File | null;
}

const AddProduct = () => {
  const [product, setProduct] = useState<ProductState>({
    name: "",
    category: "", // Default value for select
    quantity: "",
    price: "",
    quality: "", // Default value for select
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Data for Select Dropdowns ---
  const categories = ["Vegetable", "Fruit", "Grain", "Dairy", "Poultry"];
  const qualities = ["Grade A (Premium)", "Grade B (Standard)", "Grade C (Economy)", "Organic"];

  // --- Event Handlers ---

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProduct((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageChange(e.dataTransfer.files);
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Submitting Product:", {
        ...product,
        image: product.image?.name || null,
      });
      alert(
        "Product submitted successfully!\n" +
          JSON.stringify({ ...product, image: product.image?.name }, null, 2)
      );
      setIsSubmitting(false);
      // Optionally reset form here
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="p-8 border-b flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                 <Package className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Add a New Product
                </h1>
                <p className="text-gray-500">Fill in the details below to add a product to your inventory.</p>
              </div>
          </div>
        
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* --- Product Details Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name" name="name" value={product.name} onChange={handleChange}
                  placeholder="e.g., Organic Tomatoes" required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category" name="category" value={product.category} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Quantity */}
              <div className="relative">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="quantity" name="quantity" value={product.quantity} onChange={handleChange}
                  placeholder="e.g., 500" required type="number" min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pl-10"
                />
                <span className="absolute left-3 top-9 text-gray-400">kg</span>
              </div>
              
              {/* Price */}
              <div className="relative">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Unit
                </label>
                <input
                  id="price" name="price" value={product.price} onChange={handleChange}
                  placeholder="e.g., 120.50" type="number" step="0.01" min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pl-10"
                />
                <span className="absolute left-3 top-9 text-gray-400 font-semibold">₹</span>
              </div>

              {/* Quality */}
              <div className="md:col-span-2">
                <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
                  Quality / Grade
                </label>
                <select
                  id="quality" name="quality" value={product.quality} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="" disabled>Select a quality grade</option>
                  {qualities.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
            </div>

            {/* --- Image Uploader Section --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              {imagePreview ? (
                <div className="relative group w-full h-56 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Product Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={removeImage} className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                    dragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-green-500 hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef} type="file" name="image" accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files)} className="hidden"
                  />
                  <div className="flex flex-col items-center text-gray-500">
                    <UploadCloud className="w-12 h-12 mb-4" />
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* --- Submit Button --- */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;