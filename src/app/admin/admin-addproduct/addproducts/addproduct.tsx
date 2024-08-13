"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Interfaces for fetched data
interface Color {
  id: number;
  color_id: number;
  color_name: string;
}
interface Type {
  id: number;
  type_id: number;
  type_name: string;
}
interface Band {
  id: number;
  band_id: number;
  band_name: string;
}
interface Gender {
  id: number;
  gender_id: number;
  gender_name: string;
}
interface Size {
  id: number;
  size_id: number;
  size_name: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState({
    pro_name: "",
    pro_des: "",
    pro_image: "",
    sale_price: "",
    cost_price: "",
    type_id: "",
    band_id: "",
    color_id: "",
    size_id: "",
    gender_id: "",
    quantity: "",
  });

  const [types, setTypes] = useState<Type[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          typesResponse,
          bandsResponse,
          colorsResponse,
          gendersResponse,
          sizesResponse,
        ] = await Promise.all([
          fetch("/api/types"),
          fetch("/api/bands"),
          fetch("/api/colors"),
          fetch("/api/genders"),
          fetch("/api/sizes"),
        ]);

        const typesData = await typesResponse.json();
        setTypes(typesData);

        const bandsData = await bandsResponse.json();
        setBands(bandsData);

        const colorsData = await colorsResponse.json();
        setColors(colorsData);

        const gendersData = await gendersResponse.json();
        setGenders(gendersData);

        const sizesData = await sizesResponse.json();
        setSizes(sizesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert specific fields to integers
    const productData = {
      ...product,
      type_id: parseInt(product.type_id, 10),
      band_id: parseInt(product.band_id, 10),
      color_id: parseInt(product.color_id, 10),
      size_id: parseInt(product.size_id, 10),
      gender_id: parseInt(product.gender_id, 10),
      sale_price: parseFloat(product.sale_price),
      cost_price: parseFloat(product.cost_price),
      quantity: parseInt(product.quantity, 10),
    };

    // Debug log to check the data before sending
    console.log("Submitting data:", productData);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      console.log("API Response:", result); // Log the response from API

      if (response.ok) {
        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Product added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/"; // Redirect to the product list after closing the alert
        });
      } else {
        // Show error message
        Swal.fire({
          title: "Error!",
          text: result.error || "Failed to add product.", // Use the error message from the result if available
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="pro_name"
            value={product.pro_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="pro_des"
            value={product.pro_des}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="pro_image"
            value={product.pro_image}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sale Price</label>
          <input
            type="number"
            name="sale_price"
            value={product.sale_price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cost Price</label>
          <input
            type="number"
            name="cost_price"
            value={product.cost_price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type_id"
            value={product.type_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type.id} value={type.type_id}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Brand</label>
          <select
            name="band_id"
            value={product.band_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Select Brand</option>
            {bands.map((band) => (
              <option key={band.id} value={band.band_id}>
                {band.band_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Color</label>
          <select
            name="color_id"
            value={product.color_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.color_id}>
                {color.color_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Size</label>
          <select
            name="size_id"
            value={product.size_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.size_id}>
                {size.size_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender_id"
            value={product.gender_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.gender_id}>
                {gender.gender_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
