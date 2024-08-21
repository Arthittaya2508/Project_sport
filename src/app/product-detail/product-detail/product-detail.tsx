"use client";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Product } from "../../products/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // อย่าลืมนำเข้าคำสั่งนี้ในกรณีที่ติดตั้งผ่าน npm

const ProductDetail: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  // ข้อมูลทดสอบ
  const testProduct: Product = {
    pro_id: 101,
    pro_name: "EGO SPORT เสื้อโปโลแขนสั้นผู้หญิง 11สี EG6196",
    sale_price: 225,
    pro_des:
      "ผ้า: ไมโคร อีซี่คูล Micro Easy-cool คุณสมบัติ:-เบาสบาย อยู่ทรงได้ดีแต่เนื้อผ้าไม่บาง แห้งเร็ว และระบายอากาศได้ดี เหมาะสำหรับกิจกรรมที่ต้องการความระบายอากาศและความคล่องตัว",
    pro_image: "egored.jpg",
    color_id: "Red",
    size_id: "M",
    quantity: 50,
  };

  useEffect(() => {
    // การตั้งค่า product ด้วยข้อมูลทดสอบ
    setProduct(testProduct);
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* รูปภาพเล็กที่แสดงอยู่ด้านซ้าย */}
        <div className="md:w-1/4 flex flex-col space-y-2">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            className="hidden md:flex"
          >
            {/* รูปภาพเล็กที่แสดงใน Swiper */}
            {[product.pro_image, product.pro_image, product.pro_image].map(
              (image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/images/${image}`}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-32 object-cover rounded-md cursor-pointer"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>

        {/* รูปภาพหลักที่แสดงอยู่ด้านขวา */}
        <div className="md:w-3/4 flex flex-col space-y-4">
          <img
            src={`/images/${product.pro_image}`}
            alt={product.pro_name}
            className="w-full h-96 object-cover rounded-md"
          />
        </div>

        <div className="md:w-1/2 md:ml-6 flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-2">{product.pro_name}</h1>
          <p className="text-gray-500 mb-2">฿{product.sale_price}</p>
          <p className="text-gray-700 mb-4">{product.pro_des}</p>
          {product.color_id && (
            <p className="text-gray-700 mb-2">Color: {product.color_id}</p>
          )}
          {product.size_id && (
            <p className="text-gray-700 mb-2">Size: {product.size_id}</p>
          )}
          {product.quantity !== undefined && (
            <p className="text-gray-700 mb-4">Stock: {product.quantity}</p>
          )}

          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              <FaHeart />
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              เพิ่มสินค้าลงในตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
