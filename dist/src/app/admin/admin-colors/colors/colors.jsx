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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const ColorForm = () => {
    const [colorName, setColorName] = (0, react_1.useState)("");
    const [colors, setColors] = (0, react_1.useState)([]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const fetchColors = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/colors");
            const data = yield response.json();
            if (Array.isArray(data)) {
                setColors(data);
            }
            else {
                console.error("Unexpected data format", data);
            }
        }
        catch (error) {
            console.error("Error fetching colors:", error);
        }
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield fetch("/api/colors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ color_name: colorName }),
            });
            setColorName("");
            setIsModalOpen(false);
            fetchColors();
        }
        catch (error) {
            console.error("Error adding color:", error);
        }
    });
    const handleEdit = (colorId, newName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fetch("/api/colors", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ color_id: colorId, color_name: newName }), // Updated key
            });
            fetchColors();
        }
        catch (error) {
            console.error("Error editing color:", error);
        }
    });
    const handleDelete = (colorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fetch("/api/colors", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ color_id: colorId }), // Updated key
            });
            fetchColors();
        }
        catch (error) {
            console.error("Error deleting color:", error);
        }
    });
    const confirmEdit = (colorId, currentName) => {
        sweetalert2_1.default.fire({
            title: "Edit Color Name",
            input: "text",
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                handleEdit(colorId, result.value);
                sweetalert2_1.default.fire("Saved!", "The color name has been updated.", "success");
            }
        });
    };
    const confirmDelete = (colorId) => {
        sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(colorId);
                sweetalert2_1.default.fire("Deleted!", "The color has been deleted.", "success");
            }
        });
    };
    (0, react_1.useEffect)(() => {
        fetchColors();
    }, []);
    return (<div className="p-4 space-y-4">
      {/* Modal */}
      {isModalOpen && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Color</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="colorName" className="block mb-1">
                  Name
                </label>
                <input id="colorName" type="text" value={colorName} onChange={(e) => setColorName(e.target.value)} className="border border-gray-300 p-2 rounded w-full" required/>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white p-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Add Color
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* Colors List Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Colors List</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">
            Add Color
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Color ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (<tr key={color.color_id}>
                <td className="border px-4 py-2">{color.color_id}</td>
                <td className="border px-4 py-2">{color.color_name}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white p-1 rounded mr-2" onClick={() => confirmEdit(color.color_id, color.color_name)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white p-1 rounded" onClick={() => confirmDelete(color.color_id)}>
                    Delete
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = ColorForm;
