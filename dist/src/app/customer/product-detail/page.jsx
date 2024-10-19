"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../components/navbar/page"));
const product_detail_1 = __importDefault(require("./product-detail/product-detail"));
const ProductPage = () => {
    return (<div>
      <page_1.default />
      <div className="mt-10">
        {" "}
        <product_detail_1.default />
      </div>
    </div>);
};
exports.default = ProductPage;
