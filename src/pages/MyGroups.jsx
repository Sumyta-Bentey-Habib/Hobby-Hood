import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

const MyGroups = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
        `http://localhost:3000/my-groups?userEmail=${user.email}`
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
          `http://localhost:3000/my-groups/${id}?userEmail=${user.email}`,
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
    <>
      <NavBar />
      <div className="p-6 max-w-7xl mx-auto" role="main">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          My Groups
        </h2>
        {data.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            You haven't added any groups yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((group) => (
              <div
                key={group._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
              >
                {/* Group Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={
                      group.imageUrl ||
                      "https://via.placeholder.com/400x192?text=No+Image"
                    }
                    alt={group.groupName}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {group.groupName}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-1">
                    Category: {group.groupCategory}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {group.meetingLocation || "N/A"}
                  </p>

                  <p className="text-gray-700 mb-4">
                    <strong>Start Date:</strong> {formatDate(group.startDate)}
                  </p>

                  {/* Edit button */}
                  <button
                    onClick={() => navigate(`/update-hobby/${group._id}`)}
                    className="inline-block mr-3 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                    aria-label={`Edit group ${group.groupName}`}
                  >
                    Edit
                  </button>

                  {/* Remove button */}
                  <button
                    onClick={() => handleDelete(group._id)}
                    disabled={deletingId === group._id}
                    className={`inline-block px-5 py-2 rounded-md transition ${
                      deletingId === group._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
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
      </div>
    </>
  );
};

export default MyGroups;
