import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Band {
  id: number; // Assuming 'id' is the primary key in your database
  band_id: number; // This seems redundant with 'id'; consider using just 'id'
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

  const handleEdit = async (bandId: number, newName: string) => {
    try {
      await fetch("/api/bands", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ band_id: bandId, band_name: newName }), // Updated key
      });
      fetchBands();
    } catch (error) {
      console.error("Error editing band:", error);
    }
  };

  const handleDelete = async (bandId: number) => {
    try {
      await fetch("/api/bands", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ band_id: bandId }), // Updated key
      });
      fetchBands();
    } catch (error) {
      console.error("Error deleting band:", error);
    }
  };

  const confirmEdit = (bandId: number, currentName: string) => {
    Swal.fire({
      title: "Edit Band Name",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        handleEdit(bandId, result.value);
        Swal.fire("Saved!", "The band name has been updated.", "success");
      }
    });
  };

  const confirmDelete = (bandId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(bandId);
        Swal.fire("Deleted!", "The band has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    fetchBands();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Add Band Card */}
      <div className="bg-white shadow-md rounded-lg p-4 ">
        <h2 className="text-xl font-semibold mb-4">Add Band</h2>
        <form onSubmit={handleSubmit} className="space-x-4 flex">
          <div>
            <label htmlFor="bandName" className="block mb-1">
              Name
            </label>
            <input
              id="bandName"
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
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
            {bands.map((band) => (
              <tr key={band.band_id}>
                <td className="border px-4 py-2">{band.band_id}</td>
                <td className="border px-4 py-2">{band.band_name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => confirmEdit(band.band_id, band.band_name)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => confirmDelete(band.band_id)}
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
