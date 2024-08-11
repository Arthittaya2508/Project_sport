import React from "react";

const Dashboard: React.FC = () => {
  const orderStatuses = [
    { label: "ออเดอร์ทั้งหมด", count: 100, bgColor: "bg-blue-500" },
    { label: "ออเดอร์ที่ยังไม่ได้รับ", count: 20, bgColor: "bg-yellow-500" },
    { label: "ออเดอร์ที่กำลังจัดเตรียม", count: 15, bgColor: "bg-orange-500" },
    // { label: "ออเดอร์ที่ขอขนส่งมารับ", count: 10, bgColor: "bg-teal-500" },
    // { label: "ออเดอร์ที่ขนส่งมารับแล้ว", count: 8, bgColor: "bg-purple-500" },
    { label: "ออเดอร์ที่จัดส่งแล้ว", count: 25, bgColor: "bg-indigo-500" },
    { label: "ออเดอร์ที่ส่งเรียบร้อย", count: 18, bgColor: "bg-green-500" },
    { label: "ออเดอร์ที่ยกเลิก", count: 5, bgColor: "bg-red-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        {orderStatuses.map((status) => (
          <div
            key={status.label}
            className={`${status.bgColor} text-white p-4 rounded-md shadow-md w-60 text-center`}
          >
            <h2 className="text-lg font-semibold">{status.label}</h2>
            <p className="text-2xl font-bold">({status.count} )</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
