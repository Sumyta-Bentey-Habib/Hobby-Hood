import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useLoaderData } from "react-router-dom";
import HobbyCard from "../components/HobbyCard";
const AllGroups = () => {
  const initialHobbies = useLoaderData();
  const [hobbies, setHobbies] = useState(initialHobbies);
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 m-10">
          {hobbies.map((hobby) => (
            <HobbyCard
              hobby={hobby}
              key={hobby._id}
              hobbies={hobbies}
              setHobbies={setHobbies}
            ></HobbyCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;
