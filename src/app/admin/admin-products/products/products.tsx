import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import EditProductModal from "../edit-modal/edit-modal";

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
  type_id: number;
  band_id: number;
};
type ProductDetails = {
  pro_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, productDetailsRes, typesRes, bandsRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/product_details"),
            fetch("/api/types"),
            fetch("/api/bands"),
          ]);

        const productsData = await productRes.json();
        const productDetailsData = await productDetailsRes.json();
        const typesData = await typesRes.json();
        const bandsData = await bandsRes.json();

        setProducts(Array.isArray(productsData) ? productsData : []);
        setProductDetails(
          Array.isArray(productDetailsData) ? productDetailsData : []
        );
        setTypes(Array.isArray(typesData) ? typesData : []);
        setBands(Array.isArray(bandsData) ? bandsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTypeName = (type_id: number) =>
    types.find((type) => type.type_id === type_id)?.type_name || "Unknown";
  const getBandName = (band_id: number) =>
    bands.find((band) => band.band_id === band_id)?.band_name || "Unknown";

  const getProductDetailForDisplay = (pro_id: number) =>
    productDetails.find((detail) => detail.pro_id === pro_id);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (pro_id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${pro_id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.pro_id !== pro_id));
    }
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.pro_id === updatedProduct.pro_id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
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
            <th className="py-2">Brand</th>
            <th className="py-2">Type</th>
            <th className="py-2">Sale Price</th>
            <th className="py-2">Cost Price</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const detail = getProductDetailForDisplay(product.pro_id);
            return (
              <tr key={product.pro_id} className="border-t">
                <td className="py-2 px-4">{detail?.sku || "N/A"}</td>
                <td className="py-2 px-4">
                  <img
                    src={`/images/${detail?.pro_image || "default.jpg"}`}
                    alt={product.pro_name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4">{product.pro_name}</td>
                <td className="py-2 px-4">{getBandName(product.band_id)}</td>
                <td className="py-2 px-4">{getTypeName(product.type_id)}</td>
                <td className="py-2 px-4">{detail?.sale_price}</td>
                <td className="py-2 px-4">{detail?.cost_price}</td>
                <td className="py-2 px-4 flex space-x-2 items-center">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleEdit(product)}
                  >
                    <CiEdit className="h-7 w-7" aria-hidden="true" />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleDelete(product.pro_id)}
                  >
                    <MdDeleteForever className="h-7 w-7" aria-hidden="true" />
                  </button>
                  <Link href={`/product-details/${product.pro_id}`} passHref>
                    <button className="bg-green-500 text-white px-1 py-1 rounded">
                      <span className="ml-1">รายละเอียด</span>
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        types={types}
        bands={bands}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
