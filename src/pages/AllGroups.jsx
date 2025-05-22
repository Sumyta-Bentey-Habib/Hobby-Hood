import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/groups")  // Use your actual backend route
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching all groups:", err));
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-primary">Explore All Hobby Groups</h1>
      </div>
      <div className="max-w-6xl mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.length === 0 && (
          <p className="text-center col-span-full">No groups found.</p>
        )}
        {groups.map((group) => (
          <div key={group._id} className="card bg-base-200 p-4 rounded-box shadow">
            <h2 className="font-bold text-lg">{group.name}</h2>
            <p><strong>Description:</strong> {group.description || "N/A"}</p>
            <p><strong>Hobbies:</strong> {group.hobbies && group.hobbies.length > 0 ? group.hobbies.join(", ") : "None"}</p>
            <p><strong>Created At:</strong> {new Date(group.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
