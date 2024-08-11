"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]); // Initialize products state
  const [pro_name, setName] = useState("");
  const [pro_des, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pro_image, setImage] = useState("");
  const [selling_price, setSelling] = useState("");
  const [cost_price, setCost] = useState("");
  const [type_id, setType] = useState("");
  const [brand_id, setBrand] = useState("");
  const [item_id, setItem] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching products");
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      pro_name,
      pro_des,
      quantity,
      pro_image,
      selling_price,
      cost_price,
      type_id,
      brand_id,
      item_id,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/products"); // Redirect to the products page
      } else {
        const result = await response.json();
        setError(result.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {products.map((product) => (
          <div key={product.pro_id} className="border p-4 rounded-lg shadow-md">
            <img
              src={product.pro_image}
              alt={product.pro_name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{product.pro_name}</h2>
            <p className="text-gray-700 mb-2">{product.pro_des}</p>
            <p className="text-lg font-bold">Price: ${product.selling_price}</p>
            <p className="text-sm text-gray-600">
              Quantity: {product.quantity}
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={pro_name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Product Description"
          value={pro_des}
          onChange={(e) => setDesc(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={pro_image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={selling_price}
          onChange={(e) => setSelling(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Cost Price"
          value={cost_price}
          onChange={(e) => setCost(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Type ID"
          value={type_id}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Brand ID"
          value={brand_id}
          onChange={(e) => setBrand(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Item ID"
          value={item_id}
          onChange={(e) => setItem(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductList;
