"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../components/navbar/page"));
const products_1 = __importDefault(require("./products/products"));
const ProductPage = () => {
    return (<div>
      <page_1.default />
      <products_1.default />
    </div>);
};
exports.default = ProductPage;
