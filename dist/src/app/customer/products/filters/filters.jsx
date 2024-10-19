"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const hi_1 = require("react-icons/hi"); // You can use any icon library you prefer
const Filters = ({ onFilterChange, }) => {
    const [brand, setBrand] = (0, react_1.useState)([]);
    const [priceRange, setPriceRange] = (0, react_1.useState)("");
    const [color, setColor] = (0, react_1.useState)([]);
    const [size, setSize] = (0, react_1.useState)([]);
    const [gender, setGender] = (0, react_1.useState)([]);
    const [minPrice, setMinPrice] = (0, react_1.useState)("");
    const [maxPrice, setMaxPrice] = (0, react_1.useState)("");
    const [brands, setBrands] = (0, react_1.useState)([]);
    const [colors, setColors] = (0, react_1.useState)([]);
    const [sizes, setSizes] = (0, react_1.useState)([]);
    const [genders, setGenders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [brandsResponse, colorsResponse, sizesResponse, gendersResponse] = yield Promise.all([
                    fetch("/api/bands"),
                    fetch("/api/colors"),
                    fetch("/api/sizes"),
                    fetch("/api/genders"),
                ]);
                if (!brandsResponse.ok ||
                    !colorsResponse.ok ||
                    !sizesResponse.ok ||
                    !gendersResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const [brandsData, colorsData, sizesData, gendersData] = yield Promise.all([
                    brandsResponse.json(),
                    colorsResponse.json(),
                    sizesResponse.json(),
                    gendersResponse.json(),
                ]);
                console.log("Brands Data:", brandsData); // Debugging line
                console.log("Colors Data:", colorsData); // Debugging line
                console.log("Sizes Data:", sizesData); // Debugging line
                console.log("Genders Data:", gendersData); // Debugging line
                setBrands(brandsData.map((band) => ({
                    id: band.band_id,
                    name: band.band_name,
                })));
                setColors(colorsData.map((color) => ({
                    id: color.color_id,
                    name: color.color_name,
                })));
                setSizes(sizesData.map((size) => ({
                    id: size.size_id,
                    name: size.size_name,
                })));
                setGenders(gendersData.map((gender) => ({
                    id: gender.gender_id,
                    name: gender.gender_name,
                })));
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
        fetchData();
    }, []);
    const handleCheckboxChange = (type, id) => {
        const updateSelection = (selection) => {
            if (selection.includes(id)) {
                return selection.filter((item) => item !== id);
            }
            else {
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
    return (<div className="flex flex-col items-center space-y-4 p-4 overscroll-contain">
      <div className="text-xl font-bold">สินค้าทั้งหมด</div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <DropdownCheckbox title="แบนด์" options={brands} selected={brand} onChange={(id) => handleCheckboxChange("brand", id)}/>
        <DropdownCheckbox title="สี" options={colors} selected={color} onChange={(id) => handleCheckboxChange("color", id)}/>
        <DropdownCheckbox title="ขนาด" options={sizes} selected={size} onChange={(id) => handleCheckboxChange("size", id)}/>
        <DropdownCheckbox title="เพศ" options={genders} selected={gender} onChange={(id) => handleCheckboxChange("gender", id)}/>
        <div className="relative">
          <button className="form-select border border-gray-300 rounded-lg p-2" onClick={() => setPriceRange(priceRange === "custom" ? "" : "custom")}>
            {priceRange === "custom" ? "ระบุช่วงราคา" : "ราคา"}
          </button>
          {priceRange === "custom" && (<div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2 overscroll-auto">
              <input type="number" placeholder="ราคาน้อยที่สุด" value={minPrice} onChange={(e) => {
                setMinPrice(e.target.value ? parseFloat(e.target.value) : "");
                handlePriceChange();
            }} className="form-input border border-gray-300 rounded-lg p-2 mb-2"/>
              <input type="number" placeholder="ราคามากที่สุด" value={maxPrice} onChange={(e) => {
                setMaxPrice(e.target.value ? parseFloat(e.target.value) : "");
                handlePriceChange();
            }} className="form-input border border-gray-300 rounded-lg p-2"/>
            </div>)}
        </div>
      </div>
    </div>);
};
const DropdownCheckbox = ({ title, options, selected, onChange, }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const dropdownRef = (0, react_1.useRef)(null);
    const handleClickOutside = (0, react_1.useCallback)((event) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);
    return (<div className="relative" ref={dropdownRef}>
      <button className="flex items-center border border-gray-300 rounded-lg p-2" onClick={() => setOpen(!open)}>
        {title}
        {open ? (<hi_1.HiChevronUp className="ml-2"/>) : (<hi_1.HiChevronDown className="ml-2"/>)}
      </button>
      {open && (<div className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 max-h-72 overflow-auto overscroll-auto">
          {options.map((option) => (<label key={option.id} className="flex items-center space-x-2 p-2">
              <input type="checkbox" checked={selected.includes(option.id)} onChange={() => onChange(option.id)} className="form-checkbox"/>
              <span>{option.name}</span>
            </label>))}
        </div>)}
    </div>);
};
exports.default = Filters;
