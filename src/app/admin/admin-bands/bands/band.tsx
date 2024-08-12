import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Band {
  id: number;
  band_name: string;
}

const BandForm: React.FC = () => {
  const [bandName, setBandName] = useState("");
  const [bands, setBands] = useState<Band[]>([]);

  const fetchBands = async () => {
    try {
      const response = await fetch("/api/bands");
      const data = await response.json();
      if (Array.isArray(data)) {
        setBands(data);
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
      await fetch("/api/bands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ band_name: bandName }),
      });
      setBandName("");
      fetchBands();
    } catch (error) {
      console.error("Error adding band:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/bands/${id}`, {
        method: "DELETE",
      });
      fetchBands();
    } catch (error) {
      console.error("Error deleting band:", error);
    }
  };

  const handleEdit = async (id: number, newName: string) => {
    try {
      await fetch(`/api/bands`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, band_name: newName }), // ส่ง id และ band_name
      });
      fetchBands();
    } catch (error) {
      console.error("Error editing band:", error);
    }
  };

  const confirmEdit = (id: number, currentName: string) => {
    Swal.fire({
      title: "Edit Band Name",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        handleEdit(id, result.value);
        Swal.fire("Saved!", "The band name has been updated.", "success");
      }
    });
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire("Deleted!", "The band has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    fetchBands();
  }, []);

  return (
    <div className="p-4">
      {/* Form Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Band</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bandName" className="block mb-1">
              Name
            </label>
            <input
              id="bandName"
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Band
          </button>
        </form>
      </div>

      {/* Band List Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Bands List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band) => (
              <tr key={band.id}>
                <td className="border px-4 py-2">{band.id}</td>
                <td className="border px-4 py-2">{band.band_name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => confirmEdit(band.id, band.band_name)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => confirmDelete(band.id)}
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

export default BandForm;
