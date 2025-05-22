import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";

const MyGroups = () => {
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/my-group")
      .then((res) => res.json())
      .then((data) => setMyGroups(data))
      .catch((err) => console.error("Error fetching my groups:", err));
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this group!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      fetch(`http://localhost:3000/my-group/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire("Deleted!", "Your group has been deleted.", "success");
          setMyGroups(myGroups.filter((group) => group._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting group:", err);
          Swal.fire("Error!", "Could not delete group.", "error");
        });
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-primary">My Created Groups</h1>
      </div>
      <div className="max-w-6xl mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {myGroups.map((group) => (
          <div key={group._id} className="card bg-base-200 p-4 rounded-box shadow">
            <h2 className="font-bold text-lg">{group.groupName}</h2>
            <p><strong>Category:</strong> {group.groupCategory}</p>
            <p><strong>Purpose:</strong> {group.purpose}</p>
            <p><strong>Location:</strong> {group.location}</p>
            <button
              onClick={() => handleDelete(group._id)}
              className="btn btn-sm mt-3 bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        ))}
        {myGroups.length === 0 && <p className="text-center col-span-full">You haven't created any groups yet.</p>}
      </div>
    </div>
  );
};

export default MyGroups;
