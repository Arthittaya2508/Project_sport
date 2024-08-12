"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProductForm = () => {
  const [pro_name, setName] = useState("");
  const [pro_des, setDesc] = useState("");
  const [pro_image, setImage] = useState("");
  const [sale_price, setSale] = useState("");
  const [cost_price, setCost] = useState("");
  const [type_id, setType] = useState("");
  const [band_id, setBand] = useState("");
  const [color_id, setColorId] = useState("");
  const [gender_id, setGenderId] = useState("");
  const [size_id, setSizeId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [types, setTypes] = useState([]);
  const [bands, setBands] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch data for each select option individually
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [typesRes, bandsRes, colorsRes, gendersRes, sizesRes] =
          await Promise.all([
            fetch("/api/types"),
            fetch("/api/bands"),
            fetch("/api/colors"),
            fetch("/api/genders"),
            fetch("/api/sizes"),
          ]);

        const [typesData, bandsData, colorsData, gendersData, sizesData] =
          await Promise.all([
            typesRes.json(),
            bandsRes.json(),
            colorsRes.json(),
            gendersRes.json(),
            sizesRes.json(),
          ]);

        setTypes(typesData);
        setBands(bandsData);
        setColors(colorsData);
        setGenders(gendersData);
        setSizes(sizesData);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "pro_name":
        setName(value);
        break;
      case "pro_des":
        setDesc(value);
        break;
      case "pro_image":
        setImage(value);
        break;
      case "sale_price":
        setSale(value);
        break;
      case "cost_price":
        setCost(value);
        break;
      case "type_id":
        setType(value);
        break;
      case "band_id":
        setBand(value);
        break;
      case "color_id":
        setColorId(value);
        break;
      case "gender_id":
        setGenderId(value);
        break;
      case "size_id":
        setSizeId(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      pro_name,
      pro_des,
      pro_image,
      sale_price,
      cost_price,
      type_id,
      band_id,
    };

    const productDetailData = {
      color_id,
      gender_id,
      size_id,
      quantity,
    };

    try {
      const productResponse = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (productResponse.ok) {
        const detailResponse = await fetch("/api/pro-detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetailData),
        });

        if (detailResponse.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Product and details added successfully.",
            confirmButtonText: "OK",
          }).then(() => {
            router.push("/admin/products");
          });
        } else {
          const detailResult = await detailResponse.json();
          setError(detailResult.error || "Failed to add product details");
        }
      } else {
        const productResult = await productResponse.json();
        setError(productResult.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-10 max-w-4xl mx-auto bg-white drop-shadow-xl rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <div className="flex space-x-6">
        <div className="flex-1">
          {[
            { id: "pro_name", label: "Product Name", value: pro_name },
            { id: "pro_des", label: "Description", value: pro_des },
            { id: "pro_image", label: "Image URL", value: pro_image },
            { id: "sale_price", label: "Sale Price", value: sale_price },
            { id: "cost_price", label: "Cost Price", value: cost_price },
          ].map(({ id, label, value }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type="text"
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label
              htmlFor="type_id"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type_id"
              name="type_id"
              value={type_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              {types.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <label
              htmlFor="band_id"
              className="block text-sm font-medium text-gray-700"
            >
              Band
            </label>
            <select
              id="band_id"
              name="band_id"
              value={band_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a band
              </option>
              {bands.map((band: any) => (
                <option key={band.id} value={band.id}>
                  {band.band_name} {/* Adjust if the field name is different */}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="color_id"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color_id"
              name="color_id"
              value={color_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a color
              </option>
              {colors.map((color: any) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender_id"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender_id"
              name="gender_id"
              value={gender_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a gender
              </option>
              {genders.map((gender: any) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="size_id"
              className="block text-sm font-medium text-gray-700"
            >
              Size
            </label>
            <select
              id="size_id"
              name="size_id"
              value={size_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a size
              </option>
              {sizes.map((size: any) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Product
      </button>
      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default ProductForm;
