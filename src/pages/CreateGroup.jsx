import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const hobbyCategories = [
  "Drawing & Painting",
  "Photography",
  "Video Gaming",
  "Fishing",
  "Running",
  "Cooking",
  "Reading",
  "Writing",
  "Gardening",
  "Fitness",
  "Hiking",
  "Music",
  "Crocheting",
  "Others",
];

const CreateGroup = () => {
  useEffect(() => {
    document.title = "Create Group || Hobby Hood";
  }, []);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: "",
    groupCategory: hobbyCategories[0],
    description: "",
    meetingLocation: "",
    maxMembers: "",
    startDate: "",
    imageUrl: "",
  });

  const [themeClass, setThemeClass] = useState({
    page: "bg-gray-100",
    container: "bg-white text-gray-900",
    input: "border-gray-300 bg-white text-gray-900",
    readonlyInput: "bg-gray-100 border-gray-300 text-gray-900",
  });

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass({
          page: "bg-gray-950",
          container: "bg-gray-900 text-gray-100",
          input: "border-gray-600 bg-gray-800 text-gray-100",
          readonlyInput: "bg-gray-700 border-gray-600 text-gray-100",
        });
      } else {
        setThemeClass({
          page: "bg-gray-100",
          container: "bg-white text-gray-900",
          input: "border-gray-300 bg-white text-gray-900",
          readonlyInput: "bg-gray-100 border-gray-300 text-gray-900",
        });
      }
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.groupName.trim()) {
      Swal.fire("Oops!", "Group Name is required", "warning");
      return;
    }

    try {
      const response = await fetch(
        "https://hobby-hood-server-site.vercel.app/hobbies",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            userName: user?.displayName || user?.email,
            userEmail: user?.email,
          }),
        }
      );

      if (response.ok) {
        Swal.fire("Success", "Group created successfully!", "success");
        navigate("/all-groups");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create group");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div
      className={`${themeClass.page} min-h-screen flex items-center justify-center p-6`}
    >
      <div
        className={`w-full max-w-3xl p-6 rounded-md shadow-md border ${themeClass.container}`}
      >
        <h2 className="mb-6 text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          Create New Group
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Group Name</label>
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Hobby Category</label>
            <select
              name="groupCategory"
              value={formData.groupCategory}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            >
              {hobbyCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Meeting Location</label>
            <input
              type="text"
              name="meetingLocation"
              value={formData.meetingLocation}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleChange}
              min="1"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClass.input}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">User Name</label>
            <input
              type="text"
              value={user?.displayName || user?.email}
              readOnly
              className={`w-full rounded px-3 py-2 cursor-not-allowed border ${themeClass.readonlyInput}`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">User Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className={`w-full rounded px-3 py-2 cursor-not-allowed border ${themeClass.readonlyInput}`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
