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

// Interface for Product and ProductDetails
type Product = {
  pro_id?: number;
  pro_name: string;
  pro_des: string;
  type_id: number;
  band_id: number;
};

type ProductDetails = {
  pro_id?: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string; // Image URL or path
  sale_price: number;
  cost_price: number;
};

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({
    pro_name: "",
    pro_des: "",
    type_id: 0,
    band_id: 0,
  });

  const [productDetails, setProductDetails] = useState<ProductDetails>({
    color_id: 0,
    size_id: 0,
    gender_id: 0,
    stock_quantity: 0,
    sku: "",
    pro_image: "", // URL of the uploaded image
    sale_price: 0,
    cost_price: 0,
  });

  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetailsForm, setShowProductDetailsForm] = useState(false);

  const [types, setTypes] = useState<Type[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleProductChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setProduct({ ...product, [field]: value });
  };

  const handleProductDetailsChange = <K extends keyof ProductDetails>(
    field: K,
    value: ProductDetails[K]
  ) => {
    setProductDetails({ ...productDetails, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Update the productDetails state with the file name or URL if you want to show it immediately
      handleProductDetailsChange("pro_image", file.name);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.fileUrl; // Assuming the response contains the file URL
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Submit the product data
      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (productRes.ok) {
        const createdProduct = await productRes.json();
        const { pro_id } = createdProduct;

        // Submit the product details with the created pro_id and image URL
        const productDetailsRes = await fetch("/api/product_details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productDetails,
            pro_id,
            pro_image: imageUrl,
          }),
        });

        if (productDetailsRes.ok) {
          Swal.fire(
            "Success",
            "Product and details added successfully",
            "success"
          );
        } else {
          Swal.fire("Error", "Failed to add product details", "error");
        }
      } else {
        Swal.fire("Error", "Failed to add product", "error");
      }
    } catch (error) {
      console.error("Error adding product and details:", error);
      Swal.fire(
        "Error",
        "An error occurred while adding the product and details",
        "error"
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <p className="text-gray-700 mb-4">
        โปรดกรอกข้อมูลสินค้าก่อนเพิ่มรายละเอียดเพิ่มเติม
      </p>
      <button
        onClick={() => setShowProductForm(!showProductForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showProductForm ? "Hide Product Form" : "Add Product"}
      </button>

      {showProductForm && (
        <div className="mb-4 p-4 border rounded-lg">
          <input
            type="text"
            placeholder="Product Name"
            value={product.pro_name}
            onChange={(e) => handleProductChange("pro_name", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Product Description"
            value={product.pro_des}
            onChange={(e) => handleProductChange("pro_des", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />

          <select
            value={product.type_id}
            onChange={(e) =>
              handleProductChange("type_id", parseInt(e.target.value))
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
              handleProductChange("band_id", parseInt(e.target.value))
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
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <button
        onClick={() => setShowProductDetailsForm(!showProductDetailsForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showProductDetailsForm
          ? "Hide Product Details"
          : "Add Product Details"}
      </button>

      {showProductDetailsForm && (
        <div className="mb-4 p-4 border rounded-lg">
          <input
            type="text"
            placeholder="SKU"
            value={productDetails.sku}
            onChange={(e) => handleProductDetailsChange("sku", e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <select
            value={productDetails.color_id}
            onChange={(e) =>
              handleProductDetailsChange("color_id", parseInt(e.target.value))
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
            value={productDetails.size_id}
            onChange={(e) =>
              handleProductDetailsChange("size_id", parseInt(e.target.value))
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
            value={productDetails.gender_id}
            onChange={(e) =>
              handleProductDetailsChange("gender_id", parseInt(e.target.value))
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
            placeholder="Stock Quantity"
            value={productDetails.stock_quantity}
            onChange={(e) =>
              handleProductDetailsChange(
                "stock_quantity",
                parseInt(e.target.value)
              )
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Sale Price"
            value={productDetails.sale_price}
            onChange={(e) =>
              handleProductDetailsChange("sale_price", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Cost Price"
            value={productDetails.cost_price}
            onChange={(e) =>
              handleProductDetailsChange("cost_price", parseInt(e.target.value))
            }
            className="border p-2 rounded mb-2 w-full"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Product and Details
      </button>
    </div>
  );
};

export default AddProduct;
