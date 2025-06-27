import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClipboardList, FaBullseye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthProvider";

const HobbyCard = ({ hobby }) => {
  const {
    _id,
    groupName,
    groupCategory,
    imageUrl,
    meetingLocation,
    description,
    maxMembers,
  } = hobby;
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useAuth();

  // Theme-related state
  const [themeClass, setThemeClass] = useState("bg-white text-gray-800");

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass("bg-gray-800 text-gray-100");
      } else {
        setThemeClass("bg-white text-gray-800");
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
    if (!user) return;

    fetch(`https://hobby-hood-server-site.vercel.app/my-groups?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        const alreadyExists = data.some((item) => item._id === _id);
        if (alreadyExists) {
          setIsAdded(true);
        }
      });
  }, [_id, user]);

  const handleAddToMyGroups = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "You must be logged in to add groups.",
      });
      return;
    }

    const payload = { ...hobby, userEmail: user.email };

    fetch("https://hobby-hood-server-site.vercel.app/my-groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setIsAdded(true);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "This group has been added to My Groups.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error("Failed to add:", err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add the group.",
        });
      });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${themeClass} w-full rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={groupName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-center">{groupName}</h2>

        <div className="flex items-center gap-2 text-sm">
          <FaClipboardList className="text-red-400" />
          <span>
            <strong>Category:</strong> {groupCategory}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt className="text-red-400" />
          <span>
            <strong>Location:</strong> {meetingLocation}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt className="text-red-400" />
          <span>
            <strong>Max Member:</strong> {maxMembers}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaBullseye className="text-red-400" />
          <span>
            <strong>Purpose:</strong> {description}
          </span>
        </div>

        <button
          onClick={handleAddToMyGroups}
          disabled={isAdded}
          className={`w-full py-2 rounded-md mt-3 font-semibold text-white ${
            isAdded ? "bg-green-600 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isAdded ? "Added to My Groups" : "Add to My Groups"}
        </button>
      </div>
    </motion.div>
  );
};

export default HobbyCard;
