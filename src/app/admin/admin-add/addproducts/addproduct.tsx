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

// Interface for Product
interface Product {
  pro_name: string;
  pro_des: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
  type_id: number;
  band_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  quantity: number;
}

const AddProduct = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      pro_name: "",
      pro_des: "",
      pro_image: "",
      sale_price: 0,
      cost_price: 0,
      type_id: 0,
      band_id: 0,
      color_id: 0,
      size_id: 0,
      gender_id: 0,
      quantity: 0,
    },
  ]);

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

        setTypes(await typesResponse.json());
        setBands(await bandsResponse.json());
        setColors(await colorsResponse.json());
        setGenders(await gendersResponse.json());
        setSizes(await sizesResponse.json());
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        pro_name: "",
        pro_des: "",
        pro_image: "",
        sale_price: 0,
        cost_price: 0,
        type_id: 0,
        band_id: 0,
        color_id: 0,
        size_id: 0,
        gender_id: 0,
        quantity: 0,
      },
    ]);
  };

  const handleChange = <K extends keyof Product>(
    index: number,
    field: K,
    value: Product[K]
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });

      if (res.ok) {
        Swal.fire("Success", "Products added successfully", "success");
      } else {
        Swal.fire("Error", "Failed to add products", "error");
      }
    } catch (error) {
      console.error("Error adding products:", error);
      Swal.fire("Error", "An error occurred while adding products", "error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Multiple Products</h1>
      {products.map((product, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg">
          <input
            type="text"
            placeholder="Product Name"
            value={product.pro_name}
            onChange={(e) => handleChange(index, "pro_name", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={product.pro_des}
            onChange={(e) => handleChange(index, "pro_des", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={product.pro_image}
            onChange={(e) => handleChange(index, "pro_image", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Sale Price"
            value={product.sale_price}
            onChange={(e) =>
              handleChange(index, "sale_price", parseFloat(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Cost Price"
            value={product.cost_price}
            onChange={(e) =>
              handleChange(index, "cost_price", parseFloat(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <select
            value={product.type_id}
            onChange={(e) =>
              handleChange(index, "type_id", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          >
            <option value={0}>Select Type</option>
            {types.map((type) => (
              <option key={type.id} value={type.type_id}>
                {type.type_name}
              </option>
            ))}
          </select>
          <select
            value={product.band_id}
            onChange={(e) =>
              handleChange(index, "band_id", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          >
            <option value={0}>Select Brand</option>
            {bands.map((band) => (
              <option key={band.id} value={band.band_id}>
                {band.band_name}
              </option>
            ))}
          </select>
          <select
            value={product.color_id}
            onChange={(e) =>
              handleChange(index, "color_id", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          >
            <option value={0}>Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.color_id}>
                {color.color_name}
              </option>
            ))}
          </select>
          <select
            value={product.size_id}
            onChange={(e) =>
              handleChange(index, "size_id", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          >
            <option value={0}>Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.size_id}>
                {size.size_name}
              </option>
            ))}
          </select>
          <select
            value={product.gender_id}
            onChange={(e) =>
              handleChange(index, "gender_id", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          >
            <option value={0}>Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.gender_id}>
                {gender.gender_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          />
        </div>
      ))}
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Another Product
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit All Products
      </button>
    </div>
  );
};

export default AddProduct;
