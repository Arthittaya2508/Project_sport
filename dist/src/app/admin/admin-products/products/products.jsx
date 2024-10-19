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
exports.default = Products;
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const md_1 = require("react-icons/md");
const ci_1 = require("react-icons/ci");
const edit_modal_1 = __importDefault(require("../edit-modal/edit-modal"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
function Products() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [productDetails, setProductDetails] = (0, react_1.useState)([]);
    const [types, setTypes] = (0, react_1.useState)([]);
    const [bands, setBands] = (0, react_1.useState)([]);
    const [selectedProduct, setSelectedProduct] = (0, react_1.useState)(null);
    const [isEditModalOpen, setIsEditModalOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const [productRes, productDetailsRes, typesRes, bandsRes] = yield Promise.all([
                    fetch("/api/products"),
                    fetch("/api/product_details"),
                    fetch("/api/types"),
                    fetch("/api/bands"),
                ]);
                const productsData = yield productRes.json();
                const productDetailsData = yield productDetailsRes.json();
                const typesData = yield typesRes.json();
                const bandsData = yield bandsRes.json();
                setProducts(Array.isArray(productsData) ? productsData : []);
                setProductDetails(Array.isArray(productDetailsData) ? productDetailsData : []);
                setTypes(Array.isArray(typesData) ? typesData : []);
                setBands(Array.isArray(bandsData) ? bandsData : []);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
        fetchData();
    }, []);
    const getTypeName = (type_id) => { var _a; return ((_a = types.find((type) => type.type_id === type_id)) === null || _a === void 0 ? void 0 : _a.type_name) || "Unknown"; };
    const getBandName = (band_id) => { var _a; return ((_a = bands.find((band) => band.band_id === band_id)) === null || _a === void 0 ? void 0 : _a.band_name) || "Unknown"; };
    const getProductDetailForDisplay = (pro_id) => productDetails.find((detail) => detail.pro_id === pro_id);
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };
    const handleDelete = (pro_id) => __awaiter(this, void 0, void 0, function* () {
        const result = yield sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this product? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel",
        });
        if (result.isConfirmed) {
            try {
                yield fetch(`/api/products/${pro_id}`, {
                    method: "DELETE",
                });
                setProducts((prevProducts) => prevProducts.filter((product) => product.pro_id !== pro_id));
                sweetalert2_1.default.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Product has been deleted.",
                });
            }
            catch (error) {
                sweetalert2_1.default.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to delete the product.",
                });
            }
        }
    });
    const handleSaveProduct = (updatedProduct) => {
        setProducts(products.map((product) => product.pro_id === updatedProduct.pro_id ? updatedProduct : product));
    };
    return (<div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product List</h1>
        <link_1.default href="/admin/admin-add" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </link_1.default>
      </div>
      <div className="overflow-y-auto h-[800px]">
        {" "}
        {/* Adjust height here */}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">รหัส</th>
              <th className="py-2 ">ชื่อสินค้า</th>
              <th className="py-2 ">คำอธิบายสินค้า</th>
              <th className="py-2">แบนด์</th>
              <th className="py-2">ประเภท</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
            const detail = getProductDetailForDisplay(product.pro_id);
            return (<tr key={product.pro_id} className="border-t">
                  <td className="py-2 px-4">{(detail === null || detail === void 0 ? void 0 : detail.sku) || "N/A"}</td>
                  <td className="py-2 px-4">{product.pro_name}</td>
                  <td className="py-2 px-4">{product.pro_des}</td>
                  <td className="py-2 px-4">{getBandName(product.band_id)}</td>
                  <td className="py-2 px-4">{getTypeName(product.type_id)}</td>
                  <td className="py-2 px-4 flex space-x-2 items-center">
                    <button className="bg-green-500 text-white px-2 py-1 rounded flex items-center" onClick={() => handleEdit(product)}>
                      <ci_1.CiEdit className="h-7 w-7" aria-hidden="true"/>
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded flex items-center" onClick={() => handleDelete(product.pro_id)}>
                      <md_1.MdDeleteForever className="h-7 w-7" aria-hidden="true"/>
                    </button>
                    <link_1.default href={`/product-details/${product.pro_id}`} passHref>
                      <button className="bg-green-500 text-white px-1 py-1 rounded">
                        <span className="ml-1">รายละเอียด</span>
                      </button>
                    </link_1.default>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>
      </div>
      <edit_modal_1.default isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={selectedProduct} types={types} bands={bands} onSave={(updatedProduct) => handleSaveProduct(updatedProduct)}/>
    </div>);
}
