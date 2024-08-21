// pages/index.tsx
import Navbar from "./components/navbar/page";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('../images/bghome.jpg')" }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold mb-4">เฟื่องฟู สปอร์ต</h1>
          <p className="text-lg mb-6">
            ขายปลีก-ส่ง ชุดกีฬา เสื้อโฆษณา เฟล็กปริ้นท์ เฟล็กตัด
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
      <div className="text-center text-3xl mt-10">
        <span>จำหน่ายสินค้าทุกแบนรด์ชั้นนำในไทย</span>
      </div>
      <div className=" w-[1200px] h-[200px] mx-auto mt-6">
        <img src="../images/band.jpg" alt="band" />
      </div>
    </div>
  );
};

export default HomePage;
