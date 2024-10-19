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
const filters_1 = __importDefault(require("../filters/filters"));
const product_card_1 = __importDefault(require("../product-card/product-card"));
const Products = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [productDetails, setProductDetails] = (0, react_1.useState)({});
    const [filters, setFilters] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = yield response.json();
                setProducts(data);
            }
            catch (error) {
                setError("Failed to fetch products");
                console.error(error);
            }
        });
        const fetchProductDetails = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch("/api/product_details");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = yield response.json();
                const detailsById = data.reduce((acc, detail) => {
                    acc[detail.pro_id] = detail;
                    return acc;
                }, {});
                setProductDetails(detailsById);
            }
            catch (error) {
                setError("Failed to fetch product details");
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchProducts();
        fetchProductDetails();
    }, []);
    (0, react_1.useEffect)(() => {
        // Placeholder: Add code to handle filters if needed
    }, [filters]);
    if (loading)
        return <p>Loading products...</p>;
    if (error)
        return <p>{error}</p>;
    return (<div className="p-8">
      <filters_1.default onFilterChange={setFilters}/>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-9 p-10">
        {products.map((product) => (<product_card_1.default key={product.pro_id} product={product} productDetails={productDetails[product.pro_id] || {}}/>))}
      </div>
    </div>);
};
exports.default = Products;
