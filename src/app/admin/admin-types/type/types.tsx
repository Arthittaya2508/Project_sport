"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Types {
  id: number; // Assuming 'id' is the primary key in your database
  type_id: number; // This seems redundant with 'id'; consider using just 'id'
  type_name: string;
}

const typeForm: React.FC = () => {
  const [typeName, setTypeName] = useState("");
  const [types, setType] = useState<Types[]>([]);

  const fetchTypes = async () => {
    try {
      const response = await fetch("/api/types");
      const data = await response.json();
      if (Array.isArray(data)) {
        setType(data);
      } else {
        console.error("Unexpected data format", data);
      }
    } catch (error) {
      console.error("Error fetching bands:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type_name: typeName }),
      });
      setTypeName("");
      fetchTypes();
    } catch (error) {
      console.error("Error adding band:", error);
    }
  };

  const handleEdit = async (typeId: number, newName: string) => {
    try {
      await fetch("/api/types", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type_id: typeId, type_name: newName }), // Updated key
      });
      fetchTypes();
    } catch (error) {
      console.error("Error editing band:", error);
    }
  };

  const handleDelete = async (typeId: number) => {
    try {
      await fetch("/api/types", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type_id: typeId }), // Updated key
      });
      fetchTypes();
    } catch (error) {
      console.error("Error deleting band:", error);
    }
  };

  const confirmEdit = (typeId: number, currentName: string) => {
    Swal.fire({
      title: "Edit Band Name",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        handleEdit(typeId, result.value);
        Swal.fire("Saved!", "The band name has been updated.", "success");
      }
    });
  };

  const confirmDelete = (typeId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(typeId);
        Swal.fire("Deleted!", "The band has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Add Band Card */}
      <div className="bg-white shadow-md rounded-lg p-4 ">
        <h2 className="text-xl font-semibold mb-4">Add Bsize</h2>
        <form onSubmit={handleSubmit} className="space-x-4 flex">
          <div>
            <label htmlFor="sizeName" className="block mb-1">
              Name
            </label>
            <input
              id="typeName"
              type="text"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-96"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded h-10 mt-7"
          >
            Add Band
          </button>
        </form>
      </div>

      {/* Bands List Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Bands List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Band ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.type_id}>
                <td className="border px-4 py-2">{type.type_id}</td>
                <td className="border px-4 py-2">{type.type_name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => confirmEdit(type.type_id, type.type_name)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => confirmDelete(type.type_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default typeForm;
