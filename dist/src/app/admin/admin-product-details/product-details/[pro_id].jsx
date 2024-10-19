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
exports.getServerSideProps = void 0;
const router_1 = require("next/router");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const ProductDetailsPage = ({ initialProductDetails, }) => {
    const router = (0, router_1.useRouter)();
    const { pro_id } = router.query;
    const [productDetails, setProductDetails] = (0, react_1.useState)(initialProductDetails);
    const [colors, setColors] = (0, react_1.useState)([]);
    const [sizes, setSizes] = (0, react_1.useState)([]);
    const [genders, setGenders] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (pro_id) {
            const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
                setLoading(true);
                try {
                    const [productDetailsRes, colorsRes, sizesRes, gendersRes] = yield Promise.all([
                        fetch(`/api/product_details/${pro_id}`),
                        fetch("/api/colors"),
                        fetch("/api/sizes"),
                        fetch("/api/genders"),
                    ]);
                    if (!productDetailsRes.ok ||
                        !colorsRes.ok ||
                        !sizesRes.ok ||
                        !gendersRes.ok) {
                        throw new Error("Failed to fetch data.");
                    }
                    const productDetailsData = yield productDetailsRes.json();
                    const colorsData = yield colorsRes.json();
                    const sizesData = yield sizesRes.json();
                    const gendersData = yield gendersRes.json();
                    setProductDetails(productDetailsData);
                    setColors(colorsData);
                    setSizes(sizesData);
                    setGenders(gendersData);
                }
                catch (error) {
                    console.error("Error fetching data:", error);
                    setError("Failed to load product details.");
                }
                finally {
                    setLoading(false);
                }
            });
            fetchData();
        }
    }, [pro_id]);
    const getColorName = (color_id) => {
        var _a;
        return ((_a = colors.find((color) => color.color_id === color_id)) === null || _a === void 0 ? void 0 : _a.color_name) ||
            "Unknown";
    };
    const getSizeName = (size_id) => { var _a; return ((_a = sizes.find((size) => size.size_id === size_id)) === null || _a === void 0 ? void 0 : _a.size_name) || "Unknown"; };
    const getGenderName = (gender_id) => {
        var _a;
        return ((_a = genders.find((gender) => gender.gender_id === gender_id)) === null || _a === void 0 ? void 0 : _a.gender_name) ||
            "Unknown";
    };
    const handleEdit = (sku) => {
        console.log(`Edit product with SKU: ${sku}`);
    };
    const handleDelete = (sku) => {
        console.log(`Delete product with SKU: ${sku}`);
    };
    if (loading) {
        return <p>Loading product details...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Image</th>
            <th className="py-2">Color</th>
            <th className="py-2">Size</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Stock Quantity</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((detail) => (<tr key={detail.sku} className="border-t">
              <td className="py-2 px-4">
                <img src={`/images/${detail.pro_image}`} alt={getColorName(detail.color_id)} className="h-16 w-16 object-cover"/>
              </td>
              <td className="py-2 px-4">{getColorName(detail.color_id)}</td>
              <td className="py-2 px-4">{getSizeName(detail.size_id)}</td>
              <td className="py-2 px-4">{getGenderName(detail.gender_id)}</td>
              <td className="py-2 px-4">{detail.stock_quantity}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button onClick={() => handleEdit(detail.sku)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(detail.sku)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
      <div className="mt-4">
        <link_1.default href="/products" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Products
          </button>
        </link_1.default>
      </div>
    </div>);
};
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { pro_id } = context.query;
    if (typeof pro_id !== "string") {
        return {
            notFound: true,
        };
    }
    try {
        const res = yield fetch(`http://localhost:3000/api/products/${pro_id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch product details.");
        }
        const initialProductDetails = yield res.json();
        return {
            props: {
                initialProductDetails,
            },
        };
    }
    catch (error) {
        console.error("Failed to fetch product details:", error);
        return {
            notFound: true,
        };
    }
});
exports.getServerSideProps = getServerSideProps;
exports.default = ProductDetailsPage;
