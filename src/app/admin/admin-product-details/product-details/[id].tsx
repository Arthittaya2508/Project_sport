import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Color {
  color_id: number;
  color_name: string;
}
interface Type {
  type_id: number;
  type_name: string;
}
interface Band {
  band_id: number;
  band_name: string;
}
interface Gender {
  gender_id: number;
  gender_name: string;
}
interface Size {
  size_id: number;
  size_name: string;
}
type ProductDetails = {
  pro_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string;
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const [productDetailsRes, colorsRes, sizesRes, gendersRes] =
          await Promise.all([
            fetch(`/api/product_details/${id}`),
            fetch("/api/colors"),
            fetch("/api/sizes"),
            fetch("/api/genders"),
          ]);

        const productDetailsData = await productDetailsRes.json();
        const colorsData = await colorsRes.json();
        const sizesData = await sizesRes.json();
        const gendersData = await gendersRes.json();

        setProductDetails(productDetailsData);
        setColors(colorsData);
        setSizes(sizesData);
        setGenders(gendersData);
      };

      fetchData();
    }
  }, [id]);

  const getColorName = (color_id: number) =>
    colors.find((color) => color.color_id === color_id)?.color_name ||
    "Unknown";

  const getSizeName = (size_id: number) =>
    sizes.find((size) => size.size_id === size_id)?.size_name || "Unknown";

  const getGenderName = (gender_id: number) =>
    genders.find((gender) => gender.gender_id === gender_id)?.gender_name ||
    "Unknown";

  const handleEdit = (sku: string) => {
    // Implement edit functionality here
    console.log(`Edit product with SKU: ${sku}`);
  };

  const handleDelete = (sku: string) => {
    // Implement delete functionality here
    console.log(`Delete product with SKU: ${sku}`);
  };

  return (
    <div className="container mx-auto p-4">
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
          {productDetails.map((detail) => (
            <tr key={detail.sku} className="border-t">
              <td className="py-2 px-4">
                <img
                  src={`/images/${detail.pro_image}`}
                  alt={getColorName(detail.color_id)}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4">{getColorName(detail.color_id)}</td>
              <td className="py-2 px-4">{getSizeName(detail.size_id)}</td>
              <td className="py-2 px-4">{getGenderName(detail.gender_id)}</td>
              <td className="py-2 px-4">{detail.stock_quantity}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(detail.sku)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(detail.sku)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link href="/products" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
}
