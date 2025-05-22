import React from "react";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";

const CreateGroup = () => {
  const handleAddGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const groupData = Object.fromEntries(formData.entries());
    console.log(groupData);

    fetch("http://localhost:3000/create-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Group created:", data);
        Swal.fire({
          title: "Group created successfully!",
          icon: "success",
        });
        form.reset();
      })
      .catch((err) => {
        console.error("Error creating group:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to create group",
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />

      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Want to create your own hobby group?
        </h1>
        <p className="text-xl md:text-2xl text-red-600 mt-2">
          Great 🎯 Let's get started...
        </p>
      </div>

      <form
        onSubmit={handleAddGroup}
        className="max-w-4xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
          <label className="label font-semibold">Group Name</label>
          <input
            type="text"
            name="groupName"
            className="input input-bordered w-full"
            placeholder="Enter your group name"
            required
          />
        </fieldset>

        <fieldset className="bg-base-200 border border-base-300 rounded-box p-4">
          <label className="label font-semibold">Group Category</label>
          <input
            type="text"
            name="groupCategory"
            className="input input-bordered w-full"
            placeholder="Enter your group category"
            required
          />
        </fieldset>

        <fieldset className="bg-base-200 border border-base-300 rounded-box p-4 md:col-span-2">
          <label className="label font-semibold">Purpose of Your Group</label>
          <input
            type="text"
            name="purpose"
            className="input input-bordered w-full"
            placeholder="Enter the purpose of your group"
            required
          />
        </fieldset>

        <fieldset className="bg-base-200 border border-base-300 rounded-box p-4 md:col-span-2">
          <label className="label font-semibold">Group Location</label>
          <input
            type="text"
            name="location"
            className="input input-bordered w-full"
            placeholder="Enter your group location"
            required
          />
        </fieldset>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="btn btn-neutral w-40">
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
