import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const UpdateHobby = () => {
  const { id } = useParams();
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

  // Theme classes for container and inputs
  const [themeClass, setThemeClass] = useState({
    pageBg: "bg-gray-100",
    container: "bg-white text-gray-900 border-gray-300",
    input: "bg-white text-gray-900 border-gray-300",
  });

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass({
          pageBg: "bg-gray-950",
          container: "bg-gray-800 text-gray-100 border-gray-600",
          input: "bg-gray-800 text-gray-100 border-gray-600",
        });
      } else {
        setThemeClass({
          pageBg: "bg-gray-100",
          container: "bg-white text-gray-900 border-gray-300",
          input: "bg-white text-gray-900 border-gray-300",
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

  useEffect(() => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to update groups.", "error");
      navigate("/login");
      return;
    }

    async function fetchGroup() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://hobby-hood-server-site.vercel.app/my-groups?userEmail=${user.email}`
        );
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
      const res = await fetch(
        `https://hobby-hood-server-site.vercel.app/my-groups/${id}?userEmail=${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

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
    <main className={`${themeClass.pageBg} min-h-screen flex items-center justify-center p-6`}>
      <div
        className={`max-w-xl w-full p-6 rounded shadow border ${themeClass.container}`}
      >
        <h2 className="mb-6 text-2xl font-bold text-indigo-700">Update Hobby Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Group Name", name: "groupName", type: "text", required: true },
            { label: "Category", name: "groupCategory", type: "text", required: true },
            { label: "Meeting Location", name: "meetingLocation", type: "text" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "Image URL", name: "imageUrl", type: "url", placeholder: "https://example.com/image.jpg" },
          ].map(({ label, name, type, required, placeholder }) => (
            <label key={name} className="block">
              <span className={`text-gray-700 dark:text-gray-300`}>{label}</span>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={required}
                placeholder={placeholder}
                className={`mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${themeClass.input}`}
              />
            </label>
          ))}

          <button
            type="submit"
            className="px-6 py-2 text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Update Group
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateHobby;
