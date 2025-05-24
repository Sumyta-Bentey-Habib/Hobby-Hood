import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

const UpdateHobby = () => {
  const { id } = useParams(); // group id from URL param
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    groupName: "",
    groupCategory: "",
    meetingLocation: "",
    startDate: "",
    imageUrl: "",
  });

  // Fetch group data to pre-fill the form
  useEffect(() => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to update groups.", "error");
      navigate("/login");
      return;
    }

    async function fetchGroup() {
      try {
        setLoading(true);
        const res = await fetch(`https://hobby-hood-server-site.vercel.app/my-groups?userEmail=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch groups");

        const groups = await res.json();
        const group = groups.find((g) => g._id === id);
        if (!group) {
          Swal.fire("Error", "Group not found", "error");
          navigate("/my-groups");
          return;
        }

        setForm({
          groupName: group.groupName || "",
          groupCategory: group.groupCategory || "",
          meetingLocation: group.meetingLocation || "",
          startDate: group.startDate || "",
          imageUrl: group.imageUrl || "",
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load group data", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchGroup();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://hobby-hood-server-site.vercel.app/my-groups/${id}?userEmail=${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        Swal.fire("Success", "Group updated successfully", "success");
        navigate("/my-groups");
      } else {
        const data = await res.json();
        Swal.fire("Error", data.message || "Failed to update group", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update group", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Update Hobby Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Group Name</span>
            <input
              type="text"
              name="groupName"
              value={form.groupName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Category</span>
            <input
              type="text"
              name="groupCategory"
              value={form.groupCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Meeting Location</span>
            <input
              type="text"
              name="meetingLocation"
              value={form.meetingLocation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Start Date</span>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Image URL</span>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Update Group
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateHobby;
