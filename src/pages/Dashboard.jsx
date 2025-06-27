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
  const [tableBgClass, setTableBgClass] = useState("");
  useEffect(()=>{
    document.title="DashBoard || Hobby Hood";
  },[]);

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setTableBgClass("bg-gray-800 text-gray-100");
      } else {
        setTableBgClass("bg-white text-gray-800");
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
    if (user?.email) {
      setLoading(true);
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

      axios
        .get(`https://hobby-hood-server-site.vercel.app/hobbies?userEmail=${user.email}`)
        .then((res) => setCreatedGroups(res.data))
        .catch((err) => console.error("Failed to fetch created groups:", err));
    }
  }, [user?.email]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full p-6 space-y-6 border-b shadow-md md:w-64 md:border-b-0 md:border-r bg-base-100 text-base-content">
        <div className="text-2xl font-extrabold text-purple-700">Hobby Hood</div>
        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            className="block font-medium hover:text-purple-600"
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/my-groups"
            className="block hover:text-purple-600"
          >
            🧑‍🤝‍🧑 My Groups
          </NavLink>
          <NavLink
            to="/create-group"
            className="block hover:text-purple-600"
          >
            ➕ Create Group
          </NavLink>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 md:p-8 bg-base-100 text-base-content">
        <h2 className="mb-8 text-3xl font-bold">
          Welcome, {user?.displayName || "User"} 👋
        </h2>

     
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
          <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
            <h3 className="mb-1 text-sm text-gray-400">Total Groups Joined</h3>
            <p className="text-2xl font-bold text-purple-700">{myGroups.length}</p>
          </div>
          <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
            <h3 className="mb-1 text-sm text-gray-400">Unique Categories</h3>
            <p className="text-2xl font-bold text-purple-700">
              {[...new Set(myGroups.map((group) => group.groupCategory))].length}
            </p>
          </div>
          <div className="p-6 transition bg-white shadow-sm rounded-xl hover:shadow-md">
            <h3 className="mb-1 text-sm text-gray-400">Created Groups</h3>
            <p className="text-2xl font-bold text-purple-700">{createdGroups.length}</p>
          </div>
        </div>

        
        <section className={`p-6 shadow rounded-xl overflow-x-auto ${tableBgClass}`}>
          <h3 className="mb-4 text-xl font-semibold">My Groups</h3>
          {myGroups.length === 0 ? (
            <p className="text-gray-500">You have not joined any groups yet.</p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                  <th className="p-3 text-sm">Group Name</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {myGroups.map((group) => (
                  <tr key={group._id} className="border-t">
                    <td className="p-3 font-medium">{group.groupName}</td>
                    <td className="p-3">{group.groupCategory || "N/A"}</td>
                    <td className="p-3">
                      <span className="px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

      
        <section className={`p-6 mt-10 shadow rounded-xl overflow-x-auto ${tableBgClass}`}>
          <h3 className="mb-4 text-xl font-semibold">Groups I've Created</h3>
          {createdGroups.length === 0 ? (
            <p className="text-gray-500">You haven't created any groups yet.</p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                  <th className="p-3 text-sm">Group Name</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">Meeting</th>
                  <th className="p-3 text-sm">Max Members</th>
                </tr>
              </thead>
              <tbody>
                {createdGroups.map((group) => (
                  <tr key={group._id} className="border-t">
                    <td className="p-3 font-medium">{group.groupName}</td>
                    <td className="p-3">{group.groupCategory}</td>
                    <td className="p-3">{group.meetingLocation || "N/A"}</td>
                    <td className="p-3">{group.maxMembers || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
