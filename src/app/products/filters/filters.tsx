"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // You can use any icon library you prefer

interface Bands {
  id: number;
  band_id: number;
  band_name: string;
}
interface Colors {
  id: number;
  color_id: number;
  color_name: string;
}
interface Sizes {
  id: number;
  size_id: number;
  size_name: string;
}
interface Genders {
  id: number;
  gender_id: number;
  gender_name: string;
}

const Filters = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [brand, setBrand] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [color, setColor] = useState<number[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [gender, setGender] = useState<number[]>([]);

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);
  const [sizes, setSizes] = useState<{ id: number; name: string }[]>([]);
  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsResponse, colorsResponse, sizesResponse, gendersResponse] =
          await Promise.all([
            fetch("/api/bands"),
            fetch("/api/colors"),
            fetch("/api/sizes"),
            fetch("/api/genders"),
          ]);

        if (
          !brandsResponse.ok ||
          !colorsResponse.ok ||
          !sizesResponse.ok ||
          !gendersResponse.ok
        ) {
          throw new Error("Network response was not ok");
        }

        const [brandsData, colorsData, sizesData, gendersData] =
          await Promise.all([
            brandsResponse.json(),
            colorsResponse.json(),
            sizesResponse.json(),
            gendersResponse.json(),
          ]);

        console.log("Brands Data:", brandsData); // Debugging line
        console.log("Colors Data:", colorsData); // Debugging line
        console.log("Sizes Data:", sizesData); // Debugging line
        console.log("Genders Data:", gendersData); // Debugging line

        setBrands(
          brandsData.map((band: Bands) => ({
            id: band.band_id,
            name: band.band_name,
          }))
        );
        setColors(
          colorsData.map((color: Colors) => ({
            id: color.color_id,
            name: color.color_name,
          }))
        );
        setSizes(
          sizesData.map((size: Sizes) => ({
            id: size.size_id,
            name: size.size_name,
          }))
        );
        setGenders(
          gendersData.map((gender: Genders) => ({
            id: gender.gender_id,
            name: gender.gender_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (type: string, id: number) => {
    const updateSelection = (selection: number[]) => {
      if (selection.includes(id)) {
        return selection.filter((item) => item !== id);
      } else {
        return [...selection, id];
      }
    };

    switch (type) {
      case "brand":
        setBrand(updateSelection(brand));
        break;
      case "color":
        setColor(updateSelection(color));
        break;
      case "size":
        setSize(updateSelection(size));
        break;
      case "gender":
        setGender(updateSelection(gender));
        break;
      default:
        break;
    }

    onFilterChange({
      brand,
      priceRange,
      color,
      size,
      gender,
      minPrice,
      maxPrice,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      brand,
      priceRange,
      color,
      size,
      gender,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 overscroll-contain">
      <div className="text-xl font-bold">สินค้าทั้งหมด</div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <DropdownCheckbox
          title="แบนด์"
          options={brands}
          selected={brand}
          onChange={(id) => handleCheckboxChange("brand", id)}
        />
        <DropdownCheckbox
          title="สี"
          options={colors}
          selected={color}
          onChange={(id) => handleCheckboxChange("color", id)}
        />
        <DropdownCheckbox
          title="ขนาด"
          options={sizes}
          selected={size}
          onChange={(id) => handleCheckboxChange("size", id)}
        />
        <DropdownCheckbox
          title="เพศ"
          options={genders}
          selected={gender}
          onChange={(id) => handleCheckboxChange("gender", id)}
        />
        <div className="relative">
          <button
            className="form-select border border-gray-300 rounded-lg p-2"
            onClick={() =>
              setPriceRange(priceRange === "custom" ? "" : "custom")
            }
          >
            {priceRange === "custom" ? "ระบุช่วงราคา" : "ราคา"}
          </button>
          {priceRange === "custom" && (
            <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2 overscroll-auto">
              <input
                type="number"
                placeholder="ราคาน้อยที่สุด"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value ? parseFloat(e.target.value) : "");
                  handlePriceChange();
                }}
                className="form-input border border-gray-300 rounded-lg p-2 mb-2"
              />
              <input
                type="number"
                placeholder="ราคามากที่สุด"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value ? parseFloat(e.target.value) : "");
                  handlePriceChange();
                }}
                className="form-input border border-gray-300 rounded-lg p-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DropdownCheckbox = ({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: { id: number; name: string }[];
  selected: number[];
  onChange: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center border border-gray-300 rounded-lg p-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? (
          <HiChevronUp className="ml-2" />
        ) : (
          <HiChevronDown className="ml-2" />
        )}
      </button>
      {open && (
        <div className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 max-h-72 overflow-auto overscroll-auto">
          {options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2 p-2">
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => onChange(option.id)}
                className="form-checkbox"
              />
              <span>{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
