import { useState, useEffect } from "react";
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
type Product = {
  pro_id: number;
  pro_name: string;
  pro_des: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
  type_id: number;
  band_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  quantity: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const [productRes, typesRes, bandsRes, colorsRes, sizesRes, gendersRes] =
        await Promise.all([
          fetch("/api/products"),
          fetch("/api/types"),
          fetch("/api/bands"),
          fetch("/api/colors"),
          fetch("/api/sizes"),
          fetch("/api/genders"),
        ]);

      const productsData = await productRes.json();
      const typesData = await typesRes.json();
      const bandsData = await bandsRes.json();
      const colorsData = await colorsRes.json();
      const sizesData = await sizesRes.json();
      const gendersData = await gendersRes.json();

      setProducts(productsData);
      setTypes(typesData);
      setBands(bandsData);
      setColors(colorsData);
      setSizes(sizesData);
      setGenders(gendersData);
    };

    fetchProducts();
  }, []);

  const getTypeName = (type_id: number) =>
    types.find((type) => type.type_id === type_id)?.type_name || "Unknown";
  const getBandName = (band_id: number) =>
    bands.find((band) => band.band_id === band_id)?.band_name || "Unknown";
  const getColorName = (color_id: number) =>
    colors.find((color) => color.color_id === color_id)?.color_name ||
    "Unknown";
  const getSizeName = (size_id: number) =>
    sizes.find((size) => size.size_id === size_id)?.size_name || "Unknown";
  const getGenderName = (gender_id: number) =>
    genders.find((gender) => gender.gender_id === gender_id)?.gender_name ||
    "Unknown";

  return (
    <div className="container mx-auto p-4">
      <div className=""></div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product List</h1>
        <Link href="/admin/admin-add" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Product Code</th>
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Type</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Details</th>
            <th className="py-2">Sale Price</th>
            <th className="py-2">Cost Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{product.pro_id}</td>
              <td className="py-2 px-4">
                <img
                  src={`/images/${product.pro_image}`} // If the image is stored in the "public/images" folder
                  alt={product.pro_name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4">{product.pro_name}</td>
              <td className="py-2 px-4">{product.pro_des}</td>
              <td className="py-2 px-4">{getTypeName(product.type_id)}</td>
              <td className="py-2 px-4">{getBandName(product.band_id)}</td>
              <td className="py-2 px-4">
                {getColorName(product.color_id)}, {getSizeName(product.size_id)}
                , {getGenderName(product.gender_id)}
              </td>
              <td className="py-2 px-4">{product.sale_price}</td>
              <td className="py-2 px-4">{product.cost_price}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
