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
const link_1 = __importDefault(require("next/link"));
const AddProduct = () => {
    const [productForms, setProductForms] = (0, react_1.useState)([
        {
            pro_name: "",
            pro_des: "",
            type_id: 0,
            band_id: 0,
        },
    ]);
    const [types, setTypes] = (0, react_1.useState)([]);
    const [bands, setBands] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [typesResponse, bandsResponse] = yield Promise.all([
                    fetch("/api/types"),
                    fetch("/api/bands"),
                ]);
                if (!typesResponse.ok || !bandsResponse.ok) {
                    throw new Error("Failed to fetch data");
                }
                setTypes(yield typesResponse.json());
                setBands(yield bandsResponse.json());
            }
            catch (error) {
                console.error("Failed to fetch data", error);
                sweetalert2_1.default.fire("Error", "Failed to load data", "error");
            }
        });
        fetchData();
    }, []);
    const handleProductChange = (index, field, value) => {
        const newProductForms = [...productForms];
        newProductForms[index] = Object.assign(Object.assign({}, newProductForms[index]), { [field]: value });
        setProductForms(newProductForms);
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // ส่งข้อมูลทั้งหมดในครั้งเดียว
            const productRes = yield fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productForms),
            });
            if (!productRes.ok) {
                const errorData = yield productRes.json();
                throw new Error(`Failed to add products: ${errorData.error || "Unknown error"}`);
            }
            // แจ้งเตือนความสำเร็จ
            sweetalert2_1.default.fire("Success", "Products added successfully", "success");
        }
        catch (error) {
            console.error("Error adding products:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            sweetalert2_1.default.fire("Error", errorMessage, "error");
        }
    });
    const addNewProductForm = () => {
        setProductForms([
            ...productForms,
            {
                pro_name: "",
                pro_des: "",
                type_id: 0,
                band_id: 0,
            },
        ]);
    };
    return (<div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <link_1.default href="./admin-add-details" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
          เพิ่มรายละเอียดสินค้า
        </link_1.default>
      </div>

      <div className="border rounded-lg p-4 max-h-[600px] overflow-y-auto h-[600px] mb-4">
        {productForms.map((product, index) => (<div key={index} className="mb-4 p-6 border rounded-lg shadow-lg bg-white">
            <div className="mb-4">
              <span>ชื่อสินค้า</span>
              <input type="text" placeholder="ชื่อสินค้า" value={product.pro_name} onChange={(e) => handleProductChange(index, "pro_name", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
              <span>คำอธิบาย</span>
              <input type="text" placeholder="คำอธิบาย" value={product.pro_des} onChange={(e) => handleProductChange(index, "pro_des", e.target.value)} className="border p-2 rounded mb-2 w-full"/>
              <span>ประเภทสินค้า</span>
              <select value={product.type_id} onChange={(e) => handleProductChange(index, "type_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                <option value={0}>เลือกประเภทสินค้า</option>
                {types.map((type) => (<option key={type.id} value={type.type_id}>
                    {type.type_name}
                  </option>))}
              </select>
              <span>แบนด์สินค้า</span>
              <select value={product.band_id} onChange={(e) => handleProductChange(index, "band_id", parseInt(e.target.value))} className="border p-2 rounded mb-2 w-full">
                <option value={0}>เลือกแบนด์สินค้า</option>
                {bands.map((band) => (<option key={band.id} value={band.band_id}>
                    {band.band_name}
                  </option>))}
              </select>
            </div>
          </div>))}
      </div>

      <div className="flex space-x-4">
        <button onClick={addNewProductForm} className="bg-green-500 text-white px-4 py-2 rounded">
          เพิ่มสินค้าหลายรายการ
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
          เพิ่มสินค้า
        </button>
      </div>
    </div>);
};
exports.default = AddProduct;
