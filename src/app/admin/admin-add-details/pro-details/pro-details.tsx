"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export interface ProductDetails {
  pro_id?: number;
  product_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: string;
  sku: string;
  pro_image: string;
  sale_price: string;
  cost_price: string;
}

export interface Product {
  pro_id: number;
  pro_name: string;
}

export interface Color {
  id: number;
  color_name: string;
}

export interface Gender {
  id: number;
  gender_name: string;
}

export interface Size {
  id: number;
  size_name: string;
}

const ProductDetails = ({ onRequestClose }: { onRequestClose: () => void }) => {
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([
    {
      product_id: 0,
      color_id: 0,
      size_id: 0,
      gender_id: 0,
      stock_quantity: "",
      sku: "",
      pro_image: "",
      sale_price: "",
      cost_price: "",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, colorRes, sizeRes, genderRes] = await Promise.all([
          fetch("/api/products").then((res) => res.json()),
          fetch("/api/colors").then((res) => res.json()),
          fetch("/api/sizes").then((res) => res.json()),
          fetch("/api/genders").then((res) => res.json()),
        ]);

        setProducts(productRes);
        setColors(colorRes);
        setSizes(sizeRes);
        setGenders(genderRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductDetailsChange = (
    index: number,
    field: keyof ProductDetails,
    value: ProductDetails[keyof ProductDetails]
  ) => {
    const updatedDetails = [...productDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setProductDetails(updatedDetails);
  };

  const addProductDetailForm = () => {
    setProductDetails([
      ...productDetails,
      {
        product_id: 0,
        color_id: 0,
        size_id: 0,
        gender_id: 0,
        stock_quantity: "",
        sku: "",
        pro_image: "",
        sale_price: "",
        cost_price: "",
      },
    ]);
  };

  const handleFileChange = (index: number, file: File | null) => {
    const fileName = file ? file.name : "";
    handleProductDetailsChange(index, "pro_image", fileName);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      productDetails.forEach((detail, index) => {
        formData.append(
          `details[${index}][product_id]`,
          detail.product_id.toString()
        );
        formData.append(
          `details[${index}][color_id]`,
          detail.color_id.toString()
        );
        formData.append(
          `details[${index}][size_id]`,
          detail.size_id.toString()
        );
        formData.append(
          `details[${index}][gender_id]`,
          detail.gender_id.toString()
        );
        formData.append(
          `details[${index}][stock_quantity]`,
          detail.stock_quantity
        );
        formData.append(`details[${index}][sku]`, detail.sku);
        formData.append(`details[${index}][sale_price]`, detail.sale_price);
        formData.append(`details[${index}][cost_price]`, detail.cost_price);
        formData.append(`details[${index}][pro_image]`, detail.pro_image);

        // Append image files if selected
        const fileInput = document.querySelector(
          `input[name="file-${index}"]`
        ) as HTMLInputElement;
        if (fileInput?.files?.[0]) {
          formData.append(`details[${index}][imageFile]`, fileInput.files[0]);
        }
      });

      const response = await fetch("/api/product_details", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to add product details: ${errorData.error || "Unknown error"}`
        );
      }

      Swal.fire("Success", "Product details added successfully", "success");
    } catch (error) {
      console.error("Error adding product details:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] max-w-full relative">
        <h2 className="text-2xl font-bold mb-4">เพิ่มรายละเอียดสินค้า</h2>
        <div className="overflow-y-auto max-h-[70vh]">
          {productDetails.map((detail, index) => (
            <div
              key={index}
              className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50"
            >
              {/* Product Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ชื่อสินค้า
                </label>
                <select
                  value={detail.product_id}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "product_id",
                      parseInt(e.target.value)
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                >
                  <option value={0}>ชื่อสินค้า</option>
                  {products.map((product) => (
                    <option key={product.pro_id} value={product.pro_id}>
                      {product.pro_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  สี
                </label>
                <select
                  value={detail.color_id}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "color_id",
                      parseInt(e.target.value)
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                >
                  <option value={0}>เลือกสี</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.color_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ขนาด
                </label>
                <select
                  value={detail.size_id}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "size_id",
                      parseInt(e.target.value)
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                >
                  <option value={0}>เลือกขนาด</option>
                  {sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.size_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  เพศ
                </label>
                <select
                  value={detail.gender_id}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "gender_id",
                      parseInt(e.target.value)
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                >
                  <option value={0}>เลือกเพศ</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.gender_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  จำนวนสินค้าในสต็อก
                </label>
                <input
                  type="text"
                  placeholder="จำนวนสินค้าในสต็อก"
                  value={detail.stock_quantity}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "stock_quantity",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                />
              </div>

              {/* SKU */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="SKU"
                  value={detail.sku}
                  onChange={(e) =>
                    handleProductDetailsChange(index, "sku", e.target.value)
                  }
                  className="border p-2 rounded mb-2 w-full"
                />
              </div>

              {/* Sale Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ราคาขาย
                </label>
                <input
                  type="text"
                  placeholder="ราคาขาย"
                  value={detail.sale_price}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "sale_price",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                />
              </div>

              {/* Cost Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ราคาทุน
                </label>
                <input
                  type="text"
                  placeholder="ราคาทุน"
                  value={detail.cost_price}
                  onChange={(e) =>
                    handleProductDetailsChange(
                      index,
                      "cost_price",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded mb-2 w-full"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  รูปภาพสินค้า
                </label>
                <input
                  type="file"
                  name={`file-${index}`}
                  onChange={(e) =>
                    handleFileChange(index, e.target.files?.[0] || null)
                  }
                  className="border p-2 rounded mb-2 w-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={addProductDetailForm}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            เพิ่มรายละเอียดหลายรายการ
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ปุ่มยืนยันการเพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
