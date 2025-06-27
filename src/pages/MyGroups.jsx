import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const MyGroups = () => {
  useEffect(()=>{
    document.title="My Groups || Hobby Hood";
  },[]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

 
  const [themeClasses, setThemeClasses] = useState({
    pageBg: "bg-gray-100",
    cardBg: "bg-white",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-700",
    textAccent: "text-indigo-600",
    btnEditBg: "bg-blue-600 hover:bg-blue-700",
    btnRemoveBg: "bg-red-600 hover:bg-red-700",
    btnRemoveDisabledBg: "bg-gray-400",
  });

  useEffect(() => {
    const updateThemeClasses = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClasses({
          pageBg: "bg-gray-950",
          cardBg: "bg-gray-800",
          textPrimary: "text-gray-100",
          textSecondary: "text-gray-300",
          textAccent: "text-indigo-400",
          btnEditBg: "bg-blue-500 hover:bg-blue-600",
          btnRemoveBg: "bg-red-500 hover:bg-red-600",
          btnRemoveDisabledBg: "bg-gray-600",
        });
      } else {
        setThemeClasses({
          pageBg: "bg-gray-100",
          cardBg: "bg-white",
          textPrimary: "text-gray-800",
          textSecondary: "text-gray-700",
          textAccent: "text-indigo-600",
          btnEditBg: "bg-blue-600 hover:bg-blue-700",
          btnRemoveBg: "bg-red-600 hover:bg-red-700",
          btnRemoveDisabledBg: "bg-gray-400",
        });
      }
    };

    updateThemeClasses();

    const observer = new MutationObserver(updateThemeClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchData = async () => {
    if (!user?.email) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://hobby-hood-server-site.vercel.app/my-groups?userEmail=${user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const groups = await response.json();
      setData(groups);
    } catch (error) {
      console.error("Error fetching my groups:", error);
      Swal.fire("Error", "Failed to load your groups", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        setDeletingId(id);
        const response = await fetch(
          `https://hobby-hood-server-site.vercel.app/my-groups/${id}?userEmail=${user.email}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "Group has been removed.", "success");
          fetchData();
        } else {
          Swal.fire("Error", "Failed to delete group", "error");
        }
      } catch (error) {
        console.error("Error deleting group:", error);
        Swal.fire("Error", "Failed to delete group", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <main className={`${themeClasses.pageBg} p-6 mx-auto`}>
      <h2
        className={`text-3xl font-extrabold mb-6 text-center text-indigo-700`}
      >
        My Groups
      </h2>
      {data.length === 0 ? (
        <p className={`${themeClasses.textSecondary} text-center text-lg mt-10`}>
          You haven't added any groups yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((group) => (
            <div
              key={group._id}
              className={`${themeClasses.cardBg} rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl`}
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={
                    group.imageUrl ||
                    "https://via.placeholder.com/400x192?text=No+Image"
                  }
                  alt={group.groupName}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-5">
                <h3 className={`${themeClasses.textPrimary} text-xl font-semibold mb-2`}>
                  {group.groupName}
                </h3>
                <p className={`${themeClasses.textAccent} font-medium mb-1`}>
                  Category: {group.groupCategory}
                </p>

                <p className={`${themeClasses.textSecondary} mb-1`}>
                  <strong>Location:</strong> {group.meetingLocation || "N/A"}
                </p>

                <p className={`${themeClasses.textSecondary} mb-4`}>
                  <strong>Start Date:</strong> {formatDate(group.startDate)}
                </p>

                <button
                  onClick={() => navigate(`/update-hobby/${group._id}`)}
                  className={`inline-block mr-3 px-5 py-2 rounded-md text-white transition ${themeClasses.btnEditBg}`}
                  aria-label={`Edit group ${group.groupName}`}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(group._id)}
                  disabled={deletingId === group._id}
                  className={`inline-block px-5 py-2 rounded-md transition ${
                    deletingId === group._id
                      ? `${themeClasses.btnRemoveDisabledBg} cursor-not-allowed`
                      : `${themeClasses.btnRemoveBg} text-white`
                  }`}
                  aria-label={`Remove group ${group.groupName}`}
                >
                  {deletingId === group._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyGroups;
