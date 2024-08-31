import { FC, useState } from "react";
import Modal from "react-modal";

export interface Color {
  id: number;
  color_id: number;
  color_name: string;
}

export interface Type {
  id: number;
  type_id: number;
  type_name: string;
}

export interface Band {
  id: number;
  band_id: number;
  band_name: string;
}

export interface Gender {
  id: number;
  gender_id: number;
  gender_name: string;
}

export interface Size {
  id: number;
  size_id: number;
  size_name: string;
}

export type Product = {
  pro_id?: number;
  pro_name: string;
  pro_des: string;
  type_id: number;
  band_id: number;
};

export type ProductDetails = {
  pro_id?: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
  product_id?: string; // เพิ่มฟิลด์นี้
};

interface ProductDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  productDetails: ProductDetails[];
  colors: Color[];
  genders: Gender[];
  sizes: Size[];
  handleProductDetailsChange: (
    index: number,
    field: keyof ProductDetails,
    value: ProductDetails[keyof ProductDetails]
  ) => void;
  handleImageChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ProductDetailsModal: FC<ProductDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  productDetails,
  colors,
  genders,
  sizes,
  handleProductDetailsChange,
  handleImageChange,
}) => {
  const [formCount, setFormCount] = useState<number>(1);

  const addForm = () => {
    setFormCount(formCount + 1);
  };

  const addMultipleForms = () => {
    setFormCount(formCount + 1); // Adjust as needed to add multiple forms
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details Modal"
      className="relative max-w-5xl mx-auto my-8 p-6 bg-white border rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-red-500 text-2xl"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-4">Add Product Details</h2>
      <div className="overflow-y-auto max-h-[80vh] mb-4">
        {Array.from({ length: formCount }, (_, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <span>รหัสสินค้า</span>
            <input
              type="text"
              placeholder="Product ID" // เพิ่มฟิลด์นี้
              value={productDetails[index]?.product_id || ""}
              onChange={(e) =>
                handleProductDetailsChange(index, "product_id", e.target.value)
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <span>รหัสบาร์โค้ดสินค้า</span>
            <input
              type="text"
              placeholder="SKU"
              value={productDetails[index]?.sku || ""}
              onChange={(e) =>
                handleProductDetailsChange(index, "sku", e.target.value)
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <span>จำนวน</span>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={productDetails[index]?.stock_quantity || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "stock_quantity",
                  parseInt(e.target.value)
                )
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <span>ราคาทุน</span>
            <input
              type="number"
              placeholder="Cost Price"
              value={productDetails[index]?.cost_price || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "cost_price",
                  parseFloat(e.target.value)
                )
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <span>ราคาขาย</span>
            <input
              type="number"
              placeholder="Sale Price"
              value={productDetails[index]?.sale_price || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "sale_price",
                  parseFloat(e.target.value)
                )
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <span>สีของสินค้า</span>
            <select
              value={productDetails[index]?.color_id || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "color_id",
                  parseInt(e.target.value)
                )
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
            <span>เพศของสินค้า</span>
            <select
              value={productDetails[index]?.gender_id || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "gender_id",
                  parseInt(e.target.value)
                )
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

            <span>ขนาดของสินค้า</span>
            <select
              value={productDetails[index]?.size_id || 0}
              onChange={(e) =>
                handleProductDetailsChange(
                  index,
                  "size_id",
                  parseInt(e.target.value)
                )
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
            <span>รูปสินค้า</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              className="border p-2 rounded mb-2 w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={addForm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Details
        </button>
        <button
          onClick={addMultipleForms}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Multiple Details
        </button>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
