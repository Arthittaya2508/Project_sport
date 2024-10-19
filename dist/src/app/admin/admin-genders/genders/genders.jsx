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
const GenderForm = () => {
    const [genderName, setGenderName] = (0, react_1.useState)("");
    const [genders, setGenders] = (0, react_1.useState)([]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const fetchGenders = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/genders");
            const data = yield response.json();
            if (Array.isArray(data)) {
                setGenders(data);
            }
            else {
                console.error("Unexpected data format", data);
            }
        }
        catch (error) {
            console.error("Error fetching genders:", error);
        }
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield fetch("/api/genders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gender_name: genderName }),
            });
            setGenderName("");
            setIsModalOpen(false);
            fetchGenders();
        }
        catch (error) {
            console.error("Error adding gender:", error);
        }
    });
    const handleEdit = (genderId, newName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fetch("/api/genders", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gender_id: genderId, gender_name: newName }), // Updated key
            });
            fetchGenders();
        }
        catch (error) {
            console.error("Error editing gender:", error);
        }
    });
    const handleDelete = (genderId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fetch("/api/genders", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gender_id: genderId }), // Updated key
            });
            fetchGenders();
        }
        catch (error) {
            console.error("Error deleting gender:", error);
        }
    });
    const confirmEdit = (genderId, currentName) => {
        sweetalert2_1.default.fire({
            title: "Edit Gender Name",
            input: "text",
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                handleEdit(genderId, result.value);
                sweetalert2_1.default.fire("Saved!", "The gender name has been updated.", "success");
            }
        });
    };
    const confirmDelete = (genderId) => {
        sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(genderId);
                sweetalert2_1.default.fire("Deleted!", "The gender has been deleted.", "success");
            }
        });
    };
    (0, react_1.useEffect)(() => {
        fetchGenders();
    }, []);
    return (<div className="p-4 space-y-4">
      {/* Modal */}
      {isModalOpen && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Gender</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="genderName" className="block mb-1">
                  Name
                </label>
                <input id="genderName" type="text" value={genderName} onChange={(e) => setGenderName(e.target.value)} className="border border-gray-300 p-2 rounded w-full" required/>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white p-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Add Gender
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* Genders List Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Genders List</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">
            Add Gender
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Gender ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genders.map((gender) => (<tr key={gender.gender_id}>
                <td className="border px-4 py-2">{gender.gender_id}</td>
                <td className="border px-4 py-2">{gender.gender_name}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white p-1 rounded mr-2" onClick={() => confirmEdit(gender.gender_id, gender.gender_name)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white p-1 rounded" onClick={() => confirmDelete(gender.gender_id)}>
                    Delete
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = GenderForm;
