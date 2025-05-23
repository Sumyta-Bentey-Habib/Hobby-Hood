import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClipboardList, FaBullseye } from 'react-icons/fa';

const HobbyCard = ({ hobby }) => {
  const { groupName, groupCategory, imageUrl, location, purpose } = hobby;

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
        <h2 className="text-xl font-semibold text-center text-gray-800">{groupName}</h2>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaClipboardList className="text-red-400" />
          <span><strong>Category:</strong> {groupCategory}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-400" />
          <span><strong>Location:</strong> {location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaBullseye className="text-red-400" />
          <span><strong>Purpose:</strong> {purpose}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HobbyCard;
