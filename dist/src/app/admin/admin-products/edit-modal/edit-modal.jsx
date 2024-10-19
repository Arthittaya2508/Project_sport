"use strict";
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
const ai_1 = require("react-icons/ai");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const EditProductModal = ({ isOpen, onClose, product, types, bands, onSave, }) => {
    const [proName, setProName] = (0, react_1.useState)("");
    const [descrip, setDescrip] = (0, react_1.useState)("");
    const [typeId, setTypeId] = (0, react_1.useState)(0);
    const [bandId, setBandId] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (product) {
            setProName(product.pro_name);
            setDescrip(product.pro_des);
            setTypeId(product.type_id);
            setBandId(product.band_id);
        }
    }, [product]);
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        if (product === null || product === void 0 ? void 0 : product.pro_id) {
            try {
                yield fetch(`/api/products/${product.pro_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pro_name: proName,
                        pro_des: descrip,
                        type_id: typeId,
                        band_id: bandId,
                    }),
                });
                onSave(Object.assign(Object.assign({}, product), { pro_name: proName, pro_des: descrip, type_id: typeId, band_id: bandId }));
                onClose();
                sweetalert2_1.default.fire({
                    icon: "success",
                    title: "Success",
                    text: "Product updated successfully!",
                });
            }
            catch (error) {
                sweetalert2_1.default.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update the product.",
                });
            }
        }
    });
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <ai_1.AiOutlineClose className="h-8 w-8"/>
        </button>
        <h2 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อสินค้า
            </label>
            <input type="text" value={proName} onChange={(e) => setProName(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำอธิบายสินค้า
            </label>
            <input type="text" value={descrip} onChange={(e) => setDescrip(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ประเภท
            </label>
            <select value={typeId} onChange={(e) => setTypeId(Number(e.target.value))} className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select Type</option>
              {types.map((type) => (<option key={type.type_id} value={type.type_id}>
                  {type.type_name}
                </option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Band
            </label>
            <select value={bandId} onChange={(e) => setBandId(Number(e.target.value))} className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select Band</option>
              {bands.map((band) => (<option key={band.band_id} value={band.band_id}>
                  {band.band_name}
                </option>))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = EditProductModal;
