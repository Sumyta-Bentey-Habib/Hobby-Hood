import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";
const Dashboard = () => {
  const { user } = useAuth();
  const [myGroups, setMyGroups] = useState([]);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // Fetch joined groups
      axios
        .get(`https://hobby-hood-server-site.vercel.app/my-groups?userEmail=${user.email}`)
        .then((res) => {
          setMyGroups(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user groups:", err);
          setLoading(false);
        });

      // Fetch created groups
      axios
        .get(`https://hobby-hood-server-site.vercel.app/hobbies?userEmail=${user.email}`)
        .then((res) => setCreatedGroups(res.data))
        .catch((err) => console.error("Failed to fetch created groups:", err));
    }
  }, [user?.email]);

  if (loading) return <div>
    <Loader></Loader>
  </div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6 border-r">
        <div className="text-2xl font-extrabold text-purple-700">Hobby Hood</div>
        <nav className="space-y-4 text-gray-700">
          <NavLink to="/dashboard" className="block hover:text-purple-600 font-medium">
            📊 Dashboard
          </NavLink>
          <NavLink to="/my-groups" className="block hover:text-purple-600">
            🧑‍🤝‍🧑 My Groups
          </NavLink>
          <NavLink to="/create-group" className="block hover:text-purple-600">
            ➕ Create Group
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome, {user?.displayName || "User"} 👋
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-400 mb-1">Total Groups Joined</h3>
            <p className="text-2xl font-bold text-purple-700">{myGroups.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-400 mb-1">Unique Categories</h3>
            <p className="text-2xl font-bold text-purple-700">
              {[...new Set(myGroups.map((group) => group.groupCategory))].length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-400 mb-1">Created Groups</h3>
            <p className="text-2xl font-bold text-purple-700">{createdGroups.length}</p>
          </div>
        </div>

        {/* Joined Groups Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">My Groups</h3>
          {myGroups.length === 0 ? (
            <p className="text-gray-500">You have not joined any groups yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 text-sm">Group Name</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {myGroups.map((group) => (
                  <tr key={group._id} className="border-t text-gray-700">
                    <td className="p-3 font-medium">{group.groupName}</td>
                    <td className="p-3">{group.groupCategory || "N/A"}</td>
                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Created Groups Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Groups I've Created</h3>
          {createdGroups.length === 0 ? (
            <p className="text-gray-500">You haven't created any groups yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 text-sm">Group Name</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">Meeting</th>
                  <th className="p-3 text-sm">Max Members</th>
                </tr>
              </thead>
              <tbody>
                {createdGroups.map((group) => (
                  <tr key={group._id} className="border-t text-gray-700">
                    <td className="p-3 font-medium">{group.groupName}</td>
                    <td className="p-3">{group.groupCategory}</td>
                    <td className="p-3">{group.meetingLocation || "N/A"}</td>
                    <td className="p-3">{group.maxMembers || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
