"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const ProductDetails = ({ onRequestClose }) => {
    const [productDetails, setProductDetails] = (0, react_1.useState)([
        {
            pro_id: 0,
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
    const [products, setProducts] = (0, react_1.useState)([]);
    const [colors, setColors] = (0, react_1.useState)([]);
    const [sizes, setSizes] = (0, react_1.useState)([]);
    const [genders, setGenders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [productRes, colorRes, sizeRes, genderRes] = yield Promise.all([
                    fetch("/api/products").then((res) => res.json()),
                    fetch("/api/colors").then((res) => res.json()),
                    fetch("/api/sizes").then((res) => res.json()),
                    fetch("/api/genders").then((res) => res.json()),
                ]);
                setProducts(productRes);
                setColors(colorRes);
                setSizes(sizeRes);
                setGenders(genderRes);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
        fetchData();
    }, []);
    const handleProductDetailsChange = (index, field, value) => {
        const updatedDetails = [...productDetails];
        updatedDetails[index] = Object.assign(Object.assign({}, updatedDetails[index]), { [field]: value });
        setProductDetails(updatedDetails);
    };
    const addProductDetailForm = () => {
        setProductDetails([
            ...productDetails,
            {
                pro_id: 0,
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
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (productDetails.length === 0) {
                sweetalert2_1.default.fire("Error", "No product details to add.", "error");
                return;
            }
            const response = yield fetch("/api/product_details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ details: productDetails }), // ส่งเป็น JSON โดยมีคีย์ `details`
            });
            if (!response.ok) {
                const errorData = yield response.json();
                console.error("API Error:", errorData.error);
                throw new Error(`Failed to add product details: ${errorData.error || "Unknown error"}`);
            }
            sweetalert2_1.default.fire("Success", "Product details added successfully", "success").then(() => {
                onRequestClose(); // ปิดโมดัลเมื่อสำเร็จ
            });
        }
        catch (error) {
            console.error("Error adding product details:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            sweetalert2_1.default.fire("Error", errorMessage, "error");
        }
    });
    return (<div className="flex justify-center mt-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] max-w-full relative">
        <h2 className="text-2xl font-bold mb-4">เพิ่มรายละเอียดสินค้า</h2>
        <div className="overflow-y-auto max-h-[70vh]">
          {productDetails.map((detail, index) => (<div key={index} className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50">
              {/* Product Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ชื่อสินค้า
                </label>
                <select value={detail.pro_id} onChange={(e) => handleProductDetailsChange(index, "pro_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                  <option value={0}>ชื่อสินค้า</option>
                  {products.map((product) => (<option key={product.pro_id} value={product.pro_id}>
                      {product.pro_name}
                    </option>))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* SKU */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input type="text" placeholder="SKU" value={detail.sku} onChange={(e) => handleProductDetailsChange(index, "sku", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
                </div>
                {/* Image URL */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    รูปภาพสินค้า
                  </label>
                  <input type="text" placeholder="URL รูปภาพสินค้า" value={detail.pro_image} onChange={(e) => handleProductDetailsChange(index, "pro_image", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    สี
                  </label>
                  <select value={detail.color_id} onChange={(e) => handleProductDetailsChange(index, "color_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                    <option value={0}>เลือกสี</option>
                    {colors.map((color) => (<option key={color.color_id} value={color.color_id}>
                        {color.color_name}
                      </option>))}
                  </select>
                </div>
                {/* Size Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ขนาด
                  </label>
                  <select value={detail.size_id} onChange={(e) => handleProductDetailsChange(index, "size_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                    <option value={0}>เลือกขนาด</option>
                    {sizes.map((size) => (<option key={size.size_id} value={size.size_id}>
                        {size.size_name}
                      </option>))}
                  </select>
                </div>
                {/* Gender Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    เพศ
                  </label>
                  <select value={detail.gender_id} onChange={(e) => handleProductDetailsChange(index, "gender_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                    <option value={0}>เลือกเพศ</option>
                    {genders.map((gender) => (<option key={gender.gender_id} value={gender.gender_id}>
                        {gender.gender_name}
                      </option>))}
                  </select>
                </div>
                {/* Stock Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    จำนวนในสต็อก
                  </label>
                  <input type="number" placeholder="จำนวนในสต็อก" value={detail.stock_quantity} onChange={(e) => handleProductDetailsChange(index, "stock_quantity", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
                </div>
                {/* Sale Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ราคา (ขาย)
                  </label>
                  <input type="text" placeholder="ราคา (ขาย)" value={detail.sale_price} onChange={(e) => handleProductDetailsChange(index, "sale_price", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
                </div>
                {/* Cost Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ราคา (ต้นทุน)
                  </label>
                  <input type="text" placeholder="ราคา (ต้นทุน)" value={detail.cost_price} onChange={(e) => handleProductDetailsChange(index, "cost_price", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
                </div>
              </div>
            </div>))}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={addProductDetailForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            เพิ่มรายละเอียดสินค้า
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>);
};
exports.default = ProductDetails;
