import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Color {
  color_id: number;
  color_name: string;
}
interface Size {
  size_id: number;
  size_name: string;
}
interface Gender {
  gender_id: number;
  gender_name: string;
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

const ProductDetailsPage = ({
  initialProductDetails,
}: {
  initialProductDetails: ProductDetails[];
}) => {
  const router = useRouter();
  const { pro_id } = router.query;
  const [productDetails, setProductDetails] = useState<ProductDetails[]>(
    initialProductDetails
  );
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pro_id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [productDetailsRes, colorsRes, sizesRes, gendersRes] =
            await Promise.all([
              fetch(`/api/product_details/${pro_id}`),
              fetch("/api/colors"),
              fetch("/api/sizes"),
              fetch("/api/genders"),
            ]);

          if (
            !productDetailsRes.ok ||
            !colorsRes.ok ||
            !sizesRes.ok ||
            !gendersRes.ok
          ) {
            throw new Error("Failed to fetch data.");
          }

          const productDetailsData = await productDetailsRes.json();
          const colorsData = await colorsRes.json();
          const sizesData = await sizesRes.json();
          const gendersData = await gendersRes.json();

          setProductDetails(productDetailsData);
          setColors(colorsData);
          setSizes(sizesData);
          setGenders(gendersData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load product details.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [pro_id]);

  const getColorName = (color_id: number) =>
    colors.find((color) => color.color_id === color_id)?.color_name ||
    "Unknown";

  const getSizeName = (size_id: number) =>
    sizes.find((size) => size.size_id === size_id)?.size_name || "Unknown";

  const getGenderName = (gender_id: number) =>
    genders.find((gender) => gender.gender_id === gender_id)?.gender_name ||
    "Unknown";

  const handleEdit = (sku: string) => {
    console.log(`Edit product with SKU: ${sku}`);
  };

  const handleDelete = (sku: string) => {
    console.log(`Delete product with SKU: ${sku}`);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pro_id } = context.query;

  if (typeof pro_id !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const res = await fetch(`http://localhost:3000/api/products/${pro_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product details.");
    }

    const initialProductDetails = await res.json();
    return {
      props: {
        initialProductDetails,
      },
    };
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetailsPage;
