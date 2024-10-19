"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const OrderDetails = ({ orderNumber }) => {
    // ข้อมูลออเดอร์ตัวอย่าง
    const order = {
        orderNumber: orderNumber,
        customerName: "John Doe",
        deliveryAddress: "123 Main St, Bangkok",
        totalPrice: 500,
        orderStatus: "จัดส่งแล้ว",
        productDetails: "Product A, Product B",
        additionalDetails: "Here you can display more detailed information about the order.",
    };
    return (<div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>เลขที่ออเดอร์:</strong> {order.orderNumber}
      </p>
      <p>
        <strong>ชื่อลูกค้า:</strong> {order.customerName}
      </p>
      <p>
        <strong>ที่อยู่ที่จัดส่ง:</strong> {order.deliveryAddress}
      </p>
      <p>
        <strong>ราคารวม:</strong> {order.totalPrice} บาท
      </p>
      <p>
        <strong>สถานะการสั่ง:</strong> {order.orderStatus}
      </p>
      <p>
        <strong>รายละเอียดสินค้า:</strong> {order.productDetails}
      </p>
      <p>
        <strong>รายละเอียดเพิ่มเติม:</strong> {order.additionalDetails}
      </p>

      {/* ลิงก์กลับไปยังหน้ารายการออเดอร์ */}
      <link_1.default href="/admin/admin-dash/dashboard">
        <button className="text-blue-500 hover:underline mt-4 inline-block">
          กลับไปยังหน้ารายการออเดอร์
        </button>
      </link_1.default>
    </div>);
};
exports.default = OrderDetails;
