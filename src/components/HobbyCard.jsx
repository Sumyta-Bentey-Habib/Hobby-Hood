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

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/my-groups?userEmail=${user.email}`)
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

    // Send the hobby data + user email
    const payload = { ...hobby, userEmail: user.email };

    fetch("http://localhost:3000/my-groups", {
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
      className="w-96 rounded-2xl overflow-hidden shadow-xl bg-white transition-all duration-300 hover:shadow-2xl"
    >
      <div className="h-60">
        <img
          src={imageUrl}
          alt={groupName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {groupName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaClipboardList className="text-red-400" />
          <span>
            <strong>Category:</strong> {groupCategory}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-400" />
          <span>
            <strong>Location:</strong> {meetingLocation}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-400" />
          <span>
            <strong>Max Member:</strong> {maxMembers}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaBullseye className="text-red-400" />
          <span>
            <strong>Purpose:</strong> {description}
          </span>
        </div>

        <button
          onClick={handleAddToMyGroups}
          disabled={isAdded}
          className={`w-full py-2 rounded-md mt-3 font-semibold text-white ${
            isAdded
              ? "bg-green-600 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isAdded ? "Added to My Groups" : "Add to My Groups"}
        </button>
      </div>
    </motion.div>
  );
};

export default HobbyCard;
